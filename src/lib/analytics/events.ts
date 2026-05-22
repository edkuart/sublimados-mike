type CommerceEvent = {
  name: "quote_whatsapp_opened" | "quote_started" | "product_option_changed";
  source?: string;
  productSlug?: string;
  productName?: string;
  category?: string;
  quantity?: number;
  quoteNumber?: string;
};

export function trackCommerceEvent(event: CommerceEvent) {
  const body = JSON.stringify(event);

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/events", body);
    return;
  }

  fetch("/api/analytics/events", {
    method: "POST",
    body,
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  }).catch(() => undefined);
}
