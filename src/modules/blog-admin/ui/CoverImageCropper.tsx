"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "./components/button";

type CoverImageCropperProps = {
  currentCoverUrl: string | null;
  disabled?: boolean;
  onUpload: (croppedFile: File) => Promise<string | null>;
};

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Não foi possível carregar a imagem."));
    image.src = src;
  });
}

async function cropToTwoByOne(
  imageSrc: string,
  zoom: number,
  offsetX: number,
  offsetY: number,
): Promise<Blob> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const context = canvas.getContext("2d");

  if (!context) throw new Error("Não foi possível preparar o crop da imagem.");

  const baseScale = Math.max(CANVAS_WIDTH / image.width, CANVAS_HEIGHT / image.height);
  const scale = baseScale * zoom;
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const horizontalShift = (offsetX / 100) * (CANVAS_WIDTH / 2);
  const verticalShift = (offsetY / 100) * (CANVAS_HEIGHT / 2);
  const dx = (CANVAS_WIDTH - drawWidth) / 2 + horizontalShift;
  const dy = (CANVAS_HEIGHT - drawHeight) / 2 + verticalShift;

  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.drawImage(image, dx, dy, drawWidth, drawHeight);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.9),
  );
  if (!blob) throw new Error("Não foi possível gerar a imagem recortada.");

  return blob;
}

export function CoverImageCropper({
  currentCoverUrl,
  disabled,
  onUpload,
}: CoverImageCropperProps) {
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const [sourceFilename, setSourceFilename] = useState("capa.jpg");
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentCoverUrl);

  useEffect(() => {
    setPreviewUrl(currentCoverUrl);
  }, [currentCoverUrl]);

  const hasPendingSelection = useMemo(() => Boolean(sourceDataUrl), [sourceDataUrl]);

  function handleFileChange(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Apenas arquivos de imagem são aceitos.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSourceDataUrl(typeof reader.result === "string" ? reader.result : null);
      setSourceFilename(file.name || "capa.jpg");
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
      setError(null);
    };
    reader.onerror = () => setError("Falha ao ler a imagem selecionada.");
    reader.readAsDataURL(file);
  }

  async function handleUpload() {
    if (!sourceDataUrl || uploading || disabled) return;

    setUploading(true);
    setError(null);
    try {
      const croppedBlob = await cropToTwoByOne(sourceDataUrl, zoom, offsetX, offsetY);
      const file = new File(
        [croppedBlob],
        `${sourceFilename.replace(/\.[^.]+$/, "") || "capa"}-2x1.jpg`,
        { type: "image/jpeg" },
      );
      const nextCoverUrl = await onUpload(file);
      setPreviewUrl(nextCoverUrl);
      setSourceDataUrl(null);
    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : "Falha ao enviar capa.";
      setError(message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-3">
      <p className="text-sm font-semibold text-foreground">Capa (crop 2:1)</p>

      <label className="block cursor-pointer">
        <input
          type="file"
          accept="image/*"
          disabled={disabled || uploading}
          onChange={(event) => handleFileChange(event.target.files)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-xs file:font-medium file:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </label>

      {sourceDataUrl ? (
        <div className="space-y-3">
          <div className="relative aspect-[2/1] overflow-hidden rounded-lg border border-border bg-muted">
            <img
              src={sourceDataUrl}
              alt="Prévia da capa"
              style={{ transform: `translate(${offsetX}%, ${offsetY}%) scale(${zoom})` }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {(
              [
                { label: "Zoom", min: 1, max: 3, step: 0.01, value: zoom, onChange: setZoom },
                { label: "Horizontal", min: -100, max: 100, step: 1, value: offsetX, onChange: setOffsetX },
                { label: "Vertical", min: -100, max: 100, step: 1, value: offsetY, onChange: setOffsetY },
              ] as const
            ).map(({ label, min, max, step, value, onChange }) => (
              <label key={label} className="space-y-1 text-xs text-muted-foreground">
                {label}
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(event) => onChange(Number(event.target.value))}
                  className="mt-1 w-full accent-primary"
                />
              </label>
            ))}
          </div>

          <Button
            size="sm"
            onClick={() => void handleUpload()}
            disabled={uploading || disabled}
          >
            {uploading ? "Enviando..." : "Aplicar crop 2:1 e enviar"}
          </Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Selecione uma imagem e ajuste o enquadramento antes de enviar.
        </p>
      )}

      {previewUrl ? (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Capa atual</p>
          <div className="overflow-hidden rounded-lg border border-border">
            <img src={previewUrl} alt="Capa atual" className="aspect-[2/1] w-full object-cover" />
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}

      {disabled && !hasPendingSelection ? (
        <p className="text-xs text-muted-foreground">
          Salve o post primeiro para habilitar o upload da capa.
        </p>
      ) : null}
    </div>
  );
}
