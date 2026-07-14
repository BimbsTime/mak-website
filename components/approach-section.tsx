"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { approachImage, approachPoints, approachVideo } from "@/lib/content";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getApproachActiveIndex(progress: number, totalPoints: number) {
  if (totalPoints <= 1) {
    return 0;
  }

  const safeProgress = clamp(progress, 0, 0.9999);

  if (totalPoints === 3) {
    if (safeProgress < 0.4) {
      return 0;
    }
    if (safeProgress < 0.82) {
      return 1;
    }
    return 2;
  }

  return Math.min(totalPoints - 1, Math.floor(safeProgress * totalPoints));
}

type ApproachContentProps = {
  activeIndex: number;
  onPointClick: (index: number) => void;
  pointsRef: RefObject<HTMLDivElement | null>;
  mediaRef: RefObject<HTMLDivElement | null>;
};

function ApproachPointsList({
  activeIndex,
  onPointClick,
  pointsRef,
}: Omit<ApproachContentProps, "mediaRef">) {
  return (
    <div ref={pointsRef} className="flex flex-col gap-5 md:gap-10 md:pt-2 md:pb-2">
      {approachPoints.map((point, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={point.title}
            className={`flex flex-col transition-[gap] duration-500 ${
              isActive ? "gap-3 md:gap-5" : "gap-0"
            }`}
          >
            <button
              type="button"
              onClick={() => onPointClick(index)}
              aria-pressed={isActive}
              className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
            >
              <h3
                className={`font-display text-[20px] leading-[21px] transition-colors duration-300 md:text-[36px] md:leading-[38px] ${
                  isActive ? "text-black" : "text-black/40"
                }`}
              >
                {point.title}
              </h3>
            </button>
            <p
              className={`max-w-[320px] overflow-hidden font-body text-[12px] leading-4 tracking-[0.04em] text-black transition-all duration-500 md:max-w-[360px] md:text-[16px] md:leading-[22px] ${
                isActive ? "max-h-[220px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {point.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ApproachContent({ activeIndex, onPointClick, pointsRef, mediaRef }: ApproachContentProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-8 md:gap-10">
      <div className="flex flex-col gap-4 md:hidden">
        <ScrollReveal delay={0}>
          <h2 className="font-display text-[24px] leading-[26px] text-[var(--brand)]">
            <span className="block">Core Identity and</span>
            <span className="block">Approach.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <p className="max-w-[336px] font-body text-[12px] leading-4 tracking-[0.04em] text-black">
            MĀK is a real estate developer focused on delivering high-quality projects with an emphasis on spatial experience, creating developments that are functional, thoughtful, and enduring.
          </p>
        </ScrollReveal>
      </div>

      <div className="flex flex-col gap-8 md:grid md:grid-cols-[360px_minmax(0,980px)] md:items-start md:justify-between md:gap-8">
        <ScrollReveal delay={280} className="order-1 md:order-2">
          <div ref={mediaRef} className="md:pt-0 md:max-w-[980px]">
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
              <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.14)_58%,rgba(0,0,0,0)_78%)] md:block" />
              <div className="absolute inset-0 hidden items-end px-6 py-6 md:flex md:px-10 md:py-10">
                <div className="flex w-full max-w-[560px] flex-col gap-4 md:gap-5">
                  <ScrollReveal delay={0}>
                    <h2 className="font-display text-[24px] leading-[26px] text-[#f7f5f2] md:text-[36px] md:leading-[44px]">
                      <span className="block whitespace-normal md:whitespace-nowrap">Core Identity and</span>
                      <span className="block whitespace-normal md:whitespace-nowrap">Approach.</span>
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal delay={140}>
                    <p className="max-w-[336px] font-body text-[12px] leading-4 tracking-[0.04em] text-[#f7f5f2] md:max-w-[560px] md:text-[16px] md:leading-6">
                      MĀK is a real estate developer focused on delivering high-quality projects with an emphasis on spatial experience, creating developments that are functional, thoughtful, and enduring.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={220} className="order-2 md:order-1">
          <ApproachPointsList
            activeIndex={activeIndex}
            onPointClick={onPointClick}
            pointsRef={pointsRef}
          />
        </ScrollReveal>
      </div>
    </div>
  );
}

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pointsRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalPoints = approachPoints.length;

  useEffect(() => {
    let frameId: number | null = null;

    const updateActivePoint = () => {
      if (typeof window === "undefined" || !sectionRef.current) {
        return;
      }

      const pointsRect = pointsRef.current?.getBoundingClientRect();
      const mediaRect = mediaRef.current?.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (!pointsRect || !mediaRect) {
        return;
      }

      const frameTop = window.innerWidth >= 768 ? 16 : 12;
      const pointsVisible = pointsRect.top >= frameTop && pointsRect.bottom <= viewportHeight;
      const mediaVisible = mediaRect.top >= frameTop && mediaRect.bottom <= viewportHeight;
      if (!pointsVisible || !mediaVisible) {
        return;
      }

      const visibilityTravel = viewportHeight - Math.max(pointsRect.height, mediaRect.height) - frameTop;
      if (visibilityTravel <= 0) {
        return;
      }

      const progress = clamp((visibilityTravel - mediaRect.top + frameTop) / visibilityTravel, 0, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 1.35);
      const nextIndex = getApproachActiveIndex(easedProgress, totalPoints);

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleUpdate = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        updateActivePoint();
        frameId = null;
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [totalPoints]);

  const handlePointClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="w-full px-6 py-[48px] md:pt-[48px] md:pr-0 md:pb-[48px] md:pl-20"
    >
      <ApproachContent
        activeIndex={activeIndex}
        onPointClick={handlePointClick}
        pointsRef={pointsRef}
        mediaRef={mediaRef}
      />
    </section>
  );
}
