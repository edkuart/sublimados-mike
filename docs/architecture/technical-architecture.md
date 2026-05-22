# Arquitectura tecnica recomendada

## Enfoque recomendado

Para la primera version profesional conviene usar un monolito modular con Next.js,
TypeScript, PostgreSQL y Prisma. Esto reduce complejidad operativa, acelera el desarrollo
y permite construir pagina publica, panel comprador, panel admin y APIs internas en una
misma base.

Un backend separado con NestJS puede evaluarse despues, especialmente si se integran pagos,
WhatsApp Business API, automatizaciones, webhooks complejos o integraciones externas.

## Stack base

- Lenguaje: TypeScript.
- Framework: Next.js.
- UI: Tailwind CSS.
- Base de datos: PostgreSQL.
- ORM: Prisma.
- Autenticacion: Supabase Auth.
- Archivos privados: Supabase Storage.
- Imagenes publicas optimizadas: Cloudinary opcional.
- Hosting web: Vercel.
- Base de datos/Auth/Storage: Supabase.
- WhatsApp inicial: enlace `wa.me` con texto prellenado.
- WhatsApp futuro: Meta WhatsApp Business Platform / Cloud API.

## Modulos principales

- Publico: home, catalogo, categorias, busqueda, detalle de producto, politicas.
- Auth: login, registro, OAuth, sesiones, roles.
- Comprador: perfil, favoritos, historial, archivos.
- Admin: dashboard, productos, categorias, variantes, pedidos, usuarios, banners.
- Cotizacion: seleccion de producto, variantes, personalizacion, archivos, resumen.
- WhatsApp: generador de mensaje, trazabilidad de envio.
- Storage: validacion, subida, permisos, URLs firmadas.
- Seguridad: autorizacion, rate limiting, auditoria, validaciones.

## Decisiones de arquitectura

### Monolito modular primero

Ventajas:

- Menor costo de infraestructura.
- Menos repositorios y menos sincronizacion.
- Mejor velocidad para construir el producto inicial.
- Suficiente para catalogo, pedidos, admin y compradores.

Riesgo:

- Si se mezclan responsabilidades sin estructura, el proyecto puede volverse dificil de
  mantener.

Mitigacion:

- Separar dominio en modulos: productos, cotizaciones, pedidos, usuarios, archivos,
  configuracion y politicas.

### Supabase Auth recomendado

Ventajas:

- OAuth con Google y Facebook.
- Integracion natural con PostgreSQL.
- Menos riesgo que autenticacion propia al inicio.

Riesgos:

- Dependencia de proveedor.
- Configuracion cuidadosa de callbacks y permisos.

### Storage privado por defecto

Los archivos de clientes deben ser privados, especialmente logos, fotos familiares,
documentos o referencias personales. Para compartir internamente se deben usar URLs
firmadas y con expiracion.

## Arquitectura futura

Cuando el negocio crezca, se puede dividir:

- Frontend Next.js en Vercel.
- API NestJS en Railway/Render/Fly.io.
- Workers para procesamiento de imagenes, notificaciones o integraciones.
- WhatsApp Business API con webhooks.
- Pasarela de pago.
- Analitica avanzada y CRM.

