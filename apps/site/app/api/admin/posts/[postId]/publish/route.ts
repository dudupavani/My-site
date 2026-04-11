import type { PublishPayload } from "@/src/shared/types/blogAdmin";
import { publishPost } from "@/src/shared/server/blogAdmin";
import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import {
  readJsonBody,
  responseJson,
  toErrorResponse,
} from "@/src/shared/server/blogAdminHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    await enforceAdminAccess(request);
    const { postId } = await context.params;
    const payload = await readJsonBody<PublishPayload>(request);
    const post = await publishPost(postId, payload);
    return responseJson({ post });
  } catch (error) {
    return toErrorResponse(error);
  }
}
