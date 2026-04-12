import { NextResponse } from "next/server";

import { createSupabaseServerAuthClient } from "@/src/shared/server/supabaseAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerAuthClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
}
