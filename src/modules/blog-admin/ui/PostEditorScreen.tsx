"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  BlogAdminHttpError,
  createPostDraft,
  fetchCategories,
  fetchPostById,
  publishPost,
  updatePostDraft,
  uploadPostCover,
} from "@/src/shared/api/blogAdmin";
import type {
  BlogCategory,
  BlogPost,
  PostPayload,
  ValidationErrorMap,
} from "@/src/shared/types/blogAdmin";
import { slugify } from "@/src/shared/utils/slug";
import { CoverImageCropper } from "./CoverImageCropper";
import { RichTextEditor } from "./RichTextEditor";

type PostEditorScreenProps = {
  postId?: string;
};

type FormState = {
  title: string;
  slug: string;
  content: string;
  source_markdown: string;
  seo_title: string;
  seo_description: string;
  category_ids: string[];
  cover_image_url: string | null;
};

const EMPTY_FORM_STATE: FormState = {
  title: "",
  slug: "",
  content: "",
  source_markdown: "",
  seo_title: "",
  seo_description: "",
  category_ids: [],
  cover_image_url: null,
};

function formStateFromPost(post: BlogPost): FormState {
  return {
    title: post.title,
    slug: post.slug,
    content: post.content ?? "",
    source_markdown: post.source_markdown ?? "",
    seo_title: post.seo_title ?? "",
    seo_description: post.seo_description ?? "",
    category_ids: post.categories.map((category) => category.id),
    cover_image_url: post.cover_image_url,
  };
}

function postPayloadFromForm(form: FormState): PostPayload {
  return {
    title: form.title,
    slug: form.slug,
    content: form.content,
    source_markdown: form.source_markdown,
    seo_title: form.seo_title,
    seo_description: form.seo_description,
    category_ids: form.category_ids,
  };
}

function normalizeError(error: unknown): {
  message: string;
  errors?: ValidationErrorMap;
} {
  if (error instanceof BlogAdminHttpError) {
    return {
      message: error.message,
      errors: error.errors,
    };
  }
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: "Falha inesperada no formulário de post." };
}

export function PostEditorScreen({ postId }: PostEditorScreenProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrorMap>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [resolvedPostId, setResolvedPostId] = useState<string | null>(postId ?? null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM_STATE);

  const isCreateMode = !resolvedPostId;
  const titleLabel = isCreateMode ? "Novo post" : "Editar post";
  const actionHint = isCreateMode
    ? "Preencha e salve como draft ou publique diretamente."
    : "Atualize conteúdo, SEO, categorias e status.";

  const selectedCategoryIds = useMemo(() => new Set(form.category_ids), [form.category_ids]);

  useEffect(() => {
    setResolvedPostId(postId ?? null);
  }, [postId]);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);
      setValidationErrors({});
      setSuccessMessage(null);

      try {
        const [allCategories, post] = await Promise.all([
          fetchCategories(),
          postId ? fetchPostById(postId) : Promise.resolve(null),
        ]);

        if (cancelled) {
          return;
        }

        setCategories(allCategories);

        if (post) {
          setForm(formStateFromPost(post));
          setSlugTouched(true);
        } else {
          setForm(EMPTY_FORM_STATE);
          setSlugTouched(false);
        }
      } catch (loadError) {
        if (cancelled) {
          return;
        }
        const normalized = normalizeError(loadError);
        setError(normalized.message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadData();
    return () => {
      cancelled = true;
    };
  }, [postId]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(nextTitle: string) {
    setForm((prev) => ({
      ...prev,
      title: nextTitle,
      slug: slugTouched ? prev.slug : slugify(nextTitle),
    }));
  }

  function toggleCategory(categoryId: string) {
    setForm((prev) => {
      const currentIds = new Set(prev.category_ids);
      if (currentIds.has(categoryId)) {
        currentIds.delete(categoryId);
      } else {
        currentIds.add(categoryId);
      }
      return {
        ...prev,
        category_ids: Array.from(currentIds),
      };
    });
  }

  async function persistDraft(): Promise<BlogPost> {
    const payload = postPayloadFromForm(form);

    if (!resolvedPostId) {
      const createdPost = await createPostDraft(payload);
      setResolvedPostId(createdPost.id);
      router.replace(`/admin/posts/${createdPost.id}`);
      return createdPost;
    }

    return updatePostDraft(resolvedPostId, payload);
  }

  async function handleSaveDraft() {
    if (saving || publishing) {
      return;
    }

    setSaving(true);
    setError(null);
    setValidationErrors({});
    setSuccessMessage(null);

    try {
      const savedPost = await persistDraft();
      setForm(formStateFromPost(savedPost));
      setSuccessMessage("Post salvo como draft.");
    } catch (saveError) {
      const normalized = normalizeError(saveError);
      setError(normalized.message);
      setValidationErrors(normalized.errors ?? {});
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (saving || publishing) {
      return;
    }

    setPublishing(true);
    setError(null);
    setValidationErrors({});
    setSuccessMessage(null);

    try {
      const draft = await persistDraft();
      const publishedPost = await publishPost(draft.id, postPayloadFromForm(formStateFromPost(draft)));
      setForm(formStateFromPost(publishedPost));
      setResolvedPostId(publishedPost.id);
      setSuccessMessage("Post publicado com sucesso.");
    } catch (publishError) {
      const normalized = normalizeError(publishError);
      setError(normalized.message);
      setValidationErrors(normalized.errors ?? {});
    } finally {
      setPublishing(false);
    }
  }

  async function handleCoverUpload(croppedFile: File): Promise<string | null> {
    if (!resolvedPostId) {
      throw new Error("Salve o post antes de enviar capa.");
    }
    const uploaded = await uploadPostCover(resolvedPostId, croppedFile);
    setForm((prev) => ({
      ...prev,
      cover_image_url: uploaded.cover_image_url,
    }));
    setSuccessMessage("Capa atualizada.");
    return uploaded.cover_image_url;
  }

  return (
    <section className="rounded-[1.15rem] border border-border bg-card p-4 shadow-lg lg:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Posts
          </p>
          <h2 className="text-xl font-semibold text-foreground">{titleLabel}</h2>
          <p className="text-sm text-muted-foreground">{actionHint}</p>
        </div>
        <Link
          href="/admin/posts"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
        >
          Voltar para lista
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando formulário...</p>
      ) : (
        <div className="space-y-4">
          {error ? (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          {successMessage ? (
            <p className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary">
              {successMessage}
            </p>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Título *
                  </span>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-1"
                  />
                  {validationErrors.title ? (
                    <span className="text-xs text-destructive">{validationErrors.title}</span>
                  ) : null}
                </label>

                <label className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Slug *
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(event) => {
                      setSlugTouched(true);
                      updateField("slug", slugify(event.target.value));
                    }}
                    className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-1"
                  />
                  {validationErrors.slug ? (
                    <span className="text-xs text-destructive">{validationErrors.slug}</span>
                  ) : null}
                </label>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Conteúdo
                </span>
                <RichTextEditor value={form.content} onChange={(nextValue) => updateField("content", nextValue)} />
                {validationErrors.content ? (
                  <span className="text-xs text-destructive">{validationErrors.content}</span>
                ) : null}
              </div>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Source Markdown (opcional)
                </span>
                <textarea
                  rows={6}
                  value={form.source_markdown}
                  onChange={(event) => updateField("source_markdown", event.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-1"
                  placeholder="Use este campo apenas para conteúdo vindo de automação."
                />
              </label>
            </div>

            <div className="space-y-3">
              <div className="space-y-2 rounded-xl border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">SEO</p>
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">SEO Title *</span>
                  <input
                    type="text"
                    value={form.seo_title}
                    onChange={(event) => updateField("seo_title", event.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-1"
                  />
                  {validationErrors.seo_title ? (
                    <span className="text-xs text-destructive">{validationErrors.seo_title}</span>
                  ) : null}
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">SEO Description *</span>
                  <textarea
                    rows={4}
                    value={form.seo_description}
                    onChange={(event) => updateField("seo_description", event.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-1"
                  />
                  {validationErrors.seo_description ? (
                    <span className="text-xs text-destructive">{validationErrors.seo_description}</span>
                  ) : null}
                </label>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">Categorias</p>
                {categories.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Nenhuma categoria encontrada. Crie categorias em `/admin/categories`.
                  </p>
                ) : (
                  <div className="grid gap-2">
                    {categories.map((category) => (
                      <label key={category.id} className="inline-flex items-center gap-2 text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={selectedCategoryIds.has(category.id)}
                          onChange={() => toggleCategory(category.id)}
                        />
                        <span>{category.name}</span>
                      </label>
                    ))}
                  </div>
                )}
                {validationErrors.category_ids ? (
                  <p className="text-xs text-destructive">{validationErrors.category_ids}</p>
                ) : null}
              </div>

              <CoverImageCropper
                currentCoverUrl={form.cover_image_url}
                disabled={!resolvedPostId}
                onUpload={handleCoverUpload}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => void handleSaveDraft()}
              disabled={saving || publishing}
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground disabled:opacity-60"
            >
              {saving ? "Salvando..." : "Salvar Draft"}
            </button>
            <button
              type="button"
              onClick={() => void handlePublish()}
              disabled={saving || publishing}
              className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {publishing ? "Publicando..." : "Publicar"}
            </button>
            <span className="text-xs text-muted-foreground">
              Publicação exige título, conteúdo e metadados SEO.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
