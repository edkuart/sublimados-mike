import { CheckCircle2 } from "lucide-react";
import type { AdminOrderDetail } from "@/features/admin/admin-orders-data";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";

export function OrderTimeline({
  timeline,
}: {
  timeline: AdminOrderDetail["timeline"];
}) {
  return (
    <div className="space-y-4">
      {timeline.map((event, index) => (
        <article className="flex gap-3" key={`${event.status}-${event.date}`}>
          <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--primary-muted)] text-[var(--primary)]">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
          </span>
          <div className={`flex-1 pb-4 ${index < timeline.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-sm font-extrabold">{event.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {event.actor} · {event.date}
                </p>
              </div>
              <OrderStatusBadge status={event.status} />
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{event.note}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
