import {
  BadgeCheck,
  Boxes,
  Brush,
  Clock3,
  Image,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import { adminOrderDetails } from "@/features/admin/admin-orders-data";

const activeOrders = adminOrderDetails.filter(
  (order) => order.status !== "DELIVERED" && order.status !== "CANCELLED",
);

export const adminStats = [
  {
    label: "Cotizaciones nuevas",
    value: "12",
    helper: "5 esperan confirmacion por WhatsApp",
    icon: MessageCircle,
  },
  {
    label: "Pedidos activos",
    value: String(activeOrders.length),
    helper: "Pedidos abiertos en el flujo operativo",
    icon: PackageCheck,
  },
  {
    label: "Productos publicados",
    value: "36",
    helper: "7 borradores pendientes",
    icon: Boxes,
  },
  {
    label: "Compradores",
    value: "128",
    helper: "18 registrados este mes",
    icon: UsersRound,
  },
];

export const adminTasks = [
  { label: "Revisar archivos subidos", helper: "4 imagenes requieren validacion", icon: Image },
  { label: "Enviar pruebas visuales", helper: "3 pedidos listos para aprobacion", icon: Brush },
  { label: "Confirmar tiempos de entrega", helper: "2 pedidos sin fecha prometida", icon: Clock3 },
  { label: "Auditar accesos admin", helper: "Roles y permisos antes de produccion", icon: ShieldCheck },
];

export const adminProductRows = [
  { name: "Taza blanca personalizada", category: "Tazas", status: "Activo", price: "Q55", variants: 4 },
  { name: "Playera sublimada", category: "Playeras", status: "Activo", price: "Q85", variants: 12 },
  { name: "Termo con nombre", category: "Termos", status: "Borrador", price: "Q120", variants: 5 },
  { name: "Cojin personalizado", category: "Cojines", status: "Archivado", price: "Q95", variants: 3 },
];

export const adminUserRows = [
  { name: "Mariana Reyes", email: "mariana@example.com", role: "Comprador", orders: 3 },
  { name: "Mike Admin", email: "admin@sublimadosmike.gt", role: "Administrador", orders: 0 },
  { name: "Equipo Diseno", email: "diseno@sublimadosmike.gt", role: "Diseno", orders: 0 },
];

export const adminContentCards = [
  { title: "Banner principal", status: "Activo", helper: "Home y catalogo" },
  { title: "Politicas", status: "Activo", helper: "Envios, devoluciones, privacidad" },
  { title: "WhatsApp", status: "Activo", helper: "Mensaje prellenado inicial" },
];

export const adminSettings = [
  { label: "Numero WhatsApp", value: "+502 4321-8800", icon: MessageCircle },
  { label: "Prueba visual requerida", value: "Activada", icon: BadgeCheck },
  { label: "Canal de venta", value: "Cotizacion sin pago online", icon: ShoppingBag },
];
