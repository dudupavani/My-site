import type { ReactNode } from "react";
import Link from "next/link";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
};

export function LegalPageLayout({
  eyebrow,
  title,
  summary,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500">
            <img src="/images/symbol-white.svg" alt="" className="h-8 w-auto" />
            <span className="text-sm font-medium tracking-wide text-zinc-200">Eduardo Pavani</span>
          </Link>
          <Link href="/" className="text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500">
            Voltar ao site
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
        <div className="h-fit border-l-2 border-gold-600 pl-5 lg:sticky lg:top-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-500">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-light leading-tight tracking-[-0.04em] text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-sm text-base leading-7 text-zinc-400">{summary}</p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-600">
            Última atualização: 25 de setembro de 2026
          </p>
        </div>

        <article className="min-w-0 max-w-3xl space-y-10">{children}</article>
      </div>

      <footer className="border-t border-zinc-800/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-500 sm:px-10">
          <span>Eduardo Pavani</span>
          <nav aria-label="Links legais" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacidade" className="transition-colors hover:text-zinc-200">Privacidade</Link>
            <Link href="/termos" className="transition-colors hover:text-zinc-200">Termos</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
