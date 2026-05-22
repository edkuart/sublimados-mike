import { BadgeCheck, BedDouble, Coffee, Frame, Gift, ImageUp, KeyRound, Palette, Shirt, Sparkles, Thermometer, Trophy } from "lucide-react";
import type { CatalogCategory, CatalogProduct, ProductDetail } from "./catalog-types";

export const fallbackCategories: CatalogCategory[] = [
  {
    name: "Tazas",
    slug: "tazas",
    description: "Blancas, mágicas y con interior de color",
    icon: Coffee,
    itemCount: "12",
    tone: "purple",
    blurb: "Blancas, mágicas y con interior de color",
    count: 12,
  },
  {
    name: "Playeras",
    slug: "playeras",
    description: "Eventos, equipos, regalos y empresas",
    icon: Shirt,
    itemCount: "18",
    tone: "teal",
    blurb: "Eventos, equipos, regalos y empresas",
    count: 18,
  },
  {
    name: "Termos",
    slug: "termos",
    description: "Nombres, logos y frases de uso diario",
    icon: Thermometer,
    itemCount: "9",
    tone: "ink",
    blurb: "Nombres, logos y frases de uso diario",
    count: 9,
  },
  {
    name: "Llaveros",
    slug: "llaveros",
    description: "Acrílico, MDF y metal con fotografía",
    icon: KeyRound,
    itemCount: "22",
    tone: "coral",
    blurb: "Acrílico, MDF y metal con fotografía",
    count: 22,
  },
  {
    name: "Almohadas",
    slug: "almohadas",
    description: "Cojines suaves con foto a todo color",
    icon: BedDouble,
    itemCount: "7",
    tone: "gold",
    blurb: "Cojines suaves con foto a todo color",
    count: 7,
  },
  {
    name: "Regalos",
    slug: "regalos",
    description: "Combos para ocasiones especiales",
    icon: Gift,
    itemCount: "15",
    tone: "purple",
    blurb: "Combos para ocasiones especiales",
    count: 15,
  },
  {
    name: "Decoración",
    slug: "decoracion",
    description: "Cuadros, pizarras y placas memorables",
    icon: Frame,
    itemCount: "11",
    tone: "teal",
    blurb: "Cuadros, pizarras y placas memorables",
    count: 11,
  },
  {
    name: "Especiales",
    slug: "especiales",
    description: "Lanzamientos y productos de temporada",
    icon: Sparkles,
    itemCount: "6",
    tone: "coral",
    blurb: "Lanzamientos y productos de temporada",
    count: 6,
  },
];

export const fallbackProducts: CatalogProduct[] = [
  {
    name: "Taza blanca personalizada",
    slug: "taza-blanca-personalizada",
    category: "Tazas",
    categorySlug: "tazas",
    price: "Desde Q55",
    productionTime: "24–48 h",
    imageTone: "purple",
    badge: "Popular",
    productKind: "mug",
    personalization: ["Foto", "Nombre", "Frase"],
    description: "Taza 11 oz sublimada con foto, nombre o frase para regalo o evento.",
  },
  {
    name: "Playera sublimada full color",
    slug: "playera-sublimada",
    category: "Playeras",
    categorySlug: "playeras",
    price: "Desde Q85",
    productionTime: "2–3 días",
    imageTone: "teal",
    badge: "Nuevo",
    productKind: "shirt",
    personalization: ["Talla", "Color", "Logo"],
    description: "Playera personalizada para eventos, equipos, empresas o regalos.",
  },
  {
    name: "Termo metálico con nombre",
    slug: "termo-con-nombre",
    category: "Termos",
    categorySlug: "termos",
    price: "Desde Q120",
    productionTime: "2 días",
    imageTone: "ink",
    badge: null,
    productKind: "thermos",
    personalization: ["Nombre", "Color", "Estilo"],
    description: "Termo personalizado con nombre, frase o logo.",
  },
  {
    name: "Cojín con foto",
    slug: "cojin-con-foto",
    category: "Almohadas",
    categorySlug: "almohadas",
    price: "Desde Q95",
    productionTime: "2–4 días",
    imageTone: "coral",
    badge: "Temporada",
    productKind: "pillow",
    personalization: ["Foto", "Texto", "Fecha"],
    description: "Cojín personalizado con foto, dedicatoria o fecha especial.",
  },
  {
    name: "Llavero de acrílico con foto",
    slug: "llavero-acrilico",
    category: "Llaveros",
    categorySlug: "llaveros",
    price: "Desde Q18",
    productionTime: "24 h",
    imageTone: "gold",
    badge: "Popular",
    productKind: "keychain",
    personalization: ["Foto", "Forma"],
    description: "Llavero transparente con fotografía a todo color.",
  },
  {
    name: "Combo de cumpleaños",
    slug: "combo-cumpleanos",
    category: "Regalos",
    categorySlug: "regalos",
    price: "Desde Q195",
    productionTime: "3–5 días",
    imageTone: "purple",
    badge: "Combo",
    productKind: "gift",
    personalization: ["Foto", "Nombre", "Fecha"],
    description: "Taza + llavero + tarjeta personalizada en caja de regalo.",
  },
];

export const fallbackProductDetails: ProductDetail[] = fallbackProducts.map((product) => ({
  ...product,
  options:
    product.slug === "taza-blanca-personalizada"
      ? [
          {
            name: "Tipo de taza",
            values: ["Blanca clásica", "Mágica negra", "Interior de color"],
          },
        ]
      : product.slug === "playera-sublimada"
      ? [
          {
            name: "Talla",
            values: ["S", "M", "L", "XL", "XXL"],
          },
        ]
      : [
          {
            name: "Acabado",
            values: ["Estándar", "Premium"],
          },
        ],
  customizationFields: [
    {
      label: "Nombre o texto principal",
      helperText: "Escribe el texto que debe llevar el producto.",
      required: true,
      inputType: "text",
    },
    {
      label: "Foto o logo",
      helperText: "Sube una imagen clara o indica que la enviarás por WhatsApp.",
      required: false,
      inputType: "file",
    },
    {
      label: "Observaciones",
      helperText: "Describe colores, ubicación o referencias del diseño.",
      required: false,
      inputType: "textarea",
    },
  ],
}));

export const proofSteps = [
  {
    title: "Archivo seguro",
    text: "Fotos, logos y referencias quedan vinculados a la cotización.",
    icon: ImageUp,
  },
  {
    title: "Revisión visual",
    text: "El diseño se valida antes de iniciar producción.",
    icon: Palette,
  },
  {
    title: "Confirmación",
    text: "WhatsApp recibe el resumen con número de cotización.",
    icon: BadgeCheck,
  },
  {
    title: "Entrega",
    text: "Estados claros desde contacto hasta listo.",
    icon: Trophy,
  },
];
