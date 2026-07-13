import Image from "next/image";

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
      className={`shrink-0 scroll-mt-28 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isActive ? "w-[282px] md:w-[600px]" : "w-[226px] md:w-[480px]"
      }`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <div className={`relative overflow-hidden bg-[#d8d2c7] ${isActive ? "aspect-[282/330] md:aspect-[6/7]" : "aspect-[226/330] md:aspect-[24/35]"}`}>
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes={isActive ? "(min-width: 768px) 600px, 282px" : "(min-width: 768px) 480px, 226px"}
          className="object-cover transition-transform duration-500"
        />
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 md:mt-10 md:gap-6">
        <div className="flex flex-col gap-3 md:gap-6">
          <h3 className="font-display text-[20px] leading-[21px] text-black md:text-[32px] md:leading-[34px]">
            {card.title}
          </h3>
          <p
            className={`font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[20px] md:leading-6 ${
              isActive ? "max-w-[282px] md:max-w-[456px]" : "max-w-[226px] md:max-w-[454px]"
            }`}
          >
            {card.description}
          </p>
        </div>
        <ExploreLink href={card.href} />
      </div>
    </article>
  );
}
