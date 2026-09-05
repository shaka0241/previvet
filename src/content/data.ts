import { CONTACT_EMAIL } from "@/lib/site";
import type {
  BenefitCard,
  Dosage,
  FaqItem,
  FooterContent,
  HowToBuyContent,
  LegalInfo,
  PrivacyPolicyRefs,
  ScienceBlock,
  SectionTitles,
  SiteConfig,
  SocialProofContent,
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

export const footerContent: FooterContent = {
  intro: `Escríbenos por WhatsApp y un asesor de Vetline Nutrition te responderá con una cotización personalizada.`,
  whatsappCta: "Escríbenos por WhatsApp",
  socialTitle: "Síguenos",
};

export const errorPages = {
  notFoundTitle: "Página no encontrada",
  notFoundMessage:
    "La página que buscas no existe o fue movida. Conoce Nutravit ADE3 Plus desde el inicio.",
  backHomeLabel: "Volver al inicio",
  errorTitle: "Algo salió mal",
  errorMessage:
    "Ocurrió un error inesperado. Recarga la página o contáctanos para recibir tu cotización.",
  reloadLabel: "Recargar página",
};

export const socialProof: SocialProofContent = {
  stats: [
    { value: "100%", label: "de asimilación garantizada" },
    { value: "2", label: "especies: Bovinos y Porcinos" },
    { value: "A-D3-E", label: "vitaminas esenciales encapsuladas" },
  ],
  testimonials: [],
};

export const howToBuy: HowToBuyContent = {
  steps: [
    {
      title: "Solicita tu cotización",
      description:
        "Escríbenos por WhatsApp contándonos la especie y el número de animales de tu producción.",
    },
    {
      title: "Recibe tu proforma",
      description:
        "Un asesor de Vetline Nutrition te envía una cotización personalizada con precios y tiempos en menos de 24 horas.",
    },
    {
      title: "Coordinamos el despacho",
      description:
        "Confirmado el pedido, programamos la entrega hasta tu finca o la del distribuidor más cercano.",
    },
  ],
  moq: "",
  countries: [],
  registries: [],
};

export const hero = {
  preTitle: "Núcleo nutricional para Rumiantes, Porcinos y Caprinos.",
  title: "Nutrición Integral que Transforma tu Ganadería.",
  subtitle:
    "Nutravit ADE3 Plus no es solo un suplemento, es un núcleo nutricional de alta palatabilidad. Garantiza asimilación del 100%, maximiza la conversión alimenticia y asegura tu rentabilidad.",
  primaryCta: { label: "Solicitar Cotización", href: "#inicio" },
  secondaryCta: { label: "Hablar con un Asesor", href: "#inicio" },
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

export const faqItems: FaqItem[] = [
  {
    question: "¿Para qué especies sirve Nutravit ADE3 Plus?",
    answer:
      "Está formulado para bovinos (leche y carne) y porcinos (cerdas y engorde). Sus minerales bioasimilables, probióticos y grasa sobrepasante se adaptan al rumen y al tracto del cerdo.",
  },
  {
    question: "¿Cuál es la dosis diaria recomendada?",
    answer:
      "Rumiantes: 100 gramos diarios por animal. Porcinos y caprinos: 50 gramos diarios por animal. En alimento balanceado: 20 kg por cada 500 kg de mezcla.",
  },
  {
    question: "¿Qué significa el ADE3 del nombre?",
    answer:
      "Hace referencia al complejo de vitaminas A, D3 y E encapsuladas que incluye la fórmula, junto con macrominerales premium (Biofos, Calcio, Magnesio) y aditivos vivos.",
  },
  {
    question: "¿Cómo ayuda a prevenir la fiebre de leche en vacas?",
    answer:
      "La combinación de Calcio, Magnesio y Selenio prepara a la vaca para el parto, reduciendo la incidencia de hipocalcemia y sus consecuencias productivas.",
  },
  {
    question: "¿En qué presentaciones está disponible?",
    answer:
      "Se comercializa en balde y en bolsa de 20 kg, listo para mezclar con el alimento o suministrar según la dosis diaria.",
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Escríbenos directamente por WhatsApp. Un asesor de Vetline Nutrition te responderá con una cotización personalizada en menos de 24 horas.",
  },
];

export const presentations = ["Balde", "Bolsa de 20 kg"];

export const footerCta = {
  title: "¿Listo para llevar tu producción al siguiente nivel?",
};

export const legalInfo: LegalInfo = {
  legalName: "",
  taxId: "",
  address: "",
  arcoEmail: CONTACT_EMAIL,
};

export const privacyPolicyRefs: PrivacyPolicyRefs = {
  processors: [
    "Google (Gmail, correo de contacto)",
    "Meta Platforms (WhatsApp, Instagram)",
    "TikTok / ByteDance",
    "PostHog (analítica de uso)",
  ],
  noCookiesStatement:
    "Este sitio usa PostHog para analítica básica de visitas (pageviews y clics en contacto).",
};
