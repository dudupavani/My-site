import type { CategoryPayload } from "@/src/shared/types/blogAdmin";
import { createCategory, listCategories } from "@/src/shared/server/blogAdmin";
import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import { readJsonBody, responseJson, toErrorResponse } from "@/src/shared/server/blogAdminHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await enforceAdminAccess(request);
    const categories = await listCategories();
    return responseJson({ categories });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await enforceAdminAccess(request);
    const payload = await readJsonBody<CategoryPayload>(request);
    const category = await createCategory(payload);
    return responseJson({ category }, 201);
  } catch (error) {
    return toErrorResponse(error);
  }
}
