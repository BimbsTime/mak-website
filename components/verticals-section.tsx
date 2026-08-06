"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { VerticalCard } from "@/components/vertical-card";
import { VerticalLineReveal } from "@/components/vertical-line-reveal";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { verticalCards, verticalGalleryCaptions } from "@/lib/content";

export function VerticalsSection() {
  const defaultActiveId = verticalCards[0]?.id ?? "";
  const [activeId, setActiveId] = useState(defaultActiveId);
  const { ref, isDragging, dragHandlers } = useDragScroll<HTMLDivElement>();
  const arrowFrameRef = useRef<HTMLDivElement | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const mobileFocusTimeoutRef = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [arrowTop, setArrowTop] = useState<number | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  const toggleGalleryPanel = (index: number) => {
    if (window.innerWidth >= 768) {
      return;
    }

    setActiveGalleryIndex((current) => (current === index ? null : index));
  };

  const handleGalleryPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    toggleGalleryPanel(index);
  };

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
    const clearDesktopGallerySelection = () => {
      if (window.innerWidth >= 768) {
        setActiveGalleryIndex(null);
      }
    };

    clearDesktopGallerySelection();
    window.addEventListener("resize", clearDesktopGallerySelection);
    return () => window.removeEventListener("resize", clearDesktopGallerySelection);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const clearMobileFocusTimeout = () => {
      if (mobileFocusTimeoutRef.current !== null) {
        window.clearTimeout(mobileFocusTimeoutRef.current);
        mobileFocusTimeoutRef.current = null;
      }
    };

    const focusClosestMobileCard = () => {
      const scrollRect = node.getBoundingClientRect();
      const scrollCenter = scrollRect.left + scrollRect.width / 2;
      const focusedCard = [...node.querySelectorAll<HTMLElement>("article")].reduce<HTMLElement | null>(
        (nearest, card) => {
          if (!nearest) {
            return card;
          }

          const cardCenter = card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2;
          const nearestCenter = nearest.getBoundingClientRect().left + nearest.getBoundingClientRect().width / 2;
          return Math.abs(cardCenter - scrollCenter) < Math.abs(nearestCenter - scrollCenter) ? card : nearest;
        },
        null,
      );

      if (focusedCard?.id) {
        setActiveId((current) => (current === focusedCard.id ? current : focusedCard.id));
      }
    };

    const update = () => {
      const maxScrollLeft = node.scrollWidth - node.clientWidth;
      const nextScrollLeft = node.scrollLeft;
      setCanScrollLeft(nextScrollLeft > 2);
      setCanScrollRight(nextScrollLeft < maxScrollLeft - 2);

      if (window.innerWidth >= 768) {
        clearMobileFocusTimeout();
        return;
      }

      clearMobileFocusTimeout();
      mobileFocusTimeoutRef.current = window.setTimeout(() => {
        focusClosestMobileCard();
        mobileFocusTimeoutRef.current = null;
      }, 180);
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      clearMobileFocusTimeout();
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
    <section id="verticals" className="w-full pt-[48px] md:pt-[96px] md:pb-[48px]">
      <div className="mx-auto max-w-[1615px] px-6 md:px-20">
        <div className="flex flex-col gap-4 md:max-w-[1114px] md:flex-row md:items-end md:gap-14">
          <h2 className="max-w-[510px] font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[36px] md:leading-[40px]">
            <ScrollReveal as="span" delay={0} distance={18} className="block whitespace-normal md:whitespace-nowrap">
              An Active Presence Across
            </ScrollReveal>
            <ScrollReveal as="span" delay={120} distance={18} className="block whitespace-normal md:whitespace-nowrap">
              Multiple Verticals
            </ScrollReveal>
          </h2>
          <div className="flex max-w-[524px] items-end gap-5">
            <VerticalLineReveal className="hidden h-[106px] w-px bg-black md:block" delay={120} />
            <ScrollReveal delay={140}>
              <p className="max-w-[296px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[492px] md:text-[16px] md:leading-[22px]">
                MĀK&apos;s active and pipeline engagements span commercial, residential, hospitality, retail and wellness formats, positioned across dense urban contexts as well as lower-density, lifestyle-led markets.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <ScrollReveal delay={220}>
        <div className="mt-10 w-full md:mt-[56px]">
          <div
            role="button"
            tabIndex={0}
            aria-pressed={activeGalleryIndex === 0}
            onClick={() => toggleGalleryPanel(0)}
            onKeyDown={(event) => handleGalleryPanelKeyDown(event, 0)}
            className="group relative h-[55svh] min-h-[340px] cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] md:h-[75svh] md:min-h-[500px]"
          >
            <Image
              src="/images/home/verticals-gallery/partners-wide.webp"
              alt="Forum retail and office development with the MĀK and Forum marks."
              fill
              sizes="100vw"
              className={`object-cover transition-transform duration-500 ${
                activeGalleryIndex === 0 ? "scale-[1.02]" : "group-hover:scale-[1.02]"
              }`}
            />
            <div className={`absolute inset-0 flex items-center justify-center bg-black/65 p-6 text-center transition-opacity duration-300 md:p-10 ${
              activeGalleryIndex === 0 ? "opacity-100" : "opacity-0 group-hover:opacity-100"            }`}>
              <p className="max-w-[550px] font-body text-[14px] leading-7 font-extralight tracking-[0.04em] text-white md:text-[20px] md:leading-10">{verticalGalleryCaptions[0]}</p>
            </div>
          </div>
          <div className="mt-1 grid grid-cols-1 gap-1 md:h-[65svh] md:min-h-[440px] md:grid-cols-[3fr_2fr]">
            <div
              role="button"
              tabIndex={0}
              aria-pressed={activeGalleryIndex === 1}
              onClick={() => toggleGalleryPanel(1)}
              onKeyDown={(event) => handleGalleryPanelKeyDown(event, 1)}
              className="group relative h-[50svh] min-h-[320px] cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] md:h-auto md:min-h-0"
            >
              <Image
                src="/images/home/verticals-gallery/partners-left.webp"
                alt="Detail of the Forum development facade and retail frontage."
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={`object-cover transition-transform duration-500 ${
                  activeGalleryIndex === 1 ? "scale-[1.02]" : "group-hover:scale-[1.02]"
                }`}
              />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/65 p-6 text-center transition-opacity duration-300 md:p-10 ${
                activeGalleryIndex === 1 ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}>
                <p className="max-w-[550px] font-body text-[14px] leading-7 font-extralight tracking-[0.04em] text-white md:text-[20px] md:leading-10">{verticalGalleryCaptions[1]}</p>
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-pressed={activeGalleryIndex === 2}
              onClick={() => toggleGalleryPanel(2)}
              onKeyDown={(event) => handleGalleryPanelKeyDown(event, 2)}
              className="group relative h-[50svh] min-h-[320px] cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] md:h-auto md:min-h-0"
            >
              <Image
                src="/images/home/verticals-gallery/partners-right.webp"
                alt="Detail of the Forum development's glazed office facade."
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className={`object-cover transition-transform duration-500 ${
                  activeGalleryIndex === 2 ? "scale-[1.02]" : "group-hover:scale-[1.02]"
                }`}
              />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/65 p-6 text-center transition-opacity duration-300 md:p-10 ${
                activeGalleryIndex === 2 ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}>
                <p className="max-w-[620px] font-body text-[14px] leading-7 font-extralight tracking-[0.04em] text-white md:text-[20px] md:leading-10">{verticalGalleryCaptions[2]}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={220}>
        <div ref={arrowFrameRef} className="relative mt-10 md:mt-[56px]">
          <div
            ref={ref}
            className={`no-scrollbar snap-x snap-mandatory overflow-x-auto pb-4 select-none overscroll-x-contain md:snap-none md:[touch-action:pan-y] ${
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
            <div className="flex w-max items-start gap-5 md:gap-14 md:pl-20 md:pr-20">
              <div aria-hidden="true" className="w-[calc(50vw-161px)] shrink-0 md:hidden" />
              {verticalCards.map((card) => (
                <div key={card.id} className="shrink-0 snap-center">
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
              <div aria-hidden="true" className="w-[calc(50vw-161px)] shrink-0 md:hidden" />
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
