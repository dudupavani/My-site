import { AdminLoginPage } from "@/src/modules/blog-admin/ui/AdminLoginPage";
import { redirectAuthenticatedAdminToPosts } from "@/src/shared/server/adminAuth";

type SearchParams = {
  error?: string | string[];
};

export default async function AdminRootPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await redirectAuthenticatedAdminToPosts();
  const { error } = await searchParams;
  const errorCode = typeof error === "string" ? error : undefined;

  return <AdminLoginPage errorCode={errorCode} />;
}
