import { imageSize } from "image-size";

import { BlogAdminApiError, uploadPostCover } from "@/src/shared/server/blogAdmin";
import { enforceAdminAccess } from "@/src/shared/server/adminAuth";
import { responseJson, toErrorResponse } from "@/src/shared/server/blogAdminHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXPECTED_RATIO = 2;
const RATIO_TOLERANCE = 0.02;

function validateRatio(fileBytes: ArrayBuffer): void {
  const dimensions = imageSize(Buffer.from(fileBytes));
  const width = dimensions.width;
  const height = dimensions.height;

  if (!width || !height) {
    throw new BlogAdminApiError("Não foi possível identificar as dimensões da imagem.", 422, {
      cover_image: "Imagem inválida.",
    });
  }

  const ratio = width / height;
  if (Math.abs(ratio - EXPECTED_RATIO) > RATIO_TOLERANCE) {
    throw new BlogAdminApiError("A imagem deve estar no formato 2:1.", 422, {
      cover_image: "A capa precisa ter proporção 2:1.",
    });
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    await enforceAdminAccess(request);
    const { postId } = await context.params;
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new BlogAdminApiError("Arquivo de capa não enviado.", 422, {
        cover_image: "Selecione um arquivo de imagem.",
      });
    }
    if (!file.type.startsWith("image/")) {
      throw new BlogAdminApiError("Tipo de arquivo inválido.", 422, {
        cover_image: "Apenas imagens são aceitas.",
      });
    }

    const fileBytes = await file.arrayBuffer();
    validateRatio(fileBytes);

    const uploadedCover = await uploadPostCover(postId, fileBytes, file.type, file.name);
    return responseJson(uploadedCover, 201);
  } catch (error) {
    return toErrorResponse(error);
  }
}
