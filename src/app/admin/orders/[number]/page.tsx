import {
  ArrowLeft,
  CalendarClock,
  FileImage,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  ReceiptText,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusPanel } from "@/components/admin/order-status-panel";
import { OrderTimeline } from "@/components/admin/order-timeline";
import { getAdminOrderByNumber } from "@/features/admin/admin-orders-data";
import { adminOrderWorkflow, getAdminOrderStatusIndex, getAdminOrderStatusMeta } from "@/features/admin/order-workflow";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const order = getAdminOrderByNumber(number);

  if (!order) {
    notFound();
  }

  const currentIndex = getAdminOrderStatusIndex(order.status);
  const whatsappHref = `https://wa.me/${order.customer.phone.replace(/\D/g, "")}`;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <Link
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]"
          href="/admin/orders"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Volver a pedidos
        </Link>

        <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight">{order.number}</h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
              Cotizacion {order.quoteNumber} creada el {order.createdAt}. Canal: {order.channel}.
            </p>
          </div>
          <a
            className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-bold text-white"
            href={whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            Contactar
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <SummaryCard icon={UserRound} label="Cliente" value={order.customer.name} helper={order.customer.email} />
        <SummaryCard icon={Phone} label="Telefono" value={order.customer.phone} helper={order.customer.location} />
        <SummaryCard icon={ReceiptText} label="Total estimado" value={order.amount} helper={order.deliveryMethod} />
        <SummaryCard icon={CalendarClock} label="Fecha prometida" value={order.promisedDate} helper="Editable al conectar DB" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-[var(--primary)]">Avance operativo</p>
            <div className="mt-5 grid gap-2 md:grid-cols-7">
              {adminOrderWorkflow.map((status, index) => {
                const meta = getAdminOrderStatusMeta(status);
                const isDone = currentIndex >= index;
                const isCurrent = order.status === status;

                return (
                  <div
                    className={`rounded-lg border p-3 ${
                      isCurrent
                        ? "border-[var(--primary)] bg-[var(--primary-muted)]"
                        : isDone
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-[var(--border)] bg-[var(--surface-subtle)]"
                    }`}
                    key={status}
                  >
                    <p className="text-xs font-black">{index + 1}</p>
                    <p className="mt-2 text-xs font-bold leading-4">{meta.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-[var(--primary)]">Productos</p>
            <div className="mt-4 overflow-hidden rounded-lg border border-[var(--border)]">
              {order.items.map((item, index) => (
                <article
                  className={`grid gap-3 px-4 py-4 text-sm md:grid-cols-[1fr_auto] md:items-start ${
                    index > 0 ? "border-t border-[var(--border)]" : ""
                  }`}
                  key={`${item.product}-${index}`}
                >
                  <div>
                    <h2 className="font-extrabold">{item.product}</h2>
                    <p className="mt-1 text-[var(--muted-foreground)]">{item.variant}</p>
                    <p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">
                      Personalizacion: {item.personalization}
                    </p>
                  </div>
                  <span className="rounded-md bg-[var(--surface-subtle)] px-2 py-1 text-xs font-black">
                    x{item.quantity}
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-[var(--primary)]">Linea de tiempo</p>
            <div className="mt-5">
              <OrderTimeline timeline={order.timeline} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <OrderStatusPanel status={order.status} />

          <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-[var(--primary)]">Archivos</p>
            <div className="mt-4 space-y-3">
              {order.files.map((file) => (
                <div className="flex items-center justify-between gap-3 rounded-lg bg-[var(--surface-subtle)] p-3" key={file.name}>
                  <div className="flex min-w-0 items-center gap-3">
                    <FileImage aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--primary)]" />
                    <span className="truncate text-sm font-bold">{file.name}</span>
                  </div>
                  <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-[var(--muted-foreground)]">
                    {file.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
              <PackageCheck aria-hidden="true" className="h-4 w-4" />
              Notas internas
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{order.internalNotes}</p>
            <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-[var(--muted-foreground)]">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {order.customer.location}
            </p>
          </section>
        </aside>
      </section>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{label}</p>
      <h2 className="mt-1 truncate text-sm font-black">{value}</h2>
      <p className="mt-1 truncate text-xs text-[var(--muted-foreground)]">{helper}</p>
    </article>
  );
}
