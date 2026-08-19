import type {
  DisabledFooterLink,
  FooterLink,
  ApproachPoint,
  GrowthCard,
  Metric,
  NavItem,
  NavKey,
  VerticalCard,
} from "@/lib/types";

export const siteMeta = {
  title: "MĀK | Real Estate Development",
  description:
    "A Mumbai-based, design-led real estate developer with expertise spanning land aggregation, regulatory liaisoning, clearances, and execution shaped by design and strong architectural intent.",
};

export function comingSoonHref(tab: NavKey) {
  return `/coming-soon?tab=${tab}`;
}

export function resolveNavKey(value: string | undefined): NavKey {
  const fallback: NavKey = "hospitality";

  if (!value) {
    return fallback;
  }

  const match = navItems.find((item) => item.key === value);
  return match?.key ?? fallback;
}

export const navItems: NavItem[] = [
  { key: "verticals", label: "Our Verticals", href: "/#verticals" },
  { key: "approach", label: "Identity & Approach", href: "/#approach" },
  { key: "growth", label: "Project Pipeline", href: "/#growth" },
  { key: "partners", label: "Strategic Partners", href: comingSoonHref("partners") },
  { key: "contact", label: "Contact Us", href: "/#contact" },
];

export const heroImage = {
  src: "/images/home/hero-desktop.webp",
  alt: "Exterior view of a design-led mixed-use development with glass towers and layered podium architecture.",
};

export const introContent = {
  title: "Considered places.\nComposed to endure.",
  summary:
    "A Mumbai-based, design-led real estate development practice, engaging across the full spectrum of the development value chain; from strategic asset identification, aggregation and acquisition, through funding, regulatory liaisoning and approvals, to design development, execution and market delivery.",
  paragraphs: [
    "MĀK operates with an integrated capability that allows it to move fluidly across this spectrum, engaging on an opportunity-specific basis shaped through strategic development partners. Underlying this is a consistent design philosophy.",
    "Environments composed with attention to light, ventilation, proportion and material restraint, with a recurring instinct toward lifestyle-inflected living, extending design intent beyond the individual residence into the broader development envelope.",
  ],
};

export const practiceMetrics: Metric[] = [
  { value: "~ 4 - 4.5 million sq. ft.", label: "Targeted Aggregate Development Potential" },
  { value: "INR ~ 4,750 - 5,250 Cr.", label: "Targeted Asset Realisation Value" },
];

export const practiceImage = {
  src: "/images/home/practice-desktop.png",
  alt: "Aerial cityscape at dusk with warm atmospheric light over a dense skyline.",
};

export const practiceVideo = {
  src: "/images/home/practice-desktop.mp4",
  poster: practiceImage.src,
};

export const verticalCards: VerticalCard[] = [
  {
    id: "land-aggregation",
    title: "Asset Aggregation",
    description:
      "Over 5,000 acres aggregated to date, alongside complex regulatory approvals managed for public and private sector projects.",
    href: comingSoonHref("aggregation"),
    image: {
      src: "/images/home/land-desktop.webp",
      alt: "Aerial coastal land parcel and infrastructure context photographed from above.",
    },
    wide: true,
  },
  {
    id: "residential",
    title: "Residential",
    description:
      "Projects of varying scale in closely identified micro markets, with particular attention to design, materiality and spatial planning.",
    href: comingSoonHref("residential"),
    image: {
      src: "/images/home/residential-desktop.webp",
      alt: "Grand residential entry with warm lighting, stone detailing, and layered planting.",
    },
    wide: true,
  },
  {
    id: "commercial",
    title: "Commercial",
    description:
      "Boutique offices set within larger commercial developments, balancing scale with proportion and considered design.",
    href: comingSoonHref("commercial"),
    image: {
      src: "/images/home/commercial-desktop.webp",
      alt: "Architectural interior with sculpted stone surfaces suited to a boutique office environment.",
    },
  },
  {
    id: "hospitality",
    title: "Hospitality",
    description:
      "Shaping environments that feel intuitive, refined and experience-led, with a vision that carries across every development.",
    href: comingSoonHref("hospitality"),
    image: {
      src: "/images/home/hospitality-desktop.webp",
      alt: "Hospitality courtyard with a sweeping canopy, water element, and tropical landscape.",
    },
  },
  {
    id: "wellness",
    title: "Wellness",
    description:
      "Living environments informed by a growing focus on quality of life, with spaces designed to support balance, comfort and ease.",
    href: comingSoonHref("wellness"),
    image: {
      src: "/images/home/wellness-desktop.webp",
      alt: "Calm wellness interior with sculpted stone forms, filtered light, and quiet seating.",
    },
  },
  {
    id: "retail-dining",
    title: "Boutique Retail & F&B",
    description:
      "Design-led retail destinations combining curated dining, shopping and leisure within thoughtfully composed lifestyle experiences.",
    href: comingSoonHref("retail-dining"),
    image: {
      src: "/images/home/retail-dining-desktop.webp",
      alt: "Editorial dining table scene with plated dishes and warm hospitality styling.",
    },
  },
];

export const verticalGalleryCaptions = [
  "Spaces that carry a quiet sense of intention, where light, proportion and material come together in ways that feel instinctive rather than imposed.",
  "An approach shaped by restraint, where nothing feels excessive, yet every element holds presence, allowing the architecture to unfold with clarity and ease.",
  "Environments that are not defined by design alone, but by the way they are experienced: subtle, balanced and deeply attuned to how life moves through them.",
];

export const approachImage = {
  src: "/images/home/approach-desktop.webp",
  alt: "Evening view over a hospitality-led development with glowing circulation and layered built form.",
};

export const approachVideo = {
  src: "/images/home/approach-desktop.mp4",
  poster: approachImage.src,
};

export const approachPoints: ApproachPoint[] = [
  {
    title: "Integrated Capability",
    description:
      "A seamless progression from acquisition to delivery. Land aggregation, regulatory liaisoning, clearances and execution, held within a single, coherent practice.",
  },
  {
    title: "Architectural Intent",
    description:
      "Each development is approached as a considered composition, where planning, materiality and proportion are calibrated for clarity, comfort and lasting value, with particular emphasis on light, shadow and volumetrics.",
  },
];

export const growthOverview = [
  "MĀK is scaling its practice significantly over the next phase of growth, targeting an asset realisation value of INR 4,500 to 5,000 Cr. over the next 24 months, allowing the firm to reach a holistic realisation potential of INR 10,000 Cr. through strategic development partners. This spans multiple new launches across residential, commercial and industrial verticals, focused in strategically selected micro markets.",
  "The primary direction of this growth is into industrial and infrastructure-linked development, including IT parks and data centre-enabled real estate; sectors especially suited to MĀK's existing strength in asset aggregation, regulatory liaisoning and entitlement, given the scale, power and connectivity considerations such projects demand. As across the rest of the practice, engagement will flex by opportunity.",
  "This ranges from asset assembly and approvals through to full-cycle development and delivery, structured through the same partnership models MĀK applies across its portfolio. Through all of this, MĀK's approach remains constant: engage across the value chain with precision, structure participation where value is best created, and deliver environments defined by design clarity and enduring outcomes.",
];

export const growthCards: GrowthCard[] = [
  {
    id: "commercial-development",
    title: "Commercial Development",
    description:
      "Boutique commercial and office developments, integrated within larger mixed-use environments and positioned in carefully selected micro markets.",
    href: comingSoonHref("commercial"),
    image: {
      src: "/images/home/growth-commercial-desktop.webp",
      alt: "Commercial frontage at dusk with warm-lit glazing and layered retail edges.",
    },
  },
  {
    id: "residential-development",
    title: "Residential Development",
    description:
      "Continued expansion across residential development, with multiple new launches concentrated in strategically selected micro markets spanning urban and non-urban contexts.",
    href: comingSoonHref("residential"),
    image: {
      src: "/images/home/growth-nonurban-desktop.webp",
      alt: "Arrival court for a non-urban expansion with lush landscape and sculpted columns.",
    },
  },
];

export const contactImage = {
  src: "/images/home/contact-desktop.webp",
  alt: "Architectural arrival court with tropical planting and a refined branded entry.",
};

export const footerPrimaryLinks: FooterLink[] = [
  { label: "Verticals", href: "/#verticals" },
  { label: "Approach", href: "/#approach" },
  { label: "Aggregation", href: "/#land-aggregation" },
];

export const footerSecondaryLinks: FooterLink[] = [
  { label: "Contact", href: "/#contact" },
];

export const footerDisabledLinks: DisabledFooterLink[] = [
  { label: "Privacy" },
  { label: "Terms" },
  { label: "RERA Disclosure" },
];
