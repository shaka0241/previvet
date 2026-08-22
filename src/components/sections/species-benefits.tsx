import SpeciesTabs from "./species-tabs";

export default function SpeciesBenefits() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-secondary text-center">
          Beneficios por Especie
        </h2>
        <SpeciesTabs />
      </div>
    </section>
  );
}
