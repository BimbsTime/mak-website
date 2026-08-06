"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { introContent } from "@/lib/content";

export function IntroSection() {
  return (
    <section
      id="considered-places"
      className="w-full bg-[var(--background)] px-6 py-[48px] md:px-12 md:py-[48px] lg:px-20 xl:px-32 2xl:px-48"
    >
      <div className="mx-auto flex max-w-[1177px] flex-col items-center gap-14 md:gap-12">
        <div className="flex max-w-[1177px] flex-col items-center gap-4 text-center md:gap-6">
          <ScrollReveal delay={100}>
            <h1 className="max-w-[342px] whitespace-pre-line font-display text-[32px] leading-[32px] text-[var(--brand)] md:max-w-none md:text-[48px] md:leading-[48px]">
              {introContent.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="max-w-[342px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[1177px] md:text-[16px] md:leading-[22px]">
              {introContent.summary}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid max-w-[1177px] gap-6 text-justify lg:grid-cols-2 lg:gap-12">
          {introContent.paragraphs.map((paragraph, index) => (
            <ScrollReveal key={paragraph} delay={320 + index * 120}>
              <p className="max-w-[342px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-none md:text-[16px] md:leading-[22px]">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
