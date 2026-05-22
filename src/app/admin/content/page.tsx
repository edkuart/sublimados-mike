import { FileText, Image, Megaphone } from "lucide-react";
import { adminContentCards } from "@/features/admin/admin-data";

const icons = [Megaphone, FileText, Image];

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-[var(--primary)]">Contenido visual y legal</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Contenido</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
          Base para banners, politicas, textos comerciales y assets del sitio publico.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {adminContentCards.map((card, index) => {
          const Icon = icons[index] ?? FileText;

          return (
            <article className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm" key={card.title}>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-lg font-black">{card.title}</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{card.helper}</p>
              <span className="mt-4 inline-flex rounded-md bg-[var(--surface-subtle)] px-2 py-1 text-xs font-bold text-[var(--foreground)]">
                {card.status}
              </span>
            </article>
          );
        })}
      </section>
    </div>
  );
}
