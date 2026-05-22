import { z } from "zod";
import { securityJson } from "@/lib/security/api-response";
import { logAuditEvent } from "@/lib/security/audit-log";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/security/rate-limit";

const eventSchema = z.object({
  name: z.enum(["quote_whatsapp_opened", "quote_started", "product_option_changed"]),
  source: z.string().max(80).optional(),
  productSlug: z.string().max(120).optional(),
  productName: z.string().max(160).optional(),
  category: z.string().max(120).optional(),
  quantity: z.number().int().positive().max(10000).optional(),
  quoteNumber: z.string().max(80).optional(),
});

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(request, {
    namespace: "analytics-event",
    limit: 80,
    windowMs: 60_000,
  });

  if (rateLimit.limited) {
    return securityJson(
      { message: "Demasiados eventos." },
      { status: 429, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const parsed = eventSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return securityJson(
      { message: "Evento invalido." },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  logAuditEvent({
    action: "analytics.commerce_event_recorded",
    entity: "AnalyticsEvent",
    outcome: "success",
    metadata: parsed.data,
    request,
  });

  return securityJson({ ok: true }, { headers: getRateLimitHeaders(rateLimit) });
}
