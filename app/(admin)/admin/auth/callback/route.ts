import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { isAllowedAdminEmail } from "@/src/shared/server/adminAuth";
import { createSupabaseServerAuthClient } from "@/src/shared/server/supabaseAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function loginRedirect(request: Request, errorCode?: string): NextResponse {
  const url = new URL("/admin", request.url);
  if (errorCode) {
    url.searchParams.set("error", errorCode);
  }
  return NextResponse.redirect(url);
}

function successRedirect(request: Request): NextResponse {
  return NextResponse.redirect(new URL("/admin/posts", request.url));
}

function parseOtpType(rawType: string | null): EmailOtpType | null {
  if (!rawType) return null;

  const allowedTypes: EmailOtpType[] = ["magiclink", "email"];

  return allowedTypes.includes(rawType as EmailOtpType)
    ? (rawType as EmailOtpType)
    : null;
}

export async function GET(request: Request) {
  const supabase = await createSupabaseServerAuthClient();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const otpType = parseOtpType(url.searchParams.get("type"));

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return loginRedirect(request, "magic_link_invalid");
    }
  } else if (tokenHash && otpType) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: otpType,
    });
    if (error) {
      return loginRedirect(request, "magic_link_invalid");
    }
  } else {
    return loginRedirect(request, "magic_link_invalid");
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user || !isAllowedAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    return loginRedirect(request, "magic_link_invalid");
  }

  return successRedirect(request);
}
