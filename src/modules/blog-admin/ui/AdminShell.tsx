import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "./components/button";
import { Toaster } from "./components/sonner";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:px-6">
      <header>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
              Blog Admin Panel
            </h1>
          </div>
          <nav className="flex flex-1 justify-start flex-wrap items-center gap-2 ml-6">
            <Button variant="secondary" size="default" asChild>
              <Link href="/admin/posts">Posts</Link>
            </Button>
            <Button variant="secondary" size="default" asChild>
              <Link href="/admin/categories">Categorias</Link>
            </Button>
          </nav>
          <form action="/api/admin/auth/logout" method="post">
            <Button variant="outline" size="default" type="submit">
              Sair
            </Button>
          </form>
        </div>
      </header>

      {children}
      <Toaster />
    </main>
  );
}
