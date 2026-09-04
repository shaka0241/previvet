import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { faqItems, siteConfig } from "@/content/data";
import siteUrl, {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  TIKTOK_URL,
} from "@/lib/site";

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
    default: `${siteConfig.productName} – Núcleo Nutricional para Bovinos y Porcinos | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Nutravit ADE3 Plus: núcleo nutricional de alta palatabilidad para bovinos y porcinos. Asimilación del 100%, máxima conversión alimenticia y rentabilidad garantizada.",
  keywords: [
    "suplemento veterinario",
    "nutrición animal",
    "núcleo nutricional",
    "ganadería",
    "bovinos",
    "porcinos",
    "Nutravit ADE3 Plus",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.productName} – Núcleo Nutricional para Bovinos y Porcinos`,
    description:
      "Núcleo nutricional de alta palatabilidad. Garantiza asimilación del 100% y maximiza la conversión alimenticia.",
    type: "website",
    locale: "es_LA",
    url: "/",
    siteName: siteConfig.name,
    images: [{ url: "/images/og-nutravit.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.productName} – Núcleo Nutricional para Bovinos y Porcinos`,
    description:
      "Núcleo nutricional de alta palatabilidad. Garantiza asimilación del 100% y maximiza la conversión alimenticia.",
    images: ["/images/og-nutravit.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.name,
      url: siteUrl,
      logo: `${siteUrl}/images/logo-512.jpg`,
      email: CONTACT_EMAIL,
      sameAs: [INSTAGRAM_URL, TIKTOK_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "es",
    },
    {
      "@type": "Product",
      "@id": `${siteUrl}/#product`,
      name: siteConfig.productName,
      url: siteUrl,
      image: `${siteUrl}/images/og-nutravit.jpg`,
      category: "Animal Nutrition Supplement",
      brand: { "@id": `${siteUrl}/#organization` },
      description:
        "Núcleo nutricional de alta palatabilidad con minerales, vitaminas A-D3-E, probióticos y grasa sobrepasante para bovinos y porcinos.",
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      about: { "@id": `${siteUrl}/#product` },
      inLanguage: "es",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
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
