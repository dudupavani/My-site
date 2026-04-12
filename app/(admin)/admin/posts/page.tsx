import { AdminShell } from "@/src/modules/blog-admin/ui/AdminShell";
import { PostsAdminScreen } from "@/src/modules/blog-admin/ui/PostsAdminScreen";
import { requireAdminPageAccess } from "@/src/shared/server/adminAuth";

export default async function AdminPostsPage() {
  await requireAdminPageAccess();
  return (
    <AdminShell>
      <PostsAdminScreen />
    </AdminShell>
  );
}
