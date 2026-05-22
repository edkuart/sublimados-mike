# Fase 14: Testing Funcional, Responsive, Performance y QA

## Objetivo

Establecer una base profesional de QA antes del deploy: validaciones automatizadas,
smoke tests, matriz funcional, responsive, seguridad y performance.

## Implementado

- Script `scripts/qa-smoke.mjs` sin dependencias externas.
- Scripts npm:
  - `qa:smoke`;
  - `qa:smoke:list`.
- Matriz QA en `docs/qa/test-matrix.md`.
- Cobertura smoke inicial para:
  - home;
  - catalogo;
  - detalle de producto;
  - politicas;
  - login;
  - rutas protegidas comprador/admin;
  - upload no multipart;
  - lectura privada de archivos;
  - headers de seguridad principales.
- Documentacion de criterios responsive, accesibilidad, performance, seguridad y release.

## Modulos principales

- `scripts/qa-smoke.mjs`
- `package.json`
- `docs/qa/test-matrix.md`
- `docs/phase-14/status.md`

## Criterios de aceptacion

- `npm run typecheck` pasa.
- `npm run lint` pasa, sin errores.
- `npm run build` pasa.
- `npm run qa:smoke:list` pasa sin requerir servidor.
- `npm run qa:smoke` puede ejecutarse contra `localhost` o staging cuando haya servidor activo.
- Existe matriz QA para pruebas manuales y release.

## Riesgos

- El smoke test no reemplaza pruebas E2E con navegador real.
- Responsive y accesibilidad todavia requieren revision manual o Playwright/Lighthouse.
- Sin base de datos real, los flujos con datos siguen usando fallback.
- El smoke test asume rutas fallback existentes.

## No hacer todavia

- No instalar Playwright/Cypress hasta cerrar entorno de CI y presupuesto de tiempo.
- No bloquear deploy por Lighthouse hasta tener staging estable.
- No escribir pruebas profundas de CRUD hasta conectar persistencia real.
- No automatizar pruebas visuales sin definir baseline de diseño.
