import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import {
  exchangeGoogleSearchConsoleCode,
  getGoogleSearchConsoleAdminUrl,
  readGoogleSearchConsoleRefreshToken,
  saveGoogleSearchConsoleRefreshToken,
} from "@/src/shared/server/googleSearchConsole";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_COOKIE = "gsc_oauth_state";
const CALLBACK_PATH = "/api/admin/search-console/callback";

function redirectToAdmin(status: string): NextResponse {
  const response = NextResponse.redirect(getGoogleSearchConsoleAdminUrl(status));
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(STATE_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: CALLBACK_PATH,
  });
  return response;
}

function statesMatch(expected: string | undefined, received: string | null): boolean {
  if (!expected || !received) return false;
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);
  return expectedBuffer.byteLength === receivedBuffer.byteLength && timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function GET(request: Request) {
  let isAdmin = false;
  try {
    await enforceAdminAccess(request);
    isAdmin = true;

    const url = new URL(request.url);
    if (url.searchParams.has("error")) {
      return redirectToAdmin("cancelled");
    }

    const code = url.searchParams.get("code");
    const receivedState = url.searchParams.get("state");
    const cookieStore = await cookies();
    const expectedState = cookieStore.get(STATE_COOKIE)?.value;
    if (!code || !statesMatch(expectedState, receivedState)) {
      return redirectToAdmin("invalid_oauth_response");
    }

    const token = await exchangeGoogleSearchConsoleCode(code);
    const refreshToken = token.refresh_token ?? await readGoogleSearchConsoleRefreshToken();
    if (!refreshToken) {
      return redirectToAdmin("missing_refresh_token");
    }
    if (token.refresh_token) {
      await saveGoogleSearchConsoleRefreshToken(token.refresh_token);
    }
    return redirectToAdmin("connected");
  } catch {
    return redirectToAdmin(isAdmin ? "connection_failed" : "unauthorized");
  }
}
