import { publicEnv } from "@/lib/env/public";
import { buildWhatsAppQuoteMessage, buildWhatsAppUrl } from "@/lib/whatsapp/message";

export type ClientQuoteDraft = {
  productName: string;
  quantity: number;
  selectedOptions: Record<string, string>;
  customizationValues: Record<string, string>;
  uploadedReferences: Record<
    string,
    {
      originalName: string;
      storageKey: string;
      sizeBytes: number;
    }
  >;
  estimatedPrice: string;
  customer: {
    name: string;
    phone: string;
    location: string;
    deliveryMethod: string;
    notes: string;
  };
  policiesAccepted: boolean;
};

export function createClientQuoteNumber() {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `SM-${stamp}-${random}`;
}

export function buildClientQuoteWhatsAppUrl(draft: ClientQuoteDraft) {
  const quoteNumber = createClientQuoteNumber();
  const customization = {
    ...draft.customizationValues,
    ...Object.fromEntries(
      Object.entries(draft.uploadedReferences).map(([label, upload]) => [
        `Archivo ${label}`,
        `${upload.originalName} (${upload.storageKey})`,
      ]),
    ),
  };
  const message = buildWhatsAppQuoteMessage({
    quoteNumber,
    customerName: draft.customer.name,
    customerPhone: draft.customer.phone,
    productName: draft.productName,
    quantity: draft.quantity,
    variants: draft.selectedOptions,
    customization,
    estimatedPrice: draft.estimatedPrice,
    deliveryMethod: draft.customer.deliveryMethod,
    location: draft.customer.location,
    notes: draft.customer.notes,
    policiesAcceptedAt: draft.policiesAccepted ? new Date().toISOString() : undefined,
  });

  return {
    quoteNumber,
    message,
    url: buildWhatsAppUrl(publicEnv.NEXT_PUBLIC_WHATSAPP_PHONE, message),
  };
}

export function validateClientQuoteDraft(draft: ClientQuoteDraft) {
  const errors: string[] = [];

  if (!draft.customer.name.trim()) {
    errors.push("Ingresa tu nombre.");
  }

  if (!draft.customer.phone.trim()) {
    errors.push("Ingresa tu telefono.");
  }

  if (!draft.customer.deliveryMethod.trim()) {
    errors.push("Selecciona entrega o recogida.");
  }

  if (!draft.policiesAccepted) {
    errors.push("Acepta las politicas para continuar.");
  }

  return errors;
}
