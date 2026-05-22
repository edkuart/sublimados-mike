import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { BlobShape } from "./visuals";

export function WhatsAppCtaBanner() {
  return (
    <section
      id="whatsapp"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #18111f 0%, #2A1A42 45%, #3D2462 100%)" }}
    >
      <BlobShape
        className="absolute -right-24 -top-32 z-0 h-[460px] w-[460px]"
        color="#a855f7"
        opacity={0.16}
      />
      <BlobShape
        className="absolute -bottom-32 -left-32 z-0 h-[420px] w-[420px]"
        color="#25D366"
        opacity={0.1}
      />
      <div className="hero-pattern absolute inset-0 z-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 text-white sm:px-6 md:grid-cols-[auto_1fr] md:py-24 lg:px-8">
        {/* WhatsApp icon */}
        <div className="relative grid place-items-center">
          <span
            className="absolute h-32 w-32 rounded-full blur-2xl"
            style={{ background: "rgba(37,211,102,0.30)" }}
            aria-hidden="true"
          />
          <span className="wa-pulse relative grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-pop">
            <MessageCircle size={56} strokeWidth={1.7} aria-hidden="true" />
          </span>
        </div>

        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-wider backdrop-blur">
            <span className="block h-1.5 w-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
            Disponible ahora
          </span>

          <h2 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight sm:text-[42px]">
            ¿Tenés una idea?{" "}
            <span className="text-[var(--gold)]">Contanos por WhatsApp.</span>
          </h2>

          <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-white/75">
            Respuesta en menos de 1 hora · Lunes a Sábado 8am–6pm. Mandanos tu foto, logo
            o referencia y te enviamos el mockup el mismo día.
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="https://wa.me/50243218800"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-4 text-[15px] font-bold text-white shadow-pop transition-transform hover:scale-[1.02]"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Escribir a WhatsApp
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="tel:+50243218800"
              className="inline-flex items-center gap-2 text-[15px] font-bold text-white/90 hover:text-white"
            >
              <Phone size={18} aria-hidden="true" />
              +502 4321-8800
            </a>
          </div>

          <p className="mt-5 text-[12px] text-white/55">
            ✦ También en Antigua, Quetzaltenango y envíos a todo Guatemala
          </p>
        </div>
      </div>
    </section>
  );
}
