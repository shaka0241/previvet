import { socialProof } from "@/content/data";

export default function SocialProof() {
  const { stats, testimonials } = socialProof;
  if (stats.length === 0 && testimonials.length === 0) return null;

  return (
    <section className="border-b border-gray-100 bg-white px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {stats.length > 0 && (
          <dl className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1"
              >
                <dt className="order-2 text-sm text-gray-600">{stat.label}</dt>
                <dd className="font-heading text-primary order-1 text-4xl font-bold">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {testimonials.length > 0 && (
          <figure className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="flex flex-col gap-3 rounded-xl bg-gray-50 p-6"
              >
                <p className="text-gray-700 italic">“{t.quote}”</p>
                <figcaption className="text-secondary text-sm font-semibold">
                  {t.name}
                  <span className="block text-xs font-normal text-gray-500">
                    {t.farm} — {t.country}
                  </span>
                </figcaption>
              </blockquote>
            ))}
          </figure>
        )}
      </div>
    </section>
  );
}
