import type { NextRequest } from "next/server";

export function getClientIp(request: Request | NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

export function getUserAgent(request: Request | NextRequest) {
  return request.headers.get("user-agent") ?? "unknown";
}

export function assertMultipartFormData(request: Request | NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  return contentType.toLowerCase().includes("multipart/form-data");
}
