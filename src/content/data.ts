import type {
  BenefitCard,
  ContactFormContent,
  Dosage,
  FooterContent,
  ScienceBlock,
  SectionTitles,
  SiteConfig,
  SpeciesTab,
} from "@/types";

export const siteConfig: SiteConfig = {
  name: "Vetline Nutrition",
  productName: "Nutravit ADE3 Plus",
  logo: "/images/logo-nav.webp",
  ctaLabel: "Cotizar",
  navLinks: [
    { label: "Beneficios", href: "#beneficios" },
    { label: "Ciencia", href: "#ciencia" },
    { label: "Presentaciones", href: "#presentaciones" },
  ],
};

export const sectionTitles: SectionTitles = {
  speciesBenefits: "Beneficios por Especie",
  science: "La Ciencia de nuestra Fórmula",
  presentations: "Presentación y Dosificación",
};

export const contactForm: ContactFormContent = {
  labels: {
    name: "Nombre",
    phone: "Teléfono / WhatsApp",
    email: "Correo electrónico",
    message: "Mensaje",
  },
  placeholders: {
    name: "Tu nombre",
    phone: "+57 300 123 4567",
    email: "correo@empresa.com",
    message: "Cuéntanos sobre tu producción (especie, número de animales...)",
  },
  submitLabel: "Enviar solicitud",
  submittingLabel: "Enviando...",
  privacyNote: "Tus datos solo se usan para enviarte la cotización.",
  successTitle: "¡Solicitud enviada!",
  successMessage: "Un asesor te contactará en menos de 24 horas.",
  successWhatsappCta: "Respuesta inmediata por WhatsApp",
  errorBeforeLink: "Hubo un error al enviar. Inténtalo de nuevo",
  errorLinkText: "escríbenos por WhatsApp",
};

export const footerContent: FooterContent = {
  intro: `Déjanos tus datos y un asesor de Vetline Nutrition te contactará con una cotización personalizada.`,
  whatsappCta: "Escríbenos por WhatsApp",
};

export const hero = {
  preTitle: "Núcleo nutricional para bovinos y porcinos",
  title: "Nutrición Integral que Transforma tu Ganadería.",
  subtitle:
    "Nutravit ADE3 Plus no es solo un suplemento, es un núcleo nutricional de alta palatabilidad. Garantiza asimilación del 100%, maximiza la conversión alimenticia y asegura tu rentabilidad.",
  primaryCta: { label: "Solicitar Cotización", href: "#contacto" },
  secondaryCta: { label: "Hablar con un Asesor", href: "#contacto" },
};

export const benefitsIntro = {
  title: "Sinergia Biológica para Resultados Reales",
  description:
    "Integramos los mejores componentes del mercado para potenciar la salud y el rendimiento.",
};

export const benefitCards: BenefitCard[] = [
  {
    icon: "minerals",
    title: "Minerales",
    description:
      "Macrominerales premium y microminerales bioasimilables (Biofos, Calcio, Magnesio).",
  },
  {
    icon: "energy",
    title: "Energía",
    description:
      "Grasa Sobrepasante para combatir el balance energético negativo.",
  },
  {
    icon: "health",
    title: "Salud",
    description:
      "Aditivos vivos (Probióticos + Prebióticos) para un sistema inmunológico blindado.",
  },
  {
    icon: "vitamins",
    title: "Vitaminas",
    description: "Complejo A, D3 y E, y aminoácidos esenciales encapsulados.",
  },
];

export const speciesTabs: SpeciesTab[] = [
  {
    id: "bovinos",
    label: "Bovinos",
    subtitle: "Leche y Carne",
    benefits: [
      {
        title: "Cero Fiebre de Leche",
        description:
          "Combinación de Calcio, Magnesio y Selenio prepara a la vaca para el parto.",
      },
      {
        title: "Picos de Leche Sostenidos",
        description:
          "Biofos aporta energía celular; Magnesio activa el rumen. ¡Más litros con más grasa!",
      },
      {
        title: "Aprovechamiento del Pasto",
        description:
          "Azufre y Probióticos multiplican bacterias buenas para digerir pastos duros.",
      },
      {
        title: "Repelente Natural",
        description:
          "El Azufre actúa como escudo natural contra garrapatas y moscas.",
      },
    ],
  },
  {
    id: "porcinos",
    label: "Porcinos",
    subtitle: "Cerdas y Engorde",
    benefits: [
      {
        title: "Partos más rápidos",
        description:
          "Calcio activa contracciones eficientes, reduciendo asfixia en lechones.",
      },
      {
        title: "Lechones Más Pesados",
        description:
          "Aminoácidos elevan la calidad de la leche materna para destetes grandes y sanos.",
      },
      {
        title: "Huesos de Acero",
        description:
          "Biofos y Calcio garantizan articulaciones que soportan más de 100 kg.",
      },
      {
        title: "Control de Diarreas",
        description: "Probióticos y Prebióticos eliminan E. coli y Salmonella.",
      },
    ],
  },
];

export const scienceIntro = "Ingredientes que marcan la diferencia";

export const scienceBlocks: ScienceBlock[] = [
  {
    title: "Grasa Sobrepasante (Jabones de Calcio)",
    description:
      'Energía pura que "pasa de largo" el rumen y se absorbe al 100% en el intestino. Evita la cetosis en vacas recién paridas y acelera el engorde.',
  },
  {
    title: "Tecnología Simbiótica (Probióticos + Prebióticos)",
    description:
      "Levadura Viva (Saccharomyces cerevisiae) combinada con MOS y Beta-glucanos. Exclusión competitiva de patógenos y máxima absorción.",
  },
  {
    title: "Aminoácidos Limitantes",
    description:
      'Metionina, Lisina y Treonina. Los "ladrillos" para el desarrollo muscular magro y un sistema inmune de hierro.',
  },
  {
    title: "Micro y Macrominerales de Alta Gama",
    description:
      "Desde Cobalto para Vitamina B12, hasta Selenito para antioxidación y Yodo para optimizar el metabolismo basal.",
  },
];

export const dosages: Dosage[] = [
  { species: "Rumiantes", amount: "100 gramos diarios por animal" },
  { species: "Porcinos y Caprinos", amount: "50 gramos diarios por animal" },
  {
    species: "Alimento Balanceado (A.B.A)",
    amount: "20 kg por cada 500 kg de mezcla",
  },
];

export const presentations = ["Balde", "Bolsa de 20 kg"];

export const footerCta = {
  title: "¿Listo para llevar tu producción al siguiente nivel?",
};
