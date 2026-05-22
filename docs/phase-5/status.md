# Fase 5 - Estado

## Completado

- Capa de catalogo creada con fallback:
  - `getCatalogCategories`
  - `getCatalogProducts`
  - `getProductDetail`
- Fallback de categorias y productos separado de la UI.
- Home conectada a la capa de catalogo.
- Rutas publicas creadas:
  - `/catalogo`
  - `/categorias/[slug]`
  - `/productos/[slug]`
- Tarjeta de producto enlaza a detalle real.
- Header actualizado con enlaces reales.
- Ficha de producto inicial con:
  - Galeria visual placeholder.
  - Precio.
  - Tiempo de produccion.
  - Opciones.
  - Campos de personalizacion.
  - CTAs de cotizacion y archivos.

## Criterio tecnico

Mientras no exista `DATABASE_URL` real, las paginas publicas usan fallback mock y no
fallan. Cuando la base de datos exista y tenga productos activos, el repositorio leera de
Prisma.

## Pendiente

- Crear busqueda funcional.
- Crear filtros reales.
- Conectar formulario de cotizacion.
- Sustituir placeholders por imagenes reales.
- Agregar paginas de politicas publicas.
- Agregar metadata dinamica SEO por categoria/producto.

