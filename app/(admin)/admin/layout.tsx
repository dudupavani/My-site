import type { ReactNode } from "react";

import "@/src/modules/blog-admin/ui/admin-theme.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="admin-theme">{children}</div>;
}
