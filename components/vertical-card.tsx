import Image from "next/image";

import { ScrollReveal } from "@/components/scroll-reveal";
import { ExploreLink } from "@/components/ui/explore-link";
import type { VerticalCard as VerticalCardData } from "@/lib/types";

type VerticalCardProps = {
  card: VerticalCardData;
  isActive: boolean;
  onActivate: () => void;
};

export function VerticalCard({ card, isActive, onActivate }: VerticalCardProps) {
  return (
    <article
      id={card.id}
      data-active={isActive ? "true" : "false"}
      className={`flex shrink-0 scroll-mt-28 flex-col gap-6 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:gap-8 ${
        isActive ? "w-[282px] md:w-[520px]" : "w-[226px] md:w-[400px]"
      }`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <div
        className={`relative overflow-hidden bg-[#d8d2c7] ${
          isActive ? "aspect-[282/330]" : "aspect-[226/330]"
        } md:h-[480px] md:aspect-auto`}
      >
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          draggable={false}
          sizes={isActive ? "(min-width: 768px) 520px, 282px" : "(min-width: 768px) 400px, 226px"}
          className="pointer-events-none object-cover transition-transform duration-500"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isActive ? "opacity-0" : "bg-black/40 opacity-100"
          }`}
        />
      </div>

      <ScrollReveal delay={140}>
        <div className="flex w-full flex-col items-start gap-3 md:gap-6">
          <div className="flex w-full flex-col gap-3 md:gap-6">
            <h3 className="w-full font-display text-[20px] leading-[21px] text-black md:text-[32px] md:leading-[26px]">
              {card.title}
            </h3>
            <p className="w-full font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[16px] md:leading-[22px]">
              {card.description}
            </p>
          </div>
          <ExploreLink href={card.href} />
        </div>
      </ScrollReveal>
    </article>
  );
}
