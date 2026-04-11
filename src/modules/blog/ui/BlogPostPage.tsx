import Link from "next/link";

import type { BlogPostDetail, BlogRelatedPost } from "@/src/modules/blog/domain/post";
import { formatDate } from "@/src/shared/utils/format";

type BlogPostPageProps = {
  post: BlogPostDetail;
  relatedPosts: BlogRelatedPost[];
};

export function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-zinc-800 text-white">
      <header className="pt-8 pb-4">
        <div className="mx-auto flex max-w-5xl px-4 sm:px-6 items-center justify-between">
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
            ← Todos os posts
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-zinc-400">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-white">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="truncate text-zinc-300" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        <article>
          <div className="pb-8 sm:pb-12 lg:pb-16">
            {/* Header */}
            <header className="mb-6 sm:mb-10 space-y-6">
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-light leading-tight tracking-tight text-white">
                {post.title}
              </h1>
              {post.publishedAt ? (
                <time dateTime={post.publishedAt} className="mt-3 text-sm text-zinc-500">
                  Publicado em {formatDate(post.publishedAt)}
                </time>
              ) : null}
            </header>

            {/* Cover image */}
            {post.coverImageUrl ? (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="aspect-[2/1] w-full object-cover"
                />
              </div>
            ) : null}
          </div>

          {/* Content */}
          <div
            className="prose-blog max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {relatedPosts.length > 0 ? (
            <aside className="mx-auto mt-12 max-w-3xl border-t border-zinc-700 pt-8">
              <h2 className="text-xl font-medium text-white">Posts relacionados</h2>
              <ul className="mt-4 space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.id} className="space-y-1">
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="text-zinc-200 transition-colors hover:text-white">
                      {relatedPost.title}
                    </Link>
                    {relatedPost.publishedAt ? (
                      <time dateTime={relatedPost.publishedAt} className="block text-xs text-zinc-500">
                        {formatDate(relatedPost.publishedAt)}
                      </time>
                    ) : null}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </article>

        <footer className="mt-16 border-t border-zinc-800 pt-8">
          <Link
            href="/blog"
            className="text-sm text-zinc-400 transition-colors hover:text-white">
            ← Ver todos os posts
          </Link>
        </footer>
      </main>
    </div>
  );
}
