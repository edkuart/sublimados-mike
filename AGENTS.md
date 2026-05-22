# Instrucciones del proyecto Sublimados Mike

## Estado

Proyecto en Fase 0. No escribir codigo de aplicacion hasta cerrar decisiones base de
producto, arquitectura y alcance.

## Regla Next.js

Cuando se inicialice Next.js, leer primero la documentacion local instalada en
`node_modules/next/dist/docs/` antes de cambiar APIs, convenciones o estructura del
framework. Este proyecto puede usar una version de Next.js con cambios no asumibles desde
conocimiento previo.

## Preferencias tecnicas

- TypeScript como lenguaje principal.
- Arquitectura modular y simple antes de separar servicios.
- PostgreSQL + Prisma para persistencia.
- Autenticacion administrada preferida sobre autenticacion propia al inicio.
- Archivos de clientes privados por defecto.
- WhatsApp como canal de cierre inicial, con cotizacion persistida antes de abrir el
  enlace.

## Cuidado con alcance

Evitar construir pagos, editor visual avanzado, WhatsApp Business API o automatizaciones
complejas antes de validar el flujo principal de cotizacion personalizada.

