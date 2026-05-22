import { NextResponse } from "next/server";
import { hasUsableDatabaseUrl } from "@/lib/env/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function GET() {
  const checks = {
    app: true,
    databaseConfigured: hasUsableDatabaseUrl(),
    supabaseConfigured: isSupabaseConfigured(),
    whatsappConfigured: Boolean(process.env.NEXT_PUBLIC_WHATSAPP_PHONE),
  };
  const healthy = checks.app;
  const response = NextResponse.json(
    {
      status: healthy ? "ok" : "error",
      timestamp: new Date().toISOString(),
      checks,
    },
    { status: healthy ? 200 : 503 },
  );

  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}
