"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { VerticalCard } from "@/components/vertical-card";
import { VerticalLineReveal } from "@/components/vertical-line-reveal";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { verticalCards } from "@/lib/content";

export function VerticalsSection() {
  const defaultActiveId = verticalCards[0]?.id ?? "";
  const [activeId, setActiveId] = useState(defaultActiveId);
  const { ref, isDragging, dragHandlers } = useDragScroll<HTMLDivElement>();
  const arrowFrameRef = useRef<HTMLDivElement | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [arrowTop, setArrowTop] = useState<number | null>(null);

  const clearResetTimeout = () => {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  };

  const scheduleReset = () => {
    clearResetTimeout();
    resetTimeoutRef.current = window.setTimeout(() => {
      setActiveId(defaultActiveId);
      resetTimeoutRef.current = null;
    }, 120);
  };

  useEffect(() => clearResetTimeout, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const update = () => {
      const maxScrollLeft = node.scrollWidth - node.clientWidth;
      const nextScrollLeft = node.scrollLeft;
      setCanScrollLeft(nextScrollLeft > 2);
      setCanScrollRight(nextScrollLeft < maxScrollLeft - 2);
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  useEffect(() => {
    const update = () => {
      const frameNode = arrowFrameRef.current;
      const scrollNode = ref.current;
      if (!frameNode || !scrollNode) {
        return;
      }

      const firstImage = scrollNode.querySelector("article > div");
      if (!(firstImage instanceof HTMLElement)) {
        return;
      }

      const frameRect = frameNode.getBoundingClientRect();
      const imageRect = firstImage.getBoundingClientRect();
      setArrowTop(imageRect.top - frameRect.top + imageRect.height / 2);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);

  const scrollByStep = (direction: -1 | 1) => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const firstCard = node.querySelector("article");
    const gap = window.innerWidth >= 768 ? 56 : 20;
    const step = (firstCard?.getBoundingClientRect().width ?? node.clientWidth * 0.85) + gap;
    node.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section id="verticals" className="w-full py-[48px] md:pt-[96px] md:pb-[48px]">
      <div className="mx-auto max-w-[1615px] px-6 md:px-20">
        <div className="flex flex-col gap-4 md:max-w-[1114px] md:flex-row md:items-end md:gap-14">
          <h2 className="max-w-[510px] font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[36px] md:leading-[40px]">
            <ScrollReveal as="span" delay={0} distance={18} className="block whitespace-normal md:whitespace-nowrap">
              An Active Presence
            </ScrollReveal>
            <ScrollReveal as="span" delay={120} distance={18} className="block whitespace-normal md:whitespace-nowrap">
              across Multiple Verticals.
            </ScrollReveal>
          </h2>
          <div className="flex max-w-[524px] items-end gap-5">
            <VerticalLineReveal className="hidden h-[106px] w-px bg-black md:block" delay={120} />
            <ScrollReveal delay={140}>
              <p className="max-w-[296px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[492px] md:text-[16px] md:leading-[22px]">
                Bringing together residential and hospitality, as well as lifestyle-oriented, leisure-based retail and wellness components within integrated developments.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <ScrollReveal delay={220}>
        <div ref={arrowFrameRef} className="relative mt-10 md:mt-[56px]">
          <div
            ref={ref}
            className={`no-scrollbar overflow-x-auto pb-4 select-none overscroll-x-contain md:[touch-action:pan-y] ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            {...dragHandlers}
            onMouseEnter={clearResetTimeout}
            onMouseLeave={() => {
              if (!isDragging) {
                scheduleReset();
              }
            }}
          >
            <div className="flex w-max items-start gap-5 pl-6 pr-6 md:gap-14 md:pl-20 md:pr-20">
              {verticalCards.map((card) => (
                <div key={card.id} className="shrink-0">
                  <VerticalCard
                    card={card}
                    isActive={card.id === activeId}
                    onActivate={() => {
                      clearResetTimeout();
                      if (!isDragging) {
                        setActiveId(card.id);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            disabled={!canScrollLeft}
            onClick={() => scrollByStep(-1)}
            style={arrowTop !== null ? { top: arrowTop } : undefined}
            className={`hidden absolute left-6 z-10 -translate-y-1/2 items-center justify-center size-11 rounded-sm border border-black/15 bg-[#fbfaf8]/95 backdrop-blur-sm text-[var(--brand)] transition-opacity duration-200 md:left-0 md:inline-flex ${
              canScrollLeft ? "opacity-100" : "pointer-events-none opacity-30"
            }`}
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={!canScrollRight}
            onClick={() => scrollByStep(1)}
            style={arrowTop !== null ? { top: arrowTop } : undefined}
            className={`hidden absolute right-6 z-10 -translate-y-1/2 items-center justify-center size-11 rounded-sm border border-black/15 bg-[#fbfaf8]/95 backdrop-blur-sm text-[var(--brand)] transition-opacity duration-200 md:right-0 md:inline-flex ${
              canScrollRight ? "opacity-100" : "pointer-events-none opacity-30"
            }`}
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}
