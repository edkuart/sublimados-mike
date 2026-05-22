import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { WebVitals } from "@/components/analytics/web-vitals";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Sublimados Mike",
    template: "%s | Sublimados Mike",
  },
  description:
    "Productos personalizados por sublimacion en Guatemala: tazas, playeras, termos, cojines, llaveros y regalos con cotizacion por WhatsApp.",
  applicationName: "Sublimados Mike",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: "/",
    siteName: "Sublimados Mike",
    title: "Sublimados Mike",
    description:
      "Cotiza productos personalizados por sublimacion con prueba visual antes de imprimir.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sublimados Mike",
    description:
      "Cotiza regalos y productos personalizados por WhatsApp con una experiencia guiada.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
