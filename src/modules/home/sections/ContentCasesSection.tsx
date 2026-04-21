import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getFeaturedPost } from "@/src/modules/blog/server/queries";

async function FeaturedPostCard() {
  const post = await getFeaturedPost();
  if (!post) return null;

  return (
    <Link href={`/blog/${post.slug}`} className="mt-auto flex items-center gap-4 rounded-2xl p-4 border border-zinc-700/40 hover:border-zinc-500/60 transition-colors">
      {post.coverImageUrl ? (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="max-w-50 h-auto rounded-md shrink-0 object-cover"
        />
      ) : (
        <div className="h-24 w-24 shrink-0 bg-zinc-700" />
      )}
      <p className="px-4 pr-2 text-sm lg:text-base text-zinc-200 leading-[1.7] line-clamp-2">
        {post.title}
      </p>
    </Link>
  );
}

export function ContentCasesSection() {
  return (
    <section className="bg-zinc-950 text-white py-32 px-6">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 flex flex-col gap-8 rounded-3xl border border-zinc-800/60 bg-zinc-900/60 p-8 lg:p-10 min-h-72">
          <Link href="/blog" className="group flex items-start justify-between">
            <div>
              <h2 className="text-2xl lg:text-3xl font-medium">Conteúdos</h2>
              <p className="mt-2 text-base sm:text-lg text-zinc-500">
                Conhecimento, conceitos e ideias
              </p>
            </div>
            <ArrowUpRight className="w-7 h-7 text-zinc-600 group-hover:text-zinc-300 group-hover:animate-pulse transition-colors shrink-0" />
          </Link>

          <Suspense fallback={null}>
            <FeaturedPostCard />
          </Suspense>
        </div>

        <Link
          href="/cases"
          className="group flex flex-col justify-between rounded-3xl border border-zinc-800/60 bg-zinc-900/60 p-8 lg:p-10 min-h-72 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-start justify-between">
            <h2 className="text-2xl lg:text-3xl font-medium">Cases</h2>
            <ArrowUpRight className="w-7 h-7 text-zinc-600 group-hover:text-zinc-300 group-hover:animate-pulse transition-colors shrink-0" />
          </div>
          <p className="text-base sm:text-lg text-zinc-500">
            Projetos que transformei problemas e oportunidades em resultados
          </p>
        </Link>
      </div>
    </section>
  );
}
