"use client";

import Cropper, { type Area } from "react-easy-crop";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/ui";

type CoverImageCropperProps = {
  currentCoverUrl: string | null;
  hasPendingUpload?: boolean;
  disabled?: boolean;
  onApply: (croppedFile: File, previewUrl: string) => void | Promise<void>;
};

const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 600;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Não foi possível carregar a imagem."));
    image.src = src;
  });
}

async function cropToTwoByOne(
  imageSrc: string,
  cropArea: Area,
): Promise<Blob> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_WIDTH;
  canvas.height = OUTPUT_HEIGHT;
  const context = canvas.getContext("2d");

  if (!context) throw new Error("Não foi possível preparar o crop da imagem.");

  context.clearRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
  context.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    OUTPUT_WIDTH,
    OUTPUT_HEIGHT,
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.9),
  );
  if (!blob) throw new Error("Não foi possível gerar a imagem recortada.");

  return blob;
}

export function CoverImageCropper({
  currentCoverUrl,
  hasPendingUpload = false,
  disabled,
  onApply,
}: CoverImageCropperProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const [sourceFilename, setSourceFilename] = useState("capa.jpg");
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
    null,
  );
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentCoverUrl);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
      setLocalPreviewUrl(null);
    }
    setPreviewUrl(currentCoverUrl);
  }, [currentCoverUrl]);

  useEffect(() => {
    return () => {
      if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
    };
  }, [localPreviewUrl]);

  const handleCropComplete = useCallback(
    (_: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );

  function clearSelectedSource() {
    setSourceDataUrl(null);
    setSourceFilename("capa.jpg");
    setIsCropModalOpen(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleFileChange(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Apenas arquivos de imagem são aceitos.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSourceDataUrl(
        typeof reader.result === "string" ? reader.result : null,
      );
      setSourceFilename(file.name || "capa.jpg");
      setIsCropModalOpen(true);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setError(null);
    };
    reader.onerror = () => setError("Falha ao ler a imagem selecionada.");
    reader.readAsDataURL(file);
  }

  async function handleApply() {
    if (!sourceDataUrl || !croppedAreaPixels || applying || disabled) return;

    setApplying(true);
    setError(null);
    try {
      const croppedBlob = await cropToTwoByOne(sourceDataUrl, croppedAreaPixels);
      const file = new File(
        [croppedBlob],
        `${sourceFilename.replace(/\.[^.]+$/, "") || "capa"}-2x1.jpg`,
        { type: "image/jpeg" },
      );
      const nextPreviewUrl = URL.createObjectURL(file);
      if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
      setLocalPreviewUrl(nextPreviewUrl);
      setPreviewUrl(nextPreviewUrl);
      await onApply(file, nextPreviewUrl);
      clearSelectedSource();
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Falha ao aplicar o crop da capa.";
      setError(message);
    } finally {
      setApplying(false);
    }
  }

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2">
        <span className="text-lg text-foreground">Capa</span>
      </div>

      <label className="block cursor-pointer">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled={disabled || applying}
          onChange={(event) => handleFileChange(event.target.files)}
          className="w-full rounded-lg border border-border bg-background px-1 py-1 text-xs text-foreground file:mr-3 file:rounded file:border-0 file:bg-primary file:px-2 file:py-1 file:text-sm file:font-medium file:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </label>

      <Dialog
        open={isCropModalOpen}
        onOpenChange={(open) => {
          if (!open && !applying) clearSelectedSource();
        }}>
        <DialogContent className="max-w-4xl p-0 sm:max-w-4xl">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>Recortar capa</DialogTitle>
            <DialogDescription>
              Ajuste o enquadramento no formato 2:1.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 p-4 pt-2">
            <div className="relative h-[50vh] min-h-[300px] overflow-hidden rounded-lg border border-border bg-black">
              {sourceDataUrl ? (
                <Cropper
                  image={sourceDataUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={2 / 1}
                  minZoom={1}
                  maxZoom={3}
                  zoomSpeed={0.15}
                  cropShape="rect"
                  showGrid
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onZoomChange={setZoom}
                />
              ) : null}
            </div>

            <label className="space-y-1 text-xs text-muted-foreground">
              Zoom
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="mt-1 w-full accent-primary"
              />
            </label>
          </div>

          <DialogFooter className="mt-0">
            <Button
              variant="outline"
              onClick={clearSelectedSource}
              disabled={applying}>
              Cancelar
            </Button>
            <Button
              onClick={() => void handleApply()}
              disabled={applying || disabled || !sourceDataUrl || !croppedAreaPixels}>
              {applying ? "Aplicando..." : "Aplicar crop"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {previewUrl ? (
        <div className="space-y-1">
          <div className="overflow-hidden rounded-lg border border-border">
            <img
              src={previewUrl}
              alt="Capa atual"
              className="aspect-[2/1] w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      {hasPendingUpload ? (
        <p className="text-xs text-success">Capa pronta.</p>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
