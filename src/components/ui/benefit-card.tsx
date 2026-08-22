const paths: Record<string, React.ReactNode> = {
  minerals: (
    <path d="M12 3l4 6h-8l4-6zm-7 9a5 5 0 0110 0 5 5 0 01-10 0zm12 1a4 4 0 110 8 4 4 0 010-8zM7 13a4 4 0 100 8 4 4 0 000-8z" />
  ),
  energy: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  health: (
    <path
      fillRule="evenodd"
      d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3z"
      clipRule="evenodd"
    />
  ),
  vitamins: (
    <>
      <circle cx="8" cy="8" r="4" />
      <circle cx="16" cy="16" r="4" />
      <circle cx="16" cy="8" r="4" opacity={0.5} />
      <circle cx="8" cy="16" r="4" opacity={0.5} />
    </>
  ),
};

export default function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col gap-4">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-primary">
        {paths[icon]}
      </svg>
      <h3 className="font-heading font-bold text-xl text-secondary">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
