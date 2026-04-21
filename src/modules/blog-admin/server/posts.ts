import { randomUUID } from "node:crypto";

import type {
  BlogCategory,
  BlogPost,
  PostListItem,
  PostPayload,
  PostStatus,
} from "@/src/shared/types/blogAdmin";
import {
  getBlogCoverBucketName,
  getSignedUrlTtlSeconds,
  getSupabaseAdminClient,
} from "@/src/shared/server/supabase";
import { slugify } from "@/src/shared/utils/slug";

import { BlogAdminApiError } from "./errors";
import {
  CategoryRow,
  PostCategoryRow,
  PostRow,
  extensionFromFilename,
  isDuplicateKeyError,
  nonEmptyUnique,
  normalizeString,
  requiredTitle,
  stripHtml,
} from "./helpers";

async function createSignedCoverUrl(path: string | null): Promise<string | null> {
  if (!path) {
    return null;
  }

  const supabase = getSupabaseAdminClient();
  const bucket = getBlogCoverBucketName();
  const ttlSeconds = getSignedUrlTtlSeconds();

  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, ttlSeconds);
  if (error || !data?.signedUrl) {
    return null;
  }
  return data.signedUrl;
}

async function resolveUniqueSlug(baseInput: string, postId?: string): Promise<string> {
  const baseSlug = slugify(baseInput);
  if (!baseSlug) {
    throw new BlogAdminApiError("Dados inválidos para salvar post.", 422, {
      slug: "Slug inválido.",
    });
  }

  const supabase = getSupabaseAdminClient();

  for (let index = 0; index < 200; index += 1) {
    const candidate = index === 0 ? baseSlug : `${baseSlug}-${index + 1}`;
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle<{ id: string }>();

    if (error) {
      throw new BlogAdminApiError("Falha ao validar slug.", 500);
    }

    if (!data || data.id === postId) {
      return candidate;
    }
  }

  throw new BlogAdminApiError("Não foi possível gerar um slug único.", 422, {
    slug: "Slug indisponível. Tente um valor diferente.",
  });
}

async function assertCategoriesExist(categoryIds: string[]): Promise<void> {
  if (categoryIds.length === 0) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from("categories").select("id").in("id", categoryIds);
  if (error) {
    throw new BlogAdminApiError("Falha ao validar categorias.", 500);
  }

  const found = new Set((data ?? []).map((row) => row.id));
  const missing = categoryIds.filter((id) => !found.has(id));
  if (missing.length > 0) {
    throw new BlogAdminApiError("Dados inválidos para salvar post.", 422, {
      category_ids: "Uma ou mais categorias selecionadas não existem.",
    });
  }
}

async function syncPostCategories(postId: string, categoryIds: string[] | undefined): Promise<void> {
  if (!categoryIds) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  await assertCategoriesExist(categoryIds);

  const { error: deleteError } = await supabase.from("post_categories").delete().eq("post_id", postId);
  if (deleteError) {
    throw new BlogAdminApiError("Falha ao atualizar categorias do post.", 500);
  }

  if (categoryIds.length === 0) {
    return;
  }

  const relationRows: PostCategoryRow[] = categoryIds.map((categoryId) => ({
    post_id: postId,
    category_id: categoryId,
  }));

  const { error: insertError } = await supabase.from("post_categories").insert(relationRows);
  if (insertError) {
    throw new BlogAdminApiError("Falha ao atualizar categorias do post.", 500);
  }
}

async function getPostRowById(postId: string): Promise<PostRow> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", postId).maybeSingle<PostRow>();

  if (error) {
    throw new BlogAdminApiError("Falha ao buscar post.", 500);
  }
  if (!data) {
    throw new BlogAdminApiError("Post não encontrado.", 404);
  }

  return data;
}

async function listCategoriesByPostId(postId: string): Promise<BlogCategory[]> {
  const supabase = getSupabaseAdminClient();
  const { data: postCategories, error: relationError } = await supabase
    .from("post_categories")
    .select("category_id")
    .eq("post_id", postId)
    .returns<Array<{ category_id: string }>>();

  if (relationError) {
    throw new BlogAdminApiError("Falha ao buscar categorias do post.", 500);
  }

  const categoryIds = Array.from(new Set((postCategories ?? []).map((row) => row.category_id)));
  if (categoryIds.length === 0) {
    return [];
  }

  const { data: categories, error: categoryError } = await supabase
    .from("categories")
    .select("id,name,created_at")
    .in("id", categoryIds)
    .order("name", { ascending: true })
    .returns<CategoryRow[]>();

  if (categoryError) {
    throw new BlogAdminApiError("Falha ao buscar categorias do post.", 500);
  }

  return (categories ?? []).map((category) => ({
    id: category.id,
    name: category.name,
    created_at: category.created_at,
  }));
}

async function mapPostToDetail(row: PostRow): Promise<BlogPost> {
  const [coverUrl, categories] = await Promise.all([
    createSignedCoverUrl(row.cover_image_path),
    listCategoriesByPostId(row.id),
  ]);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    source_markdown: row.source_markdown,
    status: row.status,
    cover_image_path: row.cover_image_path,
    cover_image_url: coverUrl,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    created_at: row.created_at,
    updated_at: row.updated_at,
    published_at: row.published_at,
    categories,
  };
}

export async function listPosts(): Promise<PostListItem[]> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,slug,status,updated_at,cover_image_path,is_featured")
    .order("updated_at", { ascending: false })
    .returns<Array<Pick<PostRow, "id" | "title" | "slug" | "status" | "updated_at" | "cover_image_path" | "is_featured">>>();

  if (error) {
    throw new BlogAdminApiError("Falha ao listar posts.", 500);
  }

  const rows = data ?? [];
  const signedUrls = await Promise.all(rows.map((row) => createSignedCoverUrl(row.cover_image_path)));

  return rows.map((row, index) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    updated_at: row.updated_at,
    cover_image_path: row.cover_image_path,
    cover_image_url: signedUrls[index],
    is_featured: row.is_featured,
  }));
}

export async function setPostFeatured(postId: string, featured: boolean): Promise<void> {
  const supabase = getSupabaseAdminClient();

  if (featured) {
    const { error: clearError } = await supabase
      .from("posts")
      .update({ is_featured: false })
      .eq("is_featured", true);
    if (clearError) {
      throw new BlogAdminApiError(`Falha ao limpar destaque: ${clearError.message}`, 500);
    }
  }

  const { error } = await supabase
    .from("posts")
    .update({ is_featured: featured })
    .eq("id", postId);
  if (error) {
    throw new BlogAdminApiError(`Falha ao atualizar destaque: ${error.message}`, 500);
  }
}

export async function createDraftPost(payload: PostPayload): Promise<BlogPost> {
  const title = requiredTitle(payload.title);
  const resolvedSlug = await resolveUniqueSlug(payload.slug ?? title);

  const categoryIds = nonEmptyUnique(payload.category_ids);
  if (categoryIds) {
    await assertCategoriesExist(categoryIds);
  }

  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      slug: resolvedSlug,
      content: normalizeString(payload.content),
      source_markdown: normalizeString(payload.source_markdown),
      status: "draft",
      seo_title: normalizeString(payload.seo_title),
      seo_description: normalizeString(payload.seo_description),
    })
    .select("*")
    .single<PostRow>();

  if (error) {
    if (isDuplicateKeyError(error)) {
      throw new BlogAdminApiError("Slug já existe.", 422, {
        slug: "Slug já existe. Escolha outro valor.",
      });
    }
    throw new BlogAdminApiError("Falha ao criar post.", 500);
  }

  if (categoryIds) {
    await syncPostCategories(data.id, categoryIds);
  }

  return mapPostToDetail(await getPostRowById(data.id));
}

export async function getPostById(postId: string): Promise<BlogPost> {
  return mapPostToDetail(await getPostRowById(postId));
}

type PostMutationMode = "draft" | "publish";

async function mutatePost(
  postId: string,
  payload: PostPayload,
  mode: PostMutationMode,
): Promise<BlogPost> {
  const current = await getPostRowById(postId);

  const title = payload.title !== undefined ? requiredTitle(payload.title) : current.title;
  const requestedSlug = payload.slug !== undefined ? payload.slug : current.slug;
  const resolvedSlug = await resolveUniqueSlug(requestedSlug || title, postId);

  const content = payload.content !== undefined ? normalizeString(payload.content) : current.content;
  const sourceMarkdown =
    payload.source_markdown !== undefined ? normalizeString(payload.source_markdown) : current.source_markdown;
  const seoTitle = payload.seo_title !== undefined ? normalizeString(payload.seo_title) : current.seo_title;
  const seoDescription =
    payload.seo_description !== undefined ? normalizeString(payload.seo_description) : current.seo_description;

  if (mode === "publish") {
    if (!content || stripHtml(content).length === 0) {
      throw new BlogAdminApiError("Dados inválidos para publicar post.", 422, {
        content: "Conteúdo é obrigatório para publicar.",
      });
    }
  }

  const categoryIds = nonEmptyUnique(payload.category_ids);
  const supabase = getSupabaseAdminClient();
  const nextStatus: PostStatus = mode === "publish" ? "published" : current.status;
  const publishedAt =
    mode === "publish" ? current.published_at ?? new Date().toISOString() : current.published_at;

  const { data: updatedRows, error } = await supabase
    .from("posts")
    .update({
      title,
      slug: resolvedSlug,
      content,
      source_markdown: sourceMarkdown,
      seo_title: seoTitle,
      seo_description: seoDescription,
      status: nextStatus,
      published_at: publishedAt,
    })
    .eq("id", postId)
    .select("id, status")
    .returns<Array<{ id: string; status: PostStatus }>>();

  if (error) {
    if (isDuplicateKeyError(error)) {
      throw new BlogAdminApiError("Slug já existe.", 422, {
        slug: "Slug já existe. Escolha outro valor.",
      });
    }
    throw new BlogAdminApiError("Falha ao salvar post.", 500);
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new BlogAdminApiError("Falha ao salvar post: nenhuma linha atualizada.", 500);
  }

  if (mode === "publish" && updatedRows[0].status !== "published") {
    throw new BlogAdminApiError("Falha ao publicar post: status não foi atualizado.", 500);
  }

  await syncPostCategories(postId, categoryIds);
  return mapPostToDetail(await getPostRowById(postId));
}

export async function updateDraftPost(postId: string, payload: PostPayload): Promise<BlogPost> {
  return mutatePost(postId, payload, "draft");
}

export async function publishPost(postId: string, payload: PostPayload): Promise<BlogPost> {
  return mutatePost(postId, payload, "publish");
}

export async function deletePost(postId: string): Promise<void> {
  const current = await getPostRowById(postId);
  const supabase = getSupabaseAdminClient();

  const { error: deleteError } = await supabase.from("posts").delete().eq("id", postId);
  if (deleteError) {
    throw new BlogAdminApiError("Falha ao excluir post.", 500);
  }

  if (!current.cover_image_path) {
    return;
  }

  await supabase.storage.from(getBlogCoverBucketName()).remove([current.cover_image_path]);
}

export async function uploadPostCover(
  postId: string,
  fileBuffer: ArrayBuffer,
  contentType: string,
  fileName: string,
): Promise<{ cover_image_path: string; cover_image_url: string | null }> {
  const current = await getPostRowById(postId);
  const buffer = Buffer.from(fileBuffer);
  const extension = extensionFromFilename(fileName);
  const objectPath = `posts/${postId}/${Date.now()}-${randomUUID()}.${extension}`;
  const supabase = getSupabaseAdminClient();
  const bucket = getBlogCoverBucketName();

  const { error: uploadError } = await supabase.storage.from(bucket).upload(objectPath, buffer, {
    contentType,
    upsert: false,
  });

  if (uploadError) {
    throw new BlogAdminApiError("Falha ao enviar imagem de capa.", 500);
  }

  const { error: updateError } = await supabase
    .from("posts")
    .update({ cover_image_path: objectPath })
    .eq("id", postId);
  if (updateError) {
    throw new BlogAdminApiError("Falha ao vincular capa ao post.", 500);
  }

  if (current.cover_image_path) {
    await supabase.storage.from(bucket).remove([current.cover_image_path]);
  }

  return {
    cover_image_path: objectPath,
    cover_image_url: await createSignedCoverUrl(objectPath),
  };
}
