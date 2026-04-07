import type { ReactNode } from "react";

import { AdminShell } from "@/src/modules/blog-admin/ui/AdminShell";
import "@/src/modules/blog-admin/ui/admin-theme.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-theme">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
