import { NextResponse, type NextRequest } from "next/server";
import { canAccessAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/session";
import { securityJson } from "@/lib/security/api-response";
import { logAuditEvent } from "@/lib/security/audit-log";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/security/rate-limit";
import { readStoredUpload } from "@/lib/uploads/local-storage";

export const runtime = "nodejs";

const mimeByExtension: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ storageKey: string[] }> },
) {
  const rateLimit = checkRateLimit(request, {
    namespace: "upload-read",
    limit: 60,
    windowMs: 10 * 60 * 1000,
  });

  if (rateLimit.limited) {
    return securityJson(
      { message: "Demasiadas solicitudes. Intenta de nuevo mas tarde." },
      { status: 429, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    return securityJson(
      { message: "Autenticacion requerida." },
      { status: 401, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  if (!canAccessAdmin(user.roleNames)) {
    logAuditEvent({
      action: "upload.read_forbidden",
      entity: "UploadedFile",
      outcome: "blocked",
      reason: "missing_admin_role",
      request,
    });

    return securityJson(
      { message: "No tienes permisos para ver este archivo." },
      { status: 403, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const { storageKey } = await params;
  const key = storageKey.join("/");

  try {
    const stored = await readStoredUpload(key);
    const contentType = mimeByExtension[stored.extension] ?? "application/octet-stream";
    const response = new NextResponse(stored.buffer, {
      status: 200,
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": "attachment",
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
        ...getRateLimitHeaders(rateLimit),
      },
    });

    logAuditEvent({
      action: "upload.read",
      entity: "UploadedFile",
      entityId: key,
      outcome: "success",
      request,
    });

    return response;
  } catch {
    return securityJson(
      { message: "Archivo no encontrado." },
      { status: 404, headers: getRateLimitHeaders(rateLimit) },
    );
  }
}
