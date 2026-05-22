# Fase 7 - Estado

## Completado

- Configuracion de uploads:
  - formatos permitidos: JPG, JPEG, PNG, WEBP, SVG y PDF.
  - limite: 10 MB.
- Validacion server-side de:
  - archivo requerido.
  - tamano.
  - MIME type.
  - extension.
- Sanitizacion de nombre original.
- Generacion de nombre interno con UUID.
- Almacenamiento local temporal fuera de `public`:
  - `.uploads/pending`
- Endpoint creado:
  - `POST /api/uploads`
- UI de campos tipo archivo conectada al endpoint.
- Resumen de cotizacion muestra referencia interna del archivo.

## Decisiones de seguridad

- Los archivos no se guardan en `public`.
- Los nombres de archivo reales no se usan como ruta de almacenamiento.
- `.uploads/` esta ignorado por Git.
- No se devuelven URLs publicas del archivo.
- Esta fase no intenta renderizar ni servir archivos subidos.

## Pendiente

- Reemplazar almacenamiento local por Supabase Storage privado.
- Persistir metadata en `UploadedFile`.
- Asociar archivo a cotizacion real.
- Agregar antivirus o revision manual si el negocio acepta PDFs/SVGs de terceros.
- Agregar rate limiting.
- Agregar expiracion/limpieza de archivos temporales.

## Nota

El almacenamiento local temporal sirve para validar el flujo. En produccion debe usarse un
bucket privado con politicas de acceso y URLs firmadas.

