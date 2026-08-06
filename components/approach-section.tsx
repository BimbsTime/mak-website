"use client";

import { Fragment } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { VerticalLineReveal } from "@/components/vertical-line-reveal";
import { approachImage, approachPoints, approachVideo } from "@/lib/content";

function ApproachIntro() {
  return (
    <div className="mx-auto max-w-[1615px] px-6 md:px-20">
      <div className="flex flex-col gap-4 md:max-w-[1114px] md:flex-row md:items-end md:gap-14">
        <h2 className="max-w-[510px] font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[36px] md:leading-[40px]">
          <ScrollReveal as="span" delay={0} distance={18} className="block whitespace-normal md:whitespace-nowrap">
            Core Identity &amp;
          </ScrollReveal>
          <ScrollReveal as="span" delay={120} distance={18} className="block whitespace-normal md:whitespace-nowrap">
            Approach
          </ScrollReveal>
        </h2>
        <div className="flex max-w-[524px] items-end gap-5">
          <VerticalLineReveal className="hidden h-[106px] w-px bg-black md:block" delay={120} />
          <ScrollReveal delay={140}>
            <p className="max-w-[296px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[492px] md:text-[16px] md:leading-[22px]">
              Delivering high-quality projects with an emphasis on spatial experience, creating developments that are functional, thoughtful and enduring.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative w-full py-[48px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-black/20 before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-black/20 after:to-transparent md:py-[48px] md:before:hidden md:after:hidden"
    >
      <ApproachIntro />
      <div className="mx-auto mt-8 grid max-w-[1615px] gap-8 px-6 md:mt-14 md:ml-0 md:mr-20 md:max-w-none md:grid-cols-[minmax(0,980px)_360px] md:items-start md:gap-12 md:px-0">
        <ScrollReveal delay={220}>
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

        <div className="flex flex-col md:pt-6" aria-label="Approach principles">
          {approachPoints.map((point, index) => (
            <Fragment key={point.title}>
              {index > 0 ? <div aria-hidden="true" className="hidden h-px w-full bg-black/20 md:block" /> : null}
              <ScrollReveal delay={280 + index * 100} className={index === 0 ? "pb-8 md:pb-10" : "pt-8 md:pt-10"}>
                <article data-approach-point className="flex flex-col gap-3 md:gap-4">
                  <h3 className="font-display text-[20px] leading-[21px] text-black md:text-[24px] md:leading-[24px]">
                    {point.title}
                  </h3>
                  <p className="max-w-[360px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[16px] md:leading-[22px]">
                    {point.description}
                  </p>
                </article>
              </ScrollReveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
