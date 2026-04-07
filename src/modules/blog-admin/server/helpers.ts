import type { CategoryPayload, PostStatus } from "@/src/shared/types/blogAdmin";

import { BlogAdminApiError } from "./errors";

export type PostRow = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  source_markdown: string | null;
  status: PostStatus;
  cover_image_path: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type CategoryRow = {
  id: string;
  name: string;
  created_at: string;
};

export type PostCategoryRow = {
  post_id: string;
  category_id: string;
};

export function normalizeString(value: string | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function requiredTitle(value: string | null | undefined): string {
  const title = normalizeString(value);
  if (!title) {
    throw new BlogAdminApiError("Dados inválidos para salvar post.", 422, {
      title: "Título é obrigatório.",
    });
  }
  return title;
}

export function requiredCategoryName(payload: CategoryPayload): string {
  const name = normalizeString(payload.name);
  if (!name) {
    throw new BlogAdminApiError("Dados inválidos para categoria.", 422, {
      name: "Nome da categoria é obrigatório.",
    });
  }
  return name;
}

export function nonEmptyUnique(values: string[] | undefined): string[] | undefined {
  if (!values) {
    return undefined;
  }
  const cleaned = values.map((value) => value.trim()).filter((value) => value.length > 0);
  return Array.from(new Set(cleaned));
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeFilenamePart(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extensionFromFilename(fileName: string): string {
  const sanitized = sanitizeFilenamePart(fileName.toLowerCase());
  const extension = sanitized.includes(".") ? sanitized.split(".").pop() : "";
  if (!extension) {
    return "jpg";
  }
  if (extension.length > 8) {
    return "jpg";
  }
  return extension;
}

export function isDuplicateKeyError(error: { code?: string } | null): boolean {
  return Boolean(error?.code === "23505");
}

