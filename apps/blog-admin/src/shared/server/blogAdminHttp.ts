import type { ValidationErrorResponse } from "@/src/shared/types/blogAdmin";

import { BlogAdminApiError } from "./blogAdmin";

export function responseJson(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });
}

export function parseJsonBody<T>(rawBody: unknown): T {
  if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
    return {} as T;
  }
  return rawBody as T;
}

export async function readJsonBody<T>(request: Request): Promise<T> {
  try {
    const rawBody = await request.json();
    return parseJsonBody<T>(rawBody);
  } catch {
    throw new BlogAdminApiError("Payload JSON inválido.", 400);
  }
}

export function toErrorResponse(error: unknown): Response {
  if (error instanceof BlogAdminApiError) {
    const payload: ValidationErrorResponse = {
      detail: error.message,
      ...(error.errors ? { errors: error.errors } : {}),
    };
    return responseJson(payload, error.status);
  }

  const payload: ValidationErrorResponse = {
    detail: "Erro interno inesperado.",
  };
  return responseJson(payload, 500);
}
