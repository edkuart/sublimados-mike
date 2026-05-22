# Fase 9 - Panel del comprador

## Completado

- Layout protegido del comprador:
  - sidebar de navegacion.
  - email de sesion.
  - accion de logout.
- Datos mock centralizados en `features/account`.
- Vista resumen `/account`.
- Vista perfil `/account/profile`.
- Vista historial `/account/history`.
- Vista favoritos `/account/favorites`.
- Vista preferencias `/account/settings`.

## Incluye

- Estadisticas de cuenta.
- Cotizaciones recientes.
- Formulario visual de datos de contacto.
- Historial de cotizaciones/pedidos.
- Productos favoritos.
- Preferencias de notificacion y privacidad.

## Pendiente

- Persistir perfil en base de datos.
- Leer historial real desde `Quote` y `Order`.
- Leer favoritos reales desde `Favorite`.
- Asociar archivos subidos al usuario.
- Crear acciones server-side para guardar datos del comprador.

## Nota

Las rutas estan protegidas por `proxy.ts` y `requireUser`. Sin Supabase configurado,
redirigen a `/login`.

