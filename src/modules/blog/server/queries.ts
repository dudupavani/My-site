import type { BlogPostDetail, BlogPostSummary } from "@/src/modules/blog/domain/post";
import {
  getBlogCoverBucketName,
  getSignedUrlTtlSeconds,
  getSupabaseAdminClient,
} from "@/src/shared/server/supabase";

async function createSignedCoverUrl(path: string | null): Promise<string | null> {
  if (!path) return null;

  const supabase = getSupabaseAdminClient();
  const bucket = getBlogCoverBucketName();
  const ttl = getSignedUrlTtlSeconds();

  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, ttl);
  if (error || !data?.signedUrl) return null;

  return data.signedUrl;
}

function stripHtmlToExcerpt(html: string | null, maxLength = 160): string | null {
  if (!html) return null;
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "…";
}

export async function listPublishedPosts(): Promise<BlogPostSummary[]> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, seo_description, content, cover_image_path, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .returns<Array<{
      id: string;
      slug: string;
      title: string;
      seo_description: string | null;
      content: string | null;
      cover_image_path: string | null;
      published_at: string | null;
    }>>();

  if (error) throw new Error("Falha ao listar posts do blog.");

  const rows = data ?? [];
  const coverUrls = await Promise.all(rows.map((row) => createSignedCoverUrl(row.cover_image_path)));

  return rows.map((row, index) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.seo_description ?? stripHtmlToExcerpt(row.content),
    coverImageUrl: coverUrls[index],
    publishedAt: row.published_at,
  }));
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const supabase = getSupabaseAdminClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("id, slug, title, content, seo_title, seo_description, cover_image_path, published_at")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle<{
      id: string;
      slug: string;
      title: string;
      content: string | null;
      seo_title: string | null;
      seo_description: string | null;
      cover_image_path: string | null;
      published_at: string | null;
    }>();

  if (error) throw new Error("Falha ao buscar post do blog.");
  if (!post) return null;

  const coverImageUrl = await createSignedCoverUrl(post.cover_image_path);

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.seo_description ?? stripHtmlToExcerpt(post.content),
    coverImageUrl,
    publishedAt: post.published_at,
    contentHtml: post.content ?? "",
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
  };
}
