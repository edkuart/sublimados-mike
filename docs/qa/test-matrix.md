# Matriz QA - Sublimados Mike

## Objetivo

Validar que el e-commerce funcione correctamente en flujos publicos, comprador,
administrador, cotizacion por WhatsApp, politicas, seguridad basica y responsive.

## Comandos automatizados

```bash
npm run typecheck
npm run lint
npm run build
npm run qa:smoke:list
```

Con servidor local activo:

```bash
npm run dev -- --port 3001
npm run qa:smoke
npm run qa:visual
```

Para otro entorno:

```bash
QA_BASE_URL=https://staging.example.com npm run qa:smoke
```

## Smoke test automatizado

El script `scripts/qa-smoke.mjs` valida:

- Home publica responde.
- Catalogo responde.
- Detalle de producto fallback responde.
- Politicas publicas responden.
- Login responde.
- Rutas `/account` y `/admin` redirigen sin sesion.
- `/api/uploads` rechaza solicitudes no multipart.
- La lectura privada de archivos no expone contenido sin autenticacion.
- Headers de seguridad principales existen en la home.

## Auditoria visual automatizada

`npm run qa:visual` usa Chrome headless y guarda capturas en `.qa-artifacts/visual-audit`.
Valida rutas publicas principales, overflow horizontal, enlaces vacios, consola,
flujo de WhatsApp y menu mobile.

## Flujos funcionales publicos

- Home carga sin errores visuales.
- Header navega a catalogo, login y cotizacion.
- Catalogo muestra productos fallback sin base de datos.
- Categoria `/categorias/tazas` muestra productos o estado vacio controlado.
- Producto `/productos/taza-blanca-personalizada` muestra ficha, FAQ, resumen y personalizador.
- Personalizador permite variantes, cantidad, textos, archivo y datos de contacto.
- Cotizacion no avanza sin campos requeridos y consentimiento.
- Al aceptar politicas, el boton de WhatsApp genera mensaje prellenado.
- Politicas `/politicas/*` tienen contenido y breadcrumb.

## Flujos comprador

- Usuario sin sesion es redirigido desde `/account`.
- Login y registro cargan sin errores.
- Panel comprador muestra resumen, perfil, historial, favoritos y preferencias.
- Favoritos y preferencias no rompen layout en mobile.

## Flujos administrador

- Usuario sin sesion es redirigido desde `/admin`.
- Usuario sin rol admin debe ir a `/account`.
- Dashboard admin muestra KPIs, pipeline y tareas.
- Listado de pedidos navega a detalle.
- Detalle de pedido muestra timeline, archivos, notas y progreso.
- Productos, usuarios, contenido y configuracion cargan.

## Responsive

Probar manualmente:

- Mobile: 360 x 740.
- Mobile grande: 390 x 844.
- Tablet: 768 x 1024.
- Laptop: 1366 x 768.
- Desktop: 1440 x 900.

Criterios:

- No hay texto cortado en botones principales.
- Header mobile abre y cierra menu.
- Grids de catalogo y admin no generan overflow horizontal.
- Personalizador de producto mantiene CTA visible y legible.
- Footer conserva columnas legibles.

## Accesibilidad

- Todos los botones icon-only tienen `aria-label`.
- Inputs principales tienen label o `aria-label`.
- Contraste de texto sobre fondos morados es legible.
- Navegacion con teclado alcanza links, botones y formularios.
- Estados deshabilitados se perciben visualmente.

## Performance

- `npm run build` debe pasar.
- Revisar rutas estaticas vs dinamicas en salida del build.
- Probar Lighthouse en home, catalogo y producto antes de deploy.
- Revisar que las paginas legales esten SSG.
- Evitar agregar dependencias visuales pesadas sin medicion.

## Seguridad

- Headers globales presentes.
- `.env` no se versiona.
- Archivos se guardan fuera de `public`.
- Upload rechaza tipos no permitidos.
- Upload rechaza firmas invalidas.
- Lectura de archivos requiere autenticacion y rol admin.
- Acciones futuras deben revalidar permisos dentro del handler/action.

## Criterios de release manual

- Typecheck, lint y build pasan.
- Smoke test pasa contra staging.
- No hay errores visibles en consola del navegador en flujos principales.
- WhatsApp abre con mensaje completo.
- Las politicas se pueden consultar desde footer y cotizacion.
- Admin protegido no expone datos sin sesion.
