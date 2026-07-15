"use client";

import Image from "next/image";
import { useRef } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { ExploreLink } from "@/components/ui/explore-link";
import { VerticalLineReveal } from "@/components/vertical-line-reveal";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { growthCards } from "@/lib/content";

export function GrowthSectionV2() {
  const pinnedSectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const isDesktopMotionEnabled = useHorizontalScroll({
    sectionRef: pinnedSectionRef,
    trackRef,
  });

  return (
    <section className="w-full py-8 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-[1615px] px-6 md:px-20">
        <div className="flex flex-col gap-4 md:max-w-[1114px] md:flex-row md:items-end md:gap-14">
          <h2 className="max-w-[510px] font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[36px] md:leading-[40px]">
            <ScrollReveal as="span" delay={0} distance={18} className="block whitespace-normal md:whitespace-nowrap">
              Project Pipeline and<br />
              Growth.
            </ScrollReveal>
          </h2>

          <div className="flex max-w-[524px] items-end gap-5">
            <VerticalLineReveal className="hidden h-[106px] w-px bg-black md:block" delay={120} />
            <ScrollReveal delay={140}>
              <p className="max-w-[296px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[492px] md:text-[16px] md:leading-[22px]">
                The firm is set to launch 3-4 new projects across residential and commercial sectors, with a projected portfolio expansion of ₹4000-5000 Cr. GDV over the next two years.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <section
        ref={pinnedSectionRef}
        aria-label="Project pipeline"
        className={`mt-8 md:mt-8 ${
          isDesktopMotionEnabled ? "overflow-hidden md:h-[100vh]" : "overflow-visible"
        }`}
      >
        <div
          ref={trackRef}
          className={`flex flex-col gap-12 ${
            isDesktopMotionEnabled ? "md:h-full md:w-max md:flex-row md:gap-[4vw] md:px-[6vw]" : ""
          }`}
        >
          {growthCards.map((card) => (
            <article
              key={card.id}
              id={card.id}
              data-growth-card
              className={`w-full shrink-0 ${
                isDesktopMotionEnabled
                  ? "md:flex md:h-full md:w-[72vw] md:items-center"
                  : ""
              }`}
            >
              <div className="mx-auto w-[calc(100%-3rem)] max-w-[1051px] md:w-full md:max-w-none">
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
                    <h3 className="font-display text-[18px] leading-[21px] text-black md:text-[32px] md:leading-[25px]">
                      {card.title}
                    </h3>
                    <p className="font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[16px] md:leading-6">
                      {card.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <ExploreLink href={card.href} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
