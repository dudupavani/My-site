import type { ReactNode } from "react";

import { AdminShell } from "@/src/modules/blog-admin/ui/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}

