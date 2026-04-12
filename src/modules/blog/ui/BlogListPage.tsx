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
    <div className="min-h-screen bg-zinc-900 text-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-6 pt-30 sm:pt-30 lg:pt-40 pb-16">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-4xl font-extralight tracking-tight text-zinc-500">
            Conteúdos
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-zinc-500">Nenhum post publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y divide-zinc-800">
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
    <article className="group flex h-full flex-col rounded-2xl border border-zinc-700/50 bg-zinc-800/60">
      <div className="flex flex-1 flex-col gap-4 px-6 pb-4 pt-6 sm:pt-8">
        <h2 className="text-lg sm:text-xl md:text-2xl text-zinc-300 line-clamp-2 transition-colors group-hover:text-white">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-white">
            {post.title}
          </Link>
        </h2>
        {post.publishedAt ? (
          <time dateTime={post.publishedAt} className="text-xs text-zinc-500">
            {formatDate(post.publishedAt)}
          </time>
        ) : null}

        {post.categories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/categoria/${category.slug}`}
                className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
                {category.name}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {post.coverImageUrl ? (
        <div className="p-4">
          <Link
            href={`/blog/${post.slug}`}
            className="block overflow-hidden rounded-xl">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="h-auto w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
      ) : null}
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
