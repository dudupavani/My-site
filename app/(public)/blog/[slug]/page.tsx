import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getPublishedPostBySlug,
  listPublishedPostSlugs,
  listRelatedPublishedPosts,
} from "@/src/modules/blog/server/queries";
import { BlogPostPage } from "@/src/modules/blog/ui/BlogPostPage";

export const revalidate = 3600;
const BASE_URL = "https://eduardopavani.com";
const PUBLISHER_LOGO_URL = `${BASE_URL}/images/favicon.svg`;

function getPostDescription(post: {
  seoDescription: string | null;
  contentHtml: string;
}) {
  if (post.seoDescription?.trim()) {
    return post.seoDescription.trim();
  }

  const textContent = post.contentHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return textContent.slice(0, 160) || "Artigo publicado no blog de Eduardo Pavani.";
}

function getWordCountFromHtml(contentHtml: string): number {
  const text = contentHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return 0;

  return text.split(" ").length;
}

export async function generateStaticParams() {
  const slugs = await listPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Post não encontrado | Eduardo Pavani" };
  }

  const ogImage = post.coverImageUrl
    ? new URL(post.coverImageUrl, BASE_URL).toString()
    : `${BASE_URL}/blog/${post.slug}/opengraph-image`;
  const description = getPostDescription(post);

  return {
    title: `${post.seoTitle ?? post.title} | Eduardo Pavani`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/blog/${post.slug}`,
      title: post.seoTitle ?? post.title,
      description,
      siteName: "Eduardo Pavani",
      locale: "pt_BR",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.seoTitle ?? post.title,
        },
      ],
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? post.publishedAt ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description,
      creator: "@eduardopavanipro",
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

  const relatedPosts = await listRelatedPublishedPosts({
    postId: post.id,
    categoryIds: post.categories.map((category) => category.id),
    limit: 3,
  });

  const postUrl = `${BASE_URL}/blog/${post.slug}`;
  const postCoverImage = post.coverImageUrl
    ? new URL(post.coverImageUrl, BASE_URL).toString()
    : `${BASE_URL}/blog/${post.slug}/opengraph-image`;
  const description = getPostDescription(post);
  const wordCount = getWordCountFromHtml(post.contentHtml);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle ?? post.title,
    description,
    author: {
      "@type": "Person",
      name: "Eduardo Pavani",
      url: `${BASE_URL}/`,
    },
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    publisher: {
      "@type": "Organization",
      name: "Eduardo Pavani",
      logo: {
        "@type": "ImageObject",
        url: PUBLISHER_LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    image: [postCoverImage],
    url: postUrl,
    wordCount,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.seoTitle ?? post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
