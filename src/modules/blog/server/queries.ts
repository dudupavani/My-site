import sanitizeHtml from "sanitize-html";

import type { BlogCategory, BlogPostDetail, BlogPostSummary, BlogRelatedPost } from "@/src/modules/blog/domain/post";
import {
  getBlogCoverBucketName,
  getSignedUrlTtlSeconds,
  getSupabaseAdminClient,
} from "@/src/shared/server/supabase";
import { slugify } from "@/src/shared/utils/slug";

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "strong", "em", "u", "s", "sub", "sup",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a",
  "img",
  "table", "thead", "tbody", "tr", "th", "td",
  "figure", "figcaption",
  "div", "span",
];

function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      "*": ["class"],
    },
    allowedSchemes: ["https", "http", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}

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
  updated_at: string | null;
};

type CategoryRow = {
  id: string;
  name: string;
};

type PostCategoryRelationRow = {
  post_id: string;
  category_id: string;
};

export type PublishedPostsResult = {
  posts: BlogPostSummary[];
  total: number;
  totalPages: number;
  currentPage: number;
};

async function listCategoriesByPostIds(postIds: string[]): Promise<Map<string, BlogCategory[]>> {
  const byPostId = new Map<string, BlogCategory[]>();
  for (const postId of postIds) {
    byPostId.set(postId, []);
  }

  if (postIds.length === 0) {
    return byPostId;
  }

  const supabase = getSupabaseAdminClient();

  const { data: relations, error: relationError } = await supabase
    .from("post_categories")
    .select("post_id,category_id")
    .in("post_id", postIds)
    .returns<PostCategoryRelationRow[]>();

  if (relationError) {
    throw new Error("Falha ao buscar categorias do post.");
  }

  const normalizedRelations = relations ?? [];
  const categoryIds = Array.from(new Set(normalizedRelations.map((relation) => relation.category_id)));
  if (categoryIds.length === 0) {
    return byPostId;
  }

  const { data: categories, error: categoryError } = await supabase
    .from("categories")
    .select("id,name")
    .in("id", categoryIds)
    .order("name", { ascending: true })
    .returns<CategoryRow[]>();

  if (categoryError) {
    throw new Error("Falha ao buscar categorias do post.");
  }

  const categoriesById = new Map(
    (categories ?? []).map((category) => [
      category.id,
      {
        id: category.id,
        name: category.name,
        slug: slugify(category.name),
      },
    ]),
  );

  for (const relation of normalizedRelations) {
    const category = categoriesById.get(relation.category_id);
    if (!category) continue;

    const list = byPostId.get(relation.post_id);
    if (!list) continue;
    list.push(category);
  }

  for (const list of byPostId.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }

  return byPostId;
}

async function listCategoriesByPostId(postId: string): Promise<BlogCategory[]> {
  const byPostId = await listCategoriesByPostIds([postId]);
  return byPostId.get(postId) ?? [];
}

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
    .select("id, slug, title, cover_image_path, published_at, updated_at", {
      count: "exact",
    })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to)
    .returns<PostRow[]>();

  if (error) throw new Error("Falha ao listar posts do blog.");

  const rows = data ?? [];
  const [coverUrls, categoriesByPostId] = await Promise.all([
    Promise.all(rows.map((row) => createSignedCoverUrl(row.cover_image_path))),
    listCategoriesByPostIds(rows.map((row) => row.id)),
  ]);
  const total = count ?? 0;

  return {
    posts: rows.map((row, index) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      coverImageUrl: coverUrls[index],
      publishedAt: row.published_at,
      updatedAt: row.updated_at,
      categories: categoriesByPostId.get(row.id) ?? [],
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function listPublicCategories(): Promise<BlogCategory[]> {
  const supabase = getSupabaseAdminClient();
  const { data: publishedPosts, error: postsError } = await supabase
    .from("posts")
    .select("id")
    .eq("status", "published")
    .returns<Array<{ id: string }>>();

  if (postsError) {
    throw new Error("Falha ao listar categorias públicas.");
  }

  const postIds = (publishedPosts ?? []).map((post) => post.id);
  if (postIds.length === 0) {
    return [];
  }

  const { data: relations, error: relationError } = await supabase
    .from("post_categories")
    .select("post_id,category_id")
    .in("post_id", postIds)
    .returns<PostCategoryRelationRow[]>();

  if (relationError) {
    throw new Error("Falha ao listar categorias públicas.");
  }

  const categoryIds = Array.from(new Set((relations ?? []).map((relation) => relation.category_id)));
  if (categoryIds.length === 0) {
    return [];
  }

  const { data: categories, error: categoryError } = await supabase
    .from("categories")
    .select("id,name")
    .in("id", categoryIds)
    .order("name", { ascending: true })
    .returns<CategoryRow[]>();

  if (categoryError) {
    throw new Error("Falha ao listar categorias públicas.");
  }

  return (categories ?? []).map((category) => ({
    id: category.id,
    name: category.name,
    slug: slugify(category.name),
  }));
}

export async function listPublishedCategorySlugs(): Promise<string[]> {
  const categories = await listPublicCategories();
  return categories.map((category) => category.slug);
}

export async function getPublicCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const categories = await listPublicCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function listPublishedPostsByCategory(opts: {
  categoryId: string;
  page?: number;
  limit?: number;
}): Promise<PublishedPostsResult> {
  const limit = opts.limit ?? POSTS_PER_PAGE;
  const page = Math.max(1, opts.page ?? 1);
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const supabase = getSupabaseAdminClient();

  const { data: relations, error: relationError } = await supabase
    .from("post_categories")
    .select("post_id")
    .eq("category_id", opts.categoryId)
    .returns<Array<{ post_id: string }>>();

  if (relationError) {
    throw new Error("Falha ao listar posts da categoria.");
  }

  const postIds = Array.from(new Set((relations ?? []).map((relation) => relation.post_id)));
  if (postIds.length === 0) {
    return {
      posts: [],
      total: 0,
      totalPages: 0,
      currentPage: page,
    };
  }

  const { data, error, count } = await supabase
    .from("posts")
    .select("id, slug, title, cover_image_path, published_at, updated_at", {
      count: "exact",
    })
    .eq("status", "published")
    .in("id", postIds)
    .order("published_at", { ascending: false })
    .range(from, to)
    .returns<PostRow[]>();

  if (error) {
    throw new Error("Falha ao listar posts da categoria.");
  }

  const rows = data ?? [];
  const [coverUrls, categoriesByPostId] = await Promise.all([
    Promise.all(rows.map((row) => createSignedCoverUrl(row.cover_image_path))),
    listCategoriesByPostIds(rows.map((row) => row.id)),
  ]);
  const total = count ?? 0;

  return {
    posts: rows.map((row, index) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      coverImageUrl: coverUrls[index],
      publishedAt: row.published_at,
      updatedAt: row.updated_at,
      categories: categoriesByPostId.get(row.id) ?? [],
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function listPublishedPostSlugs(): Promise<string[]> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published")
    .returns<{ slug: string }[]>();

  if (error) return [];

  return (data ?? []).map((row) => row.slug);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const supabase = getSupabaseAdminClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("id, slug, title, content, seo_title, seo_description, cover_image_path, published_at, updated_at")
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
      updated_at: string | null;
    }>();

  if (error) throw new Error("Falha ao buscar post do blog.");
  if (!post) return null;

  const [coverImageUrl, categories] = await Promise.all([
    createSignedCoverUrl(post.cover_image_path),
    listCategoriesByPostId(post.id),
  ]);

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    coverImageUrl,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    contentHtml: sanitizeBlogHtml(post.content ?? ""),
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
    categories,
  };
}

export async function listRelatedPublishedPosts(opts: {
  postId: string;
  categoryIds: string[];
  limit?: number;
}): Promise<BlogRelatedPost[]> {
  const supabase = getSupabaseAdminClient();
  const limit = opts.limit ?? 3;
  const related: BlogRelatedPost[] = [];
  const seenIds = new Set<string>();

  if (opts.categoryIds.length > 0) {
    const { data: relations, error: relationError } = await supabase
      .from("post_categories")
      .select("post_id,category_id")
      .in("category_id", opts.categoryIds)
      .returns<PostCategoryRelationRow[]>();

    if (relationError) {
      throw new Error("Falha ao listar posts relacionados.");
    }

    const candidateIds = Array.from(
      new Set(
        (relations ?? [])
          .map((relation) => relation.post_id)
          .filter((postId) => postId !== opts.postId),
      ),
    );

    if (candidateIds.length > 0) {
      const { data: candidatePosts, error: candidateError } = await supabase
        .from("posts")
        .select("id,slug,title,published_at")
        .eq("status", "published")
        .in("id", candidateIds)
        .order("published_at", { ascending: false })
        .limit(limit)
        .returns<Array<Pick<PostRow, "id" | "slug" | "title" | "published_at">>>();

      if (candidateError) {
        throw new Error("Falha ao listar posts relacionados.");
      }

      for (const post of candidatePosts ?? []) {
        if (seenIds.has(post.id)) continue;
        seenIds.add(post.id);
        related.push({
          id: post.id,
          slug: post.slug,
          title: post.title,
          publishedAt: post.published_at,
        });
      }
    }
  }

  if (related.length < limit) {
    const { data: fallbackPosts, error: fallbackError } = await supabase
      .from("posts")
      .select("id,slug,title,published_at")
      .eq("status", "published")
      .neq("id", opts.postId)
      .order("published_at", { ascending: false })
      .limit(limit * 4)
      .returns<Array<Pick<PostRow, "id" | "slug" | "title" | "published_at">>>();

    if (fallbackError) {
      throw new Error("Falha ao listar posts relacionados.");
    }

    for (const post of fallbackPosts ?? []) {
      if (related.length >= limit) break;
      if (seenIds.has(post.id)) continue;
      seenIds.add(post.id);
      related.push({
        id: post.id,
        slug: post.slug,
        title: post.title,
        publishedAt: post.published_at,
      });
    }
  }

  return related.slice(0, limit);
}
