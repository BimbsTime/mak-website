"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { VerticalLineReveal } from "@/components/vertical-line-reveal";
import { contactImage } from "@/lib/content";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      role="presentation"
      onMouseDown={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 py-6 md:px-10"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative max-h-full w-full max-w-[1110px] overflow-y-auto bg-[var(--background)]"
      >
        <button
          type="button"
          aria-label="Close contact form"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center bg-white/90 text-[var(--brand)] transition-colors hover:bg-white"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
        <h2 id="contact-form-title" className="sr-only">
          Contact MĀK
        </h2>
        <ContactForm />
      </div>
    </div>,
    document.body,
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [parallaxScale, setParallaxScale] = useState(1.18);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

      <div className="relative mx-auto flex min-h-[460px] max-w-[1695px] items-end px-6 py-[48px] text-[#f7f5f2] md:min-h-[97vh] md:px-20 md:py-[48px]">
        <div className="flex max-w-[340px] flex-col items-start gap-5 md:max-w-[520px] md:gap-8">
          <div className="flex items-start">
            <VerticalLineReveal className="mt-2 mr-6 h-[90px] w-px shrink-0 bg-[#f7f5f2] md:mr-10 md:h-[135px]" />
            <div className="flex flex-col items-start gap-3 md:min-w-[440px] md:gap-6">
              <ScrollReveal delay={0}>
                <h2 className="font-display text-[24px] leading-[26px] md:whitespace-nowrap md:text-[36px] md:leading-[36px]">
                  Connect with MAK
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={140}>
                <a
                  href="mailto:inquiry@makdevelopers.com"
                  className="font-body text-[12px] leading-4 tracking-[0.04em] transition-opacity duration-300 hover:opacity-70 md:text-[16px] md:leading-6"
                >
                  inquiry@makdevelopers.com
                </a>
              </ScrollReveal>
              <ScrollReveal delay={240}>
                <a
                  href="tel:+913456868982"
                  className="font-body text-[12px] leading-4 tracking-[0.04em] transition-opacity duration-300 hover:opacity-70 md:text-[16px] md:leading-6"
                >
                  +91-3456868982
                </a>
              </ScrollReveal>
            </div>
          </div>
          <ScrollReveal delay={340}>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="inline-flex min-h-12 items-center justify-center bg-white px-10 py-3 font-display text-[20px] leading-[21px] font-light text-[var(--brand)] transition-colors duration-300 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:px-24"
              >
                Get in touch
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <ContactModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
}
