import { ArrowUpRight, Clock3 } from "lucide-react";
import Link from "next/link";
import {
  adminStats,
  adminTasks,
} from "@/features/admin/admin-data";
import { adminPipeline, adminRecentOrders } from "@/features/admin/admin-orders-data";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-[var(--primary)]">Dashboard operativo</p>
        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Control general</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
              Vista inicial para monitorear cotizaciones, pedidos, productos, usuarios y tareas
              antes de conectar analitica real desde la base de datos.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--primary-muted)] px-3 py-2 text-xs font-bold text-[var(--primary-strong)]">
            <Clock3 aria-hidden="true" className="h-4 w-4" />
            Hoy
          </span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm" key={stat.label}>
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
              <p className="mt-5 text-3xl font-black">{stat.value}</p>
              <h2 className="mt-1 text-sm font-extrabold">{stat.label}</h2>
              <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)]">{stat.helper}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--primary)]">Pedidos recientes</p>
              <h2 className="mt-1 text-xl font-black">Seguimiento comercial</h2>
            </div>
            <Link className="text-sm font-bold text-[var(--primary)]" href="/admin/orders">
              Ver pedidos
            </Link>
          </div>
          <div className="mt-5 overflow-hidden rounded-lg border border-[var(--border)]">
            {adminRecentOrders.map((order, index) => (
              <div
                className={`grid gap-3 px-4 py-4 text-sm md:grid-cols-[1fr_1fr_auto] md:items-center ${
                  index > 0 ? "border-t border-[var(--border)]" : ""
                }`}
                key={order.number}
              >
                <div>
                  <p className="font-extrabold">{order.number}</p>
                  <p className="text-[var(--muted-foreground)]">{order.customer}</p>
                </div>
                <div>
                  <p className="font-semibold">{order.product}</p>
                  <p className="text-[var(--muted-foreground)]">{order.channel}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-extrabold">{order.amount}</p>
                  <p className="text-xs font-bold text-[var(--primary)]">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-[var(--primary)]">Pipeline</p>
            <div className="mt-4 space-y-3">
              {adminPipeline.map((stage) => (
                <div className="flex items-center justify-between gap-3" key={stage.label}>
                  <span className="text-sm font-semibold text-[var(--muted-foreground)]">{stage.label}</span>
                  <span className={`rounded-md px-2 py-1 text-xs font-black ${stage.tone}`}>
                    {stage.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-[var(--primary)]">Tareas criticas</p>
            <div className="mt-4 space-y-3">
              {adminTasks.map((task) => {
                const Icon = task.icon;

                return (
                  <div className="flex gap-3 rounded-lg bg-[var(--surface-subtle)] p-3" key={task.label}>
                    <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 text-[var(--primary)]" />
                    <div>
                      <p className="text-sm font-extrabold">{task.label}</p>
                      <p className="text-xs leading-5 text-[var(--muted-foreground)]">{task.helper}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
