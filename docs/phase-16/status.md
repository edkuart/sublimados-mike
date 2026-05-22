# Fase 16: Optimizacion, Analytics y Mejoras Futuras

## Objetivo

Optimizar la experiencia publica del proyecto, mejorar SEO tecnico, preparar analitica
sin PII, ampliar la auditoria visual/funcional con capturas y dejar un informe formal
antes de avanzar a integraciones futuras.

## Implementado

- Fuentes migradas de enlaces externos a `next/font/google`.
- Metadata global robusta con `metadataBase`, Open Graph, Twitter Card, canonical y robots.
- Metadata especifica para:
  - catalogo;
  - categorias;
  - productos;
  - login;
  - registro;
  - politicas.
- Rutas SEO:
  - `GET /robots.txt`;
  - `GET /sitemap.xml`.
- Analitica interna inicial sin datos personales:
  - `POST /api/analytics/events`;
  - `POST /api/analytics/web-vitals`;
  - componente `WebVitals`;
  - tracking de inicio de cotizacion y apertura de WhatsApp.
- Variables documentadas:
  - `NEXT_PUBLIC_ENABLE_WEB_VITALS`;
  - `NEXT_PUBLIC_ANALYTICS_DEBUG`.
- Accesibilidad/SEO:
  - correccion de doble `h1` en login y registro;
  - soporte `prefers-reduced-motion`.
- QA ampliado:
  - `qa:smoke` valida robots, sitemap y endpoints de analitica;
  - `qa:visual` valida metadata basica, canonical, Open Graph, un solo `h1`, overflow,
    consola, menu movil y flujo WhatsApp.

## Modulos principales

- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/analytics/web-vitals.tsx`
- `src/app/api/analytics/events/route.ts`
- `src/app/api/analytics/web-vitals/route.ts`
- `src/lib/analytics/events.ts`
- `scripts/qa-smoke.mjs`
- `scripts/visual-flow-audit.mjs`
- `docs/qa/phase-16-optimization-report.md`

## Validaciones ejecutadas

```bash
npm run typecheck
npm run lint
npm run build
npm run qa:smoke
npm run qa:visual
```

Resultado:

- TypeScript: paso.
- Lint: paso sin warning de fuentes.
- Build: paso.
- Smoke QA: paso.
- Auditoria visual: paso.
- Errores de consola: 0.
- Overflow horizontal: 0.
- Enlaces `href="#"`: 0.
- Flujo WhatsApp: paso.
- Menu mobile: paso.

## Capturas generadas

Las capturas locales quedan en:

```text
.qa-artifacts/visual-audit/screenshots/
```

Incluyen home, catalogo, categoria, producto, politicas, login, registro, flujo de
cotizacion completado y menu mobile abierto.

## Riesgos y limitaciones

- `NEXT_PUBLIC_APP_URL` debe cambiarse al dominio real antes de produccion para que
  canonical, sitemap y Open Graph apunten al sitio definitivo.
- La analitica actual registra eventos en audit logs de consola; en produccion debe
  conectarse a proveedor persistente o log drain.
- Web Vitals esta apagado por defecto para evitar ruido hasta tener staging/produccion.
- La auditoria visual automatizada no reemplaza Lighthouse ni pruebas E2E completas.
- Las capturas y artefactos QA son locales y estan ignorados por Git.

## No hacer todavia

- No activar pagos online antes de persistencia real de cotizaciones y pedidos.
- No activar WhatsApp Business API antes de cerrar plantillas, estados y consentimiento.
- No usar los logs locales como sistema definitivo de analitica.
- No publicar con `NEXT_PUBLIC_APP_URL` apuntando a localhost.
