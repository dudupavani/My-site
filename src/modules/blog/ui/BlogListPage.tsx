import Link from "next/link";

import type { BlogPostSummary } from "@/src/modules/blog/domain/post";
import { listPublishedPosts } from "@/src/modules/blog/server/queries";
import { formatDate } from "@/src/shared/utils/format";

type Props = {
  page?: number;
};

export async function BlogListPage({ page = 1 }: Props) {
  const { posts, totalPages, currentPage } = await listPublishedPosts({ page });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.svg" alt="Eduardo Pavani" className="h-8 w-auto" />
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white">Blog</h1>
          <p className="mt-3 text-lg text-zinc-400">
            Estratégia, produto e reflexões sobre construção de software.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-zinc-500">Nenhum post publicado ainda.</p>
        ) : (
          <div className="divide-y divide-zinc-800">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </main>
    </div>
  );
}

function PostCard({ post }: { post: BlogPostSummary }) {
  return (
    <article className="group py-8 first:pt-0">
      <Link href={`/blog/${post.slug}`} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {post.coverImageUrl ? (
          <div className="shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-56">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:w-56"
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col justify-center gap-2">
          <h2 className="text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
            {post.title}
          </h2>

          {post.excerpt ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
              {post.excerpt}
            </p>
          ) : null}

          {post.publishedAt ? (
            <p className="text-xs text-zinc-600">
              {formatDate(post.publishedAt)}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-8"
      aria-label="Paginação"
    >
      <div>
        {prev ? (
          <Link
            href={prev === 1 ? "/blog" : `/blog?page=${prev}`}
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            ← Mais recentes
          </Link>
        ) : (
          <span />
        )}
      </div>

      <span className="text-xs text-zinc-600">
        {currentPage} / {totalPages}
      </span>

      <div>
        {next ? (
          <Link
            href={`/blog?page=${next}`}
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Mais antigos →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
