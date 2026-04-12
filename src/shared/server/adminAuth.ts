import { BlogAdminApiError } from "./blogAdmin";
import { createSupabaseServerAuthClient } from "./supabaseAuth";
import { redirect } from "next/navigation";

async function hasAuthenticatedAdminSession(): Promise<boolean> {
  const supabase = await createSupabaseServerAuthClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
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
