# Fase 6 - Estado

## Completado

- Tipos de producto extendidos con `inputType` para campos de personalizacion.
- Repositorio de catalogo mapea tipos Prisma a controles de UI.
- Fallback de productos actualizado con controles de texto, archivo y textarea.
- Componente interactivo creado:
  - `ProductCustomizer`
- La ficha de producto ahora permite:
  - Seleccionar cantidad.
  - Seleccionar opciones del producto.
  - Completar campos de personalizacion.
  - Marcar campos requeridos.
  - Adjuntar referencia local a nivel visual.
  - Ver resumen de cotizacion.
  - Bloquear CTA si faltan campos requeridos.

## Criterios aplicados

- Las variantes/opciones se capturan separadas de la personalizacion.
- La subida de archivo en esta fase es solo referencial en UI; no almacena archivos.
- El CTA "Preparar WhatsApp" queda listo para Fase 8.
- No se implemento carrito ni persistencia de cotizacion todavia.

## Pendiente

- Persistir cotizacion.
- Subida segura real de archivos.
- Calculo de precio por variantes y cantidad.
- Generacion de mensaje WhatsApp.
- Validacion server-side de la cotizacion.

