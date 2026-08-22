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
      <Navbar />
      <main className="flex-1">
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
