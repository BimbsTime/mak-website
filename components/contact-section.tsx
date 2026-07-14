"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ScrollReveal } from "@/components/scroll-reveal";
import { contactImage } from "@/lib/content";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [parallaxScale, setParallaxScale] = useState(1.18);

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
      const maxOffset = isDesktop ? 90 : 44;
      const nextOffset = (progress - 0.5) * -maxOffset;

      setOffsetY(nextOffset);
      setParallaxScale(isDesktop ? 1.22 : 1.12);
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
    <section ref={sectionRef} id="contact" className="relative isolate w-full overflow-hidden">
      <div
        className="absolute inset-x-0 inset-y-[-12%] will-change-transform"
        style={{ transform: `translate3d(0, ${offsetY}px, 0) scale(${parallaxScale})` }}
      >
        <Image
          src={contactImage.src}
          alt={contactImage.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.72)_100%)]" />

      <div className="relative mx-auto flex min-h-[460px] max-w-[1695px] items-end px-6 py-[32px] text-[#f7f5f2] md:min-h-[720px] md:px-20 md:py-[32px]">
        <div className="flex max-w-[340px] flex-col items-start gap-3 md:max-w-[420px] md:gap-6">
          <ScrollReveal delay={0}>
            <h2 className="font-display text-[24px] leading-[26px] md:text-[48px] md:leading-[48px]">
              Connect with MĀK
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <a
              href="mailto:inquiry@makdevelopers.com"
              className="font-body text-[12px] leading-4 tracking-[0.04em] transition-opacity duration-300 hover:opacity-70 md:text-[20px] md:leading-6"
            >
              inquiry@makdevelopers.com
            </a>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <a
              href="tel:+913456868982"
              className="font-body text-[12px] leading-4 tracking-[0.04em] transition-opacity duration-300 hover:opacity-70 md:text-[20px] md:leading-6"
            >
              +91-3456868982
            </a>
          </ScrollReveal>
          <ScrollReveal delay={340}>
            <div className="mt-2">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center bg-[var(--brand)] px-10 py-3 font-display text-[20px] leading-[21px] font-light text-[#f7f5f2] transition-colors duration-300 hover:bg-[var(--brand-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] md:px-24"
              >
                Get in touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
