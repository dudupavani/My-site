import { ImageResponse } from "next/og";

import { getSupabaseAdminClient } from "@/src/shared/server/supabase";

export const runtime = "nodejs";
export const revalidate = 3600;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPostTitle(slug: string): Promise<string> {
  const supabase = getSupabaseAdminClient();
  const { data } = await supabase
    .from("posts")
    .select("title,seo_title")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle<{ title: string; seo_title: string | null }>();

  if (data?.seo_title?.trim()) return data.seo_title.trim();
  if (data?.title?.trim()) return data.title.trim();
  return "Blog | Eduardo Pavani";
}

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const title = await getPostTitle(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}>
        <div
          style={{
            position: "absolute",
            inset: "-15% auto auto 60%",
            width: 460,
            height: 460,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(37,99,235,0.5) 0%, rgba(37,99,235,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "55% auto auto -8%",
            width: 420,
            height: 420,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(59,130,246,0.32) 0%, rgba(59,130,246,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 72px",
            width: "100%",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              color: "#93c5fd",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
            <span>Blog</span>
            <span style={{ color: "#60a5fa" }}>|</span>
            <span>Eduardo Pavani</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: 980,
              textWrap: "balance",
            }}>
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#a1a1aa",
            }}>
            eduardopavani.com.br/blog/{slug}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
