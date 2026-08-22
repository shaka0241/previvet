import SpeciesTabs from "./species-tabs";

export default function SpeciesBenefits() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <h2 className="font-heading text-secondary text-center text-3xl font-bold md:text-4xl">
          Beneficios por Especie
        </h2>
        <SpeciesTabs />
      </div>
    </section>
  );
}
