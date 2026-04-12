import { AdminShell } from "@/src/modules/blog-admin/ui/AdminShell";
import { CategoriesAdminScreen } from "@/src/modules/blog-admin/ui/CategoriesAdminScreen";
import { requireAdminPageAccess } from "@/src/shared/server/adminAuth";

export default async function AdminCategoriesPage() {
  await requireAdminPageAccess();
  return (
    <AdminShell>
      <CategoriesAdminScreen />
    </AdminShell>
  );
}
