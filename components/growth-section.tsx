"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { ExploreLink } from "@/components/ui/explore-link";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { growthCards } from "@/lib/content";

export function GrowthSection() {
  const { ref, isDragging, dragHandlers } = useDragScroll<HTMLDivElement>();
  const [hasScrolledTrack, setHasScrolledTrack] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.shiftKey) {
        return;
      }

      if (window.innerWidth < 768) {
        return;
      }

      const nodeRect = node.getBoundingClientRect();
      if (nodeRect.bottom > window.innerHeight - 8) {
        return;
      }

      const { deltaX, deltaY } = event;
      const shouldTranslate = Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 0.1;

      if (!shouldTranslate) {
        return;
      }

      const maxScrollLeft = node.scrollWidth - node.clientWidth;
      const currentScrollLeft = node.scrollLeft;
      const nextScrollLeft = currentScrollLeft + deltaY;
      const canScrollLeft = currentScrollLeft > 0;
      const canScrollRight = currentScrollLeft < maxScrollLeft;
      const isScrollingLeft = deltaY < 0;
      const isScrollingRight = deltaY > 0;

      const shouldConsume =
        (isScrollingLeft && canScrollLeft) || (isScrollingRight && canScrollRight);

      if (!shouldConsume) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      node.scrollLeft = Math.max(0, Math.min(maxScrollLeft, nextScrollLeft));
    };

    node.addEventListener("wheel", handleWheel, { passive: false });

    const updateTrackState = () => {
      setHasScrolledTrack(node.scrollLeft > 2);
    };

    updateTrackState();
    node.addEventListener("scroll", updateTrackState, { passive: true });

    return () => {
      node.removeEventListener("wheel", handleWheel);
      node.removeEventListener("scroll", updateTrackState);
    };
  }, [ref]);

  return (
    <section className="w-full py-[32px] md:pt-[48px] md:pb-[96px]">
      <div className="flex flex-col gap-12 md:gap-[84px]">
        <div className="px-6 md:px-20">
          <div className="grid gap-4 md:max-w-[1076px] md:grid-cols-[324px_1fr] md:items-end md:gap-x-14">
            <ScrollReveal delay={0}>
              <h2 className="font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[48px] md:leading-[44px]">
                <span className="block whitespace-normal md:whitespace-nowrap">Project Pipeline</span>
                <span className="block whitespace-normal md:whitespace-nowrap">and Growth.</span>
              </h2>
            </ScrollReveal>

            <div className="flex max-w-[672px] items-end gap-5">
              <div className="hidden h-[106px] w-px bg-black md:block" />
              <ScrollReveal delay={140}>
                <p className="max-w-[336px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[560px] md:text-[16px] md:leading-6">
                  The firm is set to launch 3-4 new projects across residential and commercial sectors, with a projected portfolio expansion of ₹4000-5000 Cr. GDV over the next two years.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <ScrollReveal delay={240}>
          <div
            ref={ref}
            className={`no-scrollbar overflow-x-auto pb-4 select-none transition-[padding] duration-300 md:[touch-action:pan-y] md:pb-0 ${
              hasScrolledTrack ? "md:pl-0" : "md:pl-20"
            } ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            {...dragHandlers}
          >
            <div className="flex w-max snap-x snap-mandatory gap-4 pl-6 pr-6 md:pl-0 md:pr-0 md:gap-14">
              {growthCards.map((card) => (
                <article
                  key={card.id}
                  id={card.id}
                  className="w-[316px] shrink-0 snap-start scroll-mt-28 md:w-[1051px]"
                >
                  <div className="relative aspect-[316/178] overflow-hidden bg-[#d8d2c7] md:h-[594px] md:w-[1051px] md:aspect-auto">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 1051px, 316px"
                      className="pointer-events-none object-cover"
                    />
                  </div>
                  <div className="mt-4 flex flex-col gap-4 md:mt-10 md:flex-row md:items-start md:justify-between md:gap-[270px] md:pr-4">
                    <div className="flex max-w-[250px] flex-col gap-3 md:max-w-[765px] md:gap-8">
                      <h3 className="font-display text-[18px] leading-[21px] text-black md:text-[24px] md:leading-[25px]">
                        {card.title}
                      </h3>
                      <p className="font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[18px] md:leading-6">
                        {card.description}
                      </p>
                    </div>
                    <div className="hidden shrink-0 md:block">
                      <ExploreLink href={card.href} />
                    </div>
                  </div>
                  <div className="md:hidden">
                    <ExploreLink href={card.href} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
