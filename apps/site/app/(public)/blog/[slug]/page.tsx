import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPublishedPostBySlug } from "@/src/modules/blog/server/queries";
import { BlogPostPage } from "@/src/modules/blog/ui/BlogPostPage";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Post não encontrado | Eduardo Pavani" };
  }

  const ogImage = post.coverImageUrl ?? "https://eduardopavani.com.br/images/img-profile-2.webp";

  return {
    title: `${post.seoTitle ?? post.title} | Eduardo Pavani`,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://eduardopavani.com.br/blog/${post.slug}`,
      title: post.seoTitle ?? post.title,
      description: post.excerpt ?? undefined,
      images: [ogImage],
      publishedTime: post.publishedAt ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.excerpt ?? undefined,
      images: [ogImage],
    },
  };
}

export default async function BlogPostRoute({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPage post={post} />;
}
