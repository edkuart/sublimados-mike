import { z } from "zod";

export const deployEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .url()
    .refine((value) => !value.includes("USER:PASSWORD"), "DATABASE_URL usa credenciales placeholder."),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_BRAND_NAME: z.string().min(1),
  NEXT_PUBLIC_WHATSAPP_PHONE: z
    .string()
    .regex(/^\d{8,15}$/, "NEXT_PUBLIC_WHATSAPP_PHONE debe incluir solo digitos con codigo de pais."),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),
});

export function validateDeployEnv(env: NodeJS.ProcessEnv = process.env) {
  return deployEnvSchema.safeParse(env);
}
