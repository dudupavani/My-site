import type { CategoryPayload } from "@/src/shared/types/blogAdmin";
import { deleteCategory, updateCategory } from "@/src/shared/server/blogAdmin";
import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import {
  readJsonBody,
  responseJson,
  toErrorResponse,
} from "@/src/shared/server/blogAdminHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ categoryId: string }> },
) {
  try {
    await enforceAdminAccess(request);
    const { categoryId } = await context.params;
    const payload = await readJsonBody<CategoryPayload>(request);
    const category = await updateCategory(categoryId, payload);
    return responseJson({ category });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ categoryId: string }> },
) {
  try {
    await enforceAdminAccess(request);
    const { categoryId } = await context.params;
    await deleteCategory(categoryId);
    return responseJson({ ok: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
