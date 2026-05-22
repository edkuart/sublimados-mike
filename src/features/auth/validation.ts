import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Ingresa un correo valido.").trim(),
  password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres."),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, "Ingresa tu nombre completo.").trim(),
});

export type AuthActionState = {
  fieldErrors?: {
    email?: string[];
    password?: string[];
    fullName?: string[];
  };
  message?: string;
};
