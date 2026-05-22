# Fase 1 - Plan de setup tecnico

## Objetivo

Inicializar la base tecnica del proyecto con Next.js, TypeScript, Tailwind, Prisma,
estandares de codigo, variables de entorno y estructura modular.

## Precondiciones

- Fase 0 documentada.
- Stack base aceptado.
- Proyecto en Git.
- Decision de monolito modular aceptada.

## Tareas recomendadas

### 1. Inicializar Next.js

- Crear aplicacion Next.js con TypeScript.
- Activar Tailwind.
- Usar App Router salvo que la documentacion local de Next.js indique cambios relevantes.
- Leer `node_modules/next/dist/docs/` despues de instalar Next.js y antes de escribir
  codigo de framework.

### 2. Estandares de codigo

- Configurar ESLint.
- Configurar Prettier si no viene integrado.
- Definir scripts: `dev`, `build`, `lint`, `typecheck`.
- Crear `.env.example`.

### 3. Estructura modular inicial

Propuesta:

```txt
app/
  (public)/
  (auth)/
  account/
  admin/
components/
  ui/
  layout/
features/
  products/
  categories/
  quotes/
  orders/
  uploads/
  users/
  policies/
lib/
  db/
  auth/
  env/
  validation/
  whatsapp/
prisma/
docs/
```

### 4. Prisma y base de datos

- Instalar Prisma.
- Crear schema inicial.
- Configurar PostgreSQL por variable de entorno.
- Crear seed minimo para roles y categorias base.

### 5. Seguridad base

- Validacion centralizada de variables de entorno.
- Preparar helpers de autorizacion.
- Definir convencion de errores.
- Evitar exponer secretos en cliente.

### 6. Documentacion tecnica

- Actualizar README con comandos.
- Documentar variables de entorno.
- Documentar flujo local de desarrollo.

## Criterios de aceptacion

- `npm run build` funciona.
- `npm run lint` funciona.
- `npm run typecheck` funciona si se define script.
- Proyecto corre localmente.
- `.env.example` documenta variables requeridas.
- Estructura base refleja dominios principales.
- No hay secretos reales en Git.

## Riesgos

- Instalar una version de Next.js con cambios no revisados.
- Mezclar admin, publico y comprador sin separacion clara.
- Crear demasiadas abstracciones antes de tener features reales.
- Omitir validacion de entorno.

## No hacer en Fase 1

- No construir UI final.
- No implementar login completo.
- No crear CRUDs.
- No integrar WhatsApp Business API.
- No integrar pagos.
- No resolver todo el modelo de datos definitivo.

