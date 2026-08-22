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

export interface ContactFormContent {
  labels: { name: string; phone: string; email: string; message: string };
  placeholders: {
    name: string;
    phone: string;
    email: string;
    message: string;
  };
  submitLabel: string;
  submittingLabel: string;
  privacyNote: string;
  successTitle: string;
  successMessage: string;
  successWhatsappCta: string;
  errorBeforeLink: string;
  errorLinkText: string;
}

export interface FooterContent {
  intro: string;
  whatsappCta: string;
}

export interface SiteConfig {
  name: string;
  productName: string;
  logo: string;
  ctaLabel: string;
  navLinks: NavLink[];
}
