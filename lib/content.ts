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
  title: "MĀK | Considered places. Composed to endure.",
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
  {
    key: "residential",
    label: "Residential",
    href: comingSoonHref("residential"),
    children: [
      { label: "Urban Residential", href: comingSoonHref("residential") },
      { label: "Non-urban Residential", href: comingSoonHref("residential") },
    ],
  },
  { key: "commercial", label: "Commercial", href: comingSoonHref("commercial") },
  { key: "aggregation", label: "Aggregation", href: comingSoonHref("aggregation") },
  { key: "wellness", label: "Wellness", href: comingSoonHref("wellness") },
  { key: "hospitality", label: "Hospitality", href: comingSoonHref("hospitality") },
  { key: "retail-dining", label: "Retail & Dining", href: comingSoonHref("retail-dining") },
];

export const heroImage = {
  src: "/images/home/hero-desktop.png",
  alt: "Exterior view of a design-led mixed-use development with glass towers and layered podium architecture.",
};

export const introContent = {
  title: "Considered places.\nComposed to endure.",
  summary:
    "A Mumbai-based, design-led real estate developer with expertise spanning land aggregation, regulatory liaisoning, clearances, and execution shaped by design and strong architectural intent.",
  paragraphs: [
    "MĀK operates with an integrated approach across the full development lifecycle, from land aggregation and regulatory liaisoning to securing clearances and executing projects with architectural clarity. This integrated capability allows for a seamless progression from acquisition to delivery, maintaining control over both process and outcome.",
    "Its developments are guided by a consistent philosophy. To create environments that move beyond functional real estate and instead offer a more refined, experience-driven way of living. Each project is approached as a spatial composition, where planning, materiality and proportion are calibrated to deliver clarity, comfort and longevity.",
  ],
};

export const practiceMetrics: Metric[] = [
  { value: "2 million sq. ft.", label: "Aggregated development potential" },
  { value: "₹2600 to 2800 Cr.", label: "GDV (Current portfolio value)" },
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
    id: "residential",
    title: "Residential",
    description:
      "The aggregated residential scale includes approximately 1.7 million sq. ft. within the non-urban ecosystem and approximately 2 lakh sq. ft. across multiple projects.",
    href: comingSoonHref("residential"),
    image: {
      src: "/images/home/residential-desktop.png",
      alt: "Grand residential entry with warm lighting, stone detailing, and layered planting.",
    },
    wide: true,
  },
  {
    id: "hospitality",
    title: "Hospitality",
    description:
      "150 serviced suites (~550 sq. ft.) for short and extended stays within the larger development.",
    href: comingSoonHref("hospitality"),
    image: {
      src: "/images/home/hospitality-desktop.png",
      alt: "Hospitality courtyard with a sweeping canopy, water element, and tropical landscape.",
    },
  },
  {
    id: "wellness",
    title: "Wellness",
    description:
      "A pioneering, members-only wellness club. A first of its kind at this scale.",
    href: comingSoonHref("wellness"),
    image: {
      src: "/images/home/wellness-desktop.png",
      alt: "Calm wellness interior with sculpted stone forms, filtered light, and quiet seating.",
    },
  },
  {
    id: "retail-dining",
    title: "Botique Retail and Dining",
    description:
      "An 80,000 sq. ft. design-led retail destination combining curated dining, shopping, and leisure within a hospitality-driven lifestyle experience.",
    href: comingSoonHref("retail-dining"),
    image: {
      src: "/images/home/retail-dining-desktop.png",
      alt: "Editorial dining table scene with plated dishes and warm hospitality styling.",
    },
  },
  {
    id: "commercial",
    title: "Commercial",
    description:
      "A boutique office concept within larger commercial developments, balancing scale with thoughtful, design-led workspaces.",
    href: comingSoonHref("commercial"),
    image: {
      src: "/images/home/commercial-desktop.png",
      alt: "Architectural interior with sculpted stone surfaces suited to a boutique office environment.",
    },
  },
  {
    id: "land-aggregation",
    title: "land Aggregation",
    description:
      "Beyond development, MĀK has aggregated over 5,000 acres of land and managed complex regulatory approvals for public and private sector projects.",
    href: comingSoonHref("aggregation"),
    image: {
      src: "/images/home/land-desktop.png",
      alt: "Aerial coastal land parcel and infrastructure context photographed from above.",
    },
  },
];

export const approachImage = {
  src: "/images/home/approach-desktop.png",
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
    title: "Spatial Intent",
    description:
      "Each development is approached as a spatial composition, where planning, materiality and proportion are calibrated to create clarity, comfort and lasting value.",
  },
  {
    title: "Micro-Hospitality",
    description:
      "Hospitality thinking informs arrival, circulation and amenity design, shaping environments that feel more intuitive, refined and experience-led in everyday use.",
  },
];

export const growthCards: GrowthCard[] = [
  {
    id: "commercial-development",
    title: "Commercial Development",
    description:
      "Entry into the commercial segment with a focus on boutique office environments, integrated within larger, expansive commercial developments.",
    href: comingSoonHref("commercial"),
    image: {
      src: "/images/home/growth-commercial-desktop.png",
      alt: "Commercial frontage at dusk with warm-lit glazing and layered retail edges.",
    },
  },
  {
    id: "non-urban-expansion",
    title: "Non-Urban Expansion",
    description:
      "Further development of the hospitality-led model, bringing together residential, retail, wellness and F&B components within cohesive, lifestyle-driven environments.",
    href: comingSoonHref("residential"),
    image: {
      src: "/images/home/growth-nonurban-desktop.png",
      alt: "Arrival court for a non-urban expansion with lush landscape and sculpted columns.",
    },
  },
];

export const contactImage = {
  src: "/images/home/contact-desktop.png",
  alt: "Architectural arrival court with tropical planting and a refined branded entry.",
};

export const footerPrimaryLinks: FooterLink[] = [
  { label: "Portfolio", href: "/#verticals" },
  { label: "Approach", href: "/#approach" },
  { label: "Land", href: "/#land-aggregation" },
];

export const footerSecondaryLinks: FooterLink[] = [
  { label: "Contact", href: "/contact" },
];

export const footerDisabledLinks: DisabledFooterLink[] = [
  { label: "Privacy" },
  { label: "Terms" },
  { label: "RERA Disclosure" },
];
