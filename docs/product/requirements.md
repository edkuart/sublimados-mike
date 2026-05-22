# Requisitos iniciales

## Prioridad P0

- Catalogo publico navegable.
- Detalle de producto con variantes y personalizacion.
- Creacion de cotizacion.
- Subida segura de archivos.
- Mensaje WhatsApp prellenado.
- Admin basico de productos y categorias.
- Admin basico de cotizaciones.
- Autenticacion de admin.
- Politicas publicas.

## Prioridad P1

- Registro de compradores.
- Login con Google.
- Perfil del comprador.
- Favoritos.
- Historial de cotizaciones.
- Estados de pedido.
- Pruebas de diseno.
- Banners administrables.
- Estadisticas basicas.

## Prioridad P2

- Login con Facebook.
- Roles de disenador y produccion.
- Analitica avanzada.
- Automatizaciones de mensajes.
- WhatsApp Business API.
- Pagos online.
- Cupones o promociones.

## Reglas de negocio iniciales

- Una cotizacion puede crearse como invitado o como comprador registrado.
- Para enviar por WhatsApp, se debe capturar al menos nombre, telefono, producto,
  cantidad y variantes requeridas.
- Si el producto requiere archivo, la cotizacion debe incluir archivo o indicar que se
  enviara despues por WhatsApp.
- El precio mostrado al cliente sera estimado salvo productos con precio fijo.
- Los productos personalizados requieren aceptacion de politica antes de enviar.
- Los archivos de cliente no son publicos.
- El administrador puede convertir una cotizacion en pedido.

## Datos minimos para WhatsApp

- Numero de cotizacion.
- Nombre del cliente.
- Telefono.
- Producto.
- Cantidad.
- Variantes seleccionadas.
- Personalizacion.
- Referencias de archivos.
- Precio estimado.
- Entrega o recogida.
- Ciudad/zona.
- Observaciones.
- Aceptacion de politicas.

## Validaciones clave

- Telefono requerido y con formato aceptable.
- Cantidad mayor a cero.
- Variantes requeridas completas.
- Campos de personalizacion requeridos completos.
- Archivos dentro de limite de tamano.
- Extension y tipo de archivo permitidos.
- Politicas aceptadas.

