"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { growthCards, growthOverview } from "@/lib/content";

export function GrowthSectionV2() {
  return (
    <section id="growth" className="w-full py-8 md:pt-0 md:pb-12">
      <div className="w-full px-6 md:px-12 xl:px-80">
        <div className="mx-auto flex max-w-[1177px] flex-col items-center gap-6 text-center md:gap-12">
          <h2 className="font-display text-[32px] leading-[32px] text-[var(--brand)] md:text-[48px] md:leading-[48px]">
            <ScrollReveal as="span" delay={0} distance={18} className="block whitespace-normal md:whitespace-nowrap">
              Project Pipeline &amp; Growth
            </ScrollReveal>
          </h2>

          <ScrollReveal delay={140}>
            <p className="max-w-[300px] font-body text-[12px] leading-4 tracking-[0.04em] text-black text-left md:max-w-[1177px] md:text-center md:text-[16px] md:leading-[22px]">
              {growthOverview[0]}
            </p>
          </ScrollReveal>

          <div className="grid max-w-[1177px] gap-6 text-justify xl:grid-cols-2 xl:gap-12">
            {growthOverview.slice(1).map((paragraph, index) => (
              <ScrollReveal key={paragraph} delay={260 + index * 120}>
                <p className="max-w-[300px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-none md:text-[16px] md:leading-[22px]">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div aria-label="Project pipeline" className="mt-8 md:mt-12">
        <div className="mx-auto flex max-w-[1615px] flex-col gap-12 px-6 md:gap-12 md:px-20">
          {growthCards.map((card) => (
            <article
              key={card.id}
              id={card.id}
              data-growth-card
              className="w-full"
            >
              <div className="w-full">
                <div className="relative aspect-[316/178] overflow-hidden bg-[#d8d2c7] md:aspect-[1051/594]">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(min-width: 768px) 1051px, 316px"
                    className="object-cover"
                    data-growth-image
                  />
                </div>

                <div
                  data-growth-content
                  className="mt-4 flex flex-col gap-4 md:mt-10 md:flex-row md:items-start md:justify-between md:gap-[270px] md:pr-4"
                >
                  <div className="flex max-w-[250px] flex-col gap-3 md:max-w-[765px] md:gap-8">
                    <h3 className="font-display text-[18px] leading-[21px] text-black md:text-[24px] md:leading-[25px]">
                      {card.title}
                    </h3>
                    <p className="font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[16px] md:leading-6">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
