# Plan de Deploy Profesional - Sublimados Mike

## Estrategia recomendada

Usar despliegue Next.js completo sobre Node.js o plataforma compatible con App Router.
No usar static export porque el proyecto necesita:

- autenticacion;
- proxy;
- route handlers;
- subida y lectura protegida de archivos;
- healthcheck;
- futuras mutaciones administrativas.

Opciones viables:

- Vercel para despliegue Next.js administrado.
- Railway o Render si se prefiere Node.js server con variables, logs y Postgres cercano.
- Docker/Node.js server si se necesita control de infraestructura.

## Comandos de verificacion

Antes de deploy:

```bash
npm run deploy:env
npm run deploy:check
```

Con staging activo:

```bash
QA_BASE_URL=https://staging.sublimadosmike.gt npm run qa:smoke
```

## Variables requeridas en produccion

- `DATABASE_URL`: PostgreSQL real con SSL cuando el proveedor lo requiera.
- `NEXT_PUBLIC_APP_URL`: URL publica final.
- `NEXT_PUBLIC_BRAND_NAME`: nombre visible de marca.
- `NEXT_PUBLIC_WHATSAPP_PHONE`: telefono con codigo de pais, solo digitos.
- `NEXT_PUBLIC_SUPABASE_URL`: URL del proyecto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon key publica de Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: solo si se usan tareas server-side con privilegios.

Variables operativas recomendadas:

- `SENTRY_DSN` o proveedor equivalente.
- `LOG_DRAIN_URL` si el host permite log drains.
- `BACKUP_STORAGE_BUCKET` para respaldos.
- `BACKUP_RETENTION_DAYS` para politica de retencion.

## Healthcheck

Ruta:

```text
GET /api/health
```

La respuesta incluye:

- estado de aplicacion;
- configuracion de base de datos;
- configuracion de Supabase;
- configuracion de WhatsApp;
- timestamp.

Esta ruta no debe exponer secretos ni probar credenciales sensibles en detalle. Para
monitoreo externo basta validar HTTP 200 y tiempo de respuesta.

## Base de datos

Recomendacion:

- PostgreSQL administrado.
- Backups automaticos diarios.
- Retencion inicial: 30 dias.
- Acceso restringido por IP o red privada si el proveedor lo permite.
- Migraciones ejecutadas manualmente o por pipeline controlado.

Antes de produccion:

```bash
npm run prisma:generate
npm run prisma:migrate
```

En produccion, evitar `prisma migrate dev`; usar flujo equivalente a deploy de migraciones
cuando se formalice CI/CD.

## Archivos

El almacenamiento local `.uploads` sirve para desarrollo y prototipo. En produccion no debe
ser la fuente final si el entorno es serverless o tiene disco efimero.

Recomendacion:

- Supabase Storage privado, S3 o Cloudflare R2.
- Buckets privados.
- URLs firmadas con expiracion.
- Politica de retencion y borrado.
- Antivirus o revision manual si se aceptan PDF/SVG de terceros.

## Monitoreo

Monitorear:

- disponibilidad de `/api/health`;
- errores 5xx;
- latencia p95;
- fallos de subida;
- eventos de rate limit;
- errores de autenticacion inesperados;
- builds fallidos;
- uso de almacenamiento;
- crecimiento de base de datos.

Logs importantes:

- `audit` generado por endpoints sensibles;
- errores de route handlers;
- eventos de auth/callback;
- errores de Prisma;
- errores de subida/lectura de archivos.

## Backups

Base de datos:

- backup diario automatico;
- prueba de restauracion mensual;
- retencion minima 30 dias;
- snapshot antes de migraciones importantes.

Archivos:

- versionado o backup incremental si se usa S3/R2;
- retencion alineada con politica de privacidad;
- borrado seguro cuando el cliente lo solicite y aplique.

## Checklist de release

- `npm run deploy:env` pasa.
- `npm run deploy:check` pasa.
- `npm run qa:smoke` pasa contra staging.
- Variables de produccion configuradas.
- Dominio y SSL activos.
- Callback de Supabase configurado para dominio final.
- WhatsApp real configurado.
- Storage privado configurado.
- Backups activos.
- Monitoreo de uptime activo.
- Log drain o dashboard de errores activo.
- Politicas publicas revisadas.

## Rollback

Plan minimo:

- conservar build anterior en la plataforma;
- no ejecutar migraciones destructivas sin backup;
- documentar version desplegada;
- si falla deploy, revertir al build anterior y bloquear nuevas migraciones hasta revisar.
