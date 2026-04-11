import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-900 px-6 text-center text-white">
      <h1 className="text-3xl font-semibold">Página não encontrada</h1>
      <p className="max-w-xl text-zinc-400">
        O conteúdo que você tentou acessar não existe ou foi movido.
      </p>
      <div className="flex items-center gap-4">
        <Link href="/" className="rounded-md border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-500">
          Ir para a home
        </Link>
        <Link
          href="/blog"
          className="rounded-md border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-500">
          Ir para o blog
        </Link>
      </div>
    </div>
  );
}
