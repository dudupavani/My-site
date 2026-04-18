import type { Metadata } from "next";

import { BlogListPage } from "@/src/modules/blog/ui/BlogListPage";

export const revalidate = 3600;
const BASE_URL = "https://eduardopavani.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/img-profile-2.webp`;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);
  const canonical = pageNumber > 1 ? `/blog?page=${pageNumber}` : "/blog";

  return {
    title: "Blog | Eduardo Pavani",
    description:
      "Artigos sobre estratégia de produto, gestão, UX e construção de software por Eduardo Pavani.",
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: `${BASE_URL}${canonical}`,
      title: "Blog | Eduardo Pavani",
      description:
        "Artigos sobre estratégia de produto, gestão, UX e construção de software.",
      siteName: "Eduardo Pavani",
      locale: "pt_BR",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Eduardo Pavani",
      description:
        "Artigos sobre estratégia de produto, gestão, UX e construção de software.",
      creator: "@eduardopavanipro",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);
  return <BlogListPage page={pageNumber} />;
}
