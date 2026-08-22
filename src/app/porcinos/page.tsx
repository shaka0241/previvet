import type { Metadata } from "next";
import { speciesTabs } from "@/content/data";
import SpeciesDetail from "@/components/sections/species-detail";

const tab = speciesTabs.find((t) => t.id === "porcinos")!;

export const metadata: Metadata = {
  title: `Nutravit ADE3 Plus para Porcinos — ${tab.subtitle}`,
  description:
    "Núcleo nutricional para cerdas y engorde: partos más rápidos, lechones más pesados, huesos que soportan +100 kg y control de diarreas por E. coli y Salmonella.",
  alternates: {
    canonical: "/porcinos",
  },
};

export default function PorcinosPage() {
  return <SpeciesDetail tab={tab} />;
}
