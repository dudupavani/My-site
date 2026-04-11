import type { ValidationErrorMap } from "@/src/shared/types/blogAdmin";

export class BlogAdminApiError extends Error {
  readonly status: number;
  readonly errors?: ValidationErrorMap;

  constructor(message: string, status = 500, errors?: ValidationErrorMap) {
    super(message);
    this.name = "BlogAdminApiError";
    this.status = status;
    this.errors = errors;
  }
}

