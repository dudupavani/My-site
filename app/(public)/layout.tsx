import type { ReactNode } from "react";
import Link from "next/link";

import "./public-theme.css";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-theme">
      <header className="absolute top-0 left-0 z-50 w-full pr-20 sm:pr-12">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-6 py-4">
          <nav
            aria-label="Navegação principal"
            className="flex items-center gap-8 text-sm text-zinc-300">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/blog" className="transition-colors hover:text-white">
              Conteúdo
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
