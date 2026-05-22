# ADR 0004 - WhatsApp wa.me como cierre inicial

## Estado

Aceptada.

## Contexto

El negocio no tendra pasarela de pago al inicio. El cierre comercial se hara por
WhatsApp. La API oficial de WhatsApp agrega complejidad operativa, plantillas, webhooks y
costos que no son necesarios antes de validar el flujo.

## Decision

Usar enlaces `wa.me` con mensaje prellenado en la primera version. Antes de abrir el
enlace, el sistema debe guardar la cotizacion.

## Consecuencias

Ventajas:

- Implementacion simple.
- Bajo costo.
- Compatible con el proceso manual del negocio.

Costos:

- No adjunta archivos automaticamente.
- No hay trazabilidad automatica de respuestas.
- El seguimiento dependera parcialmente del equipo.

## Revaluar cuando

- El volumen de pedidos sea alto.
- Se necesiten mensajes automatizados.
- Se requiera confirmacion por webhooks.
- Se integren estados automaticos o pagos.

