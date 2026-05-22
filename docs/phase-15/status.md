# Fase 15: Deploy Profesional, Variables de Entorno, Backups y Monitoreo

## Objetivo

Preparar el proyecto para despliegue profesional con verificacion de entorno, healthcheck,
checklist operativo, backups y monitoreo.

## Implementado

- Healthcheck publico en `GET /api/health`.
- Validacion de variables de produccion en `src/lib/env/deploy.ts`.
- Script `scripts/check-deploy-env.mjs`.
- Scripts npm:
  - `deploy:env`;
  - `deploy:check`.
- Smoke test actualizado para incluir `/api/health`.
- `.env.example` ampliado con placeholders de monitoreo y backups.
- Guia de deploy en `docs/deployment/deploy-plan.md`.

## Modulos principales

- `src/app/api/health/route.ts`
- `src/lib/env/deploy.ts`
- `scripts/check-deploy-env.mjs`
- `scripts/qa-smoke.mjs`
- `docs/deployment/deploy-plan.md`
- `docs/phase-15/status.md`

## Criterios de aceptacion

- Existe healthcheck sin secretos.
- Existe validacion estricta para entorno de produccion.
- Existe checklist de deploy, rollback, backups y monitoreo.
- El smoke test incluye healthcheck.
- TypeScript, lint, build y QA smoke deben pasar.

## Riesgos

- `deploy:env` fallara en local si las variables siguen siendo placeholder, lo cual es correcto.
- Los uploads locales no son estrategia de produccion para serverless.
- Backups y monitoreo dependen del proveedor elegido.
- Falta CI/CD formal para automatizar checks.

## No hacer todavia

- No desplegar produccion sin storage privado real.
- No correr migraciones destructivas sin backup probado.
- No usar `.uploads` local como almacenamiento definitivo en Vercel/serverless.
- No configurar pagos hasta terminar observabilidad y datos reales.
