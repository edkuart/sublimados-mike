import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { policyPages } from "@/features/policies/policy-content";

export const metadata: Metadata = {
  title: "Politicas",
  description: "Politicas de cotizacion, privacidad, archivos, envios y productos personalizados.",
  alternates: {
    canonical: "/politicas",
  },
  openGraph: {
    title: "Politicas de Dinamiqo",
    description: "Politicas de cotizacion, privacidad, archivos, envios y productos personalizados.",
    url: "/politicas",
  },
};

export default function PoliciesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--surface-subtle)]">
        <section className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-[12.5px] text-[var(--muted-foreground)]">
              <Link href="/" className="font-medium hover:text-[var(--primary)]">Inicio</Link>
              <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
              <span className="font-semibold text-[var(--foreground)]">Politicas</span>
            </nav>
            <p className="mt-6 text-sm font-semibold text-[var(--primary)]">Informacion legal y operativa</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-black tracking-tight">
              Politicas claras para pedidos personalizados
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
              Estas politicas explican como cotizamos, usamos archivos, coordinamos entregas
              y confirmamos productos hechos a la medida.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {policyPages.map((policy) => {
            const Icon = policy.icon;

            return (
              <Link
                className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm transition-colors hover:border-[var(--primary-soft)]"
                href={`/politicas/${policy.slug}`}
                key={policy.slug}
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-lg font-black">{policy.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{policy.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[var(--primary)]">
                  Leer politica
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
