"use client";

import { useEffect, useRef, useState } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { VerticalLineReveal } from "@/components/vertical-line-reveal";
import { practiceMetrics, practiceVideo } from "@/lib/content";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PracticeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [parallaxScale, setParallaxScale] = useState(1.24);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) {
      return;
    }

    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffsetY(0);
      return;
    }

    const update = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = viewportHeight + rect.height;
      const progress = travel > 0 ? clamp((viewportHeight - rect.top) / travel, 0, 1) : 0;
      const isDesktop = window.innerWidth >= 768;
      const centeredProgress = (progress - 0.5) * 2;
      const easedProgress =
        Math.sign(centeredProgress) * Math.pow(Math.abs(centeredProgress), 0.88);
      const nextOffset = easedProgress * (isDesktop ? -84 : -36);

      setOffsetY(nextOffset);
      setParallaxScale(isDesktop ? 1.3 : 1.16);
    };

    const schedule = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        update();
        frameRef.current = null;
      });
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate w-full overflow-hidden">
      <div
        className="absolute inset-x-0 inset-y-[-12%] will-change-transform"
        style={{ transform: `translate3d(0, ${offsetY}px, 0) scale(${parallaxScale})` }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={practiceVideo.poster}
          className="h-full w-full object-cover backface-hidden"
        >
          <source src={practiceVideo.src} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-black/80 md:bg-[linear-gradient(197deg,rgba(0,0,0,0.10)_19%,rgba(0,0,0,0.80)_76%)]" />

      <div className="relative mx-auto flex min-h-[560px] max-w-[1695px] items-end gap-6 px-6 py-[48px] text-[#f7f5f2] md:min-h-[97vh] md:gap-10 md:px-20 md:py-[48px]">
        <VerticalLineReveal className="mt-2 h-[245px] w-px shrink-0 bg-[#f7f5f2] md:h-[248px]" />
        <div className="flex max-w-[840px] flex-col items-start">
          <div className="flex max-w-[344px] flex-col gap-3 md:max-w-none md:gap-3">
            <ScrollReveal delay={0}>
              <h2 className="font-display text-[32px] leading-[32px] md:text-[36px] md:leading-[36px]">
                The Practice.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="max-w-[206px] font-body text-[12px] leading-4 tracking-[0.04em] md:max-w-[344px] md:text-[16px] md:leading-6">
                An integrated practice. Translating land into built form through a process that is both precise and considered.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-10 grid gap-8 md:mt-8 md:grid-cols-2 md:gap-24">
            {practiceMetrics.map((metric, index) => (
              <ScrollReveal key={metric.label} delay={280 + index * 140}>
                <div className="flex max-w-[260px] flex-col gap-2">
                  <p className="font-body text-[20px] leading-5 font-extralight md:text-[32px] md:leading-8">
                    {metric.value}
                  </p>
                  <p className="font-body text-[12px] leading-[13px] tracking-[0.04em] md:text-[16px] md:leading-[22px]">
                    {metric.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
