import { BlogAdminApiError } from "./blogAdmin";
import { getSupabaseAdminClient } from "./supabase";

type AdminAuthMode = "off" | "supabase_jwt" | "static_token";

const DEFAULT_AUTH_MODE: AdminAuthMode = "off";

function readMode(): AdminAuthMode {
  const raw = process.env.BLOG_ADMIN_AUTH_MODE?.trim().toLowerCase();
  if (!raw) {
    return DEFAULT_AUTH_MODE;
  }

  if (raw === "off" || raw === "supabase_jwt" || raw === "static_token") {
    return raw;
  }

  throw new BlogAdminApiError("Configuração de autenticação admin inválida.", 500);
}

function readBearerToken(request: Request): string | null {
  const authorization = request.headers.get("authorization")?.trim() ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  const token = authorization.slice(7).trim();
  return token.length > 0 ? token : null;
}

function readStaticTokens(): Set<string> {
  const raw = process.env.BLOG_ADMIN_STATIC_TOKENS?.trim() ?? "";
  const tokens = raw
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token.length > 0);

  return new Set(tokens);
}

function readAllowedEmails(): Set<string> {
  const raw = process.env.BLOG_ADMIN_ALLOWED_EMAILS?.trim() ?? "";
  const emails = raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);

  return new Set(emails);
}

async function enforceStaticToken(request: Request): Promise<void> {
  const allowedTokens = readStaticTokens();
  if (allowedTokens.size === 0) {
    throw new BlogAdminApiError("Configuração de autenticação admin inválida.", 500);
  }

  const tokenFromHeader = readBearerToken(request);
  const tokenFromCustomHeader = request.headers.get("x-admin-token")?.trim() ?? "";
  const token = tokenFromHeader ?? (tokenFromCustomHeader.length > 0 ? tokenFromCustomHeader : null);

  if (!token || !allowedTokens.has(token)) {
    throw new BlogAdminApiError("Não autorizado.", 401);
  }
}

async function enforceSupabaseJwt(request: Request): Promise<void> {
  const token = readBearerToken(request);
  if (!token) {
    throw new BlogAdminApiError("Não autorizado.", 401);
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new BlogAdminApiError("Não autorizado.", 401);
  }

  const allowedEmails = readAllowedEmails();
  if (allowedEmails.size === 0) {
    throw new BlogAdminApiError("Configuração de autenticação admin inválida.", 500);
  }

  const email = data.user.email?.trim().toLowerCase();
  if (!email || !allowedEmails.has(email)) {
    throw new BlogAdminApiError("Acesso negado ao admin.", 403);
  }
}

export async function enforceAdminAccess(request: Request): Promise<void> {
  const mode = readMode();

  if (mode === "off") {
    return;
  }

  if (mode === "static_token") {
    await enforceStaticToken(request);
    return;
  }

  await enforceSupabaseJwt(request);
}

