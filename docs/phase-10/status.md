# Fase 10: Panel Administrador

## Objetivo

Crear la base navegable del panel administrador para operar catalogo, pedidos, usuarios,
contenido y configuracion antes de conectar CRUD real contra PostgreSQL.

## Implementado

- Proteccion de rutas admin con `requireAdminUser`.
- Lectura inicial de roles desde metadata administrada de Supabase (`app_metadata.roles`).
- Shell lateral de administracion con navegacion, acceso a tienda y cierre de sesion.
- Dashboard operativo con KPIs, pipeline, pedidos recientes y tareas criticas.
- Paginas iniciales:
  - `/admin/products`
  - `/admin/orders`
  - `/admin/users`
  - `/admin/content`
  - `/admin/settings`
- Datos fallback centralizados en `src/features/admin/admin-data.ts`.

## Modulos principales

- `src/lib/auth/session.ts`
- `src/components/layout/admin-shell.tsx`
- `src/features/admin/admin-data.ts`
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/products/page.tsx`
- `src/app/admin/orders/page.tsx`
- `src/app/admin/users/page.tsx`
- `src/app/admin/content/page.tsx`
- `src/app/admin/settings/page.tsx`

## Criterios de aceptacion

- Un usuario sin sesion no puede entrar a `/admin`.
- Un usuario autenticado sin rol `ADMIN` o `SUPER_ADMIN` se redirige a `/account`.
- El panel tiene navegacion persistente y rutas separadas por area operativa.
- La UI no depende aun de base de datos real.
- TypeScript, lint y build deben pasar.

## Riesgos

- Los roles reales dependen de configurar Supabase Auth correctamente.
- Las rutas admin son solo base visual/operativa; no realizan mutaciones todavia.
- El CRUD debe agregar validaciones, auditoria y permisos por accion antes de produccion.

## No hacer todavia

- No implementar CRUD completo de productos hasta cerrar formularios, validaciones y modelo de imagenes.
- No exponer archivos privados desde el panel sin URLs firmadas o proxy seguro.
- No permitir cambios de roles sin auditoria.
- No integrar pagos ni WhatsApp Business API en esta fase.
