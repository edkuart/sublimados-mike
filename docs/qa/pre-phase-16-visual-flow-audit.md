# Informe QA Visual y Funcional previo a Fase 16

## Contexto

Auditoria ejecutada antes de iniciar Fase 16 para validar visualmente el proyecto,
probar flujos principales y corregir fallos detectados.

Base URL auditada:

```text
http://localhost:3001
```

Herramienta usada:

```bash
npm run qa:visual
```

El script usa Chrome headless mediante Chrome DevTools Protocol y guarda artefactos en:

```text
.qa-artifacts/visual-audit/
```

## Capturas generadas

- `.qa-artifacts/visual-audit/screenshots/home-desktop.png`
- `.qa-artifacts/visual-audit/screenshots/home-mobile.png`
- `.qa-artifacts/visual-audit/screenshots/catalogo-desktop.png`
- `.qa-artifacts/visual-audit/screenshots/producto-desktop.png`
- `.qa-artifacts/visual-audit/screenshots/producto-mobile.png`
- `.qa-artifacts/visual-audit/screenshots/politicas-desktop.png`
- `.qa-artifacts/visual-audit/screenshots/login-mobile.png`
- `.qa-artifacts/visual-audit/screenshots/producto-flow-filled.png`
- `.qa-artifacts/visual-audit/screenshots/mobile-menu-open.png`

Reporte JSON:

```text
.qa-artifacts/visual-audit/report.json
```

## Flujos probados

- Home desktop.
- Home mobile.
- Catalogo desktop.
- Detalle de producto desktop.
- Detalle de producto mobile.
- Politicas desktop.
- Login mobile.
- Flujo de cotizacion en producto:
  - personalizacion requerida;
  - datos de contacto;
  - metodo de entrega;
  - aceptacion de politicas;
  - generacion de URL `wa.me`.
- Menu mobile:
  - apertura;
  - contenido visible;
  - boton de cierre.

## Validaciones automatizadas

- Presencia de `<main>`.
- Contenido visible minimo.
- Ausencia de overflow horizontal.
- Ausencia de enlaces `href="#"`.
- Ausencia de errores de consola.
- CTA de WhatsApp habilitado con datos completos.
- URL de WhatsApp generada correctamente.

## Hallazgos corregidos

### 1. Favicon 404

Hallazgo:

- Chrome reportaba `GET /favicon.ico` con 404.

Correccion:

- Se agrego ruta `src/app/favicon.ico/route.ts`.

Estado:

- Corregido. La segunda auditoria reporta 0 errores de consola.

### 2. Enlaces vacios `href="#"`

Hallazgo:

- Footer contenia enlaces sin destino real.
- Historial de comprador tenia boton WhatsApp con `href="#"`.

Correccion:

- Footer actualizado con rutas reales a politicas, contacto, FAQ y WhatsApp/email.
- Se elimino el set de redes sociales sin URL real.
- Historial del comprador ahora genera enlace `wa.me` con numero de cotizacion.
- Se agrego `#faq` a la ficha de producto.

Estado:

- Corregido. La segunda auditoria reporta `emptyHashLinks: 0`.

### 3. ESLint analizaba artefactos generados

Hallazgo:

- Despues de generar capturas, ESLint analizaba el perfil temporal de Chrome dentro de `.qa-artifacts`.

Correccion:

- `.qa-artifacts/` agregado a `.gitignore`.
- `.qa-artifacts/**` y `.uploads/**` agregados a `eslint.config.mjs` via `globalIgnores`.

Estado:

- Corregido. `npm run lint` vuelve a pasar.

## Resultado final

Comandos ejecutados:

```bash
npm run qa:visual
npm run typecheck
npm run lint
npm run build
npm run qa:smoke
```

Resultado:

- Auditoria visual: paso.
- Errores de consola: 0.
- Overflow horizontal: 0.
- Enlaces vacios: 0.
- Flujo WhatsApp: paso.
- Menu mobile: paso.
- TypeScript: paso.
- Lint: paso con warning conocido de fuente.
- Build: paso.
- Smoke test: paso.

## Observaciones

- En capturas de desarrollo puede verse un pequeno indicador propio del entorno dev de Next/Chrome. No es un defecto funcional de produccion.
- El numero de WhatsApp usado en entorno local sigue siendo placeholder (`50200000000`) hasta configurar variables reales.
- La auditoria no reemplaza pruebas E2E con Playwright/Cypress, pero ya cubre una linea base visual y funcional suficiente antes de Fase 16.
