import type { Metadata } from "next";

import { BlogListPage } from "@/src/modules/blog/ui/BlogListPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Eduardo Pavani",
  description:
    "Artigos sobre estratégia de produto, gestão, UX e construção de software por Eduardo Pavani.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "https://eduardopavani.com.br/blog",
    title: "Blog | Eduardo Pavani",
    description:
      "Artigos sobre estratégia de produto, gestão, UX e construção de software.",
  },
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);
  return <BlogListPage page={pageNumber} />;
}
