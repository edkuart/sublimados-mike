const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#6f2dbd"/>
  <path d="M32 12l4.8 12.2L50 29l-13.2 4.8L32 46l-4.8-12.2L14 29l13.2-4.8L32 12z" fill="#fff"/>
  <circle cx="47" cy="47" r="8" fill="#f7c948"/>
</svg>`;

export function GET() {
  return new Response(svg, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "image/svg+xml",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
