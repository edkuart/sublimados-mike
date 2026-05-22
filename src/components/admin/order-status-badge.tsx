import type { AdminOrderStatus } from "@/features/admin/order-workflow";
import { getAdminOrderStatusMeta } from "@/features/admin/order-workflow";

export function OrderStatusBadge({ status }: { status: AdminOrderStatus }) {
  const meta = getAdminOrderStatusMeta(status);

  return (
    <span className={`inline-flex w-fit rounded-md px-2 py-1 text-xs font-bold ${meta.tone}`}>
      {meta.label}
    </span>
  );
}
