import { Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SM_TONES } from "./visuals";
import type { ToneName } from "./visuals";

const TESTIMONIALS = [
  {
    name: "María Castillo",
    role: "Cumpleaños 30",
    rating: 5,
    text: "Las tazas para mis invitadas quedaron preciosas. Mike me mandó la prueba el mismo día y entregó al siguiente.",
  },
  {
    name: "Andrés Pineda",
    role: "Equipo Pumas FC",
    rating: 5,
    text: "Pedimos 28 playeras sublimadas para el torneo. Colores vivos, talla correcta y entregó antes de la fecha.",
  },
  {
    name: "Pastelería Lirio",
    role: "Cliente corporativo",
    rating: 5,
    text: "Cada mes nos hace los termos con el logo nuevo. Atención impecable y precio siempre claro.",
  },
  {
    name: "Lucía Ramírez",
    role: "Boda · Antigua",
    rating: 5,
    text: "Los recuerditos para 80 invitados quedaron de revista. Mil gracias por el detalle con la caja.",
  },
];

const STATS = [
  { num: "500+", label: "Pedidos entregados" },
  { num: "4.9★", label: "Calificación promedio" },
  { num: "3 años", label: "Sublimando en GT" },
];

const LOGOS = [
  "Pumas FC", "Pastelería Lirio", "Café Mateo", "Estudio Norte",
  "Boda L+J", "Colegio Atlas", "Tienda Volcán", "Eventos Ámbar",
];

const TONE_CYCLE: ToneName[] = ["purple", "teal", "coral", "gold"];

export function SocialProof() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Confianza"
          eyebrowTone="gold"
          title="Lo que dicen nuestros clientes"
          subtitle="500+ pedidos entregados, 4.9★ de calificación promedio, 3 años personalizando momentos en Guatemala."
        />

        {/* Stats row */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 divide-x divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)]">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-5 text-center">
              <p className="font-display text-2xl font-black text-[var(--primary)] sm:text-3xl">
                {s.num}
              </p>
              <p className="mt-1 text-[12px] font-semibold text-[var(--muted-foreground)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => {
            const tone = SM_TONES[TONE_CYCLE[i % 4]];
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");

            return (
              <figure
                key={t.name}
                className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-card"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 text-[var(--gold)]">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} size={14} className="fill-current" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="text-[13.5px] leading-relaxed text-[var(--foreground)]">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 border-t border-[var(--border)] pt-4">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full text-[13px] font-black text-white"
                    style={{
                      background: `linear-gradient(135deg, ${tone.from}, ${tone.to})`,
                    }}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-extrabold leading-tight">{t.name}</p>
                    <p className="text-[11.5px] text-[var(--muted-foreground)]">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Client logos marquee */}
        <div className="mt-14">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            Confían en nosotros
          </p>
          <div className="mt-5 overflow-hidden" aria-hidden="true">
            <div className="marquee-track flex w-max items-center gap-10">
              {[...LOGOS, ...LOGOS].map((name, i) => (
                <div
                  key={i}
                  className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-4 text-[13px] font-bold text-[var(--muted-foreground)]"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-sm bg-[var(--primary)]/15 text-[9px] font-black text-[var(--primary)]">
                    {name[0]}
                  </span>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
