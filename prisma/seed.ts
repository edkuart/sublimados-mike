import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, CustomizationFieldType, ProductStatus, RoleName } from "../generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const roles = [
  [RoleName.CUSTOMER, "Comprador registrado"],
  [RoleName.ADMIN, "Administrador operativo"],
  [RoleName.SUPER_ADMIN, "Administrador principal"],
  [RoleName.DESIGNER, "Disenador de pruebas y artes"],
  [RoleName.PRODUCTION, "Produccion y entrega"],
] as const;

const categories = [
  {
    name: "Tazas",
    slug: "tazas",
    description: "Tazas blancas, magicas, con interior de color y opciones para regalo.",
  },
  {
    name: "Playeras",
    slug: "playeras",
    description: "Playeras personalizadas para eventos, negocios, familias y regalos.",
  },
  {
    name: "Termos",
    slug: "termos",
    description: "Termos y vasos personalizados con nombres, frases o logos.",
  },
  {
    name: "Llaveros",
    slug: "llaveros",
    description: "Llaveros acrilicos, MDF y regalos pequenos personalizados.",
  },
  {
    name: "Cojines",
    slug: "cojines",
    description: "Cojines con fotos, frases, fechas y dedicatorias.",
  },
  {
    name: "Regalos personalizados",
    slug: "regalos-personalizados",
    description: "Combos y detalles personalizados para ocasiones especiales.",
  },
];

const policies = [
  {
    slug: "privacidad",
    title: "Politica de privacidad",
    content:
      "Dinamiqo protege los datos y archivos del cliente. Las imagenes subidas se usan solo para preparar la cotizacion y producir el pedido aprobado.",
  },
  {
    slug: "envios",
    title: "Politica de envios",
    content:
      "Los tiempos de entrega dependen del producto, personalizacion y ubicacion. El tiempo final se confirma por WhatsApp antes de producir.",
  },
  {
    slug: "productos-personalizados",
    title: "Productos personalizados",
    content:
      "Los productos personalizados requieren revision y aprobacion de diseno cuando aplique. Una vez aprobada la produccion, los cambios pueden generar costo adicional.",
  },
];

async function main() {
  for (const [name, description] of roles) {
    await prisma.role.upsert({
      where: { name },
      update: { description },
      create: { name, description },
    });
  }

  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        sortOrder: index,
        isActive: true,
      },
      create: {
        ...category,
        sortOrder: index,
      },
    });
  }

  for (const policy of policies) {
    await prisma.policyPage.upsert({
      where: { slug: policy.slug },
      update: policy,
      create: policy,
    });
  }

  await prisma.setting.upsert({
    where: { key: "whatsapp_phone" },
    update: { value: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "50200000000" },
    create: {
      key: "whatsapp_phone",
      value: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "50200000000",
    },
  });

  await prisma.banner.upsert({
    where: { id: "home-main-banner" },
    update: {
      title: "Regalos personalizados con diseno aprobado",
      subtitle: "Cotiza por WhatsApp con producto, variantes y archivos en orden.",
      placement: "home",
      isActive: true,
      sortOrder: 0,
    },
    create: {
      id: "home-main-banner",
      title: "Regalos personalizados con diseno aprobado",
      subtitle: "Cotiza por WhatsApp con producto, variantes y archivos en orden.",
      placement: "home",
      isActive: true,
      sortOrder: 0,
    },
  });

  const tazaCategory = await prisma.category.findUniqueOrThrow({
    where: { slug: "tazas" },
  });

  const taza = await prisma.product.upsert({
    where: { slug: "taza-blanca-personalizada" },
    update: {
      categoryId: tazaCategory.id,
      name: "Taza blanca personalizada",
      shortDescription: "Taza 11 oz sublimada con foto, nombre o frase.",
      description:
        "Ideal para regalos, eventos y detalles empresariales. Incluye revision basica del archivo antes de producir.",
      basePriceCents: 5500,
      productionTimeLabel: "24-48 horas",
      status: ProductStatus.ACTIVE,
    },
    create: {
      categoryId: tazaCategory.id,
      name: "Taza blanca personalizada",
      slug: "taza-blanca-personalizada",
      shortDescription: "Taza 11 oz sublimada con foto, nombre o frase.",
      description:
        "Ideal para regalos, eventos y detalles empresariales. Incluye revision basica del archivo antes de producir.",
      basePriceCents: 5500,
      productionTimeLabel: "24-48 horas",
      status: ProductStatus.ACTIVE,
    },
  });

  await prisma.productImage.deleteMany({ where: { productId: taza.id } });
  await prisma.customizationField.deleteMany({ where: { productId: taza.id } });
  await prisma.productOption.deleteMany({ where: { productId: taza.id } });

  await prisma.productImage.create({
    data: {
      productId: taza.id,
      url: "/placeholder-products/taza-blanca.jpg",
      altText: "Taza blanca personalizada",
      isPrimary: true,
    },
  });

  await prisma.productOption.create({
    data: {
      productId: taza.id,
      name: "Tipo de taza",
      values: {
        create: [
          { value: "Blanca 11 oz", sortOrder: 0 },
          { value: "Magica", sortOrder: 1 },
          { value: "Interior de color", sortOrder: 2 },
        ],
      },
    },
  });

  await prisma.customizationField.createMany({
    data: [
      {
        productId: taza.id,
        label: "Nombre o texto principal",
        type: CustomizationFieldType.TEXT,
        helperText: "Ejemplo: Feliz cumpleanos, Ana",
        isRequired: true,
        sortOrder: 0,
      },
      {
        productId: taza.id,
        label: "Foto o logo",
        type: CustomizationFieldType.IMAGE,
        helperText: "Sube una imagen clara o indica que la enviaras por WhatsApp.",
        isRequired: false,
        sortOrder: 1,
      },
      {
        productId: taza.id,
        label: "Observaciones",
        type: CustomizationFieldType.TEXTAREA,
        helperText: "Describe colores, ubicacion o referencias del diseno.",
        isRequired: false,
        sortOrder: 2,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
