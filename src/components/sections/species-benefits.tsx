import SpeciesTabs from "./species-tabs";
import SectionHeading from "@/components/ui/section-heading";
import { sectionTitles } from "@/content/data";

export default function SpeciesBenefits() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <SectionHeading title={sectionTitles.speciesBenefits} />
        <SpeciesTabs />
      </div>
    </section>
  );
}
