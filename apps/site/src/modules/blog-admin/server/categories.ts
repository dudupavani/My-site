import type { BlogCategory, CategoryPayload } from "@/src/shared/types/blogAdmin";
import { getSupabaseAdminClient } from "@/src/shared/server/supabase";

import { BlogAdminApiError } from "./errors";
import { CategoryRow, isDuplicateKeyError, requiredCategoryName } from "./helpers";

export async function listCategories(): Promise<BlogCategory[]> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,created_at")
    .order("name", { ascending: true })
    .returns<CategoryRow[]>();

  if (error) {
    throw new BlogAdminApiError("Falha ao listar categorias.", 500);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    created_at: row.created_at,
  }));
}

export async function createCategory(payload: CategoryPayload): Promise<BlogCategory> {
  const name = requiredCategoryName(payload);
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("categories")
    .insert({ name })
    .select("id,name,created_at")
    .single<CategoryRow>();

  if (error) {
    if (isDuplicateKeyError(error)) {
      throw new BlogAdminApiError("Categoria já existe.", 422, {
        name: "Já existe uma categoria com esse nome.",
      });
    }
    throw new BlogAdminApiError("Falha ao criar categoria.", 500);
  }

  return {
    id: data.id,
    name: data.name,
    created_at: data.created_at,
  };
}

export async function updateCategory(categoryId: string, payload: CategoryPayload): Promise<BlogCategory> {
  const name = requiredCategoryName(payload);
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("categories")
    .update({ name })
    .eq("id", categoryId)
    .select("id,name,created_at")
    .maybeSingle<CategoryRow>();

  if (error) {
    if (isDuplicateKeyError(error)) {
      throw new BlogAdminApiError("Categoria já existe.", 422, {
        name: "Já existe uma categoria com esse nome.",
      });
    }
    throw new BlogAdminApiError("Falha ao atualizar categoria.", 500);
  }
  if (!data) {
    throw new BlogAdminApiError("Categoria não encontrada.", 404);
  }

  return {
    id: data.id,
    name: data.name,
    created_at: data.created_at,
  };
}

export async function deleteCategory(categoryId: string): Promise<void> {
  const supabase = getSupabaseAdminClient();

  const { data: existing, error: checkError } = await supabase
    .from("categories")
    .select("id")
    .eq("id", categoryId)
    .maybeSingle<{ id: string }>();
  if (checkError) {
    throw new BlogAdminApiError("Falha ao excluir categoria.", 500);
  }
  if (!existing) {
    throw new BlogAdminApiError("Categoria não encontrada.", 404);
  }

  const { error } = await supabase.from("categories").delete().eq("id", categoryId);
  if (error) {
    throw new BlogAdminApiError("Falha ao excluir categoria.", 500);
  }
}

