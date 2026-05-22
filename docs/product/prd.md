# PRD - Dinamiqo

## Vision

Dinamiqo sera una plataforma de comercio y cotizacion para productos
personalizados por sublimacion, enfocada en una experiencia confiable, visual y facil de
usar. El objetivo inicial no es automatizar todo el proceso de venta, sino ordenar el
catalogo, capturar correctamente los datos del cliente y cerrar la conversacion comercial
por WhatsApp sin perder trazabilidad.

## Usuarios principales

### Visitante

Persona que explora productos, compara opciones y puede iniciar una cotizacion sin crear
cuenta.

Necesita:

- Ver productos y ejemplos rapidamente.
- Entender precios desde, tiempos y opciones.
- Enviar una solicitud clara por WhatsApp.

### Comprador registrado

Cliente recurrente que quiere guardar datos, favoritos, archivos e historial.

Necesita:

- Reutilizar informacion para futuras compras.
- Consultar cotizaciones anteriores.
- Ver estados de pedidos.
- Aprobar disenos cuando aplique.

### Administrador

Persona que opera el negocio.

Necesita:

- Crear productos, categorias, variantes y campos de personalizacion.
- Revisar cotizaciones y archivos.
- Dar seguimiento a pedidos.
- Configurar banners, politicas y datos del negocio.

### Disenador o produccion

Rol futuro o secundario para separar operaciones.

Necesita:

- Ver pedidos asignados.
- Subir pruebas de diseno.
- Cambiar estados relacionados con diseno o produccion.

## Objetivos de negocio

- Presentar una marca profesional y confiable.
- Reducir mensajes incompletos por WhatsApp.
- Organizar pedidos personalizados con datos completos.
- Crear historial para clientes y administradores.
- Preparar la base para pagos online y WhatsApp Business API en el futuro.

## Alcance funcional inicial

### Publico

- Home.
- Catalogo.
- Categorias.
- Busqueda.
- Filtros.
- Detalle de producto.
- Politicas.
- Contacto.
- Cotizacion por WhatsApp.

### Comprador

- Registro.
- Login con Google.
- Login con correo y contrasena.
- Perfil.
- Favoritos.
- Historial.
- Datos de contacto.

### Administrador

- Dashboard.
- CRUD productos.
- CRUD categorias.
- Variantes y atributos.
- Campos de personalizacion.
- Pedidos/cotizaciones.
- Usuarios.
- Banners.
- Politicas.
- Estadisticas basicas.

## No objetivos iniciales

- Pasarela de pago.
- Facturacion electronica.
- WhatsApp Business API.
- Editor visual tipo Canva.
- Automatizacion completa de produccion.
- Marketplace multi-vendedor.
- App movil nativa.

## Requisitos funcionales prioritarios

- El usuario puede encontrar productos por categoria, busqueda y filtros.
- El producto puede tener variantes con impacto en precio o disponibilidad.
- El producto puede requerir campos de personalizacion configurables.
- El usuario puede subir archivos antes de enviar la cotizacion.
- El sistema guarda una cotizacion antes de abrir WhatsApp.
- El mensaje de WhatsApp incluye resumen completo y numero de cotizacion.
- El comprador registrado puede ver historial.
- El administrador puede administrar catalogo y cotizaciones.
- El administrador puede cambiar estados y agregar notas internas.

## Requisitos no funcionales

- Mobile-first.
- Buen SEO tecnico para productos y categorias.
- Carga rapida del catalogo.
- Archivos privados por defecto.
- Validaciones de datos en cliente y servidor.
- Control de roles en backend.
- Auditoria basica para acciones administrativas.
- Backups de base de datos.
- Variables de entorno fuera del repositorio.

## Indicadores de exito

- Porcentaje de cotizaciones con datos completos.
- Numero de cotizaciones enviadas por WhatsApp.
- Productos mas consultados.
- Categorias mas visitadas.
- Cotizaciones convertidas manualmente a pedido.
- Tiempo promedio de respuesta.
- Pedidos por estado.

