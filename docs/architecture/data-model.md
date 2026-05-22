# Modelo inicial de base de datos

## Entidades principales

### Usuarios y permisos

- `User`: identidad principal del comprador o administrador.
- `Profile`: nombre, telefono, direccion, ciudad, preferencias.
- `Role`: `CUSTOMER`, `ADMIN`, `SUPER_ADMIN`, `DESIGNER`, `PRODUCTION`.
- `UserRole`: relacion flexible entre usuarios y roles.

### Catalogo

- `Category`: categorias como tazas, playeras, termos, gorras, llaveros, cojines.
- `Product`: producto principal con nombre, slug, descripcion, precio base y estado.
- `ProductImage`: imagenes de galeria, imagen principal y orden.
- `ProductOption`: grupos de opcion como talla, color, material, acabado.
- `ProductOptionValue`: valores como S, M, L, blanco, negro, mate, brillante.
- `ProductVariant`: combinacion vendible con SKU, precio adicional, stock e imagen.

### Personalizacion

- `CustomizationField`: campos requeridos por producto, como texto, nombre, logo, foto,
  tipografia, color de texto, fecha u observaciones.
- `CustomizationFieldOption`: opciones controladas para campos como fuente o posicion.

### Archivos

- `UploadedFile`: archivo subido por cliente o administrador.
- `FileUsage`: relacion entre archivo y cotizacion, pedido, prueba de diseno o producto.

### Cotizaciones y pedidos

- `Quote`: cotizacion guardada antes de abrir WhatsApp.
- `QuoteItem`: producto, variante, cantidad y precio estimado.
- `QuoteItemCustomization`: respuestas de personalizacion del cliente.
- `Order`: pedido derivado de cotizacion o confirmado manualmente por admin.
- `OrderItem`: items confirmados.
- `OrderStatusHistory`: historial de cambios de estado.
- `DesignProof`: prueba de diseno, version, archivo, estado y aprobacion.

### Contenido y configuracion

- `PolicyPage`: politicas de envios, privacidad, cambios, devoluciones y aprobacion.
- `Banner`: banners para home o categorias.
- `Setting`: numero de WhatsApp, moneda, horarios, datos del negocio.
- `AuditLog`: acciones administrativas sensibles.

## Estados sugeridos

### Cotizacion

- `DRAFT`
- `READY_TO_SEND`
- `SENT_TO_WHATSAPP`
- `EXPIRED`

### Pedido

- `CONTACT_PENDING`
- `DESIGN_PENDING`
- `DESIGN_SENT`
- `DESIGN_APPROVED`
- `IN_PRODUCTION`
- `READY`
- `DELIVERED`
- `CANCELLED`

### Archivo

- `UPLOADED`
- `VALIDATED`
- `REJECTED`
- `ARCHIVED`

## Regla clave de modelado

No todo debe ser una variante. Las variantes representan diferencias vendibles que afectan
precio, inventario, SKU o produccion estandar. La personalizacion del cliente debe vivir
como respuestas del pedido o cotizacion.

Ejemplos:

- Variante: playera talla M, color negro.
- Variante: taza 11 oz blanca.
- Personalizacion: nombre "Carlos", foto familiar, frase, logo, observaciones.

