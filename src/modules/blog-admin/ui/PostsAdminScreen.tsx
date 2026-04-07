"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { deletePostById, fetchPosts } from "@/src/shared/api/blogAdmin";
import type { PostListItem } from "@/src/shared/types/blogAdmin";
import { formatDateTime } from "@/src/shared/utils/format";
import { Badge } from "./components/badge";
import { Button } from "./components/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";
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
      const message =
        error instanceof Error ? error.message : "Falha ao carregar posts.";
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }

  useEffect(() => {
    void loadPosts();
  }, []);

  async function handleDelete(postId: string) {
    if (!window.confirm("Excluir este post permanentemente?")) return;

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

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-3">
        <div>
          <CardTitle>Posts</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button size="lg" asChild>
            <Link href="/admin/posts/new">Criar Post</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {state.error ? (
          <p className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Slug</TableHead>
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
                  <TableCell className="text-muted-foreground">
                    {post.slug}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(post.updated_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="xs" asChild>
                        <Link href={`/admin/posts/${post.id}`}>Editar</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="xs"
                        onClick={() => void handleDelete(post.id)}
                        disabled={state.deletingPostId === post.id}>
                        {state.deletingPostId === post.id
                          ? "Excluindo..."
                          : "Excluir"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
