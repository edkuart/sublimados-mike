# Fase 0 - Investigacion, alcance y arquitectura

## Objetivo

Definir la base profesional de "Sublimados Mike" antes de escribir codigo: propuesta de
valor, alcance funcional, arquitectura tecnica, modelo de datos, riesgos, politicas,
flujos y roadmap de construccion.

## Resumen ejecutivo

Sublimados Mike debe construirse como una plataforma de cotizacion y pedidos
personalizados, no solamente como una tienda con carrito tradicional. El cierre comercial
inicial sera por WhatsApp, pero cada cotizacion debe quedar registrada en el sistema para
dar seguimiento, consultar historial, controlar estados y administrar produccion.

La experiencia debe guiar al cliente para elegir producto, variantes, personalizacion,
archivos, datos de contacto y observaciones. El sistema debe generar un mensaje
prellenado de WhatsApp con un numero de cotizacion y un resumen claro.

## Alcance inicial recomendado

- Pagina publica con home, catalogo, categorias, busqueda, filtros y detalle de producto.
- Productos configurables con variantes y campos de personalizacion.
- Subida segura de imagenes, logos o referencias.
- Cotizacion persistida antes de abrir WhatsApp.
- Registro e inicio de sesion de compradores.
- Panel del comprador con perfil, favoritos e historial.
- Panel administrador para productos, categorias, pedidos, usuarios, banners y politicas.
- Estados de pedido/cotizacion y trazabilidad basica.

## Principios de producto

- Separar variantes vendibles de datos personalizados del pedido.
- Mostrar precio base y precio estimado, no prometer precio final si depende de revision.
- Solicitar aprobacion de diseno antes de produccion cuando aplique.
- No exponer publicamente archivos de clientes por defecto.
- Reducir friccion: permitir cotizar como invitado, pero ofrecer cuenta para historial.
- Usar WhatsApp como canal de cierre, no como unica fuente de verdad.

## Criterios de aceptacion de Fase 0

- Existe carpeta raiz del proyecto.
- Existe documentacion inicial de producto, arquitectura y roadmap.
- Estan identificadas las decisiones pendientes antes de iniciar Fase 1.
- Hay una recomendacion tecnica clara para construir el proyecto.
- No se han instalado dependencias ni creado codigo de aplicacion todavia.

