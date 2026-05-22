# ADR 0002 - PostgreSQL y Prisma

## Estado

Aceptada.

## Contexto

El proyecto necesita relaciones claras entre productos, variantes, usuarios, archivos,
cotizaciones, pedidos, estados y pruebas de diseno. Tambien necesita consultas
consistentes y migraciones controladas.

## Decision

Usar PostgreSQL como base de datos principal y Prisma como ORM.

## Consecuencias

Ventajas:

- Modelo relacional adecuado para e-commerce.
- Migraciones versionadas.
- Tipado fuerte con TypeScript.
- Buen soporte para consultas y relaciones.

Costos:

- Prisma requiere cuidado con consultas muy dinamicas.
- Las migraciones deben revisarse antes de produccion.

## Revaluar cuando

- Se necesite busqueda avanzada full-text o facetas complejas.
- El catalogo crezca mucho.
- Se requieran reportes analiticos complejos.

