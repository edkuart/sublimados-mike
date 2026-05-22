import { AtSign, Clock, Mail, MapPin, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Empresa",
    links: [
      { label: "Nosotros",             href: "#nosotros" },
      { label: "Cómo trabajamos",      href: "#nosotros" },
      { label: "Guía de diseño",       href: "/politicas/aprobacion-diseno" },
      { label: "Contacto comercial",   href: "mailto:hola@dinamiqo.gt" },
    ],
  },
  {
    title: "Catálogo",
    links: [
      { label: "Tazas",     href: "/categorias/tazas" },
      { label: "Playeras",  href: "/categorias/playeras" },
      { label: "Termos",    href: "/categorias/termos" },
      { label: "Llaveros",  href: "/categorias/llaveros" },
      { label: "Almohadas", href: "/categorias/almohadas" },
      { label: "Regalos",   href: "/categorias/regalos-personalizados" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Cómo cotizar",         href: "/#whatsapp" },
      { label: "Preparar tu archivo",  href: "/politicas/archivos" },
      { label: "Tiempos de entrega",   href: "/politicas/envios" },
      { label: "Preguntas frecuentes", href: "/productos/taza-blanca-personalizada#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos de uso",        href: "/politicas/terminos" },
      { label: "Política de privacidad", href: "/politicas/privacidad" },
      { label: "Política de archivos",   href: "/politicas/archivos" },
      { label: "Devoluciones",           href: "/politicas/cambios-devoluciones" },
    ],
  },
];

const SOCIALS = [
  { name: "WhatsApp",  icon: MessageCircle, href: "https://wa.me/50243218800" },
  { name: "Email",     icon: AtSign,        href: "mailto:hola@dinamiqo.gt" },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[var(--foreground)] text-white">
      {/* Gradient accent separator */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(to right, var(--primary-deep), var(--primary-soft), var(--accent))",
        }}
        aria-hidden="true"
      />

      {/* Background dot pattern */}
      <div className="hero-pattern absolute inset-0 -z-10 opacity-30" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.2fr] lg:gap-16">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--primary-deep)] via-[var(--primary)] to-[var(--primary-soft)] text-white shadow-pop">
                <Sparkles size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[16px] font-extrabold leading-tight">Dinamiqo</p>
                <p className="text-[11.5px] text-white/55">Personalizados premium · GT</p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-white/65">
              Tazas, playeras, termos y regalos sublimados con prueba visual antes de
              imprimir. Hechos en Guatemala desde 2022.
            </p>

            {/* Contact details */}
            <div className="mt-6 space-y-3 text-[13px] text-white/75">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[#25D366]">
                  <MessageCircle size={15} aria-hidden="true" />
                </span>
                <a href="https://wa.me/50243218800" className="font-semibold hover:text-white">
                  +502 4321-8800
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[var(--primary-soft)]">
                  <Mail size={15} aria-hidden="true" />
                </span>
                <a href="mailto:hola@dinamiqo.gt" className="font-semibold hover:text-white">
                  hola@dinamiqo.gt
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[var(--gold)]">
                  <MapPin size={15} aria-hidden="true" />
                </span>
                <span>Zona 11, Ciudad de Guatemala</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[var(--accent)]">
                  <Clock size={15} aria-hidden="true" />
                </span>
                <span>Lunes a Sábado · 8:00 a 18:00</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-7 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white"
                >
                  <s.icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/") ? (
                        <Link
                          href={l.href}
                          className="text-[13.5px] font-medium text-white/80 transition-colors hover:text-white"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          className="text-[13.5px] font-medium text-white/80 transition-colors hover:text-white"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-white/55">
            © 2026 Dinamiqo. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[var(--accent)]" aria-hidden="true" />
              Archivos privados por defecto
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <span className="grid h-4 w-4 place-items-center rounded-sm bg-white/10 text-[9px] font-black">
                GT
              </span>
              Hecho en Guatemala
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
