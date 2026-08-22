import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Benefits from "@/components/sections/benefits";
import SpeciesBenefits from "@/components/sections/species-benefits";
import Science from "@/components/sections/science";
import Presentations from "@/components/sections/presentations";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="focus:bg-secondary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:p-3 focus:text-white"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="flex-1">
        <Hero />
        <Benefits />
        <SpeciesBenefits />
        <Science />
        <Presentations />
      </main>
      <Footer />
    </>
  );
}
