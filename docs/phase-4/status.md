# Fase 4 - Estado

## Completado

- Schema Prisma reforzado con indices operativos.
- Campo `authUserId` agregado a `User` para vincular usuarios internos con Supabase Auth.
- Campos de control de usuario agregados:
  - `isActive`
  - `lastLoginAt`
- `storageKey` de archivos marcado como unico.
- Restriccion unica para versiones de pruebas de diseno por pedido.
- Cliente DB creado en `src/lib/db/client.ts` usando Prisma 7 y `@prisma/adapter-pg`.
- Seed inicial creado en `prisma/seed.ts`.
- Script `npm run prisma:seed` agregado.

## Seed inicial

El seed crea:

- Roles:
  - `CUSTOMER`
  - `ADMIN`
  - `SUPER_ADMIN`
  - `DESIGNER`
  - `PRODUCTION`
- Categorias:
  - Tazas
  - Playeras
  - Termos
  - Llaveros
  - Cojines
  - Regalos personalizados
- Politicas base:
  - Privacidad
  - Envios
  - Productos personalizados
- Setting:
  - `whatsapp_phone`
- Banner principal de home.
- Producto inicial:
  - Taza blanca personalizada.

## Comandos cuando exista base de datos

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Pendiente

- Configurar `DATABASE_URL` real.
- Ejecutar primera migracion contra Supabase/PostgreSQL.
- Revisar SQL generado antes de produccion.
- Sincronizar el usuario de Supabase Auth con `User.authUserId`.
- Crear DAL real para productos, categorias y cotizaciones.

## Notas

- No se ejecuto migracion ni seed porque todavia no hay base real configurada.
- `DATABASE_URL` del `.env` actual sigue siendo valor de ejemplo generado por Prisma.

