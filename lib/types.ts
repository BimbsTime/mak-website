export type NavKey =
  | "verticals"
  | "approach"
  | "growth"
  | "contact"
  | "residential"
  | "commercial"
  | "aggregation"
  | "wellness"
  | "hospitality"
  | "retail-dining"
  | "partners";

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  key: NavKey;
  label: string;
  href: string;
  children?: NavChild[];
};

export type Metric = {
  value: string;
  label: string;
};

export type ResponsiveImage = {
  src: string;
  alt: string;
};

export type VerticalCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: ResponsiveImage;
  wide?: boolean;
};

export type GrowthCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: ResponsiveImage;
};

export type ApproachPoint = {
  title: string;
  description: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type DisabledFooterLink = {
  label: string;
};
