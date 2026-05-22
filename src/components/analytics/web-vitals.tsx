"use client";

import { useReportWebVitals } from "next/web-vitals";

const enabled = process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS === "true";
const debug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (!enabled) {
      if (debug) console.info("[web-vitals]", metric);
      return;
    }

    const body = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      navigationType: metric.navigationType,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/web-vitals", body);
      return;
    }

    fetch("/api/analytics/web-vitals", {
      method: "POST",
      body,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => undefined);
  });

  return null;
}
