"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

interface MobileCatalogShellProps {
  filterContent: React.ReactNode;
  activeFilterCount?: number;
  children: React.ReactNode;
}

export function MobileCatalogShell({
  filterContent,
  activeFilterCount = 0,
  children,
}: MobileCatalogShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start gap-8">
      {/* Desktop sidebar — oculto en móvil */}
      <div className="hidden md:block">{filterContent}</div>

      {/* Contenido principal */}
      <div className="min-w-0 flex-1">
        {/* Botón de filtros — solo móvil */}
        <div className="mb-4 flex items-center gap-3 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-[13px] font-bold shadow-card"
          >
            <SlidersHorizontal size={15} className="text-[var(--primary)]" aria-hidden="true" />
            Filtros
            {activeFilterCount > 0 && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--primary)] text-[10px] font-black text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {children}
      </div>

      {/* Drawer overlay — solo móvil */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Bottom sheet */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.18)]">
            {/* Handle + header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[var(--primary)]" aria-hidden="true" />
                <span className="text-[14px] font-extrabold">Filtros</span>
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-[var(--primary-muted)] px-2 py-0.5 text-[11px] font-bold text-[var(--primary-strong)]">
                    {activeFilterCount} activos
                  </span>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]"
                aria-label="Cerrar filtros"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Filter content sin el wrapper aside */}
            <div className="p-1">{filterContent}</div>

            {/* Sticky apply button */}
            <div className="sticky bottom-0 border-t border-[var(--border)] bg-white px-5 py-4">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-xl bg-[var(--primary)] py-3.5 text-[14px] font-bold text-white"
              >
                Ver productos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
