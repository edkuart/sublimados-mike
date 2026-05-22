# Notas de investigacion

## Hallazgos principales

- Las variantes deben usarse para diferencias vendibles que afectan precio, inventario,
  SKU o produccion: talla, color, capacidad, material, acabado.
- La personalizacion del cliente debe guardarse como respuestas de cotizacion o pedido:
  nombres, frases, fotos, logos, fechas, instrucciones y observaciones.
- El flujo por WhatsApp debe guardar primero una cotizacion interna; el mensaje
  prellenado debe incluir el numero de cotizacion.
- `wa.me` no adjunta archivos automaticamente, por lo que las imagenes y logos deben
  subirse al sistema antes de abrir WhatsApp.
- Los productos personalizados necesitan politicas explicitas de aprobacion de diseno,
  cancelacion, cambios, devoluciones, privacidad y uso de imagenes.
- La carga de archivos es un area de alto riesgo y debe tratarse con validacion,
  almacenamiento privado, limites y autorizacion.

## Fuentes utiles

- Shopify - Variants: https://help.shopify.com/en/manual/products/variants/add-variants
- WooCommerce - Variable products: https://woocommerce.com/document/variable-product/
- Etsy - Personalized listings: https://help.etsy.com/hc/en-us/articles/360000344528-How-to-Offer-Personalized-Listings
- WhatsApp - Click to chat: https://faq.whatsapp.com/5913398998672934
- Meta - WhatsApp Business Platform: https://developers.facebook.com/docs/whatsapp/
- OWASP - File Upload Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- OWASP - API Security Top 10: https://owasp.org/API-Security/editions/2023/en/0x11-t10/
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Storage: https://supabase.com/docs/guides/storage
- Cloudinary Upload Presets: https://cloudinary.com/documentation/upload_presets
- Baymard - Ecommerce UX: https://baymard.com/learn/ecommerce-ux-best-practices
- DIACO Guatemala - Internet: https://diaco.gob.gt/internet/

## Implicaciones para Dinamiqo

- El primer entregable tecnico debe priorizar catalogo configurable, cotizacion
  persistida, subida segura y flujo WhatsApp.
- El panel administrador no debe ser un extra tardio; es necesario para operar pedidos y
  estados desde el inicio profesional.
- Facebook Login es viable, pero puede dejarse detras de Google/email si retrasa la
  configuracion inicial.
- WhatsApp Business API debe entrar despues de validar volumen de pedidos y proceso
  operativo.

