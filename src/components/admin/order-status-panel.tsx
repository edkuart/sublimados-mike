import { AlertTriangle, ArrowRight, LockKeyhole } from "lucide-react";
import type { AdminOrderStatus } from "@/features/admin/order-workflow";
import {
  getAdminOrderStatusMeta,
  getNextAdminOrderStatuses,
} from "@/features/admin/order-workflow";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";

export function OrderStatusPanel({ status }: { status: AdminOrderStatus }) {
  const current = getAdminOrderStatusMeta(status);
  const nextStatuses = getNextAdminOrderStatuses(status);

  return (
    <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-[var(--primary)]">Estado del pedido</p>
      <div className="mt-3">
        <OrderStatusBadge status={status} />
        <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{current.description}</p>
      </div>

      <div className="mt-5 border-t border-[var(--border)] pt-5">
        <h2 className="text-sm font-extrabold">Siguientes acciones</h2>
        {nextStatuses.length > 0 ? (
          <div className="mt-3 space-y-2">
            {nextStatuses.map((nextStatus) => {
              const meta = getAdminOrderStatusMeta(nextStatus);

              return (
                <button
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-[var(--border)] px-3 py-3 text-left text-sm opacity-70"
                  disabled
                  key={nextStatus}
                  type="button"
                >
                  <span>
                    <span className="block font-extrabold">{meta.label}</span>
                    <span className="block text-xs leading-5 text-[var(--muted-foreground)]">
                      Disponible al conectar persistencia.
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-[var(--primary)]" />
                </button>
              );
            })}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
            Este pedido ya no tiene avances operativos disponibles.
          </p>
        )}
      </div>

      <div className="mt-5 rounded-lg bg-[var(--surface-subtle)] p-4">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
          <LockKeyhole aria-hidden="true" className="h-4 w-4" />
          Control preparado
        </p>
        <p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">
          Las mutaciones reales se habilitaran con Prisma, auditoria y validacion de permisos por accion.
        </p>
      </div>

      {status === "CONTACT_PENDING" && (
        <div className="mt-4 rounded-lg bg-[var(--gold-muted)] p-4 text-[var(--gold-strong)]">
          <p className="flex items-center gap-2 text-xs font-extrabold">
            <AlertTriangle aria-hidden="true" className="h-4 w-4" />
            Requiere confirmacion
          </p>
          <p className="mt-1 text-xs leading-5">
            Antes de disenar, confirma producto, precio, archivos y fecha estimada por WhatsApp.
          </p>
        </div>
      )}
    </section>
  );
}
