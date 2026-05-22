# Fase 11: Gestion de Pedidos y Estados

## Objetivo

Crear la base operativa para administrar pedidos y cotizaciones desde el panel admin,
incluyendo estados, detalle de pedido, archivos, notas internas y linea de tiempo.

## Implementado

- Dominio de estados de pedido:
  - `CONTACT_PENDING`
  - `DESIGN_PENDING`
  - `DESIGN_SENT`
  - `DESIGN_APPROVED`
  - `IN_PRODUCTION`
  - `READY`
  - `DELIVERED`
  - `CANCELLED`
- Helpers para metadata, orden de avance y siguientes estados permitidos.
- Datos fallback detallados para pedidos administrativos.
- Listado de pedidos con enlace a detalle.
- Ruta dinamica `/admin/orders/[number]`.
- Detalle operativo del pedido:
  - datos del cliente;
  - monto estimado;
  - metodo de entrega;
  - fecha prometida;
  - productos y personalizacion;
  - archivos asociados;
  - notas internas;
  - linea de tiempo;
  - progreso por etapas;
  - acciones futuras de avance de estado.
- Componentes reutilizables:
  - `OrderStatusBadge`;
  - `OrderTimeline`;
  - `OrderStatusPanel`.

## Modulos principales

- `src/features/admin/order-workflow.ts`
- `src/features/admin/admin-orders-data.ts`
- `src/components/admin/order-status-badge.tsx`
- `src/components/admin/order-timeline.tsx`
- `src/components/admin/order-status-panel.tsx`
- `src/app/admin/orders/page.tsx`
- `src/app/admin/orders/[number]/page.tsx`

## Criterios de aceptacion

- El admin puede ver pedidos por estado.
- Cada pedido tiene una pagina de detalle navegable.
- El detalle muestra estado actual, timeline, archivos y notas internas.
- El flujo visual respeta el orden operativo de produccion.
- Las acciones de cambio de estado quedan visibles pero no mutan datos hasta conectar persistencia.
- TypeScript, lint y build deben pasar.

## Riesgos

- Cambiar estados sin persistencia real seria enganoso; por eso los botones quedan deshabilitados.
- El flujo necesita auditoria antes de permitir mutaciones reales.
- Las reglas de avance pueden variar en operaciones reales, por ejemplo saltar de contacto pendiente a cancelado.
- La exposicion de archivos debe resolverse con URLs firmadas o proxy protegido antes de produccion.

## No hacer todavia

- No guardar cambios de estado hasta conectar Prisma, autorizacion por accion y audit logs.
- No permitir descarga directa de archivos privados.
- No enviar mensajes automaticos a WhatsApp Business API todavia.
- No mezclar pedidos confirmados con cotizaciones si el modelo comercial no esta cerrado.
