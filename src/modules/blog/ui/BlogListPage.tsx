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
    <div className="min-h-screen bg-zinc-800 text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.svg"
              alt="Eduardo Pavani"
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 transition-colors hover:text-white">
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-medium tracking-tight text-white">
            Conteúdos
          </h1>
          <p className="mt-3 text-lg text-zinc-500">
            Estratégia, produto e reflexões sobre construção de software.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-zinc-500">Nenhum post publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 divide-y divide-zinc-800">
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
    <article className="group">
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col h-full bg-zinc-900 border border-zinc-700 rounded-2xl">
        <div className="justify-between flex flex-1 flex-col gap-4 px-6 pt-8 pb-4">
          <h2 className="text-2xl text-white line-clamp-2 transition-colors group-hover:text-blue-400">
            {post.title}
          </h2>
          {post.publishedAt ? (
            <p className="text-xs text-zinc-500">
              {formatDate(post.publishedAt)}
            </p>
          ) : null}
        </div>

        {post.coverImageUrl ? (
          <div className="p-2">
            <div className="overflow-hidden rounded-xl">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        ) : null}
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
      aria-label="Paginação">
      <div>
        {prev ? (
          <Link
            href={prev === 1 ? "/blog" : `/blog?page=${prev}`}
            className="text-sm text-zinc-400 transition-colors hover:text-white">
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
            className="text-sm text-zinc-400 transition-colors hover:text-white">
            Mais antigos →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
