import { Check, ChevronDown, Image, Palette, SlidersHorizontal, Stamp, Type } from "lucide-react";
import type { CatalogCategory } from "@/features/catalog/catalog-types";

const DELIVERY_OPTIONS = [
  { label: "24 horas",      count: 8  },
  { label: "2 – 3 días",    count: 24 },
  { label: "Más de 3 días", count: 11 },
];

const PERSONALIZATION_OPTIONS = [
  { label: "Foto",  icon: Image  },
  { label: "Texto", icon: Type   },
  { label: "Logo",  icon: Stamp  },
  { label: "Color", icon: Palette },
];

interface FilterSidebarProps {
  categories: CatalogCategory[];
  activeCategory?: string | null;
}

export function FilterSidebar({ categories, activeCategory }: FilterSidebarProps) {
  return (
    <aside className="sticky top-[76px] w-[260px] shrink-0 self-start">
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[var(--primary)]" aria-hidden="true" />
            <p className="text-[13px] font-extrabold">Filtros</p>
          </div>
          <button className="text-[11.5px] font-bold text-[var(--primary)] hover:text-[var(--primary-strong)]">
            Limpiar
          </button>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {/* Categories */}
          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="text-[12.5px] font-extrabold uppercase tracking-wider">Categorías</span>
              <ChevronDown size={14} className="text-[var(--muted-foreground)] transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="px-2 pb-3">
              <ul className="space-y-0.5">
                {categories.map((c) => {
                  const checked = activeCategory ? c.slug === activeCategory : false;
                  return (
                    <li key={c.slug}>
                      <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-[var(--primary-muted)]/50">
                        <span className="flex items-center gap-2.5">
                          <span className={`grid h-[18px] w-[18px] place-items-center rounded-[5px] border-2 transition-colors ${
                            checked
                              ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                              : "border-[var(--border)] bg-white"
                          }`}>
                            {checked && <Check size={11} strokeWidth={3.5} aria-hidden="true" />}
                          </span>
                          <span className={`text-[13px] ${checked ? "font-bold text-[var(--foreground)]" : "font-medium text-[var(--muted-foreground)]"}`}>
                            {c.name}
                          </span>
                        </span>
                        <span className="text-[11px] font-semibold text-[var(--muted-foreground)]">{c.itemCount}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </details>

          {/* Price */}
          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="text-[12.5px] font-extrabold uppercase tracking-wider">Precio</span>
              <ChevronDown size={14} className="text-[var(--muted-foreground)] transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="px-4 pb-4 pt-1">
              <div className="relative h-1.5 rounded-full bg-[var(--muted)]">
                <div className="absolute left-[8%] right-[35%] h-full rounded-full bg-[var(--primary)]" />
                <div className="absolute left-[8%] -translate-x-1/2 -translate-y-1/3 h-4 w-4 rounded-full border-2 border-[var(--primary)] bg-white shadow-card" />
                <div className="absolute right-[35%] translate-x-1/2 -translate-y-1/3 h-4 w-4 rounded-full border-2 border-[var(--primary)] bg-white shadow-card" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex flex-1 items-center gap-1 rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5">
                  <span className="text-[10.5px] font-bold text-[var(--muted-foreground)]">MIN</span>
                  <span className="ml-auto text-[12.5px] font-bold">Q18</span>
                </div>
                <div className="flex flex-1 items-center gap-1 rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5">
                  <span className="text-[10.5px] font-bold text-[var(--muted-foreground)]">MAX</span>
                  <span className="ml-auto text-[12.5px] font-bold">Q325</span>
                </div>
              </div>
            </div>
          </details>

          {/* Delivery time */}
          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="text-[12.5px] font-extrabold uppercase tracking-wider">Tiempo de entrega</span>
              <ChevronDown size={14} className="text-[var(--muted-foreground)] transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="px-2 pb-3">
              <div className="space-y-0.5">
                {DELIVERY_OPTIONS.map((o) => (
                  <label key={o.label} className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-[var(--primary-muted)]/50">
                    <span className="flex items-center gap-2.5">
                      <span className="grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-[var(--border)] bg-white" />
                      <span className="text-[13px] font-medium text-[var(--muted-foreground)]">{o.label}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--muted-foreground)]">{o.count}</span>
                  </label>
                ))}
              </div>
            </div>
          </details>

          {/* Personalization */}
          <details open className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="text-[12.5px] font-extrabold uppercase tracking-wider">Personalización</span>
              <ChevronDown size={14} className="text-[var(--muted-foreground)] transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-1.5">
                {PERSONALIZATION_OPTIONS.map((c) => (
                  <button
                    key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-[var(--muted-foreground)] transition-colors hover:border-[var(--primary-soft)] hover:text-[var(--primary-strong)]"
                  >
                    <c.icon size={12} aria-hidden="true" />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
    </aside>
  );
}
