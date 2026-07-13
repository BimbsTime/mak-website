import Image from "next/image";

import { heroImage } from "@/lib/content";

export function Hero() {
  return (
    <section aria-label="Hero" className="w-full">
      <div className="relative hidden aspect-[3390/1922] w-full md:block">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="relative aspect-square w-full md:hidden">
        <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}
