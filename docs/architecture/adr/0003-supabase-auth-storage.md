# ADR 0003 - Supabase Auth y Storage privado

## Estado

Propuesta aceptada para validar en Fase 1/Fase 3.

## Contexto

El proyecto requiere registro, login con Google, posible Facebook Login, sesiones seguras
y almacenamiento privado de archivos de clientes.

## Decision

Usar Supabase Auth para autenticacion inicial y Supabase Storage para archivos privados.
Cloudinary puede usarse adicionalmente para imagenes publicas de catalogo.

## Consecuencias

Ventajas:

- Menos riesgo que autenticacion propia.
- OAuth disponible.
- Integracion natural con PostgreSQL.
- Storage con politicas de acceso.

Costos:

- Dependencia de proveedor.
- Requiere configurar correctamente politicas, callbacks y buckets.

## Revaluar cuando

- Se necesiten reglas empresariales de autenticacion muy especificas.
- El costo o limites de storage sean un problema.
- Se requiera procesamiento avanzado de imagenes.

