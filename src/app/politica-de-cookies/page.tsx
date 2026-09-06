import type { Metadata } from "next";
import LegalPage from "@/components/sections/legal-page";
import { cookiePolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: `${cookiePolicy.title} | Vetline Nutrition`,
  description: cookiePolicy.description,
  alternates: {
    canonical: "/politica-de-cookies",
  },
};

export default function PoliticaDeCookiesPage() {
  return <LegalPage doc={cookiePolicy} />;
}
