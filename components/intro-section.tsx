import { ScrollReveal } from "@/components/scroll-reveal";
import { introContent } from "@/lib/content";

export function IntroSection() {
  return (
    <section className="w-full bg-[var(--background)] px-6 py-[72px] md:px-20 md:py-[116px]">
      <div className="mx-auto flex max-w-[1177px] flex-col items-center gap-16 md:gap-20">
        <div className="flex max-w-[1177px] flex-col items-center gap-4 text-center md:gap-8">
          <ScrollReveal delay={0}>
            <p className="font-body text-[12px] uppercase tracking-[0.24em] text-[var(--brand)] md:hidden">
              {introContent.eyebrow}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="max-w-[342px] whitespace-pre-line font-display text-[32px] leading-[32px] text-[var(--brand)] md:max-w-none md:text-[64px] md:leading-[64px]">
              {introContent.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="max-w-[342px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[1177px] md:text-[20px] md:leading-6">
              {introContent.summary}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid max-w-[1177px] gap-6 text-justify md:grid-cols-2 md:gap-14">
          {introContent.paragraphs.map((paragraph, index) => (
            <ScrollReveal key={paragraph} delay={320 + index * 120}>
              <p className="max-w-[342px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-none md:text-[20px] md:leading-6">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
