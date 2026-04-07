"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  BlogAdminHttpError,
  createCategoryByName,
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
  PostStatus,
  ValidationErrorMap,
} from "@/src/shared/types/blogAdmin";
import { slugify } from "@/src/shared/utils/slug";
import { CoverImageCropper } from "./CoverImageCropper";
import { Badge } from "./components/badge";
import { RichTextEditor } from "./RichTextEditor";
import { Button } from "./components/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";
import { Input } from "./components/input";
import { Label } from "./components/label";
import { Textarea } from "./components/textarea";

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
  if (error instanceof BlogAdminHttpError)
    return { message: error.message, errors: error.errors };
  if (error instanceof Error) return { message: error.message };
  return { message: "Falha inesperada no formulário de post." };
}

export function PostEditorScreen({ postId }: PostEditorScreenProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [postStatus, setPostStatus] = useState<PostStatus | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrorMap>(
    {},
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [resolvedPostId, setResolvedPostId] = useState<string | null>(
    postId ?? null,
  );
  const [form, setForm] = useState<FormState>(EMPTY_FORM_STATE);

  const isCreateMode = !resolvedPostId;
  const titleLabel = isCreateMode ? "Novo post" : "Editar post";
  const selectedCategoryIds = useMemo(
    () => new Set(form.category_ids),
    [form.category_ids],
  );

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

        if (cancelled) return;

        setCategories(allCategories);

        if (post) {
          setForm(formStateFromPost(post));
          setPostStatus(post.status);
          setSlugTouched(true);
        } else {
          setForm(EMPTY_FORM_STATE);
          setPostStatus(null);
          setSlugTouched(false);
        }
      } catch (loadError) {
        if (cancelled) return;
        setError(normalizeError(loadError).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadData();
    return () => {
      cancelled = true;
    };
  }, [postId]);

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
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
      if (currentIds.has(categoryId)) currentIds.delete(categoryId);
      else currentIds.add(categoryId);
      return { ...prev, category_ids: Array.from(currentIds) };
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
    if (saving || publishing) return;
    setSaving(true);
    setError(null);
    setValidationErrors({});
    setSuccessMessage(null);
    try {
      const savedPost = await persistDraft();
      setForm(formStateFromPost(savedPost));
      setPostStatus(savedPost.status);
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
    if (saving || publishing) return;
    setPublishing(true);
    setError(null);
    setValidationErrors({});
    setSuccessMessage(null);
    try {
      const draft = await persistDraft();
      const publishedPost = await publishPost(
        draft.id,
        postPayloadFromForm(formStateFromPost(draft)),
      );
      setForm(formStateFromPost(publishedPost));
      setPostStatus(publishedPost.status);
      setResolvedPostId(publishedPost.id);
      if (publishedPost.status === "published") {
        toast.success("Post publicado com sucesso.");
      } else {
        toast.error(
          "Salvo, mas status não alterado para publicado. Verifique os campos obrigatórios.",
        );
      }
    } catch (publishError) {
      const normalized = normalizeError(publishError);
      toast.error(normalized.message);
      setValidationErrors(normalized.errors ?? {});
    } finally {
      setPublishing(false);
    }
  }

  async function handleCreateCategory(event: React.FormEvent) {
    event.preventDefault();
    const name = newCategoryName.trim();
    if (!name || creatingCategory) return;

    setCreatingCategory(true);
    try {
      const created = await createCategoryByName(name);
      setCategories((prev) =>
        [...prev, created].sort((a, b) => a.name.localeCompare(b.name)),
      );
      setForm((prev) => ({ ...prev, category_ids: [...prev.category_ids, created.id] }));
      setNewCategoryName("");
    } catch {
      // silently ignore — user can retry
    } finally {
      setCreatingCategory(false);
    }
  }

  async function handleCoverUpload(croppedFile: File): Promise<string | null> {
    if (!resolvedPostId) throw new Error("Salve o post antes de enviar capa.");
    const uploaded = await uploadPostCover(resolvedPostId, croppedFile);
    setForm((prev) => ({ ...prev, cover_image_url: uploaded.cover_image_url }));
    setSuccessMessage("Capa atualizada.");
    return uploaded.cover_image_url;
  }

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <CardTitle>{titleLabel}</CardTitle>
          {postStatus !== null && (
            <Badge variant={postStatus === "published" ? "default" : "secondary"}>
              {postStatus === "published" ? "Publicado" : "Draft"}
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/posts">← Lista</Link>
        </Button>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">
            Carregando formulário...
          </p>
        ) : (
          <div className="space-y-5">
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

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
              {/* Main column */}
              <div className="space-y-5">
                <div className="flex flex-col gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(event) =>
                        handleTitleChange(event.target.value)
                      }
                      aria-invalid={!!validationErrors.title}
                    />
                    {validationErrors.title ? (
                      <p className="text-xs text-destructive">
                        {validationErrors.title}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={(event) => {
                        setSlugTouched(true);
                        updateField("slug", slugify(event.target.value));
                      }}
                      aria-invalid={!!validationErrors.slug}
                    />
                    {validationErrors.slug ? (
                      <p className="text-xs text-destructive">
                        {validationErrors.slug}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Conteúdo</Label>
                  <RichTextEditor
                    value={form.content}
                    onChange={(nextValue) => updateField("content", nextValue)}
                  />
                  {validationErrors.content ? (
                    <p className="text-xs text-destructive">
                      {validationErrors.content}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="source_markdown">
                    Source Markdown (opcional)
                  </Label>
                  <Textarea
                    id="source_markdown"
                    rows={6}
                    value={form.source_markdown}
                    onChange={(event) =>
                      updateField("source_markdown", event.target.value)
                    }
                    placeholder="Use este campo apenas para conteúdo vindo de automação."
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-3">
                <div className="space-y-3 rounded-xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">SEO</p>
                  <div className="space-y-1.5">
                    <Label htmlFor="seo_title">SEO Title</Label>
                    <Input
                      id="seo_title"
                      value={form.seo_title}
                      onChange={(event) =>
                        updateField("seo_title", event.target.value)
                      }
                      aria-invalid={!!validationErrors.seo_title}
                    />
                    {validationErrors.seo_title ? (
                      <p className="text-xs text-destructive">
                        {validationErrors.seo_title}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="seo_description">SEO Description</Label>
                    <Textarea
                      id="seo_description"
                      rows={4}
                      value={form.seo_description}
                      onChange={(event) =>
                        updateField("seo_description", event.target.value)
                      }
                      aria-invalid={!!validationErrors.seo_description}
                    />
                    {validationErrors.seo_description ? (
                      <p className="text-xs text-destructive">
                        {validationErrors.seo_description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Categorias</p>

                  {categories.length > 0 && (
                    <div className="grid gap-2">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategoryIds.has(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="accent-primary"
                          />
                          <span>{category.name}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  <form onSubmit={handleCreateCategory} className="flex gap-2">
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Nova categoria..."
                      className="h-7 text-xs"
                    />
                    <Button
                      type="submit"
                      size="xs"
                      disabled={creatingCategory || !newCategoryName.trim()}
                      className="shrink-0"
                    >
                      {creatingCategory ? "..." : "Criar"}
                    </Button>
                  </form>

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

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5">
              <Button
                variant="outline"
                size="lg"
                onClick={() => void handleSaveDraft()}
                disabled={saving || publishing}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
              <Button
                size="lg"
                onClick={() => void handlePublish()}
                disabled={saving || publishing}>
                {publishing ? "Publicando..." : "Publicar"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
