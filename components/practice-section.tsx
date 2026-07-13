import { ScrollReveal } from "@/components/scroll-reveal";
import { practiceMetrics, practiceVideo } from "@/lib/content";

export function PracticeSection() {
  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={practiceVideo.poster}
          className="h-full w-full object-cover"
        >
          <source src={practiceVideo.src} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/80 md:bg-[linear-gradient(197deg,rgba(0,0,0,0.10)_19%,rgba(0,0,0,0.80)_76%)]" />

      <div className="relative mx-auto flex min-h-[652px] max-w-[1695px] items-end gap-6 px-6 py-20 text-[#f7f5f2] md:min-h-[848px] md:gap-10 md:px-20 md:py-[116px]">
        <div className="mt-2 hidden h-[248px] w-px shrink-0 bg-[#f7f5f2] md:block" />
        <div className="flex max-w-[840px] flex-col items-start">
          <div className="flex max-w-[344px] flex-col gap-3 md:max-w-none md:gap-3">
            <ScrollReveal delay={0}>
              <h2 className="font-display text-[32px] leading-[32px] md:text-[48px] md:leading-[48px]">
                The Practice.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="max-w-[206px] font-body text-[12px] leading-4 tracking-[0.04em] md:max-w-[344px] md:text-[20px] md:leading-6">
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
                  <p className="font-body text-[12px] leading-[13px] tracking-[0.04em] md:text-[20px] md:leading-[22px]">
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
