"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Check,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Store,
  Truck,
  Upload,
  Wand2,
  X,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { ProductDetail } from "@/features/catalog/catalog-types";
import { SM_TONES } from "@/components/home/visuals";
import type { ToneName } from "@/components/home/visuals";
import {
  buildClientQuoteWhatsAppUrl,
  validateClientQuoteDraft,
  type ClientQuoteDraft,
} from "@/features/quotes/client-quote";
import { trackCommerceEvent } from "@/lib/analytics/events";

type SelectedOptions = Record<string, string>;
type CustomizationValues = Record<string, string>;
type UploadedReference = {
  originalName: string;
  storageKey: string;
  sizeBytes: number;
};

const DELIVERY_OPTIONS = [
  { value: "Recoger en tienda",  label: "Recolección",       sub: "Gratis · Zona 11",    icon: Store },
  { value: "Envío a domicilio",  label: "Envío a domicilio", sub: "Q25 · GT capital",    icon: Truck },
];

const ICON_LABEL: Record<string, string> = {
  mug:     "Taza",
  shirt:   "Playera",
  thermos: "Termo",
  pillow:  "Almohada",
  keychain: "Llavero",
  gift:    "Regalo",
};

export function ProductCustomizer({ product }: { product: ProductDetail }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() =>
    Object.fromEntries(product.options.map((o) => [o.name, o.values[0] ?? ""])),
  );
  const [customizationValues, setCustomizationValues] = useState<CustomizationValues>({});
  const [uploadedReferences, setUploadedReferences] = useState<Record<string, UploadedReference>>({});
  const [customer, setCustomer] = useState<ClientQuoteDraft["customer"]>({
    name: "",
    phone: "",
    location: "",
    deliveryMethod: "",
    notes: "",
  });
  const [quoteErrors, setQuoteErrors] = useState<string[]>([]);
  const [lastQuoteNumber, setLastQuoteNumber] = useState<string | null>(null);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  const quoteStartedTracked = useRef(false);

  const toneName = (product.imageTone ?? "purple") as ToneName;
  const tone = SM_TONES[toneName];

  const missingRequired = useMemo(
    () => product.customizationFields.filter((f) => f.required && !customizationValues[f.label]?.trim()),
    [customizationValues, product.customizationFields],
  );
  const canQuote = missingRequired.length === 0 && policiesAccepted;

  function updateCustomization(label: string, value: string) {
    setCustomizationValues((c) => ({ ...c, [label]: value }));
  }

  function updateUpload(label: string, upload: UploadedReference) {
    setUploadedReferences((c) => ({ ...c, [label]: upload }));
    updateCustomization(label, upload.originalName);
  }

  function updateCustomer(field: keyof ClientQuoteDraft["customer"], value: string) {
    setCustomer((c) => ({ ...c, [field]: value }));
  }

  function trackQuoteStarted() {
    if (quoteStartedTracked.current) return;
    quoteStartedTracked.current = true;
    trackCommerceEvent({
      name: "quote_started",
      source: "product_customizer",
      productSlug: product.slug,
      productName: product.name,
      category: product.category,
      quantity,
    });
  }

  function prepareWhatsAppQuote() {
    const draft: ClientQuoteDraft = {
      productName: product.name,
      quantity,
      selectedOptions,
      customizationValues,
      uploadedReferences,
      estimatedPrice: product.price,
      customer,
      policiesAccepted,
    };
    const errors = validateClientQuoteDraft(draft);
    if (missingRequired.length > 0) errors.push("Completá la personalización requerida.");
    setQuoteErrors(errors);
    if (errors.length > 0) return;
    const result = buildClientQuoteWhatsAppUrl(draft);
    setLastQuoteNumber(result.quoteNumber);
    trackCommerceEvent({
      name: "quote_whatsapp_opened",
      source: "product_customizer",
      productSlug: product.slug,
      productName: product.name,
      category: product.category,
      quantity,
      quoteNumber: result.quoteNumber,
    });
    window.open(result.url, "_blank", "noopener,noreferrer");
  }

  const rawPrice = Number(product.price.replace(/\D/g, "")) || 0;
  const subtotal = rawPrice * quantity;

  return (
    <div className="sticky top-[88px] overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-pop">
      {/* Card header */}
      <div
        className="relative overflow-hidden border-b border-[var(--border)] px-6 py-5"
        style={{ background: `linear-gradient(135deg, ${tone.from}18 0%, ${tone.surface} 100%)` }}
      >
        <div className="stripes-soft absolute inset-0 opacity-30" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider"
              style={{ color: tone.ink }}
            >
              <Wand2 size={11} aria-hidden="true" /> Personalizar
            </span>
            <h2 className="mt-2 font-display text-[22px] font-black leading-tight tracking-tight">
              Configurar y cotizar
            </h2>
            <p className="mt-1 text-[12.5px] text-[var(--muted-foreground)]">
              Te enviamos un mockup antes de imprimir.
            </p>
          </div>
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[var(--foreground)] shadow-card"
            style={{ color: tone.ink }}
            aria-hidden="true"
          >
            <span className="text-[11px] font-black">{ICON_LABEL[product.productKind ?? ""] ?? product.category[0]}</span>
          </span>
        </div>
      </div>

      <div className="space-y-7 px-6 py-6">
        {/* Quantity */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="qty" className="text-[12.5px] font-extrabold uppercase tracking-wider">
              Cantidad
            </label>
            <span className="text-[11.5px] font-semibold text-[var(--muted-foreground)]">Sin mínimo</span>
          </div>
          <div className="mt-3 flex items-stretch gap-3">
            <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-white p-1">
              <button
                aria-label="Reducir cantidad"
                onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                className="grid h-10 w-10 place-items-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                type="button"
              >
                <Minus size={16} aria-hidden="true" />
              </button>
              <input
                id="qty"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-12 bg-transparent text-center font-display text-[22px] font-black outline-none"
              />
              <button
                aria-label="Aumentar cantidad"
                onClick={() => setQuantity((v) => v + 1)}
                className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-strong)]"
                type="button"
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
            {rawPrice > 0 && (
              <div className="flex flex-1 items-center justify-between rounded-xl border-2 border-dashed border-[var(--primary)]/25 bg-[var(--primary-muted)]/40 px-4 py-2">
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Subtotal estimado
                  </p>
                  <p className="font-display text-[24px] font-black leading-none text-[var(--primary-strong)]">
                    Q{subtotal}.00
                  </p>
                </div>
                <Calculator size={18} className="text-[var(--primary)]" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>

        {/* Product options */}
        {product.options.map((option) => (
          <div key={option.name}>
            <label className="text-[12.5px] font-extrabold uppercase tracking-wider">{option.name}</label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {option.values.map((value) => {
                const selected = selectedOptions[option.name] === value;
                return (
                  <button
                    key={value}
                    onClick={() => setSelectedOptions((c) => ({ ...c, [option.name]: value }))}
                    className={`flex flex-col items-start gap-1 rounded-xl border-2 px-3 py-3 text-left transition-all ${
                      selected
                        ? "border-[var(--primary)] bg-[var(--primary-muted)] shadow-card"
                        : "border-[var(--border)] bg-white hover:border-[var(--primary-soft)]"
                    }`}
                    type="button"
                  >
                    {selected && <Check size={11} strokeWidth={3} className="text-[var(--primary)]" aria-hidden="true" />}
                    <span className="text-[12.5px] font-extrabold leading-tight">{value}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Customization fields */}
        {product.customizationFields.map((field) => (
          <CustomizationFieldControl
            key={field.label}
            field={field}
            value={customizationValues[field.label] ?? ""}
            onChange={(v) => updateCustomization(field.label, v)}
            onUpload={(u) => updateUpload(field.label, u)}
          />
        ))}

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-[var(--border)]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">
              Datos de contacto
            </span>
          </div>
        </div>

        {/* Contact fields */}
        <div className="grid grid-cols-2 gap-3">
          <ContactField
            label="Nombre completo"
            value={customer.name}
            onChange={(v) => updateCustomer("name", v)}
            onFocus={trackQuoteStarted}
            placeholder="Tu nombre"
          />
          <ContactField
            label="Teléfono"
            value={customer.phone}
            onChange={(v) => updateCustomer("phone", v)}
            onFocus={trackQuoteStarted}
            placeholder="+502 5000-0000"
            icon={Phone}
          />
          <ContactField
            label="Ciudad / Zona"
            value={customer.location}
            onChange={(v) => updateCustomer("location", v)}
            onFocus={trackQuoteStarted}
            placeholder="Zona 10, Guatemala"
            icon={MapPin}
          />
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--muted-foreground)]">
              Zona / Colonia
            </span>
            <input
              value={customer.notes.split("|")[0] ?? ""}
              onChange={(e) => updateCustomer("notes", e.target.value)}
              onFocus={trackQuoteStarted}
              placeholder="Colonia, residencial…"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-[13px] font-semibold outline-none transition-colors focus:border-[var(--primary)]"
            />
          </div>
        </div>

        {/* Delivery method */}
        <div>
          <label className="text-[12.5px] font-extrabold uppercase tracking-wider">Método de entrega</label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {DELIVERY_OPTIONS.map((o) => {
              const selected = customer.deliveryMethod === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => updateCustomer("deliveryMethod", o.value)}
                  className={`flex items-start gap-3 rounded-xl border-2 px-3 py-3 text-left transition-all ${
                    selected
                      ? "border-[var(--primary)] bg-[var(--primary-muted)] shadow-card"
                      : "border-[var(--border)] bg-white hover:border-[var(--primary-soft)]"
                  }`}
                  type="button"
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                      selected ? "bg-[var(--primary)] text-white" : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                    }`}
                  >
                    <o.icon size={16} aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="text-[12.5px] font-extrabold leading-tight">{o.label}</p>
                    <p className="text-[10.5px] font-semibold text-[var(--muted-foreground)]">{o.sub}</p>
                  </div>
                  {selected && <Check size={14} className="ml-auto shrink-0 text-[var(--primary)]" strokeWidth={3} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Order summary */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-subtle)]/70 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Resumen del pedido
            </p>
            {lastQuoteNumber && (
              <span className="rounded-md bg-white px-2 py-0.5 text-[10.5px] font-bold text-[var(--muted-foreground)]">
                #{lastQuoteNumber}
              </span>
            )}
          </div>
          <dl className="mt-3 space-y-1.5 text-[12.5px]">
            <div className="flex justify-between">
              <dt className="text-[var(--muted-foreground)]">{product.name} × {quantity}</dt>
              <dd className="font-bold">{rawPrice > 0 ? `Q${subtotal}.00` : product.price}</dd>
            </div>
            {Object.entries(selectedOptions).map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-[var(--muted-foreground)]">{label}</dt>
                <dd className="font-bold">{val || "—"}</dd>
              </div>
            ))}
            {Object.keys(uploadedReferences).map((label) => (
              <div key={label} className="flex justify-between">
                <dt className="text-[var(--muted-foreground)]">Archivo · {label}</dt>
                <dd className="font-bold text-[var(--accent-strong)]">✓ subido</dd>
              </div>
            ))}
            {customer.deliveryMethod === "Envío a domicilio" && (
              <div className="flex justify-between">
                <dt className="text-[var(--muted-foreground)]">Envío a domicilio</dt>
                <dd className="font-bold">Q25.00</dd>
              </div>
            )}
          </dl>
          {rawPrice > 0 && (
            <div className="mt-3 flex items-end justify-between border-t border-[var(--border)] pt-3">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Total estimado</span>
              <span className="font-display text-[28px] font-black leading-none text-[var(--primary-strong)]">
                Q{subtotal + (customer.deliveryMethod === "Envío a domicilio" ? 25 : 0)}.00
              </span>
            </div>
          )}
        </div>

        {/* Errors */}
        {quoteErrors.length > 0 && (
          <p className="rounded-xl bg-[var(--coral-muted)] px-4 py-3 text-[12.5px] font-semibold text-[var(--coral)]">
            {quoteErrors.join(" ")}
          </p>
        )}

        {/* CTA */}
        <div>
          <label className="mb-3 flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-left">
            <input
              checked={policiesAccepted}
              className="mt-1 h-4 w-4 rounded border-[var(--border)] accent-[var(--primary)]"
              onChange={(e) => setPoliciesAccepted(e.target.checked)}
              type="checkbox"
            />
            <span className="text-[11.5px] leading-relaxed text-[var(--muted-foreground)]">
              Acepto los{" "}
              <Link className="font-bold text-[var(--primary)]" href="/politicas/terminos">
                terminos de cotizacion
              </Link>
              , la{" "}
              <Link className="font-bold text-[var(--primary)]" href="/politicas/privacidad">
                politica de privacidad
              </Link>{" "}
              y la{" "}
              <Link className="font-bold text-[var(--primary)]" href="/politicas/archivos">
                politica de archivos
              </Link>
              .
            </span>
          </label>
          <button
            disabled={!canQuote}
            onClick={prepareWhatsAppQuote}
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] py-4 text-[15px] font-extrabold text-white shadow-pop transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Enviar cotización por WhatsApp
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          {!canQuote && (
            <p className="mt-2 text-center text-[11.5px] text-[var(--muted-foreground)]">
              Completa los campos requeridos y acepta las politicas para continuar.
            </p>
          )}
          <p className="mt-3 text-center text-[11px] leading-relaxed text-[var(--muted-foreground)]">
            El precio final puede variar según prueba.
          </p>
        </div>
      </div>
    </div>
  );
}

function CustomizationFieldControl({
  field,
  value,
  onChange,
  onUpload,
}: {
  field: ProductDetail["customizationFields"][number];
  value: string;
  onChange: (v: string) => void;
  onUpload: (u: { originalName: string; storageKey: string; sizeBytes: number }) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileChange(file?: File) {
    setUploadError(null);
    if (!file) { onChange(""); return; }
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      const payload = (await res.json()) as { file?: { originalName: string; storageKey: string; sizeBytes: number }; message?: string };
      if (!res.ok || !payload.file) {
        setUploadError(payload.message ?? "No pudimos subir el archivo.");
        onChange("");
        return;
      }
      onUpload(payload.file);
    } catch {
      setUploadError("No pudimos subir el archivo. Revisá tu conexión.");
      onChange("");
    } finally {
      setUploading(false);
    }
  }

  const baseInput =
    "mt-2 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[13.5px] font-semibold outline-none transition-colors focus:border-[var(--primary)]";

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={field.label} className="text-[12.5px] font-extrabold uppercase tracking-wider">
          {field.label}
        </label>
        <span className="text-[11.5px] font-medium text-[var(--muted-foreground)]">
          {field.required ? "Requerido" : "Opcional"}
        </span>
      </div>
      {field.helperText && (
        <p className="mt-0.5 text-[11.5px] text-[var(--muted-foreground)]">{field.helperText}</p>
      )}

      {field.inputType === "textarea" ? (
        <textarea
          id={field.label}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInput} resize-none leading-relaxed`}
          placeholder="Describe tu idea, colores preferidos o referencias…"
        />
      ) : field.inputType === "file" ? (
        <div className="mt-2 space-y-2">
          {value && (
            <div className="flex items-center gap-3 rounded-2xl border-2 border-[var(--accent)]/30 bg-[var(--accent-muted)]/40 p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-extrabold">{value}</p>
                <p className="text-[11.5px] text-[var(--muted-foreground)]">Archivo subido ✓</p>
              </div>
              <button
                type="button"
                onClick={() => onChange("")}
                className="grid h-9 w-9 place-items-center rounded-lg text-[var(--muted-foreground)] hover:bg-white"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => document.getElementById(`file-${field.label}`)?.click()}
            className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-left hover:border-[var(--primary-soft)] hover:bg-[var(--primary-muted)]/30"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[var(--primary)] shadow-card">
              {uploading ? (
                <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Upload size={16} aria-hidden="true" />
              )}
            </span>
            <div className="flex-1">
              <p className="text-[12.5px] font-extrabold">{uploading ? "Subiendo…" : "Subir imagen o logo"}</p>
              <p className="text-[11px] text-[var(--muted-foreground)]">JPG, PNG o PDF · máx 10 MB</p>
            </div>
          </button>
          <input
            id={`file-${field.label}`}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.svg,.pdf,image/*,application/pdf"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => handleFileChange(e.target.files?.[0])}
          />
          {uploadError && (
            <p className="flex items-center gap-2 text-[12px] text-[var(--coral)]">
              <XCircle size={14} aria-hidden="true" /> {uploadError}
            </p>
          )}
        </div>
      ) : (
        <input
          id={field.label}
          type={field.inputType === "date" || field.inputType === "color" ? field.inputType : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInput}
          placeholder="Escribe aquí…"
        />
      )}
    </div>
  );
}

function ContactField({
  label,
  value,
  onChange,
  onFocus,
  placeholder,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  placeholder: string;
  icon?: LucideIcon;
}) {
  return (
    <div>
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--muted-foreground)]">{label}</span>
      <span className="mt-1 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 transition-colors focus-within:border-[var(--primary)]">
        {Icon && <Icon size={14} className="shrink-0 text-[var(--muted-foreground)]" aria-hidden />}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className="w-full bg-transparent text-[13px] font-semibold outline-none"
        />
      </span>
    </div>
  );
}
