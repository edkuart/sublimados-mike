# Fase 3 - Estado

## Completado

- Paquetes instalados:
  - `@supabase/supabase-js`
  - `@supabase/ssr`
- Guia local de autenticacion de Next.js 16 revisada antes de implementar.
- Cliente Supabase SSR preparado con `getAll`/`setAll`.
- Helpers de sesion:
  - `getCurrentUser`
  - `requireUser`
- Roles base definidos en codigo.
- Server Actions iniciales:
  - login con correo y contrasena.
  - registro con correo y contrasena.
  - Google OAuth.
  - logout.
- Rutas creadas:
  - `/login`
  - `/register`
  - `/account`
  - `/admin`
  - `/auth/callback`
- `proxy.ts` agregado para proteger `/account` y `/admin`.

## Decisiones de seguridad aplicadas

- No se usa `getSession()` para autorizacion.
- Se usa `getUser()` para verificar identidad con Supabase Auth.
- Si Supabase no esta configurado, las rutas protegidas redirigen a `/login`.
- Las pantallas de auth muestran un mensaje claro cuando faltan variables de entorno.
- Las validaciones de formularios se hacen en Server Actions con Zod.

## Pendiente

- Configurar proyecto real de Supabase.
- Definir URLs de callback para Google OAuth.
- Sincronizar `auth.users` de Supabase con tabla `User` de la app.
- Cargar roles desde base de datos, no solo helpers en codigo.
- Proteger datos sensibles cerca del DAL cuando existan consultas reales.
- Evaluar Facebook Login despues de validar Google/email.

## Variables necesarias

```txt
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

