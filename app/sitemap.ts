import type { MetadataRoute } from "next";

import { listPublicCategories } from "@/src/modules/blog/server/queries";
import { getSupabaseAdminClient } from "@/src/shared/server/supabase";

const BASE_URL = "https://eduardopavani.com.br";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getSupabaseAdminClient();

  const { data } = await supabase
    .from("posts")
    .select("slug, updated_at, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .returns<Array<{ slug: string; updated_at: string | null; published_at: string | null }>>();

  const posts: MetadataRoute.Sitemap = (data ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ?? post.published_at ?? undefined,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const categories = await listPublicCategories();
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/blog/categoria/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...categoryUrls,
    ...posts,
  ];
}
