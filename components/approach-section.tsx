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
      <div className="mt-8 md:mt-[40px] lg:mt-[48px] xl:mt-[48px]">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,75vw)_minmax(0,1fr)] xl:gap-0">
          <ScrollReveal delay={220}>
            <div className="relative aspect-square overflow-hidden bg-[#d8d2c7] xl:w-full xl:aspect-[21/9] xl:min-h-[520px]">
              <Image
                src={approachImage.src}
                alt={approachImage.alt}
                fill
                sizes="(min-width: 1200px) 75vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="mx-auto w-full px-6 md:mx-auto md:max-w-none md:px-20 xl:mx-0 xl:box-border xl:flex xl:w-full xl:max-w-none xl:items-center xl:px-0 xl:pl-10 xl:pr-[max(5vw,24px)]">
            <div
              className="flex w-full max-w-[520px] flex-col md:mx-auto md:w-full md:max-w-none xl:mx-auto xl:w-full xl:max-w-[480px]"
              aria-label="Approach principles"
            >
              {approachPoints.map((point, index) => (
                <Fragment key={point.title}>
                  {index > 0 ? <div aria-hidden="true" className="hidden h-px w-full bg-black/20 md:block" /> : null}
                  <ScrollReveal delay={280 + index * 100} className={index === 0 ? "pb-8 md:pb-10 xl:pb-10" : "pt-8 md:pt-10 xl:pt-10"}>
                    <article data-approach-point className="mx-auto flex w-full max-w-[520px] flex-col gap-3 md:mx-auto md:w-full md:max-w-none md:gap-4 xl:mx-0 xl:w-full xl:max-w-none xl:gap-4">
                      <h3 className="font-display text-[22px] leading-[24px] text-black md:text-[24px] md:leading-[24px] xl:text-[24px] xl:leading-[24px]">
                        {point.title}
                      </h3>
                      <p className="font-body text-[14px] leading-[20px] tracking-[0.04em] text-black md:text-[16px] md:leading-[22px] xl:text-[16px] xl:leading-[22px]">
                        {point.description}
                      </p>
                    </article>
                  </ScrollReveal>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
