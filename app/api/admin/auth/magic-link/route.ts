import { BlogAdminApiError } from "@/src/shared/server/blogAdmin";
import {
  readJsonBody,
  responseJson,
  toErrorResponse,
} from "@/src/shared/server/blogAdminHttp";
import { readAllowedAdminEmail } from "@/src/shared/server/adminAuth";
import { createSupabaseServerAuthClient } from "@/src/shared/server/supabaseAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MagicLinkPayload = {
  email?: string;
};

function normalizeEmail(email: string | undefined): string {
  return email?.trim().toLowerCase() ?? "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const SAFE_SUCCESS_MESSAGE =
  "Se o email estiver autorizado, voce recebera um Magic Link em instantes.";

export async function POST(request: Request) {
  try {
    const payload = await readJsonBody<MagicLinkPayload>(request);
    const email = normalizeEmail(payload.email);

    if (!email || !isValidEmail(email)) {
      throw new BlogAdminApiError("Informe um email valido.", 422, {
        email: "Informe um email valido.",
      });
    }

    const allowedEmail = readAllowedAdminEmail();
    if (email !== allowedEmail) {
      return responseJson({ ok: true, message: SAFE_SUCCESS_MESSAGE });
    }

    const supabase = await createSupabaseServerAuthClient();
    const redirectTo = new URL("/admin/auth/callback", request.url).toString();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      throw new BlogAdminApiError(
        "Nao foi possivel enviar o Magic Link agora. Tente novamente em instantes.",
        400,
      );
    }

    return responseJson({ ok: true, message: SAFE_SUCCESS_MESSAGE });
  } catch (error) {
    return toErrorResponse(error);
  }
}
