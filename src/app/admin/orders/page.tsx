import { MessageCircle, PackageCheck } from "lucide-react";
import Link from "next/link";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { adminPipeline, adminRecentOrders } from "@/features/admin/admin-orders-data";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-[var(--primary)]">Gestion comercial</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Pedidos y cotizaciones</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
          Control de estados desde contacto pendiente hasta entrega, con detalle operativo,
          archivos, notas internas y linea de tiempo por pedido.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {adminPipeline.map((stage) => (
          <article className="rounded-lg border border-[var(--border)] bg-white p-4 shadow-sm" key={stage.label}>
            <p className="text-2xl font-black">{stage.count}</p>
            <p className="mt-1 text-xs font-bold text-[var(--muted-foreground)]">{stage.label}</p>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-sm">
        {adminRecentOrders.map((order, index) => (
          <article
            className={`grid gap-4 px-5 py-4 text-sm lg:grid-cols-[1fr_1fr_0.8fr_auto] lg:items-center ${
              index > 0 ? "border-t border-[var(--border)]" : ""
            }`}
            key={order.number}
          >
            <div>
              <Link className="font-extrabold text-[var(--primary)] hover:underline" href={`/admin/orders/${order.number}`}>
                {order.number}
              </Link>
              <p className="text-[var(--muted-foreground)]">{order.customer}</p>
            </div>
            <div>
              <p className="font-semibold">{order.product}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{order.amount}</p>
            </div>
            <OrderStatusBadge status={order.statusKey} />
            <div className="flex gap-2">
              <button aria-label="Contactar por WhatsApp" className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--primary)]">
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
              </button>
              <button aria-label="Actualizar estado" className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--primary)]">
                <PackageCheck aria-hidden="true" className="h-4 w-4" />
              </button>
              <Link
                aria-label="Ver detalle"
                className="grid h-9 place-items-center rounded-lg border border-[var(--border)] px-3 text-xs font-bold text-[var(--primary)]"
                href={`/admin/orders/${order.number}`}
              >
                Ver
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
