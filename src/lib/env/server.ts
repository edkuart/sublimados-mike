import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

export function getServerEnv() {
  return serverEnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}

export function hasUsableDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  return Boolean(
    databaseUrl &&
      !databaseUrl.includes("USER:PASSWORD") &&
      !databaseUrl.includes("johndoe:randompassword") &&
      !databaseUrl.includes("localhost:5432/mydb"),
  );
}
