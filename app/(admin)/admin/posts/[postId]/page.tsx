import { AdminShell } from "@/src/modules/blog-admin/ui/AdminShell";
import { PostEditorScreen } from "@/src/modules/blog-admin/ui/PostEditorScreen";
import { requireAdminPageAccess } from "@/src/shared/server/adminAuth";

export default async function AdminPostDetailsPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  await requireAdminPageAccess();
  const { postId } = await params;
  return (
    <AdminShell>
      <PostEditorScreen postId={postId} />
    </AdminShell>
  );
}
