import type { ReactNode } from "react";

import { AdminShell } from "@/src/modules/blog-admin/ui/AdminShell";
import "@/src/modules/blog-admin/ui/admin-theme.css";

const isUnsecuredProduction =
  process.env.NODE_ENV === "production" &&
  (process.env.BLOG_ADMIN_AUTH_MODE ?? "off") === "off";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-theme">
      {isUnsecuredProduction && (
        <div
          role="alert"
          style={{
            background: "#7f1d1d",
            color: "#fef2f2",
            padding: "10px 16px",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          ⚠️ Admin sem autenticação em produção. Configure{" "}
          <code>BLOG_ADMIN_AUTH_MODE=supabase_jwt</code> antes de publicar.
        </div>
      )}
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
