"use client";

import { Fragment } from "react";
import Image from "next/image";

import { ScrollReveal } from "@/components/scroll-reveal";
import { VerticalLineReveal } from "@/components/vertical-line-reveal";
import { approachImage, approachPoints } from "@/lib/content";

function ApproachIntro() {
  return (
    <div className="pt-8 md:pt-0">
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
              <p className="max-w-[326px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[450px] md:text-[16px] md:leading-[22px]">
                Delivering high-quality projects with an emphasis on spatial experience, creating developments that are functional, thoughtful and enduring.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="relative w-full pb-8 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-black/20 before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-black/20 after:to-transparent md:pb-[64px] md:before:hidden md:after:hidden"
    >
      <ApproachIntro />
      <div className="mx-auto mt-8 max-w-[1615px] px-6 md:mt-[40px] lg:mt-[48px] xl:px-20">
        <div className="grid gap-8 xl:mt-[48px] xl:grid-cols-[minmax(0,980px)_minmax(0,1fr)] xl:items-center xl:gap-[80px]">
          <ScrollReveal delay={220} className="xl:-ml-20">
            <div className="relative aspect-square overflow-hidden bg-[#d8d2c7] xl:h-[520px] xl:aspect-auto">
              <Image
                src={approachImage.src}
                alt={approachImage.alt}
                fill
                sizes="(min-width: 1200px) 1140px, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="flex flex-col" aria-label="Approach principles">
            {approachPoints.map((point, index) => (
              <Fragment key={point.title}>
                {index > 0 ? <div aria-hidden="true" className="hidden h-px w-full bg-black/20 xl:block" /> : null}
                <ScrollReveal delay={280 + index * 100} className={index === 0 ? "pb-8 xl:pb-10" : "pt-8 xl:pt-10"}>
                  <article data-approach-point className="mx-auto flex w-full max-w-[520px] flex-col gap-3 xl:mx-auto xl:max-w-[400px] xl:gap-4 xl:px-[20px]">
                    <h3 className="font-display text-[22px] leading-[24px] text-black xl:text-[24px] xl:leading-[24px]">
                      {point.title}
                    </h3>
                    <p className="font-body text-[14px] leading-[20px] tracking-[0.04em] text-black xl:text-[16px] xl:leading-[22px]">
                      {point.description}
                    </p>
                  </article>
                </ScrollReveal>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
