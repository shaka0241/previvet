import type { Metadata } from "next";
import LegalPage from "@/components/sections/legal-page";
import { legalNotice } from "@/content/legal";

export const metadata: Metadata = {
  title: `${legalNotice.title} | Vetline Nutrition`,
  description: legalNotice.description,
  alternates: {
    canonical: "/aviso-legal",
  },
};

export default function AvisoLegalPage() {
  return <LegalPage doc={legalNotice} />;
}
