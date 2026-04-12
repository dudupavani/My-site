import type { ReactNode } from "react";

import { PublicHeader } from "@/src/shared/ui/PublicHeader";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicHeader variant="blog" />
      {children}
    </>
  );
}
