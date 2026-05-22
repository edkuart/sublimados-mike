const DEFAULT_BASE_URL =
  process.env.QA_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3001";

const args = new Set(process.argv.slice(2));
const baseUrlArg = process.argv.find((arg) => arg.startsWith("--base-url="));
const baseUrl = new URL(baseUrlArg?.split("=")[1] || DEFAULT_BASE_URL);

const checks = [
  {
    name: "Home publica",
    path: "/",
    expectedStatuses: [200],
    requiredHeaders: ["x-frame-options", "x-content-type-options"],
  },
  {
    name: "Catalogo publico",
    path: "/catalogo",
    expectedStatuses: [200],
  },
  {
    name: "Detalle de producto fallback",
    path: "/productos/taza-blanca-personalizada",
    expectedStatuses: [200],
  },
  {
    name: "Politicas publicas",
    path: "/politicas",
    expectedStatuses: [200],
  },
  {
    name: "Politica de archivos",
    path: "/politicas/archivos",
    expectedStatuses: [200],
  },
  {
    name: "Login",
    path: "/login",
    expectedStatuses: [200],
  },
  {
    name: "Healthcheck",
    path: "/api/health",
    expectedStatuses: [200],
  },
  {
    name: "Robots SEO",
    path: "/robots.txt",
    expectedStatuses: [200],
  },
  {
    name: "Sitemap SEO",
    path: "/sitemap.xml",
    expectedStatuses: [200],
  },
  {
    name: "Analytics evento comercio",
    path: "/api/analytics/events",
    method: "POST",
    body: JSON.stringify({
      name: "quote_whatsapp_opened",
      source: "qa-smoke",
      productSlug: "taza-blanca-personalizada",
      quantity: 1,
    }),
    headers: { "content-type": "application/json" },
    expectedStatuses: [200],
  },
  {
    name: "Analytics web vitals",
    path: "/api/analytics/web-vitals",
    method: "POST",
    body: JSON.stringify({
      id: "qa-smoke",
      name: "LCP",
      value: 1200,
      rating: "good",
      navigationType: "navigate",
    }),
    headers: { "content-type": "application/json" },
    expectedStatuses: [200],
  },
  {
    name: "Cuenta protegida",
    path: "/account",
    expectedStatuses: [302, 303, 307, 308],
  },
  {
    name: "Admin protegido",
    path: "/admin",
    expectedStatuses: [302, 303, 307, 308],
  },
  {
    name: "Upload rechaza contenido no multipart",
    path: "/api/uploads",
    method: "POST",
    body: "not-a-file",
    headers: { "content-type": "text/plain" },
    expectedStatuses: [415],
  },
  {
    name: "Lectura privada exige autenticacion",
    path: "/api/uploads/pending/not-found.png",
    expectedStatuses: [401, 403, 404],
  },
];

if (args.has("--list")) {
  console.log(`QA smoke base URL: ${baseUrl.href}`);
  checks.forEach((check) => {
    console.log(`- ${check.name}: ${check.method || "GET"} ${check.path}`);
  });
  process.exit(0);
}

let failures = 0;

for (const check of checks) {
  const url = new URL(check.path, baseUrl);

  try {
    const response = await fetch(url, {
      method: check.method || "GET",
      body: check.body,
      headers: check.headers,
      redirect: "manual",
    });
    const statusOk = check.expectedStatuses.includes(response.status);
    const missingHeaders = (check.requiredHeaders || []).filter(
      (header) => !response.headers.get(header),
    );

    if (!statusOk || missingHeaders.length > 0) {
      failures += 1;
      console.error(
        `FAIL ${check.name}: status ${response.status}; expected ${check.expectedStatuses.join(", ")}` +
          (missingHeaders.length ? `; missing headers ${missingHeaders.join(", ")}` : ""),
      );
      continue;
    }

    console.log(`PASS ${check.name}: ${response.status}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${check.name}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures > 0) {
  console.error(`QA smoke finished with ${failures} failure(s).`);
  process.exit(1);
}

console.log("QA smoke passed.");
