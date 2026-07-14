"use client";

import { useEffect, useRef, useState } from "react";

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
    if (safeProgress < 0.3) {
      return 0;
    }
    if (safeProgress < 0.75) {
      return 1;
    }
    return 2;
  }

  return Math.min(totalPoints - 1, Math.floor(safeProgress * totalPoints));
}

type ApproachContentProps = {
  activeIndex: number;
  onPointClick: (index: number) => void;
};

function ApproachContent({ activeIndex, onPointClick }: ApproachContentProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-10 md:gap-[56px]">
      <div className="flex flex-col gap-5 md:max-w-[1028px] md:flex-row md:items-end md:gap-14">
        <ScrollReveal delay={0}>
          <h2 className="w-full max-w-[356px] font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[48px] md:leading-[44px]">
            <span className="block whitespace-normal md:whitespace-nowrap">Core Identity and</span>
            <span className="block whitespace-normal md:whitespace-nowrap">Approach.</span>
          </h2>
        </ScrollReveal>

        <div className="flex max-w-[560px] items-end gap-5">
          <div className="hidden h-[106px] w-px bg-black md:block" />
          <ScrollReveal delay={140}>
            <p className="max-w-[336px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[560px] md:text-[20px] md:leading-6">
              MĀK is a real estate developer focused on delivering high-quality
              projects with an emphasis on spatial experience, creating
              developments that are functional, thoughtful, and enduring.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:grid md:grid-cols-[320px_minmax(0,920px)] md:items-start md:justify-between md:gap-[64px]">
        <ScrollReveal delay={220}>
          <div className="flex flex-col gap-5 md:pt-2 md:pb-2 md:gap-[14px]">
            {approachPoints.map((point, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={point.title}
                  className={`flex flex-col transition-[gap] duration-300 ${
                    isActive ? "gap-4 md:gap-5" : "gap-0"
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
                    className={`max-w-[320px] overflow-hidden font-body text-[12px] leading-4 tracking-[0.04em] text-black transition-all duration-300 md:text-[16px] md:leading-[22px] ${
                      isActive ? "max-h-[180px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={280}>
          <div className="md:pt-0 md:max-w-[920px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={approachImage.alt}
              poster={approachVideo.poster}
              className="hidden w-full max-w-none bg-[#d8d2c7] object-cover md:block md:h-[520px]"
            >
              <source src={approachVideo.src} type="video/mp4" />
            </video>
            <div className="relative aspect-[390/211] overflow-hidden bg-[#d8d2c7] md:hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={approachVideo.poster}
                className="h-full w-full object-cover"
                aria-label={approachImage.alt}
              >
                <source src={approachVideo.src} type="video/mp4" />
              </video>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalPoints = approachPoints.length;

  useEffect(() => {
    let frameId: number | null = null;

    const updateActivePoint = () => {
      if (typeof window === "undefined" || !sectionRef.current) {
        return;
      }

      if (window.innerWidth < 768) {
        setActiveIndex(0);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.height < viewportHeight) {
        const isFullyVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
        if (!isFullyVisible) {
          return;
        }

        const travel = viewportHeight - rect.height;
        const progress = travel > 0 ? clamp((travel - rect.top) / travel, 0, 1) : 0;
        const nextIndex = getApproachActiveIndex(progress, totalPoints);
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
        return;
      }

      const activationStart = viewportHeight * 0.72;
      const activationEndTop = viewportHeight * 0.35 - rect.height;
      const progress = clamp(
        (activationStart - rect.top) / Math.max(activationStart - activationEndTop, 1),
        0,
        1,
      );
      const nextIndex = getApproachActiveIndex(progress, totalPoints);

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
      className="w-full px-6 py-[24px] md:pt-[24px] md:pr-0 md:pb-[24px] md:pl-20"
    >
      <ApproachContent activeIndex={activeIndex} onPointClick={handlePointClick} />
    </section>
  );
}
