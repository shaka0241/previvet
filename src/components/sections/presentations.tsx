import { dosages, presentations, sectionTitles } from "@/content/data";

export default function Presentations() {
  return (
    <section id="presentaciones" className="scroll-mt-16 bg-white px-4 py-20">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="from-primary/90 to-primary flex flex-col gap-6 rounded-xl bg-gradient-to-br p-8 text-white shadow-lg">
          <h2 className="font-heading text-3xl font-bold">
            {sectionTitles.presentations}
          </h2>
          <div className="flex aspect-video items-center justify-center rounded-xl bg-white/15 p-4 backdrop-blur-sm">
            <span className="font-heading text-5xl font-bold tracking-tight">
              20 kg
            </span>
          </div>
          <ul className="flex gap-3">
            {presentations.map((p) => (
              <li
                key={p}
                className="rounded-full border border-white/60 px-4 py-1 text-sm"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-col gap-4">
          {dosages.map((dose) => (
            <li
              key={dose.species}
              className="flex flex-col gap-2 rounded-xl bg-gray-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-heading text-secondary font-semibold">
                {dose.species}
              </span>
              <span className="text-gray-600">{dose.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
