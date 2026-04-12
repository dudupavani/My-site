import type {
  BlogCategory,
  BlogPost,
  CategoryPayload,
  PostListItem,
  PostPayload,
  PublishPayload,
  ValidationErrorMap,
  ValidationErrorResponse,
} from "@/src/shared/types/blogAdmin";

const API_BASE_URL = "/api/admin";

export class BlogAdminHttpError extends Error {
  readonly status: number;
  readonly errors?: ValidationErrorMap;

  constructor(message: string, status: number, errors?: ValidationErrorMap) {
    super(message);
    this.name = "BlogAdminHttpError";
    this.status = status;
    this.errors = errors;
  }
}

async function parseError(response: Response): Promise<BlogAdminHttpError> {
  let payload: ValidationErrorResponse | null = null;
  try {
    payload = (await response.json()) as ValidationErrorResponse;
  } catch {
    payload = null;
  }

  return new BlogAdminHttpError(
    payload?.detail ?? "A requisição ao admin falhou.",
    response.status,
    payload?.errors,
  );
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== "undefined") {
        window.location.assign("/admin?error=session_expired");
      }
    }
    throw await parseError(response);
  }

  return (await response.json()) as T;
}

function jsonRequest(body: unknown): RequestInit {
  return {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };
}

export async function fetchPosts(): Promise<PostListItem[]> {
  const response = await requestJson<{ posts: PostListItem[] }>("/posts");
  return response.posts;
}

export async function createPostDraft(payload: PostPayload): Promise<BlogPost> {
  const response = await requestJson<{ post: BlogPost }>("/posts", jsonRequest(payload));
  return response.post;
}

export async function fetchPostById(postId: string): Promise<BlogPost> {
  const response = await requestJson<{ post: BlogPost }>(`/posts/${postId}`);
  return response.post;
}

export async function updatePostDraft(postId: string, payload: PostPayload): Promise<BlogPost> {
  const response = await requestJson<{ post: BlogPost }>(`/posts/${postId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.post;
}

export async function publishPost(postId: string, payload: PublishPayload): Promise<BlogPost> {
  const response = await requestJson<{ post: BlogPost }>(`/posts/${postId}/publish`, jsonRequest(payload));
  return response.post;
}

export async function deletePostById(postId: string): Promise<void> {
  await requestJson<{ ok: true }>(`/posts/${postId}`, { method: "DELETE" });
}

export async function uploadPostCover(postId: string, file: File): Promise<{
  cover_image_path: string;
  cover_image_url: string | null;
}> {
  const formData = new FormData();
  formData.append("file", file);

  return requestJson(`/posts/${postId}/cover`, {
    method: "POST",
    body: formData,
  });
}

export async function fetchCategories(): Promise<BlogCategory[]> {
  const response = await requestJson<{ categories: BlogCategory[] }>("/categories");
  return response.categories;
}

export async function createCategoryByName(name: string): Promise<BlogCategory> {
  const payload: CategoryPayload = { name };
  const response = await requestJson<{ category: BlogCategory }>("/categories", jsonRequest(payload));
  return response.category;
}

export async function updateCategoryById(categoryId: string, name: string): Promise<BlogCategory> {
  const payload: CategoryPayload = { name };
  const response = await requestJson<{ category: BlogCategory }>(`/categories/${categoryId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.category;
}

export async function deleteCategoryById(categoryId: string): Promise<void> {
  await requestJson<{ ok: true }>(`/categories/${categoryId}`, { method: "DELETE" });
}
