import { NextResponse } from "next/server";
import { securityJson } from "@/lib/security/api-response";
import { logAuditEvent } from "@/lib/security/audit-log";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/security/rate-limit";
import { assertMultipartFormData } from "@/lib/security/request";
import { uploadConfig } from "@/lib/uploads/config";
import { storeUploadLocally } from "@/lib/uploads/local-storage";
import { validateUploadFile, validateUploadSignature } from "@/lib/uploads/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, {
    namespace: "uploads",
    limit: uploadConfig.rateLimit.limit,
    windowMs: uploadConfig.rateLimit.windowMs,
  });

  if (rateLimit.limited) {
    logAuditEvent({
      action: "upload.rate_limited",
      entity: "UploadedFile",
      outcome: "blocked",
      reason: "rate_limit_exceeded",
      request,
    });

    return securityJson(
      { message: "Demasiados intentos de subida. Intenta de nuevo mas tarde." },
      { status: 429, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  if (!assertMultipartFormData(request)) {
    return securityJson(
      { message: "La solicitud debe usar multipart/form-data." },
      { status: 415, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const formData = await request.formData();
  const files = formData.getAll("file");
  const file = files[0];

  if (files.length > uploadConfig.maxFilesPerRequest) {
    return securityJson(
      { message: "Solo se permite subir un archivo por solicitud." },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  if (!(file instanceof File)) {
    return securityJson(
      { message: "Archivo requerido." },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const validation = validateUploadFile(file);

  if (!validation.valid) {
    logAuditEvent({
      action: "upload.validation_failed",
      entity: "UploadedFile",
      outcome: "failure",
      reason: validation.message,
      metadata: { fileName: file.name, mimeType: file.type, sizeBytes: file.size },
      request,
    });

    return securityJson(
      { message: validation.message },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const signatureError = await validateUploadSignature(file, validation.extension);

  if (signatureError) {
    logAuditEvent({
      action: "upload.signature_failed",
      entity: "UploadedFile",
      outcome: "failure",
      reason: signatureError,
      metadata: { fileName: file.name, mimeType: file.type, sizeBytes: file.size },
      request,
    });

    return securityJson(
      { message: signatureError },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  try {
    const stored = await storeUploadLocally(file, validation.extension);

    logAuditEvent({
      action: "upload.created",
      entity: "UploadedFile",
      entityId: stored.storageKey,
      outcome: "success",
      metadata: {
        originalName: stored.originalName,
        mimeType: stored.mimeType,
        sizeBytes: stored.sizeBytes,
      },
      request,
    });

    const response = NextResponse.json({
      file: {
        storageKey: stored.storageKey,
        originalName: stored.originalName,
        mimeType: stored.mimeType,
        sizeBytes: stored.sizeBytes,
      },
    });
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("X-Content-Type-Options", "nosniff");
    Object.entries(getRateLimitHeaders(rateLimit)).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch {
    logAuditEvent({
      action: "upload.store_failed",
      entity: "UploadedFile",
      outcome: "failure",
      reason: "storage_error",
      request,
    });

    return securityJson(
      { message: "No pudimos guardar el archivo. Intenta de nuevo." },
      { status: 500, headers: getRateLimitHeaders(rateLimit) },
    );
  }
}
