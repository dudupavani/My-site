import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/src/shared/ui";
type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-10xl flex-col gap-6 py-6 px-0 sm:px-4 lg:px-6">
      <header>
        <div className="flex flex-1 flex-col sm:flex-row items-center px-6 sm:px-0 justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold whitespace-nowrap text-foreground">
              Blog Admin Panel
            </h1>
          </div>
          <div className="flex w-full justify-between">
            <nav className="flex justify-start flex-wrap items-center gap-2">
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
        </div>
      </header>

      {children}
    </main>
  );
}
