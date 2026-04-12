import type { ReactNode } from "react";

import "./public-theme.css";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <div className="public-theme">{children}</div>;
}
