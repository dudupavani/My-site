import { BlogAdminApiError } from "./blogAdmin";
import { createSupabaseServerAuthClient } from "./supabaseAuth";
import { redirect } from "next/navigation";

function readAllowedEmails(): string[] {
  const raw = process.env.BLOG_ADMIN_ALLOWED_EMAILS?.trim() ?? "";
  const emails = raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);

  if (emails.length !== 1) {
    throw new BlogAdminApiError(
      "Configuração de autenticação admin inválida: defina exatamente um email em BLOG_ADMIN_ALLOWED_EMAILS.",
      500,
    );
  }

  return emails;
}

export function readAllowedAdminEmail(): string {
  const [email] = readAllowedEmails();
  return email;
}

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === readAllowedAdminEmail();
}

async function hasAuthenticatedAdminSession(): Promise<boolean> {
  const supabase = await createSupabaseServerAuthClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return false;
  }

  const email = data.user.email?.trim().toLowerCase();
  if (!isAllowedAdminEmail(email)) {
    await supabase.auth.signOut();
    return false;
  }

  return true;
}

export async function enforceAdminAccess(_request?: Request): Promise<void> {
  if (!(await hasAuthenticatedAdminSession())) {
    throw new BlogAdminApiError("Não autorizado.", 401);
  }
}

export async function requireAdminPageAccess(): Promise<void> {
  if (!(await hasAuthenticatedAdminSession())) {
    redirect("/admin");
  }
}

export async function redirectAuthenticatedAdminToPosts(): Promise<void> {
  if (await hasAuthenticatedAdminSession()) {
    redirect("/admin/posts");
  }
}
