import Image from "next/image";

import { ScrollReveal } from "@/components/scroll-reveal";
import { heroImage } from "@/lib/content";

export function Hero() {
  return (
    <section aria-label="Hero" className="w-full">
      <ScrollReveal distance={36} duration={1100} scale={0.985} threshold={0.01}>
        <div className="relative hidden aspect-[3390/1922] w-full overflow-hidden md:block">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </ScrollReveal>
      <ScrollReveal distance={28} duration={950} scale={0.985} threshold={0.01} className="md:hidden">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </ScrollReveal>
    </section>
  );
}
