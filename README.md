# Sublimados Mike

E-commerce profesional para productos personalizados por sublimacion: tazas, playeras,
termos, gorras, llaveros, cojines, regalos personalizados, decoracion y productos
especiales.

## Estado actual

Fase 1 iniciada: setup tecnico, estructura base, entornos y estandares.

El proyecto ya tiene Next.js, TypeScript, Tailwind, ESLint y Prisma configurados como
base inicial. La migracion de base de datos queda pendiente hasta configurar una
`DATABASE_URL` real.

## Documentacion inicial

- `docs/phase-0/brief.md`: vision, alcance y criterios de Fase 0.
- `docs/phase-0/research-notes.md`: hallazgos y fuentes de investigacion.
- `docs/architecture/technical-architecture.md`: arquitectura tecnica recomendada.
- `docs/architecture/data-model.md`: modelo inicial de base de datos.
- `docs/architecture/adr/`: decisiones arquitectonicas registradas.
- `docs/product/prd.md`: especificacion de producto.
- `docs/product/requirements.md`: requisitos priorizados.
- `docs/product/catalog-taxonomy.md`: categorias, variantes y personalizacion.
- `docs/product/commerce-flows.md`: flujos publico, comprador, administrador y WhatsApp.
- `docs/product/roadmap.md`: roadmap profesional por fases.
- `docs/product/open-decisions.md`: decisiones que conviene cerrar antes de programar.
- `docs/phase-1/setup-plan.md`: plan recomendado para iniciar implementacion tecnica.
- `docs/phase-1/status.md`: estado actual de la Fase 1.
- `docs/phase-2/status.md`: estado actual del sistema visual inicial.
- `docs/phase-3/status.md`: estado actual de autenticacion y seguridad inicial.
- `docs/phase-4/status.md`: estado actual de base de datos, modelos y seed.
- `docs/phase-5/status.md`: estado actual de pagina publica y catalogo.
- `docs/phase-6/status.md`: estado actual de productos, variantes y personalizacion.
- `docs/phase-7/status.md`: estado actual de subida segura de archivos.
- `docs/phase-8/status.md`: estado actual de cotizacion y WhatsApp.
- `docs/phase-9/status.md`: estado actual del panel del comprador.
- `docs/phase-10/status.md`: estado actual del panel administrador.
- `docs/phase-11/status.md`: estado actual de gestion de pedidos y estados.
- `docs/phase-12/status.md`: estado actual de politicas, paginas legales y consentimiento.
- `docs/phase-13/status.md`: estado actual de seguridad avanzada, rate limiting y proteccion de archivos.
- `docs/phase-14/status.md`: estado actual de testing funcional, responsive, performance y QA.
- `docs/phase-15/status.md`: estado actual de deploy profesional, variables, backups y monitoreo.
- `docs/deployment/deploy-plan.md`: plan de despliegue, healthcheck, backups, monitoreo y rollback.
- `docs/qa/test-matrix.md`: matriz QA para smoke, flujos, responsive, accesibilidad y release.
- `docs/qa/pre-phase-16-visual-flow-audit.md`: informe QA visual y funcional previo a Fase 16.

## Direccion tecnica propuesta

- TypeScript como lenguaje principal.
- Next.js + Tailwind para la experiencia publica, comprador y administrador.
- PostgreSQL + Prisma para datos.
- Supabase Auth para autenticacion inicial.
- Supabase Storage y/o Cloudinary para archivos e imagenes.
- WhatsApp `wa.me` al inicio; WhatsApp Business Platform en fase posterior.

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run deploy:env
npm run deploy:check
npm run qa:smoke:list
npm run qa:smoke
npm run qa:visual
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Variables de entorno

Copiar `.env.example` a `.env.local` para variables de Next.js y configurar `DATABASE_URL`
en `.env` o el entorno de despliegue antes de usar Prisma.
