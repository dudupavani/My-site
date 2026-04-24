"use client";

import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { deletePostById, fetchPosts, setPostFeatured } from "@/src/shared/api/blogAdmin";
import type { PostListItem } from "@/src/shared/types/blogAdmin";
import { formatDateTime } from "@/src/shared/utils/format";
import { Badge } from "./components/badge";
import { Button } from "./components/button";
import { Switch } from "./components/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/table";

type ScreenState = {
  loading: boolean;
  deletingPostId: string | null;
  featuringPostId: string | null;
  error: string | null;
  posts: PostListItem[];
};

const INITIAL_STATE: ScreenState = {
  loading: true,
  deletingPostId: null,
  featuringPostId: null,
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
      const message =
        error instanceof Error ? error.message : "Falha ao carregar posts.";
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }

  useEffect(() => {
    void loadPosts();
  }, []);

  async function handleDelete(postId: string) {
    setState((prev) => ({ ...prev, deletingPostId: postId, error: null }));
    try {
      await deletePostById(postId);
      setState((prev) => ({
        ...prev,
        deletingPostId: null,
        posts: prev.posts.filter((post) => post.id !== postId),
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao excluir post.";
      setState((prev) => ({ ...prev, deletingPostId: null, error: message }));
    }
  }

  async function handleFeature(postId: string, featured: boolean) {
    setState((prev) => ({ ...prev, featuringPostId: postId, error: null }));
    try {
      await setPostFeatured(postId, featured);
      setState((prev) => ({
        ...prev,
        featuringPostId: null,
        posts: prev.posts.map((post) => ({
          ...post,
          is_featured: featured ? post.id === postId : post.id === postId ? false : post.is_featured,
        })),
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao atualizar destaque.";
      setState((prev) => ({ ...prev, featuringPostId: null, error: message }));
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <header className="flex flex-row items-center justify-between gap-3 p-4 lg:p-5">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.01em] text-foreground">
            Posts
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button size="lg" asChild>
            <Link href="/admin/posts/new">Criar Post</Link>
          </Button>
        </div>
      </header>

      <section className="p-4 pt-0 lg:p-5 lg:pt-0">
        {state.error ? (
          <p className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        ) : null}

        {state.loading ? (
          <p className="text-sm text-muted-foreground">Carregando posts...</p>
        ) : state.posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum post cadastrado ainda. Use &quot;Criar Post&quot; para começar.
          </p>
        ) : (
          <>
            {/* Mobile: cards */}
            <div className="flex flex-col gap-3 sm:hidden">
              {state.posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg border border-border bg-card p-4 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex flex-col gap-3">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="font-medium text-foreground hover:underline leading-snug">
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "secondary"
                        }>
                        {post.status === "published" ? "Publicado" : "Draft"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDateTime(post.updated_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={post.is_featured}
                        disabled={state.featuringPostId === post.id}
                        onCheckedChange={(checked) => void handleFeature(post.id, checked)}
                        aria-label={`Destacar post ${post.title}`}
                      />
                      <span className="text-xs text-muted-foreground">Destaque</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/posts/${post.id}`}>
                        <Pencil />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          disabled={state.deletingPostId === post.id}
                          aria-label={`Excluir post ${post.title}`}>
                          {state.deletingPostId === post.id ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Trash2 />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação é permanente e não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => void handleDelete(post.id)}
                            disabled={state.deletingPostId === post.id}>
                            {state.deletingPostId === post.id
                              ? "Excluindo..."
                              : "Excluir"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: tabela */}
            <Table className="hidden sm:table">
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Destaque</TableHead>
                  <TableHead>Atualizado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="font-medium text-foreground hover:underline">
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "secondary"
                        }>
                        {post.status === "published" ? "Publicado" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={post.is_featured}
                        disabled={state.featuringPostId === post.id}
                        onCheckedChange={(checked) => void handleFeature(post.id, checked)}
                        aria-label={`Destacar post ${post.title}`}
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDateTime(post.updated_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/admin/posts/${post.id}`}>
                            <Pencil />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              disabled={state.deletingPostId === post.id}
                              aria-label={`Excluir post ${post.title}`}>
                              {state.deletingPostId === post.id ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <Trash2 />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir post?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação é permanente e não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => void handleDelete(post.id)}
                                disabled={state.deletingPostId === post.id}>
                                {state.deletingPostId === post.id
                                  ? "Excluindo..."
                                  : "Excluir"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </section>
    </div>
  );
}
