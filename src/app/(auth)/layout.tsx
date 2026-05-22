import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen bg-[var(--surface-subtle)] px-4 py-8 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8">
      <section className="hidden items-center justify-center lg:flex">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-[var(--primary-muted)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
            Sublimados Mike
          </span>
          <p className="mt-5 text-5xl font-black leading-tight">
            Clientes, archivos y cotizaciones en un solo lugar.
          </p>
          <p className="mt-5 text-lg leading-8 text-[var(--muted-foreground)]">
            La cuenta del comprador permite guardar favoritos, datos de contacto e
            historial de pedidos personalizados.
          </p>
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-md items-center">{children}</section>
    </main>
  );
}
