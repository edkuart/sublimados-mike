# ADR 0005 - Separar variantes de personalizacion

## Estado

Aceptada.

## Contexto

Los productos sublimados combinan atributos estandar con datos unicos del cliente. Si todo
se modela como variante, el catalogo se vuelve inmanejable.

## Decision

Las variantes representaran diferencias vendibles: talla, color, material, capacidad,
acabado, zona de impresion o combinaciones con impacto en precio, stock o produccion.

La personalizacion vivira como campos configurables del producto y respuestas de la
cotizacion o pedido: nombre, frase, foto, logo, fecha, fuente, color de texto y
observaciones.

## Consecuencias

Ventajas:

- Catalogo mas simple.
- Mejor experiencia administrativa.
- Menos explosion de combinaciones.
- Cotizaciones mas flexibles.

Costos:

- El calculo de precio debe considerar variantes y personalizacion por separado.
- El admin necesitara configurar campos por producto.

## Revaluar cuando

- Se quiera vender inventario altamente estandarizado sin personalizacion.
- Algunos campos personalizados empiecen a afectar precio de forma repetible.

