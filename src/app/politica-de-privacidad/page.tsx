import type { Metadata } from "next";
import LegalPage from "@/components/sections/legal-page";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: `${privacyPolicy.title} | Vetline Nutrition`,
  description: privacyPolicy.description,
  alternates: {
    canonical: "/politica-de-privacidad",
  },
};

export default function PoliticaDePrivacidadPage() {
  return <LegalPage doc={privacyPolicy} />;
}
