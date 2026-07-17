"use client";

import { useCallback, useRef, useState } from "react";
import type { MutableRefObject, RefObject } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { VerticalLineReveal } from "@/components/vertical-line-reveal";
import { useApproachScroll } from "@/hooks/use-approach-scroll";
import { approachImage, approachPoints, approachVideo } from "@/lib/content";

type ApproachPointsListProps = {
  activeIndex: number;
  onPointClick: (index: number) => void;
  pointRefs: MutableRefObject<HTMLElement[]>;
};

function ApproachPointsList({ activeIndex, onPointClick, pointRefs }: ApproachPointsListProps) {
  return (
    <div className="flex flex-col gap-5 md:gap-16 md:pt-6 md:pb-6">
      {approachPoints.map((point, index) => {
        const isActive = index === activeIndex;

        return (
          <article
            key={point.title}
            ref={(node) => {
              if (node) {
                pointRefs.current[index] = node;
              }
            }}
            data-approach-point
            className={`flex flex-col transition-[gap] duration-500 ${
              isActive ? "gap-3 md:gap-4" : "gap-0"
            }`}
          >
            <button
              type="button"
              onClick={() => onPointClick(index)}
              aria-pressed={isActive}
              className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
            >
              <h2
                data-approach-title
                className={`font-display text-[20px] leading-[21px] transition-colors duration-300 md:text-[36px] md:leading-[38px] ${
                  isActive ? "text-black" : "text-black/40"
                }`}
              >
                {point.title}
              </h2>
            </button>
            <p
              data-approach-description
              className={`max-w-[320px] overflow-hidden font-body text-[12px] leading-4 tracking-[0.04em] text-black transition-[max-height,opacity] duration-500 md:max-w-[360px] md:max-h-none md:opacity-0 md:text-[16px] md:leading-[22px] ${
                isActive ? "max-h-[220px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {point.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function StickyMedia({ mediaRef }: { mediaRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={mediaRef} className="order-1 -mx-6 md:order-1 md:sticky md:top-24 md:mx-0 md:max-w-[980px] md:self-start">
      <ScrollReveal delay={280}>
        <div className="relative aspect-square overflow-hidden bg-[#d8d2c7] md:h-[520px] md:aspect-auto">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={approachImage.alt}
            poster={approachVideo.poster}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={approachVideo.src} type="video/mp4" />
          </video>
        </div>
      </ScrollReveal>
    </div>
  );
}

function ApproachIntro() {
  return (
    <div className="max-w-[1615px] px-6 md:px-20">
    <div className="flex flex-col gap-4 md:max-w-[1114px] md:flex-row md:items-end md:gap-14">
      <h2 className="max-w-[510px] font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[32px] md:leading-[40px]">
        <ScrollReveal as="span" delay={0} distance={18} className="block whitespace-normal md:whitespace-nowrap">
          Core Identity and
        </ScrollReveal>
        <ScrollReveal as="span" delay={120} distance={18} className="block whitespace-normal md:whitespace-nowrap">
          Approach.
        </ScrollReveal>
      </h2>
      <div className="flex max-w-[524px] items-end gap-5">
        <VerticalLineReveal className="hidden h-[106px] w-px bg-black md:block" delay={120} />
        <ScrollReveal delay={140}>
          <p className="max-w-[296px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[492px] md:text-[16px] md:leading-[22px]">
            MĀK is a real estate developer focused on delivering high-quality projects with an emphasis on spatial experience, creating developments that are functional, thoughtful, and enduring.
          </p>
        </ScrollReveal>
      </div>
    </div>
    </div>
  );
}

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const pointRefs = useRef<HTMLElement[]>([]);
  const zoneRefs = useRef<HTMLElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndexChange = useCallback((index: number) => {
    setActiveIndex((current) => (current === index ? current : index));
  }, []);
  const { isDesktopMotionEnabled, scrollToPoint } = useApproachScroll({
    sectionRef,
    pointRefs,
    zoneRefs,
    mediaRef,
    activeIndex,
    onActiveIndexChange: handleActiveIndexChange,
  });
  const handlePointClick = useCallback((index: number) => {
    if (isDesktopMotionEnabled) {
      scrollToPoint(index);
      return;
    }

    setActiveIndex(index);
  }, [isDesktopMotionEnabled, scrollToPoint]);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full px-6 py-[48px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-black/20 before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-black/20 after:to-transparent md:before:hidden md:after:hidden md:pt-[48px] md:pl-0 md:pb-[48px] md:pr-20"
    >
      <div className="relative mx-auto w-full max-w-[1480px] md:h-[calc(100vh+1200px)]">
        <div className="flex flex-col gap-8 md:sticky md:top-24 md:gap-10">
          <ApproachIntro />
          <div className="flex flex-col gap-8 md:grid md:grid-cols-[minmax(0,980px)_360px] md:items-start md:justify-between md:gap-12">
            <StickyMedia mediaRef={mediaRef} />
            <ScrollReveal delay={220} className="order-2 md:order-2">
              <ApproachPointsList
                activeIndex={activeIndex}
                onPointClick={handlePointClick}
                pointRefs={pointRefs}
              />
            </ScrollReveal>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          {approachPoints.map((point, index) => (
            <div
              key={point.title}
              ref={(node) => {
                if (node) {
                  zoneRefs.current[index] = node;
                }
              }}
              data-approach-scroll-zone={index + 1}
              className="absolute left-0 right-0 h-1/3"
              style={{ top: `${(index / approachPoints.length) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
