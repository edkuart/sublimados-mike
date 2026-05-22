import {
  ArrowRight,
  BedDouble,
  Coffee,
  Frame,
  Gift,
  KeyRound,
  Shirt,
  Sparkles,
  Thermometer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SM_TONES } from "./visuals";
import type { ToneName } from "./visuals";

interface CategoryItem {
  name: string;
  slug: string;
  count: number;
  tone: ToneName;
  icon: LucideIcon;
  blurb: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: "Tazas",      slug: "tazas",      count: 12, tone: "purple", icon: Coffee,      blurb: "Blancas, mágicas y con interior de color" },
  { name: "Playeras",   slug: "playeras",   count: 18, tone: "teal",   icon: Shirt,       blurb: "Eventos, equipos, regalos y empresas" },
  { name: "Termos",     slug: "termos",     count: 9,  tone: "ink",    icon: Thermometer, blurb: "Nombres, logos y frases de uso diario" },
  { name: "Llaveros",   slug: "llaveros",   count: 22, tone: "coral",  icon: KeyRound,    blurb: "Acrílico, MDF y metal con fotografía" },
  { name: "Almohadas",  slug: "almohadas",  count: 7,  tone: "gold",   icon: BedDouble,   blurb: "Cojines suaves con foto a todo color" },
  { name: "Regalos",    slug: "regalos-personalizados", count: 15, tone: "purple", icon: Gift, blurb: "Combos para ocasiones especiales" },
  { name: "Decoración", slug: "decoracion", count: 11, tone: "teal",   icon: Frame,       blurb: "Cuadros, pizarras y placas memorables" },
  { name: "Especiales", slug: "especiales", count: 6,  tone: "coral",  icon: Sparkles,    blurb: "Lanzamientos y productos de temporada" },
];

export function CategoriesShowcase() {
  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Categorías"
        title="Comprá por tipo de producto"
        subtitle="Cada categoría incluye opciones premium con producción rápida y pruebas visuales antes de imprimir."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const tone = SM_TONES[cat.tone];
          return (
            <a
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              {/* Visual area */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${tone.from} 0%, ${tone.to} 100%)`,
                }}
              >
                <div className="stripes-soft absolute inset-0 opacity-40" aria-hidden="true" />

                {/* Product count badge */}
                <span
                  className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10.5px] font-bold backdrop-blur"
                  style={{ color: tone.ink }}
                >
                  {cat.count} productos
                </span>

                {/* Icon */}
                <div className="absolute inset-0 grid place-items-center">
                  <span
                    className="grid h-16 w-16 place-items-center rounded-2xl bg-white/95 shadow-pop transition-transform group-hover:scale-110"
                    style={{ color: tone.ink }}
                  >
                    <cat.icon size={28} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>

                {/* Hover CTA overlay */}
                <div className="absolute inset-0 grid place-items-center bg-[var(--foreground)]/0 opacity-0 transition-all duration-300 group-hover:bg-[var(--foreground)]/45 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[var(--foreground)] shadow-pop">
                    Explorar <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="p-4">
                <h3 className="text-[16px] font-extrabold tracking-tight">{cat.name}</h3>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-[var(--muted-foreground)]">
                  {cat.blurb}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/catalogo"
          className="inline-flex items-center gap-2 text-[14px] font-bold text-[var(--primary)] hover:text-[var(--primary-strong)]"
        >
          Ver todas las categorías <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
