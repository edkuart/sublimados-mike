# Fase 8 - Cotizacion y WhatsApp

## Completado

- Utilidad cliente de cotizacion creada:
  - `createClientQuoteNumber`
  - `buildClientQuoteWhatsAppUrl`
  - `validateClientQuoteDraft`
- El configurador de producto ahora captura datos minimos:
  - nombre del cliente.
  - telefono.
  - ciudad o zona.
  - metodo de entrega.
  - observaciones.
- El resumen incluye:
  - producto.
  - cantidad.
  - opciones seleccionadas.
  - archivos subidos como referencia interna.
  - precio estimado.
- CTA "Preparar WhatsApp" genera:
  - numero temporal de cotizacion.
  - mensaje prellenado.
  - URL `wa.me`.
- Se bloquea el flujo si faltan datos requeridos.

## Limitaciones actuales

- La cotizacion aun no se persiste en base de datos.
- El numero de cotizacion es temporal y generado en cliente.
- El archivo subido se referencia por `storageKey`, pero todavia no se asocia a una
  cotizacion persistida.
- No hay calculo avanzado de precio por variante/cantidad.

## Siguiente paso recomendado

La siguiente iteracion debe persistir la cotizacion antes de abrir WhatsApp. Eso convertira
el numero temporal en un numero real guardado en base de datos.

