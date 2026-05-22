export const adminOrderWorkflow = [
  "CONTACT_PENDING",
  "DESIGN_PENDING",
  "DESIGN_SENT",
  "DESIGN_APPROVED",
  "IN_PRODUCTION",
  "READY",
  "DELIVERED",
] as const;

export type AdminOrderStatus = (typeof adminOrderWorkflow)[number] | "CANCELLED";

export const adminOrderStatusMeta: Record<
  AdminOrderStatus,
  {
    label: string;
    description: string;
    tone: string;
  }
> = {
  CONTACT_PENDING: {
    label: "Contacto pendiente",
    description: "El pedido llego por WhatsApp o catalogo y falta confirmarlo con el cliente.",
    tone: "bg-[var(--gold-muted)] text-[var(--gold-strong)]",
  },
  DESIGN_PENDING: {
    label: "Diseno pendiente",
    description: "El equipo debe revisar archivos, referencias y preparar prueba visual.",
    tone: "bg-[var(--primary-muted)] text-[var(--primary-strong)]",
  },
  DESIGN_SENT: {
    label: "Prueba enviada",
    description: "La prueba visual fue enviada al cliente y espera aprobacion.",
    tone: "bg-[var(--accent-muted)] text-[var(--accent-strong)]",
  },
  DESIGN_APPROVED: {
    label: "Diseno aprobado",
    description: "El cliente aprobo la prueba visual y el pedido puede pasar a produccion.",
    tone: "bg-emerald-50 text-emerald-700",
  },
  IN_PRODUCTION: {
    label: "En produccion",
    description: "El producto esta en impresion, sublimacion, armado o empaque.",
    tone: "bg-[var(--muted)] text-[var(--foreground)]",
  },
  READY: {
    label: "Listo",
    description: "El pedido esta listo para entrega, envio o recoleccion.",
    tone: "bg-blue-50 text-blue-700",
  },
  DELIVERED: {
    label: "Entregado",
    description: "El pedido fue entregado y cerrado operativamente.",
    tone: "bg-slate-100 text-slate-700",
  },
  CANCELLED: {
    label: "Cancelado",
    description: "El pedido se cancelo y no debe avanzar en produccion.",
    tone: "bg-red-50 text-red-700",
  },
};

export function getAdminOrderStatusMeta(status: AdminOrderStatus) {
  return adminOrderStatusMeta[status];
}

export function getAdminOrderStatusIndex(status: AdminOrderStatus) {
  return adminOrderWorkflow.findIndex((item) => item === status);
}

export function getNextAdminOrderStatuses(status: AdminOrderStatus): AdminOrderStatus[] {
  if (status === "CANCELLED" || status === "DELIVERED") {
    return [];
  }

  const currentIndex = getAdminOrderStatusIndex(status);
  const next = adminOrderWorkflow[currentIndex + 1];

  return next ? [next, "CANCELLED"] : ["CANCELLED"];
}
