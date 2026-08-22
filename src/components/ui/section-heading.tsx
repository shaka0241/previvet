export default function SectionHeading({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-3 text-center">
      <h2 className="font-heading text-secondary text-3xl font-bold md:text-4xl">
        {title}
      </h2>
      {intro && <p className="mx-auto max-w-2xl text-gray-600">{intro}</p>}
    </div>
  );
}
