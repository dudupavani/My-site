"use client";

import { type FormEvent, useEffect, useState } from "react";

import {
  createCategoryByName,
  deleteCategoryById,
  fetchCategories,
  updateCategoryById,
} from "@/src/shared/api/blogAdmin";
import type { BlogCategory } from "@/src/shared/types/blogAdmin";
import { Button, Input } from "@/src/shared/ui";

type CategoriesState = {
  loading: boolean;
  creating: boolean;
  editingId: string | null;
  deletingId: string | null;
  error: string | null;
  categories: BlogCategory[];
};

const INITIAL_STATE: CategoriesState = {
  loading: true,
  creating: false,
  editingId: null,
  deletingId: null,
  error: null,
  categories: [],
};

export function CategoriesAdminScreen() {
  const [state, setState] = useState<CategoriesState>(INITIAL_STATE);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingNameById, setEditingNameById] = useState<
    Record<string, string>
  >({});

  async function loadCategories() {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const categories = await fetchCategories();
      setState((prev) => ({ ...prev, loading: false, categories }));
      setEditingNameById(
        Object.fromEntries(
          categories.map((category) => [category.id, category.name]),
        ),
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Falha ao carregar categorias.";
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }

  useEffect(() => {
    void loadCategories();
  }, []);

  async function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = newCategoryName.trim();
    if (!normalized || state.creating) return;

    setState((prev) => ({ ...prev, creating: true, error: null }));
    try {
      const createdCategory = await createCategoryByName(normalized);
      setState((prev) => ({
        ...prev,
        creating: false,
        categories: [...prev.categories, createdCategory].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      }));
      setEditingNameById((prev) => ({
        ...prev,
        [createdCategory.id]: createdCategory.name,
      }));
      setNewCategoryName("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao criar categoria.";
      setState((prev) => ({ ...prev, creating: false, error: message }));
    }
  }

  async function handleEditCategory(categoryId: string) {
    const updatedName = editingNameById[categoryId]?.trim() ?? "";
    if (!updatedName || state.editingId) return;

    setState((prev) => ({ ...prev, editingId: categoryId, error: null }));
    try {
      const updatedCategory = await updateCategoryById(categoryId, updatedName);
      setState((prev) => ({
        ...prev,
        editingId: null,
        categories: prev.categories
          .map((category) =>
            category.id === categoryId ? updatedCategory : category,
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      }));
      setEditingNameById((prev) => ({
        ...prev,
        [categoryId]: updatedCategory.name,
      }));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Falha ao atualizar categoria.";
      setState((prev) => ({ ...prev, editingId: null, error: message }));
    }
  }

  async function handleDeleteCategory(categoryId: string) {
    if (
      !window.confirm(
        "Excluir categoria? Essa ação também remove o vínculo com posts.",
      )
    )
      return;

    setState((prev) => ({ ...prev, deletingId: categoryId, error: null }));
    try {
      await deleteCategoryById(categoryId);
      setState((prev) => ({
        ...prev,
        deletingId: null,
        categories: prev.categories.filter(
          (category) => category.id !== categoryId,
        ),
      }));
      setEditingNameById((prev) => {
        const next = { ...prev };
        delete next[categoryId];
        return next;
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao excluir categoria.";
      setState((prev) => ({ ...prev, deletingId: null, error: message }));
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <header className="flex flex-col gap-1.5 p-4 lg:p-5">
        <h2 className="text-xl font-semibold tracking-[-0.01em] text-foreground">
          Categorias
        </h2>
      </header>

      <section className="space-y-6 p-4 pt-0 lg:p-5 lg:pt-0">
        {state.error ? (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        ) : null}

        <form
          onSubmit={handleCreateCategory}
          className="flex flex-col gap-2 md:flex-row">
          <Input
            type="text"
            size="lg"
            value={newCategoryName}
            onChange={(event) => setNewCategoryName(event.target.value)}
            placeholder="Nome da nova categoria"
          />
          <Button type="submit" disabled={state.creating} size="lg">
            {state.creating ? "Salvando..." : "Criar"}
          </Button>
        </form>

        {state.loading ? (
          <p className="text-sm text-muted-foreground">
            Carregando categorias...
          </p>
        ) : state.categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma categoria criada.
          </p>
        ) : (
          <div className="space-y-6 md:space-y-2">
            {state.categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 md:flex-row md:items-center">
                <Input
                  type="text"
                  value={editingNameById[category.id] ?? ""}
                  onChange={(event) =>
                    setEditingNameById((prev) => ({
                      ...prev,
                      [category.id]: event.target.value,
                    }))
                  }
                />
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => void handleEditCategory(category.id)}
                    disabled={state.editingId === category.id}>
                    {state.editingId === category.id ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => void handleDeleteCategory(category.id)}
                    disabled={state.deletingId === category.id}>
                    {state.deletingId === category.id
                      ? "Excluindo..."
                      : "Excluir"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
