"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  deletePostById,
  fetchPosts,
} from "@/src/shared/api/blogAdmin";
import type { PostListItem } from "@/src/shared/types/blogAdmin";
import { formatDateTime } from "@/src/shared/utils/format";

type ScreenState = {
  loading: boolean;
  deletingPostId: string | null;
  error: string | null;
  posts: PostListItem[];
};

const INITIAL_STATE: ScreenState = {
  loading: true,
  deletingPostId: null,
  error: null,
  posts: [],
};

export function PostsAdminScreen() {
  const [state, setState] = useState<ScreenState>(INITIAL_STATE);

  async function loadPosts() {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const posts = await fetchPosts();
      setState((prev) => ({ ...prev, posts, loading: false }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao carregar posts.";
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }

  useEffect(() => {
    void loadPosts();
  }, []);

  async function handleDelete(postId: string) {
    if (!window.confirm("Excluir este post permanentemente?")) {
      return;
    }

    setState((prev) => ({ ...prev, deletingPostId: postId, error: null }));
    try {
      await deletePostById(postId);
      setState((prev) => ({
        ...prev,
        deletingPostId: null,
        posts: prev.posts.filter((post) => post.id !== postId),
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao excluir post.";
      setState((prev) => ({ ...prev, deletingPostId: null, error: message }));
    }
  }

  return (
    <section className="rounded-[1.15rem] border border-border bg-card p-4 shadow-lg lg:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Posts
          </p>
          <h2 className="text-xl font-semibold text-foreground">Gestão de artigos</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void loadPosts()}
            className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
          >
            Atualizar
          </button>
          <Link
            href="/admin/posts/new"
            className="rounded-xl border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Criar Post
          </Link>
        </div>
      </div>

      {state.error ? (
        <p className="mb-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      {state.loading ? (
        <p className="text-sm text-muted-foreground">Carregando posts...</p>
      ) : state.posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhum post cadastrado ainda. Use "Criar Post" para começar.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <th className="px-2 py-2 font-semibold">Título</th>
                <th className="px-2 py-2 font-semibold">Status</th>
                <th className="px-2 py-2 font-semibold">Slug</th>
                <th className="px-2 py-2 font-semibold">Atualizado</th>
                <th className="px-2 py-2 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {state.posts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-none">
                  <td className="px-2 py-3">
                    <Link href={`/admin/posts/${post.id}`} className="font-medium text-foreground hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-2 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                        post.status === "published"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-muted-foreground">{post.slug}</td>
                  <td className="px-2 py-3 text-muted-foreground">{formatDateTime(post.updated_at)}</td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => void handleDelete(post.id)}
                        disabled={state.deletingPostId === post.id}
                        className="rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs font-semibold text-destructive disabled:opacity-60"
                      >
                        {state.deletingPostId === post.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
