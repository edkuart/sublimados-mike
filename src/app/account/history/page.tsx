import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { quoteHistory } from "@/features/account/account-data";

const whatsappPhone = "50243218800";

export default function AccountHistoryPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <Badge tone="teal">Historial</Badge>
        <h1 className="mt-3 text-3xl font-black">Cotizaciones y pedidos</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
          Aqui apareceran las cotizaciones enviadas por WhatsApp y sus estados.
        </p>
      </section>

      <section className="rounded-lg border border-[var(--border)] bg-white shadow-sm">
        <div className="grid grid-cols-[1.2fr_1fr_120px_120px] gap-4 border-b border-[var(--border)] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[var(--muted-foreground)] max-lg:hidden">
          <span>Producto</span>
          <span>Cotizacion</span>
          <span>Estado</span>
          <span>Total</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {quoteHistory.map((quote) => (
            <article className="grid gap-3 px-5 py-4 lg:grid-cols-[1.2fr_1fr_120px_120px] lg:items-center" key={quote.number}>
              <div>
                <p className="font-bold">{quote.product}</p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{quote.date}</p>
              </div>
              <p className="text-sm font-semibold">{quote.number}</p>
              <Badge tone={quote.status === "Entregado" ? "teal" : "purple"}>{quote.status}</Badge>
              <div className="flex items-center justify-between gap-3 lg:block">
                <span className="font-black">{quote.amount}</span>
                <ButtonLink
                  className="lg:mt-2"
                  href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Hola, quiero consultar la cotizacion ${quote.number}.`)}`}
                  rel="noreferrer"
                  target="_blank"
                  variant="ghost"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  WhatsApp
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
