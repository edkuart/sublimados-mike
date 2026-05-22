import "server-only";
import { getClientIp } from "@/lib/security/request";

type RateLimitOptions = {
  limit: number;
  windowMs: number;
  namespace: string;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

export function checkRateLimit(request: Request, options: RateLimitOptions) {
  const now = Date.now();
  const ip = getClientIp(request);
  const key = `${options.namespace}:${ip}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs;
    buckets.set(key, { count: 1, resetAt });

    return {
      limited: false,
      remaining: Math.max(options.limit - 1, 0),
      resetAt,
    };
  }

  existing.count += 1;

  return {
    limited: existing.count > options.limit,
    remaining: Math.max(options.limit - existing.count, 0),
    resetAt: existing.resetAt,
  };
}

export function getRateLimitHeaders(result: ReturnType<typeof checkRateLimit>) {
  return {
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}
