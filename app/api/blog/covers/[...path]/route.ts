import { getBlogCoverBucketName, getSupabaseAdminClient } from "@/src/shared/server/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

function resolveObjectPath(segments: string[] | undefined): string | null {
  if (!segments || segments.length === 0) {
    return null;
  }

  try {
    const decoded = segments.map((segment) => decodeURIComponent(segment));
    const path = decoded.join("/").trim();
    if (!path || path.includes("..")) {
      return null;
    }
    return path;
  } catch {
    return null;
  }
}

export async function GET(_request: Request, context: RouteContext): Promise<Response> {
  const { path: segments } = await context.params;
  const objectPath = resolveObjectPath(segments);

  if (!objectPath) {
    return new Response("Not Found", { status: 404 });
  }

  const supabase = getSupabaseAdminClient();
  const bucket = getBlogCoverBucketName();

  const { data, error } = await supabase.storage.from(bucket).download(objectPath);
  if (error || !data) {
    return new Response("Not Found", { status: 404 });
  }

  const body = await data.arrayBuffer();

  return new Response(body, {
    headers: {
      "Content-Type": data.type || "application/octet-stream",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
