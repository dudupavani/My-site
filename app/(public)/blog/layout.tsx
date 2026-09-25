import type { ReactNode } from "react";
import { Lexend } from "next/font/google";

import { PublicHeader } from "@/src/shared/ui/PublicHeader";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className={lexend.variable}>
      <PublicHeader variant="blog" />
      {children}
    </div>
  );
}
