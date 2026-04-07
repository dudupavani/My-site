import Link from "next/link";

import type { BlogPostDetail } from "@/src/modules/blog/domain/post";
import { formatDate } from "@/src/shared/utils/format";

type BlogPostPageProps = {
  post: BlogPostDetail;
};

export function BlogPostPage({ post }: BlogPostPageProps) {
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
        <article>
          <div className="pb-8 sm:pb-12 lg:pb-16">
            {/* Header */}
            <header className="mb-6 sm:mb-10 space-y-6">
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-light leading-tight tracking-tight text-white">
                {post.title}
              </h1>
              {post.publishedAt ? (
                <p className="mt-3 text-sm text-zinc-500">
                  Publicado em {formatDate(post.publishedAt)}
                </p>
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
