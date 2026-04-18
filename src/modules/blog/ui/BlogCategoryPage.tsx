import Link from "next/link";
import { notFound } from "next/navigation";

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

  if (page > 1 && totalPages > 0 && page > totalPages) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-900 text-white pb-30 px-6">
      <main className="mx-auto max-w-7xl pt-24 sm:pt-40">
        <div className="mb-12 space-y-2">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
            {category.name}
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-stone-500">
            Nenhum post publicado nesta categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
    <article className="group flex h-full flex-col rounded-2xl border border-stone-700 bg-stone-800">
      <div className="flex flex-1 flex-col gap-4 px-4 sm:px-6 pb-4 pt-6 sm:pt-8">
        <h2 className="text-lg sm:text-xl md:text-2xl text-white line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-white">
            {post.title}
          </Link>
        </h2>
        {post.publishedAt ? (
          <time dateTime={post.publishedAt} className="text-xs text-white/60">
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
      className="mt-12 flex items-center justify-between border-t border-stone-800 pt-8"
      aria-label="Paginação da categoria">
      <div>
        {prev ? (
          <Link
            href={prev === 1 ? basePath : `${basePath}?page=${prev}`}
            className="text-sm text-stone-400 transition-colors hover:text-white">
            ← Mais recentes
          </Link>
        ) : (
          <span />
        )}
      </div>

      <span className="text-xs text-stone-600">
        {currentPage} / {totalPages}
      </span>

      <div>
        {next ? (
          <Link
            href={`${basePath}?page=${next}`}
            className="text-sm text-stone-400 transition-colors hover:text-white">
            Mais antigos →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
