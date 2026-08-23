export interface ServiceItem {
  id: string;
  icon: string;    // SVG path string
  title: string;
  description: string;
  link: string;
}

export interface PersonaTab {
  id: string;
  label: string;
  icon: string;    // SVG path string
  eyebrow: string;
  heading: string;
  subtitle: string;
  services: ServiceItem[];
  ctaLabel: string;
}

export interface Initiative {
  id: string;
  imageUrl: string;
  date: string;
  title: string;
  description: string;
}

export interface PriceMarker {
  id: string;
  label: string;
  top: string;
  left: string;
  color: 'navy' | 'yellow';
}
