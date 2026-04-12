import Link from "next/link";

import type {
  BlogCategory,
  BlogPostSummary,
} from "@/src/modules/blog/domain/post";
import { listPublishedPostsByCategory } from "@/src/modules/blog/server/queries";
import { formatDate } from "@/src/shared/utils/format";

type Props = {
  category: BlogCategory;
  page?: number;
};

export async function BlogCategoryPage({ category, page = 1 }: Props) {
  const { posts, totalPages, currentPage } = await listPublishedPostsByCategory(
    {
      categoryId: category.id,
      page,
    },
  );

  return (
    <div className="min-h-screen bg-zinc-800 text-white">
      <header className="px-6 pt-8 pb-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.svg"
              alt="Eduardo Pavani"
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/blog"
            className="text-sm text-zinc-400 transition-colors hover:text-white">
            ← Voltar ao blog
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 space-y-3">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            Categoria
          </p>
          <h1 className="text-3xl font-medium tracking-tight text-white">
            {category.name}
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-zinc-500">
            Nenhum post publicado nesta categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <Pagination
            categorySlug={category.slug}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        ) : null}
      </main>
    </div>
  );
}

function PostCard({ post }: { post: BlogPostSummary }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-zinc-700/50 bg-zinc-900/30">
      <div className="flex flex-1 flex-col gap-4 px-6 pb-4 pt-8">
        <h2 className="line-clamp-2 text-2xl text-zinc-300 transition-colors group-hover:text-white">
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
  categorySlug,
  currentPage,
  totalPages,
}: {
  categorySlug: string;
  currentPage: number;
  totalPages: number;
}) {
  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;
  const basePath = `/blog/categoria/${categorySlug}`;

  return (
    <nav
      className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-8"
      aria-label="Paginação da categoria">
      <div>
        {prev ? (
          <Link
            href={prev === 1 ? basePath : `${basePath}?page=${prev}`}
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
            href={`${basePath}?page=${next}`}
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
