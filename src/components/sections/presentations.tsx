import { dosages, presentations } from "@/content/data";

export default function Presentations() {
  return (
    <section id="presentaciones" className="py-20 px-4 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="bg-gradient-to-br from-primary/90 to-primary rounded-xl shadow-lg p-8 text-white flex flex-col gap-6">
          <h2 className="font-heading font-bold text-3xl">Presentación y Dosificación</h2>
          <div className="rounded-xl bg-white/15 p-4 backdrop-blur-sm aspect-video flex items-center justify-center">
            <span className="font-heading font-bold text-5xl tracking-tight">20 kg</span>
          </div>
          <ul className="flex gap-3">
            {presentations.map((p) => (
              <li
                key={p}
                className="border border-white/60 rounded-full px-4 py-1 text-sm"
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
              className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <span className="font-heading font-semibold text-secondary">{dose.species}</span>
              <span className="text-gray-600">{dose.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
