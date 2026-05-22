# Fase 13: Seguridad Avanzada, Validaciones, Rate Limiting, Logs y Proteccion de Archivos

## Objetivo

Endurecer superficies sensibles antes de avanzar a testing y deploy: subida de archivos,
lectura de archivos privados, headers de seguridad, rate limiting inicial y logs de auditoria.

## Implementado

- Headers globales en `next.config.ts`:
  - `X-Frame-Options`;
  - `X-Content-Type-Options`;
  - `Referrer-Policy`;
  - `Permissions-Policy`;
  - CSP base para `frame-ancestors`, `object-src`, `base-uri` y `form-action`.
- Utilidades de seguridad:
  - extraccion de IP y user-agent;
  - validacion de `multipart/form-data`;
  - rate limiting en memoria;
  - respuestas JSON con `no-store` y `nosniff`;
  - logs de auditoria en formato JSON.
- Subida de archivos reforzada:
  - rate limit por IP;
  - maximo de un archivo por request;
  - validacion de tipo MIME;
  - validacion de extension;
  - sanitizacion de nombre original;
  - validacion basica de firma/contenido para PDF, PNG, JPG, WEBP y SVG;
  - bloqueo de SVG con `script` o `javascript:`;
  - logs para subida exitosa, validacion fallida, firma fallida, rate limit y error de storage.
- Lectura protegida de archivos:
  - nueva ruta `GET /api/uploads/[...storageKey]`;
  - requiere usuario autenticado;
  - requiere rol `ADMIN` o `SUPER_ADMIN`;
  - usa rutas resueltas dentro de `.uploads`;
  - responde con `Content-Disposition: attachment`;
  - aplica `private, no-store` y `nosniff`.

## Modulos principales

- `next.config.ts`
- `src/lib/security/request.ts`
- `src/lib/security/rate-limit.ts`
- `src/lib/security/audit-log.ts`
- `src/lib/security/api-response.ts`
- `src/lib/uploads/config.ts`
- `src/lib/uploads/validation.ts`
- `src/lib/uploads/local-storage.ts`
- `src/app/api/uploads/route.ts`
- `src/app/api/uploads/[...storageKey]/route.ts`

## Criterios de aceptacion

- La subida de archivos rechaza tipos, extensiones, firmas y SVGs sospechosos.
- La subida de archivos tiene rate limiting basico.
- Las respuestas sensibles no se cachean.
- Los archivos no se sirven desde `public`.
- La lectura de archivos exige autenticacion y rol admin.
- Los eventos sensibles generan logs auditables.
- TypeScript, lint y build deben pasar.

## Riesgos y limitaciones

- El rate limiting en memoria no es suficiente para multiples instancias o serverless en produccion.
- La validacion de firmas no reemplaza antivirus ni analisis profundo de archivos.
- Los logs van a consola; en produccion deben enviarse a un servicio persistente.
- La autorizacion de archivos todavia es global por rol admin; falta ownership por cotizacion/pedido.
- SVG y PDF siguen siendo formatos de mayor riesgo; conviene evaluar si se aceptan en produccion.

## No hacer todavia

- No confiar solo en este rate limiting para produccion.
- No exponer URLs publicas permanentes de archivos.
- No permitir lectura de archivos a compradores hasta modelar propiedad y permisos.
- No ejecutar conversion/renderizado de SVG o PDF subidos en servidor.
- No implementar antivirus sin decidir proveedor, costo y flujo operativo.
