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

const POSTS_PER_PAGE = 10;

type PostRow = {
  id: string;
  slug: string;
  title: string;
  cover_image_path: string | null;
  published_at: string | null;
};

export type PublishedPostsResult = {
  posts: BlogPostSummary[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export async function listPublishedPosts(opts?: {
  page?: number;
  limit?: number;
}): Promise<PublishedPostsResult> {
  const limit = opts?.limit ?? POSTS_PER_PAGE;
  const page = Math.max(1, opts?.page ?? 1);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = getSupabaseAdminClient();

  const { data, error, count } = await supabase
    .from("posts")
    .select("id, slug, title, cover_image_path, published_at", {
      count: "exact",
    })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to)
    .returns<PostRow[]>();

  if (error) throw new Error("Falha ao listar posts do blog.");

  const rows = data ?? [];
  const coverUrls = await Promise.all(rows.map((row) => createSignedCoverUrl(row.cover_image_path)));
  const total = count ?? 0;

  return {
    posts: rows.map((row, index) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      coverImageUrl: coverUrls[index],
      publishedAt: row.published_at,
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
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
    coverImageUrl,
    publishedAt: post.published_at,
    contentHtml: post.content ?? "",
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
  };
}
