import { ArrowRight, Heart, History, PackageCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { accountStats, quoteHistory } from "@/features/account/account-data";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <Badge tone="purple">Resumen</Badge>
        <h1 className="mt-3 text-3xl font-black">Mi cuenta</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
          Consulta cotizaciones, productos guardados y datos de contacto para futuras
          compras personalizadas.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {accountStats.map((stat) => (
          <article className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm" key={stat.label}>
            <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
            <p className="mt-2 text-3xl font-black">{stat.value}</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">{stat.helper}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <article className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <History aria-hidden="true" className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-xl font-bold">Cotizaciones recientes</h2>
            </div>
            <ButtonLink href="/account/history" variant="ghost">
              Ver todo
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="mt-5 space-y-3">
            {quoteHistory.slice(0, 3).map((quote) => (
              <div className="rounded-lg border border-[var(--border)] p-4" key={quote.number}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">{quote.product}</p>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">{quote.number}</p>
                  </div>
                  <Badge tone="teal">{quote.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-5">
          <article className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <PackageCheck aria-hidden="true" className="h-7 w-7 text-[var(--accent-strong)]" />
            <h2 className="mt-4 text-lg font-bold">Completa tus datos</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              Tener telefono, ciudad y metodo de entrega guardados hara mas rapido cotizar.
            </p>
            <ButtonLink className="mt-4 w-full" href="/account/profile" variant="secondary">
              Ir al perfil
            </ButtonLink>
          </article>
          <article className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <Heart aria-hidden="true" className="h-7 w-7 text-[var(--coral)]" />
            <h2 className="mt-4 text-lg font-bold">Productos favoritos</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              Guarda productos para volver a cotizarlos despues.
            </p>
            <ButtonLink className="mt-4 w-full" href="/account/favorites" variant="secondary">
              Ver favoritos
            </ButtonLink>
          </article>
        </aside>
      </section>
    </div>
  );
}
