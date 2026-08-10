import Image from "next/image";

import { ScrollReveal } from "@/components/scroll-reveal";
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
      className={`flex shrink-0 scroll-mt-28 flex-col gap-6 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:gap-8 ${
        isActive ? "w-[282px] md:w-[520px]" : "w-[226px] md:w-[400px]"
      }`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <div className="relative h-[330px] overflow-hidden bg-[#d8d2c7] md:h-[480px] md:aspect-auto">
        <div className="relative h-full w-[282px] shrink-0 md:w-[520px]">
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            draggable={false}
            loading="eager"
            sizes="(min-width: 768px) 520px, 282px"
            className={`pointer-events-none object-cover will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive ? "scale-[1.06]" : "scale-100"
            }`}
          />
        </div>
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isActive ? "opacity-0" : "bg-black/40 opacity-100"
          }`}
        />
      </div>

      <ScrollReveal delay={140}>
        <div className="flex w-full flex-col items-start gap-3 md:gap-6">
          <div className="flex w-full flex-col gap-3 md:gap-6">
            <h3 className="w-full font-display text-[20px] leading-[21px] text-black md:text-[24px] md:leading-[26px]">
              {card.title}
            </h3>
            <p className="w-full font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[16px] md:leading-[22px]">
              {card.description}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </article>
  );
}
