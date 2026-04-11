import type { ReactNode } from "react";
import Link from "next/link";

import "./public-theme.css";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-theme">
      <header className="border-b border-zinc-800 bg-zinc-900/95 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <p className="text-sm font-medium tracking-wide text-zinc-200">Eduardo Pavani</p>
          <nav aria-label="Navegação principal" className="flex items-center gap-5 text-sm text-zinc-300">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/blog" className="transition-colors hover:text-white">
              Blog
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
