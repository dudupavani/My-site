import Link from "next/link";

import type {
  BlogPostDetail,
  BlogRelatedPost,
} from "@/src/modules/blog/domain/post";
import { formatDate } from "@/src/shared/utils/format";

type BlogPostPageProps = {
  post: BlogPostDetail;
  relatedPosts: BlogRelatedPost[];
};

export function BlogPostPage({ post, relatedPosts }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <main className="mx-auto max-w-5xl px-4 sm:px-10 md:px-16 lg:px-6 pt-24 sm:pt-32 pb-16">
        <nav aria-label="Breadcrumb" className="mb-12 sm:mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
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
            <li className="truncate text-zinc-500" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        <article>
          <div className="pb-6 sm:pb-12 lg:pb-16">
            {/* Header */}
            <header className="mb-6 sm:mb-10 space-y-3 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-white">
                {post.title}
              </h1>
              {post.publishedAt ? (
                <time
                  dateTime={post.publishedAt}
                  className="mt-3 text-sm text-zinc-500">
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
                  className="aspect-2/1 w-full object-cover"
                />
              </div>
            ) : null}
          </div>

          {/* Content */}
          <div
            className="prose-blog max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {post.categories.length > 0 ? (
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap gap-2">
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

          {relatedPosts.length > 0 ? (
            <aside className="mx-auto mt-16 lg:mt-20 max-w-3xl">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 space-y-4 items-stretch">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.id} className="h-full">
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="group flex flex-col gap-2 justify-between bg-zinc-700/50 hover:bg-zinc-700  border border-transparent rounded-lg p-4 h-full transition-colors ">
                      <h2 className="line-clamp-2 text-zinc-300 transition-colors group-hover:text-white">
                        {relatedPost.title}
                      </h2>

                      {relatedPost.publishedAt ? (
                        <time
                          dateTime={relatedPost.publishedAt}
                          className="block text-xs text-zinc-500">
                          {formatDate(relatedPost.publishedAt)}
                        </time>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </article>

        <footer className="flex items-center justify-center mt-10 pt-8 ">
          <Link
            href="/blog"
            className=" text-zinc-400 transition-colors hover:text-white!">
            Ver todos os posts
          </Link>
        </footer>
      </main>
    </div>
  );
}
