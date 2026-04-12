import { AdminShell } from "@/src/modules/blog-admin/ui/AdminShell";
import { PostEditorScreen } from "@/src/modules/blog-admin/ui/PostEditorScreen";
import { requireAdminPageAccess } from "@/src/shared/server/adminAuth";

export default async function NewAdminPostPage() {
  await requireAdminPageAccess();
  return (
    <AdminShell>
      <PostEditorScreen />
    </AdminShell>
  );
}
