import type { Metadata } from "next";
import { speciesTabs } from "@/content/data";
import SpeciesDetail from "@/components/sections/species-detail";

const tab = speciesTabs.find((t) => t.id === "bovinos")!;

export const metadata: Metadata = {
  title: `Nutravit ADE3 Plus para Bovinos — ${tab.subtitle}`,
  description:
    "Núcleo nutricional para bovinos de leche y carne: cero fiebre de leche, picos de leche sostenidos, mejor aprovechamiento del pasto y control natural de garrapatas.",
  alternates: {
    canonical: "/bovinos",
  },
};

export default function BovinosPage() {
  return <SpeciesDetail tab={tab} />;
}
