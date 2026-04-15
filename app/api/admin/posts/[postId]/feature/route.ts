import { setPostFeatured } from "@/src/shared/server/blogAdmin";
import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import { readJsonBody, responseJson, toErrorResponse } from "@/src/shared/server/blogAdminHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FeaturePayload = { featured: boolean };

export async function PATCH(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    await enforceAdminAccess(request);
    const { postId } = await context.params;
    const { featured } = await readJsonBody<FeaturePayload>(request);
    await setPostFeatured(postId, Boolean(featured));
    return responseJson({ ok: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
