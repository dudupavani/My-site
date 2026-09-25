import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import { createGoogleSearchConsoleAuthorizationUrl } from "@/src/shared/server/googleSearchConsole";
import { toErrorResponse } from "@/src/shared/server/blogAdminHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_COOKIE = "gsc_oauth_state";
const CALLBACK_PATH = "/api/admin/search-console/callback";

export async function GET(request: Request) {
  try {
    await enforceAdminAccess(request);

    const state = randomBytes(32).toString("hex");
    const response = NextResponse.redirect(createGoogleSearchConsoleAuthorizationUrl(state));
    response.cookies.set(STATE_COOKIE, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 10 * 60,
      path: CALLBACK_PATH,
    });
    return response;
  } catch (error) {
    return toErrorResponse(error);
  }
}
