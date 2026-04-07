import Link from "next/link";

import type { BlogPostDetail } from "@/src/modules/blog/domain/post";
import { formatDate } from "@/src/shared/utils/format";

type BlogPostPageProps = {
  post: BlogPostDetail;
};

export function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.svg" alt="Eduardo Pavani" className="h-8 w-auto" />
          </Link>
          <Link
            href="/blog"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            ← Todos os posts
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <article>
          {/* Cover image */}
          {post.coverImageUrl ? (
            <div className="mb-10 overflow-hidden rounded-2xl">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="aspect-[2/1] w-full object-cover"
              />
            </div>
          ) : null}

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {post.title}
            </h1>

            {post.publishedAt ? (
              <p className="mt-3 text-sm text-zinc-500">
                Publicado em {formatDate(post.publishedAt)}
              </p>
            ) : null}

            {post.excerpt ? (
              <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-6 border-t border-zinc-800" />
          </header>

          {/* Content */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <footer className="mt-16 border-t border-zinc-800 pt-8">
          <Link
            href="/blog"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            ← Ver todos os posts
          </Link>
        </footer>
      </main>
    </div>
  );
}
