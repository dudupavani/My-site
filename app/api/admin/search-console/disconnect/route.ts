import { NextResponse } from "next/server";

import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import {
  disconnectGoogleSearchConsole,
  getGoogleSearchConsoleAdminUrl,
} from "@/src/shared/server/googleSearchConsole";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await enforceAdminAccess(request);

    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).origin !== new URL(request.url).origin) {
      return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });
    }

    await disconnectGoogleSearchConsole();
    return NextResponse.redirect(getGoogleSearchConsoleAdminUrl("disconnected"), 303);
  } catch (error) {
    const status = error instanceof Error && error.message.includes("revocation could not be confirmed")
      ? "disconnected_google_warning"
      : "disconnect_failed";
    return NextResponse.redirect(getGoogleSearchConsoleAdminUrl(status), 303);
  }
}
