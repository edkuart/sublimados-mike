# ADR 0001 - Monolito modular con Next.js

## Estado

Aceptada para la primera version.

## Contexto

El proyecto necesita pagina publica, panel comprador, panel administrador, autenticacion,
catalogo, cotizaciones, archivos y flujo WhatsApp. Separar frontend y backend desde el
inicio aumentaria costo operativo y tiempo de desarrollo.

## Decision

Construir la primera version como monolito modular con Next.js y TypeScript.

## Consecuencias

Ventajas:

- Menor complejidad inicial.
- Desarrollo mas rapido.
- Un solo despliegue principal.
- Buena integracion con Vercel.

Costos:

- Requiere disciplina modular.
- Las responsabilidades deben estar bien separadas en carpetas y servicios internos.

## Revaluar cuando

- Se integre WhatsApp Business API con webhooks complejos.
- Se agreguen pagos online.
- Existan procesos de background pesados.
- El equipo crezca y necesite separar dominios.

