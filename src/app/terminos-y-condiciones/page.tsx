import type { Metadata } from "next";
import LegalPage from "@/components/sections/legal-page";
import { termsConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: `${termsConditions.title} | Vetline Nutrition`,
  description: termsConditions.description,
  alternates: {
    canonical: "/terminos-y-condiciones",
  },
};

export default function TerminosPage() {
  return <LegalPage doc={termsConditions} />;
}
