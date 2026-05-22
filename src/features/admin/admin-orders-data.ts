import type { AdminOrderStatus } from "@/features/admin/order-workflow";
import { adminOrderWorkflow, getAdminOrderStatusMeta } from "@/features/admin/order-workflow";

export type AdminOrderDetail = {
  number: string;
  quoteNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    location: string;
  };
  status: AdminOrderStatus;
  channel: "WhatsApp" | "Catalogo";
  amount: string;
  deliveryMethod: string;
  promisedDate: string;
  createdAt: string;
  internalNotes: string;
  items: Array<{
    product: string;
    quantity: number;
    variant: string;
    personalization: string;
  }>;
  files: Array<{
    name: string;
    status: "Validado" | "Pendiente" | "Rechazado";
  }>;
  timeline: Array<{
    status: AdminOrderStatus;
    title: string;
    actor: string;
    date: string;
    note: string;
  }>;
};

export const adminOrderDetails: AdminOrderDetail[] = [
  {
    number: "SM-20260522-A4F2K",
    quoteNumber: "CT-20260522-A4F2K",
    customer: {
      name: "Mariana Reyes",
      phone: "+502 5555-0181",
      email: "mariana@example.com",
      location: "Ciudad de Guatemala, zona 11",
    },
    status: "CONTACT_PENDING",
    channel: "WhatsApp",
    amount: "Q55",
    deliveryMethod: "Recoger en tienda",
    promisedDate: "Por confirmar",
    createdAt: "22/05/2026 09:15",
    internalNotes: "Confirmar si desea fondo morado o blanco antes de preparar prueba.",
    items: [
      {
        product: "Taza blanca personalizada",
        quantity: 1,
        variant: "11 oz / ceramica blanca",
        personalization: "Foto familiar + texto Feliz cumple, mama",
      },
    ],
    files: [
      { name: "foto-familia.png", status: "Pendiente" },
      { name: "referencia-color.jpg", status: "Validado" },
    ],
    timeline: [
      {
        status: "CONTACT_PENDING",
        title: "Cotizacion recibida",
        actor: "Sistema",
        date: "22/05/2026 09:15",
        note: "Mensaje de WhatsApp generado desde ficha de producto.",
      },
    ],
  },
  {
    number: "SM-20260521-C9H7M",
    quoteNumber: "CT-20260521-C9H7M",
    customer: {
      name: "Carlos Alvarez",
      phone: "+502 5555-0190",
      email: "carlos@example.com",
      location: "Mixco",
    },
    status: "DESIGN_PENDING",
    channel: "Catalogo",
    amount: "Q680",
    deliveryMethod: "Envio a domicilio",
    promisedDate: "25/05/2026",
    createdAt: "21/05/2026 14:40",
    internalNotes: "Pedido corporativo. Cuidar consistencia de logo en playeras negras.",
    items: [
      {
        product: "Playeras corporativas",
        quantity: 8,
        variant: "M/L/XL mixtas / tela deportiva",
        personalization: "Logo frontal + nombres individuales",
      },
    ],
    files: [
      { name: "logo-empresa.svg", status: "Validado" },
      { name: "lista-nombres.pdf", status: "Validado" },
    ],
    timeline: [
      {
        status: "CONTACT_PENDING",
        title: "Pedido confirmado",
        actor: "Mike Admin",
        date: "21/05/2026 15:05",
        note: "Cliente confirma cantidades y tallas por WhatsApp.",
      },
      {
        status: "DESIGN_PENDING",
        title: "Asignado a diseno",
        actor: "Mike Admin",
        date: "21/05/2026 15:12",
        note: "Archivos validados. Falta preparar prueba visual.",
      },
    ],
  },
  {
    number: "SM-20260520-J8P1C",
    quoteNumber: "CT-20260520-J8P1C",
    customer: {
      name: "Ana Castillo",
      phone: "+502 5555-0177",
      email: "ana@example.com",
      location: "Antigua Guatemala",
    },
    status: "IN_PRODUCTION",
    channel: "WhatsApp",
    amount: "Q120",
    deliveryMethod: "Envio a domicilio",
    promisedDate: "23/05/2026",
    createdAt: "20/05/2026 10:30",
    internalNotes: "Cliente aprobo prueba con nombre en dorado. No cambiar tipografia.",
    items: [
      {
        product: "Termo con nombre",
        quantity: 1,
        variant: "Termo metalico 20 oz / blanco",
        personalization: "Nombre Ana + flores acuarela",
      },
    ],
    files: [
      { name: "referencia-flores.jpg", status: "Validado" },
      { name: "prueba-v2.png", status: "Validado" },
    ],
    timeline: [
      {
        status: "CONTACT_PENDING",
        title: "Pedido confirmado",
        actor: "Mike Admin",
        date: "20/05/2026 11:00",
        note: "Cliente confirma entrega a domicilio.",
      },
      {
        status: "DESIGN_SENT",
        title: "Prueba visual enviada",
        actor: "Equipo Diseno",
        date: "20/05/2026 16:20",
        note: "Se envio version 2 con flores mas claras.",
      },
      {
        status: "DESIGN_APPROVED",
        title: "Diseno aprobado",
        actor: "Cliente",
        date: "20/05/2026 17:05",
        note: "Aprobacion recibida por WhatsApp.",
      },
      {
        status: "IN_PRODUCTION",
        title: "Paso a produccion",
        actor: "Mike Admin",
        date: "21/05/2026 08:30",
        note: "Termo listo para sublimacion.",
      },
    ],
  },
];

export const adminRecentOrders = adminOrderDetails.map((order) => ({
  number: order.number,
  customer: order.customer.name,
  product: order.items[0]?.product ?? "Pedido personalizado",
  status: getAdminOrderStatusMeta(order.status).label,
  statusKey: order.status,
  amount: order.amount,
  channel: order.channel,
}));

export const adminPipeline = adminOrderWorkflow.slice(0, 6).map((status) => ({
  label: getAdminOrderStatusMeta(status).label,
  count: adminOrderDetails.filter((order) => order.status === status).length,
  tone: getAdminOrderStatusMeta(status).tone,
  status,
}));

export function getAdminOrderByNumber(number: string) {
  return adminOrderDetails.find((order) => order.number === number);
}
