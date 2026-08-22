export interface NavLink {
  label: string;
  href: string;
}

export interface BenefitCard {
  icon: string;
  title: string;
  description: string;
}

export interface SpeciesTab {
  id: string;
  label: string;
  subtitle: string;
  benefits: { title: string; description: string }[];
}

export interface ScienceBlock {
  title: string;
  description: string;
}

export interface Dosage {
  species: string;
  amount: string;
}

export interface SiteConfig {
  name: string;
  productName: string;
  logo: string;
  navLinks: NavLink[];
}
