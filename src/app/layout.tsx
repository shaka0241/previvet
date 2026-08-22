import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/data";
import siteUrl from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.productName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Nutravit ADE3 Plus: núcleo nutricional de alta palatabilidad para bovinos y porcinos. Asimilación del 100%, máxima conversión alimenticia y rentabilidad garantizada.",
  keywords: [
    "suplemento veterinario",
    "nutrición animal",
    "ganadería",
    "bovinos",
    "porcinos",
    "Nutravit ADE3 Plus",
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.productName}`,
    description:
      "Núcleo nutricional de alta palatabilidad. Garantiza asimilación del 100% y maximiza la conversión alimenticia.",
    type: "website",
    locale: "es_LA",
    images: [{ url: "/images/logo-512.jpg", width: 512, height: 512 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: siteConfig.productName,
  brand: { "@type": "Brand", name: siteConfig.name },
  description:
    "Núcleo nutricional de alta palatabilidad con minerales, vitaminas A-D3-E, probióticos y grasa sobrepasante para bovinos y porcinos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
