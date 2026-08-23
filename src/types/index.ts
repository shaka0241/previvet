export interface NavLink {
  label: string;
  href: string;
}

export type IconName = "minerals" | "energy" | "health" | "vitamins";

export interface BenefitCard {
  icon: IconName;
  title: string;
  description: string;
}

export type SpeciesId = "bovinos" | "porcinos";

export interface Benefit {
  title: string;
  description: string;
}

export type ScienceBlock = Benefit;

export interface SpeciesTab {
  id: SpeciesId;
  label: string;
  subtitle: string;
  benefits: Benefit[];
}

export interface Dosage {
  species: string;
  amount: string;
}

export interface SectionTitles {
  speciesBenefits: string;
  science: string;
  presentations: string;
}

export interface FooterContent {
  intro: string;
  whatsappCta: string;
}

export interface SocialProofContent {
  stats: StatItem[];
  testimonials: Testimonial[];
}

export interface HowToBuyContent {
  steps: HowToBuyStep[];
  moq: string;
  countries: string[];
  registries: string[];
}

export interface LegalInfo {
  legalName: string;
  taxId: string;
  address: string;
  arcoEmail: string;
}

export interface PrivacyPolicyRefs {
  processors: string[];
  noCookiesStatement: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  farm: string;
  country: string;
}

export interface HowToBuyStep {
  title: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  productName: string;
  logo: string;
  ctaLabel: string;
  navLinks: NavLink[];
}
