import {
  FileImage,
  Handshake,
  LockKeyhole,
  PackageCheck,
  RotateCcw,
  Truck,
} from "lucide-react";

export type PolicySection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type PolicyPageContent = {
  slug: string;
  title: string;
  summary: string;
  icon: typeof Handshake;
  updatedAt: string;
  sections: PolicySection[];
};

export const policyPages: PolicyPageContent[] = [
  {
    slug: "terminos",
    title: "Terminos de uso y cotizacion",
    summary: "Condiciones generales para solicitar productos personalizados por sublimacion.",
    icon: Handshake,
    updatedAt: "22/05/2026",
    sections: [
      {
        heading: "Naturaleza de la cotizacion",
        body: "El sitio permite preparar una solicitud de cotizacion y enviarla por WhatsApp. El envio del formulario no constituye una compra pagada ni una orden final hasta que Sublimados Mike confirme precio, disponibilidad, tiempos y detalles por WhatsApp.",
      },
      {
        heading: "Productos personalizados",
        body: "Los productos se fabrican con informacion, textos, imagenes, logos o referencias entregadas por el cliente. El cliente es responsable de revisar ortografia, nombres, fechas, colores solicitados y datos finales antes de aprobar la prueba visual.",
      },
      {
        heading: "Precios y disponibilidad",
        body: "Los precios mostrados son estimados y pueden variar segun cantidad, material, urgencia, complejidad del diseno, envio o requerimientos especiales.",
      },
    ],
  },
  {
    slug: "privacidad",
    title: "Politica de privacidad",
    summary: "Uso de datos personales, contacto y referencias enviadas por clientes.",
    icon: LockKeyhole,
    updatedAt: "22/05/2026",
    sections: [
      {
        heading: "Datos que solicitamos",
        body: "Para preparar una cotizacion podemos solicitar nombre, telefono, ciudad o zona, metodo de entrega, observaciones, imagenes, logos y referencias de personalizacion.",
      },
      {
        heading: "Uso de la informacion",
        body: "La informacion se usa para atender la cotizacion, preparar pruebas visuales, coordinar entrega, dar seguimiento por WhatsApp y mejorar el servicio.",
        bullets: [
          "No vendemos datos personales.",
          "No publicamos archivos del cliente sin autorizacion.",
          "El acceso interno debe limitarse a personas que participan en venta, diseno o produccion.",
        ],
      },
      {
        heading: "Retencion",
        body: "Los datos y archivos pueden conservarse temporalmente para seguimiento, reclamos, reimpresiones o compras futuras. El cliente puede solicitar revision o eliminacion cuando aplique.",
      },
    ],
  },
  {
    slug: "archivos",
    title: "Politica de archivos e imagenes",
    summary: "Reglas para fotos, logos, referencias, privacidad y calidad de impresion.",
    icon: FileImage,
    updatedAt: "22/05/2026",
    sections: [
      {
        heading: "Formatos aceptados",
        body: "El sistema acepta archivos de referencia como JPG, PNG, WEBP, SVG y PDF, sujetos a validacion de tamano, extension y tipo de contenido.",
      },
      {
        heading: "Calidad de impresion",
        body: "La calidad final depende de la resolucion y nitidez del archivo enviado. Si un archivo no es apto para sublimacion, Sublimados Mike puede solicitar una version mejor antes de producir.",
      },
      {
        heading: "Privacidad de archivos",
        body: "Los archivos de clientes no deben servirse publicamente por defecto. En produccion deben almacenarse en un bucket privado o sistema equivalente con acceso controlado.",
      },
    ],
  },
  {
    slug: "envios",
    title: "Politica de envios y entregas",
    summary: "Tiempos, cobertura, recoleccion y coordinacion de entrega en Guatemala.",
    icon: Truck,
    updatedAt: "22/05/2026",
    sections: [
      {
        heading: "Tiempos de produccion",
        body: "Los tiempos empiezan a contar despues de confirmar detalles y aprobar la prueba visual cuando el producto la requiera.",
      },
      {
        heading: "Opciones de entrega",
        body: "El cliente puede solicitar recoleccion o envio a domicilio. El costo de envio puede variar segun zona, municipio, urgencia o proveedor logistico.",
      },
      {
        heading: "Retrasos",
        body: "Pueden existir retrasos por aprobaciones tardias, archivos de baja calidad, cambios solicitados, disponibilidad de insumos o condiciones externas de entrega.",
      },
    ],
  },
  {
    slug: "cambios-devoluciones",
    title: "Cambios y devoluciones",
    summary: "Condiciones para productos personalizados, errores y reclamos.",
    icon: RotateCcw,
    updatedAt: "22/05/2026",
    sections: [
      {
        heading: "Productos personalizados",
        body: "Por su naturaleza personalizada, los productos aprobados y fabricados segun la prueba visual no suelen admitir devolucion por cambio de opinion.",
      },
      {
        heading: "Errores de produccion",
        body: "Si existe un error atribuible a Sublimados Mike frente a la prueba aprobada, se revisara el caso para corregir, reimprimir o acordar una solucion.",
      },
      {
        heading: "Reclamos",
        body: "Los reclamos deben enviarse con fotos claras, numero de pedido y descripcion del problema dentro del periodo acordado al confirmar la venta.",
      },
    ],
  },
  {
    slug: "aprobacion-diseno",
    title: "Aprobacion de diseno",
    summary: "Como funciona la prueba visual antes de imprimir productos personalizados.",
    icon: PackageCheck,
    updatedAt: "22/05/2026",
    sections: [
      {
        heading: "Prueba visual",
        body: "Para productos que lo requieran, Sublimados Mike envia una prueba visual antes de producir. La produccion inicia solo despues de recibir aprobacion del cliente.",
      },
      {
        heading: "Cambios",
        body: "Se pueden solicitar ajustes razonables antes de aprobar. Cambios mayores, redisenos o multiples versiones pueden afectar precio y tiempo de entrega.",
      },
      {
        heading: "Aprobacion final",
        body: "Al aprobar, el cliente confirma nombres, textos, imagenes, ubicacion de elementos, colores aproximados y detalles relevantes del diseno.",
      },
    ],
  },
];

export function getPolicyPage(slug: string) {
  return policyPages.find((policy) => policy.slug === slug);
}
