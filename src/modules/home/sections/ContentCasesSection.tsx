import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getFeaturedPost } from "@/src/modules/blog/server/queries";

async function FeaturedPostCard() {
  const post = await getFeaturedPost();
  if (!post) return null;

  return (
    <Link href={`/blog/${post.slug}`} className="mt-auto grid grid-cols-1 sm:grid-cols-12 items-center gap-4 rounded-2xl max-w-2xl p-4 border bg-zinc-950/40 border-zinc-700/40 hover:bg-zinc-800/60 transition-colors">
      {post.coverImageUrl ? (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-auto col-span-12 sm:col-span-5 rounded-md shrink-0 object-cover"
        />
      ) : (
        <div className="h-24 w-24 shrink-0 bg-zinc-700" />
      )}
      <p className="col-span-12 sm:col-span-7 px-2 sm:px-4 pr-0 sm:pr-2 text-base lg:text-lg 2xl:text-xl font-light leading-[1.7] line-clamp-3 sm:line-clamp-2">
        {post.title}
      </p>
    </Link>
  );
}

export function ContentCasesSection() {
  return (
    <section className="bg-zinc-950 text-white py-16 sm:py-24 px-6">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 h-auto lg:h-100">
        <div className="md:col-span-2 flex flex-col gap-8 rounded-3xl border border-zinc-700 px-6 pt-10 pb-6 sm:p-8 lg:p-10 h-full">
          <Link href="/blog" className="group flex items-start justify-between">
            <div>
              <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-medium">Conteúdos</h2>
              <p className="mt-2 max-w-lg text-base sm:text-lg text-zinc-400">
                Conhecimento, ideias e reflexóes sobre produto, tecnologia, inteligência artificial e negócios.
              </p>
            </div>
            <ArrowUpRight className="w-7 h-7 text-zinc-600 group-hover:text-gold-400 group-hover:animate-pulse transition-colors shrink-0" />
          </Link>

          <Suspense fallback={null}>
            <FeaturedPostCard />
          </Suspense>
        </div>

        <Link
          href="/cases"
          className="group flex flex-col justify-between rounded-3xl gap-10 border border-zinc-700 px-6 py-12 sm:p-8 lg:p-10 h-full hover:bg-zinc-900 transition-colors"
        >
          <div className="flex items-start justify-between">
            <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-medium">Cases</h2>
            <ArrowUpRight className="w-7 h-7 text-zinc-600 group-hover:text-gold-400 group-hover:animate-pulse transition-colors shrink-0" />
          </div>
          <p className="text-base sm:text-lg text-zinc-400">
            Projetos que transformei problemas e oportunidades em resultados
          </p>
        </Link>
      </div>
    </section>
  );
}
