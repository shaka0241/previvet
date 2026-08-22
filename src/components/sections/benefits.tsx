import { benefitsIntro, benefitCards } from "@/content/data";
import BenefitCard from "@/components/ui/benefit-card";

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 px-4 bg-gray-50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 flex flex-col gap-3">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-secondary">
            {benefitsIntro.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {benefitsIntro.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitCards.map((card) => (
            <BenefitCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
