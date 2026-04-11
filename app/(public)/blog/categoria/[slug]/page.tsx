import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getPublicCategoryBySlug,
  listPublishedCategorySlugs,
} from "@/src/modules/blog/server/queries";
import { BlogCategoryPage } from "@/src/modules/blog/ui/BlogCategoryPage";

export const revalidate = 3600;
const BASE_URL = "https://eduardopavani.com.br";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const slugs = await listPublishedCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);
  const category = await getPublicCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Categoria não encontrada | Blog | Eduardo Pavani",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath =
    pageNumber > 1
      ? `/blog/categoria/${category.slug}?page=${pageNumber}`
      : `/blog/categoria/${category.slug}`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return {
    title: `Categoria: ${category.name} | Blog | Eduardo Pavani`,
    description: `Posts sobre ${category.name} no blog de Eduardo Pavani.`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `Categoria: ${category.name} | Blog | Eduardo Pavani`,
      description: `Posts sobre ${category.name} no blog de Eduardo Pavani.`,
    },
  };
}

export default async function BlogCategoryRoute({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);
  const category = await getPublicCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <BlogCategoryPage category={category} page={pageNumber} />;
}
