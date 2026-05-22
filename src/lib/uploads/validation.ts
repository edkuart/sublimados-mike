import path from "node:path";
import { uploadConfig, type UploadValidationResult } from "./config";

export function validateUploadFile(file: File): UploadValidationResult {
  if (file.size <= 0) {
    return { valid: false, message: "El archivo esta vacio." };
  }

  if (file.size > uploadConfig.maxFileSizeBytes) {
    return { valid: false, message: "El archivo supera el limite de 10 MB." };
  }

  if (!uploadConfig.allowedMimeTypes.includes(file.type)) {
    return { valid: false, message: "Tipo de archivo no permitido." };
  }

  const extension = path.extname(file.name).toLowerCase();

  if (!uploadConfig.allowedExtensions.includes(extension)) {
    return { valid: false, message: "Extension de archivo no permitida." };
  }

  const sanitized = sanitizeOriginalFileName(file.name);

  if (!sanitized || sanitized === "." || sanitized === "..") {
    return { valid: false, message: "Nombre de archivo no permitido." };
  }

  return { valid: true, extension };
}

export async function validateUploadSignature(file: File, extension: string) {
  const bytes = new Uint8Array(await file.slice(0, 512).arrayBuffer());

  if (extension === ".pdf") {
    return startsWith(bytes, [0x25, 0x50, 0x44, 0x46])
      ? null
      : "El archivo PDF no parece valido.";
  }

  if (extension === ".png") {
    return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      ? null
      : "La imagen PNG no parece valida.";
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return startsWith(bytes, [0xff, 0xd8, 0xff])
      ? null
      : "La imagen JPG no parece valida.";
  }

  if (extension === ".webp") {
    const header = new TextDecoder().decode(bytes.slice(0, 12));
    return header.startsWith("RIFF") && header.includes("WEBP")
      ? null
      : "La imagen WEBP no parece valida.";
  }

  if (extension === ".svg") {
    const text = new TextDecoder().decode(bytes).toLowerCase();

    if (text.includes("<script") || text.includes("javascript:")) {
      return "El SVG contiene contenido no permitido.";
    }

    return text.includes("<svg") ? null : "El SVG no parece valido.";
  }

  return "Tipo de archivo no permitido.";
}

export function sanitizeOriginalFileName(fileName: string) {
  return fileName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

function startsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}
