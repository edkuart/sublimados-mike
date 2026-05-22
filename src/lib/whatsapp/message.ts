export type WhatsAppQuoteMessageInput = {
  quoteNumber: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  variants: Record<string, string>;
  customization: Record<string, string>;
  estimatedPrice?: string;
  deliveryMethod?: string;
  location?: string;
  notes?: string;
  policiesAcceptedAt?: string;
};

export function buildWhatsAppQuoteMessage(input: WhatsAppQuoteMessageInput) {
  const variants = formatRecord(input.variants);
  const customization = formatRecord(input.customization);

  return [
    "Hola, quiero cotizar un pedido personalizado.",
    "",
    `Cotizacion: ${input.quoteNumber}`,
    `Cliente: ${input.customerName}`,
    `Telefono: ${input.customerPhone}`,
    `Producto: ${input.productName}`,
    `Cantidad: ${input.quantity}`,
    variants ? `Variantes: ${variants}` : undefined,
    customization ? `Personalizacion: ${customization}` : undefined,
    input.estimatedPrice ? `Precio estimado: ${input.estimatedPrice}` : undefined,
    input.deliveryMethod ? `Entrega: ${input.deliveryMethod}` : undefined,
    input.location ? `Ubicacion: ${input.location}` : undefined,
    input.notes ? `Observaciones: ${input.notes}` : undefined,
    input.policiesAcceptedAt ? `Politicas aceptadas: ${input.policiesAcceptedAt}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function formatRecord(record: Record<string, string>) {
  return Object.entries(record)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}
