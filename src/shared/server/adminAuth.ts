import { BlogAdminApiError } from "./blogAdmin";
import { createSupabaseServerAuthClient } from "./supabaseAuth";
import { redirect } from "next/navigation";

function readAdminAuthMode(): string {
  return process.env.BLOG_ADMIN_AUTH_MODE?.trim().toLowerCase() ?? "supabase_jwt";
}

async function canBypassAdminAuthForLocalDevelopment(
  _request?: Request,
): Promise<boolean> {
  if (process.env.NODE_ENV !== "development") {
    return false;
  }

  if (readAdminAuthMode() === "off") {
    return true;
  }

  return false;
}

async function hasAuthenticatedAdminSession(request?: Request): Promise<boolean> {
  if (await canBypassAdminAuthForLocalDevelopment(request)) {
    return true;
  }

  const supabase = await createSupabaseServerAuthClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return false;
  }

  return true;
}

export async function enforceAdminAccess(request?: Request): Promise<void> {
  if (!(await hasAuthenticatedAdminSession(request))) {
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
