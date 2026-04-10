import type { PostPayload } from "@/src/shared/types/blogAdmin";
import {
  deletePost,
  getPostById,
  updateDraftPost,
} from "@/src/shared/server/blogAdmin";
import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import {
  readJsonBody,
  responseJson,
  toErrorResponse,
} from "@/src/shared/server/blogAdminHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    await enforceAdminAccess(request);
    const { postId } = await context.params;
    const post = await getPostById(postId);
    return responseJson({ post });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    await enforceAdminAccess(request);
    const { postId } = await context.params;
    const payload = await readJsonBody<PostPayload>(request);
    const post = await updateDraftPost(postId, payload);
    return responseJson({ post });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    await enforceAdminAccess(request);
    const { postId } = await context.params;
    await deletePost(postId);
    return responseJson({ ok: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
