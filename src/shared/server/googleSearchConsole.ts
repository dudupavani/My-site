import "server-only";

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

import { getSupabaseAdminClient } from "@/src/shared/server/supabase";

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const TOKEN_REVOCATION_ENDPOINT = "https://oauth2.googleapis.com/revoke";
const SEARCH_CONSOLE_API = "https://www.googleapis.com/webmasters/v3";
const SEARCH_CONSOLE_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

export type GoogleSearchConsoleProperty = {
  siteUrl: string;
  permissionLevel: string;
};

export type SearchAnalyticsRow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GoogleSearchConsoleDashboard = {
  siteUrl: string;
  startDate: string;
  endDate: string;
  totals: SearchAnalyticsRow;
  daily: SearchAnalyticsRow[];
  queries: SearchAnalyticsRow[];
  pages: SearchAnalyticsRow[];
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Environment variable ${name} is required.`);
  }
  return value;
}

function tokenEncryptionKey(): Buffer {
  const encoded = requiredEnv("GOOGLE_SEARCH_CONSOLE_TOKEN_ENCRYPTION_KEY");
  const key = Buffer.from(encoded, "base64");
  if (key.byteLength !== 32) {
    throw new Error("Google Search Console token encryption key must be 32 bytes (base64 encoded).");
  }
  return key;
}

export function getGoogleSearchConsoleRedirectUri(): string {
  return requiredEnv("GOOGLE_SEARCH_CONSOLE_REDIRECT_URI");
}

export function getGoogleSearchConsoleAdminUrl(status: string): URL {
  const callbackUri = new URL(getGoogleSearchConsoleRedirectUri());
  const destination = new URL("/admin/search-console", callbackUri.origin);
  destination.searchParams.set("status", status);
  return destination;
}

export function createGoogleSearchConsoleAuthorizationUrl(state: string): string {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", requiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_ID"));
  url.searchParams.set("redirect_uri", getGoogleSearchConsoleRedirectUri());
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", SEARCH_CONSOLE_SCOPE);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("include_granted_scopes", "true");
  url.searchParams.set("state", state);
  return url.toString();
}

export async function exchangeGoogleSearchConsoleCode(code: string): Promise<GoogleTokenResponse> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: requiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_ID"),
      client_secret: requiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET"),
      redirect_uri: getGoogleSearchConsoleRedirectUri(),
      grant_type: "authorization_code",
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as GoogleTokenResponse;
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description ?? payload.error ?? "Google OAuth token exchange failed.");
  }
  return payload;
}

export async function refreshGoogleSearchConsoleAccessToken(): Promise<string> {
  const refreshToken = await readGoogleSearchConsoleRefreshToken();
  if (!refreshToken) {
    throw new Error("Google Search Console is not connected.");
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: requiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_ID"),
      client_secret: requiredEnv("GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET"),
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as GoogleTokenResponse;
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description ?? payload.error ?? "Google OAuth token refresh failed.");
  }
  return payload.access_token;
}

async function searchConsoleRequest<T>(url: string, accessToken: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("authorization", `Bearer ${accessToken}`);
  const response = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as T & {
    error?: { message?: string };
  };
  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Search Console API returned ${response.status}.`);
  }
  return payload;
}

export async function listGoogleSearchConsoleProperties(
  accessToken: string,
): Promise<GoogleSearchConsoleProperty[]> {
  const payload = await searchConsoleRequest<{ siteEntry?: GoogleSearchConsoleProperty[] }>(
    `${SEARCH_CONSOLE_API}/sites`,
    accessToken,
  );
  return payload.siteEntry ?? [];
}

async function querySearchAnalytics(
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string,
  dimensions?: string[],
): Promise<SearchAnalyticsRow[]> {
  const url = `${SEARCH_CONSOLE_API}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const payload = await searchConsoleRequest<{ rows?: SearchAnalyticsRow[] }>(url, accessToken, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      startDate,
      endDate,
      ...(dimensions ? { dimensions } : {}),
      rowLimit: dimensions?.[0] === "date" ? 30 : 10,
      dataState: "final",
    }),
  });
  return payload.rows ?? [];
}

export async function getGoogleSearchConsoleDashboard(
  requestedSiteUrl?: string,
): Promise<{ properties: GoogleSearchConsoleProperty[]; dashboard: GoogleSearchConsoleDashboard | null }> {
  const accessToken = await refreshGoogleSearchConsoleAccessToken();
  const properties = await listGoogleSearchConsoleProperties(accessToken);
  if (!properties.length) {
    return { properties, dashboard: null };
  }

  const selectedSite = properties.find((property) => property.siteUrl === requestedSiteUrl)
    ?? properties.find((property) => property.siteUrl === "sc-domain:eduardopavani.com")
    ?? properties.find((property) => property.siteUrl.includes("eduardopavani.com"))
    ?? properties[0];

  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);
  const startDate = toIsoDate(start);
  const endDate = toIsoDate(end);

  const [totalsRows, daily, queries, pages] = await Promise.all([
    querySearchAnalytics(accessToken, selectedSite.siteUrl, startDate, endDate),
    querySearchAnalytics(accessToken, selectedSite.siteUrl, startDate, endDate, ["date"]),
    querySearchAnalytics(accessToken, selectedSite.siteUrl, startDate, endDate, ["query"]),
    querySearchAnalytics(accessToken, selectedSite.siteUrl, startDate, endDate, ["page"]),
  ]);

  return {
    properties,
    dashboard: {
      siteUrl: selectedSite.siteUrl,
      startDate,
      endDate,
      totals: totalsRows[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      daily,
      queries,
      pages,
    },
  };
}

export async function saveGoogleSearchConsoleRefreshToken(refreshToken: string): Promise<void> {
  const key = tokenEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(refreshToken, "utf8"), cipher.final()]);
  const payload = ["v1", iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), encrypted.toString("base64url")].join(".");
  const { error } = await getSupabaseAdminClient()
    .from("google_search_console_credentials")
    .upsert({ id: 1, encrypted_refresh_token: payload }, { onConflict: "id" });

  if (error) {
    throw new Error("Could not securely save Google Search Console credentials.");
  }
}

export async function readGoogleSearchConsoleRefreshToken(): Promise<string | null> {
  const { data, error } = await getSupabaseAdminClient()
    .from("google_search_console_credentials")
    .select("encrypted_refresh_token")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    throw new Error("Could not read Google Search Console connection.");
  }
  if (!data?.encrypted_refresh_token) {
    return null;
  }

  const [version, encodedIv, encodedTag, encodedCiphertext] = data.encrypted_refresh_token.split(".");
  if (version !== "v1" || !encodedIv || !encodedTag || !encodedCiphertext) {
    throw new Error("Stored Google Search Console credential has an unsupported format.");
  }

  const decipher = createDecipheriv("aes-256-gcm", tokenEncryptionKey(), Buffer.from(encodedIv, "base64url"));
  decipher.setAuthTag(Buffer.from(encodedTag, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(encodedCiphertext, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

export async function isGoogleSearchConsoleConnected(): Promise<boolean> {
  const { data, error } = await getSupabaseAdminClient()
    .from("google_search_console_credentials")
    .select("id")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    throw new Error("Could not read Google Search Console connection status.");
  }
  return Boolean(data);
}

export async function disconnectGoogleSearchConsole(): Promise<void> {
  const refreshToken = await readGoogleSearchConsoleRefreshToken();
  const { error } = await getSupabaseAdminClient()
    .from("google_search_console_credentials")
    .delete()
    .eq("id", 1);
  if (error) {
    throw new Error("Could not disconnect Google Search Console.");
  }

  if (!refreshToken) return;
  let revoked = false;
  try {
    const response = await fetch(TOKEN_REVOCATION_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token: refreshToken }),
      cache: "no-store",
    });
    revoked = response.ok;
  } catch {
    // The local credential is already removed; report if remote revocation could not be confirmed.
  }
  if (!revoked) {
    throw new Error("The local credential was removed, but Google access revocation could not be confirmed.");
  }
}
