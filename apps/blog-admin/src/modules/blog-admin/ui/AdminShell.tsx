import Link from "next/link";
import type { ReactNode } from "react";

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
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/posts"
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
            >
              Posts
            </Link>
            <Link
              href="/admin/categories"
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
            >
              Categorias
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground"
            >
              Voltar ao hub
            </Link>
          </div>
        </div>
      </header>

      {children}
    </main>
  );
}

