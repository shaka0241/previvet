import { benefitsIntro, benefitCards } from "@/content/data";
import BenefitCard from "@/components/ui/benefit-card";
import SectionHeading from "@/components/ui/section-heading";

export default function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-16 bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={benefitsIntro.title}
          intro={benefitsIntro.description}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefitCards.map((card) => (
            <BenefitCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
