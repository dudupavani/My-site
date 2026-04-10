import type { PostPayload } from "@/src/shared/types/blogAdmin";
import { createDraftPost, listPosts } from "@/src/shared/server/blogAdmin";
import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import { readJsonBody, responseJson, toErrorResponse } from "@/src/shared/server/blogAdminHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await enforceAdminAccess(request);
    const posts = await listPosts();
    return responseJson({ posts });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await enforceAdminAccess(request);
    const payload = await readJsonBody<PostPayload>(request);
    const post = await createDraftPost(payload);
    return responseJson({ post }, 201);
  } catch (error) {
    return toErrorResponse(error);
  }
}
