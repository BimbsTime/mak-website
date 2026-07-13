"use client";

import { useState } from "react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { VerticalCard } from "@/components/vertical-card";
import { verticalCards } from "@/lib/content";

export function VerticalsSection() {
  const defaultActiveId = verticalCards[0]?.id ?? "";
  const [activeId, setActiveId] = useState(defaultActiveId);

  return (
    <section id="verticals" className="w-full px-6 py-[72px] md:px-20 md:pt-[116px] md:pb-20">
      <div className="mx-auto max-w-[1615px]">
        <div className="flex flex-col gap-4 md:max-w-[1114px] md:flex-row md:items-end md:gap-14">
          <ScrollReveal delay={0}>
            <h2 className="max-w-[510px] font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[48px] md:leading-[44px]">
              <span className="block whitespace-normal md:whitespace-nowrap">An Active Presence</span>
              <span className="block whitespace-normal md:whitespace-nowrap">across Multiple Verticals.</span>
            </h2>
          </ScrollReveal>
          <div className="flex max-w-[524px] items-end gap-5">
            <div className="hidden h-[106px] w-px bg-black md:block" />
            <ScrollReveal delay={140}>
              <p className="max-w-[296px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[492px] md:text-[20px] md:leading-6">
                Bringing together residential and hospitality, as well as lifestyle-oriented, leisure-based retail and wellness components within integrated developments.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={220}>
          <div className="no-scrollbar mt-12 overflow-x-auto pb-4 md:mt-[120px]">
            <div
              className="flex w-max items-start gap-5 md:gap-14"
              onMouseLeave={() => setActiveId(defaultActiveId)}
            >
              {verticalCards.map((card) => (
                <div key={card.id} className="shrink-0">
                  <VerticalCard
                    card={card}
                    isActive={card.id === activeId}
                    onActivate={() => setActiveId(card.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
