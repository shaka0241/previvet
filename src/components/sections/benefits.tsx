import { benefitsIntro, benefitCards } from "@/content/data";
import BenefitCard from "@/components/ui/benefit-card";

export default function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-16 bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-3 text-center">
          <h2 className="font-heading text-secondary text-3xl font-bold md:text-4xl">
            {benefitsIntro.title}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            {benefitsIntro.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefitCards.map((card) => (
            <BenefitCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
