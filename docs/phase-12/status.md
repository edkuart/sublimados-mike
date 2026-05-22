# Fase 12: Politicas, Paginas Legales y Consentimiento

## Objetivo

Publicar una base clara de politicas para productos personalizados y exigir
aceptacion antes de enviar una cotizacion por WhatsApp.

## Implementado

- Modulo estructurado de politicas en `src/features/policies/policy-content.ts`.
- Pagina indice `/politicas`.
- Paginas dinamicas `/politicas/[slug]` con metadata por politica.
- Politicas iniciales:
  - terminos de uso y cotizacion;
  - privacidad;
  - archivos e imagenes;
  - envios y entregas;
  - cambios y devoluciones;
  - aprobacion de diseno.
- Footer publico actualizado con enlaces legales reales.
- Flujo de cotizacion actualizado:
  - checkbox obligatorio de aceptacion;
  - enlaces a terminos, privacidad y politica de archivos;
  - validacion en cliente antes de abrir WhatsApp;
  - registro de aceptacion en el mensaje de WhatsApp.
- Estado de contenido admin actualizado para reflejar politicas activas.

## Modulos principales

- `src/features/policies/policy-content.ts`
- `src/app/politicas/page.tsx`
- `src/app/politicas/[slug]/page.tsx`
- `src/features/products/product-customizer.tsx`
- `src/features/quotes/client-quote.ts`
- `src/lib/whatsapp/message.ts`
- `src/components/home/site-footer.tsx`

## Criterios de aceptacion

- El usuario puede consultar politicas publicas desde el sitio.
- Las paginas legales tienen URLs directas y metadata.
- El footer no tiene enlaces legales vacios.
- La cotizacion no puede enviarse sin aceptar politicas.
- El mensaje de WhatsApp incluye evidencia basica de aceptacion.
- TypeScript, lint y build deben pasar.

## Riesgos

- El texto legal es una base operativa y debe revisarse con asesoria legal antes de produccion.
- La aceptacion queda en el mensaje de WhatsApp, pero aun no se persiste en base de datos.
- Cuando exista tabla real de cotizaciones, debe guardarse `policiesAcceptedAt` y version de politica aceptada.
- Si se aceptan archivos sensibles, debe existir una politica de retencion y borrado mas formal.

## No hacer todavia

- No tratar estos textos como documento legal final.
- No automatizar eliminacion de archivos hasta definir retencion exacta.
- No versionar politicas en base de datos hasta conectar CRUD de contenido.
- No habilitar pagos sin terminos comerciales revisados.
