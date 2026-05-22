import "server-only";
import { getClientIp, getUserAgent } from "@/lib/security/request";

type AuditEvent = {
  action: string;
  entity: string;
  entityId?: string;
  outcome: "success" | "failure" | "blocked";
  reason?: string;
  metadata?: Record<string, unknown>;
  request?: Request;
};

export function logAuditEvent(event: AuditEvent) {
  const payload = {
    timestamp: new Date().toISOString(),
    action: event.action,
    entity: event.entity,
    entityId: event.entityId,
    outcome: event.outcome,
    reason: event.reason,
    metadata: event.metadata,
    request: event.request
      ? {
          ip: getClientIp(event.request),
          userAgent: getUserAgent(event.request),
        }
      : undefined,
  };

  console.info(JSON.stringify({ type: "audit", ...payload }));
}
