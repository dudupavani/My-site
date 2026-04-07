import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "./components/button";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:px-6">
      <header className="rounded-[1.15rem] border border-border bg-card p-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Admin
            </p>
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
              Blog Admin Panel
            </h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/posts">Posts</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/categories">Categorias</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">← Voltar ao site</Link>
            </Button>
          </nav>
        </div>
      </header>

      {children}
    </main>
  );
}
