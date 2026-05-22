"use client";

import {
  ChevronRight,
  Heart,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Categorías", href: "/catalogo" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#whatsapp" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)]/70 bg-white/70 shadow-[0_4px_24px_-12px_rgba(76,29,149,0.18)] backdrop-blur-xl"
            : "border-b border-transparent bg-white/95"
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary-deep)] via-[var(--primary)] to-[var(--primary-soft)] text-white shadow-pop">
              <Sparkles size={20} strokeWidth={2.25} aria-hidden="true" />
              <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[var(--gold)] text-[9px] font-black text-[var(--foreground)]">
                SM
              </span>
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[15px] font-extrabold tracking-tight">
                Sublimados Mike
              </span>
              <span className="block text-[11px] font-medium text-[var(--muted-foreground)]">
                Personalizados premium · GT
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Principal">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-[13.5px] font-semibold text-[var(--muted-foreground)] transition-colors hover:bg-[var(--primary-muted)] hover:text-[var(--primary-strong)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search */}
          <div className="ml-auto hidden min-w-[260px] max-w-[320px] flex-1 items-center gap-2 rounded-xl border border-[var(--border)] bg-white/80 px-3 py-2 transition-colors focus-within:border-[var(--primary-soft)] focus-within:bg-white lg:flex">
            <Search size={16} className="text-[var(--muted-foreground)]" aria-hidden="true" />
            <input
              aria-label="Buscar productos"
              type="search"
              placeholder="Buscar tazas, termos, playeras…"
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--muted-foreground)]"
            />
            <kbd className="hidden rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-1.5 py-[1px] text-[10px] font-medium text-[var(--muted-foreground)] xl:inline-block">
              ⌘K
            </kbd>
          </div>

          {/* Mobile search trigger */}
          <button
            type="button"
            aria-label="Buscar"
            onClick={() => setSearchOpen((v) => !v)}
            className="ml-auto grid h-10 w-10 place-items-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] lg:hidden"
          >
            <Search size={20} aria-hidden="true" />
          </button>

          {/* Action icons */}
          <div className="flex items-center gap-1 lg:ml-0">
            <button
              aria-label="Favoritos"
              className="relative hidden h-10 w-10 place-items-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] sm:grid"
            >
              <Heart size={19} aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[var(--coral)] px-1 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            <Link
              href="/catalogo"
              className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-[13px] font-semibold text-[var(--foreground)] shadow-card transition-colors hover:border-[var(--primary-soft)] hover:text-[var(--primary-strong)] md:inline-flex"
            >
              <ShoppingBag size={16} aria-hidden="true" />
              Cotización
              <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--primary)] px-1.5 text-[10.5px] font-bold text-white">
                2
              </span>
            </Link>

            {/* Account avatar */}
            <Link
              href="/login"
              aria-label="Mi cuenta"
              className="hidden h-10 w-10 place-items-center rounded-lg sm:grid"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] text-[12px] font-bold text-white ring-2 ring-white">
                MR
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] md:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile search reveal */}
        {searchOpen && (
          <div className="border-t border-[var(--border)] bg-white px-4 py-3 lg:hidden">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-2">
              <Search size={16} className="text-[var(--muted-foreground)]" aria-hidden="true" />
              <input
                autoFocus
                type="search"
                placeholder="Buscar productos…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted-foreground)]"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile slide-in panel */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-[var(--foreground)]/40 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-[var(--border)] bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <span className="text-sm font-bold">Menú</span>
            <button
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-[var(--muted)]"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Menú móvil">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-semibold text-[var(--foreground)] hover:bg-[var(--primary-muted)]"
              >
                {item.label}
                <ChevronRight size={16} className="text-[var(--muted-foreground)]" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <div className="border-t border-[var(--border)] px-5 py-5">
            <a
              href="https://wa.me/50243218800"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-3 text-sm font-bold text-white shadow-pop"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Cotizar por WhatsApp
            </a>
            <p className="mt-3 text-center text-[11px] text-[var(--muted-foreground)]">
              +502 4321-8800 · Lun a Sáb 8am–6pm
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
