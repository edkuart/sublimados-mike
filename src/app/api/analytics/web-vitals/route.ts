import { z } from "zod";
import { securityJson } from "@/lib/security/api-response";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/security/rate-limit";
import { logAuditEvent } from "@/lib/security/audit-log";

const webVitalsSchema = z.object({
  id: z.string().max(128),
  name: z.string().max(64),
  value: z.number().nonnegative(),
  rating: z.string().max(32).optional(),
  navigationType: z.string().max(64).optional(),
});

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, {
    namespace: "web-vitals",
    limit: 120,
    windowMs: 60_000,
  });

  if (rateLimit.limited) {
    return securityJson(
      { message: "Demasiados eventos de rendimiento." },
      { status: 429, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const parsed = webVitalsSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return securityJson(
      { message: "Evento de rendimiento invalido." },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  logAuditEvent({
    action: "analytics.web_vital_recorded",
    entity: "AnalyticsEvent",
    outcome: "success",
    metadata: {
      metric: parsed.data.name,
      rating: parsed.data.rating ?? "unknown",
      value: parsed.data.value,
    },
    request,
  });

  return securityJson({ ok: true }, { headers: getRateLimitHeaders(rateLimit) });
}
