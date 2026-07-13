import Image from "next/image";

import { ExploreLink } from "@/components/ui/explore-link";
import { growthCards } from "@/lib/content";

export function GrowthSection() {
  return (
    <section className="w-full px-6 py-10 md:pt-[116px] md:pr-0 md:pb-[116px] md:pl-20">
      <div className="flex flex-col gap-12 md:gap-[120px]">
        <div className="grid gap-4 md:max-w-[1076px] md:grid-cols-[324px_1fr] md:items-end md:gap-x-14">
          <h2 className="font-display text-[24px] leading-[26px] text-[var(--brand)] md:text-[48px] md:leading-[44px]">
            <span className="block whitespace-normal md:whitespace-nowrap">Project Pipeline</span>
            <span className="block whitespace-normal md:whitespace-nowrap">and Growth.</span>
          </h2>

          <div className="flex max-w-[672px] items-end gap-5">
            <div className="hidden h-[106px] w-px bg-black md:block" />
            <p className="max-w-[336px] font-body text-[12px] leading-4 tracking-[0.04em] text-black md:max-w-[560px] md:text-[20px] md:leading-6">
              The firm is set to launch 3-4 new projects across residential and commercial sectors, with a projected portfolio expansion of ₹4000-5000 Cr. GDV over the next two years.
            </p>
          </div>
        </div>

        <div className="no-scrollbar overflow-x-auto pb-4 md:pb-0">
          <div className="flex w-max snap-x snap-mandatory gap-4 md:gap-14">
            {growthCards.map((card) => (
              <article
                key={card.id}
                id={card.id}
                className="w-[316px] shrink-0 snap-start scroll-mt-28 md:w-[1051px]"
              >
                <div className="relative aspect-[316/178] overflow-hidden bg-[#d8d2c7] md:h-[594px] md:w-[1051px] md:aspect-auto">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(min-width: 768px) 1051px, 316px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-4 md:mt-10 md:flex-row md:items-start md:justify-between md:gap-[270px] md:pr-4">
                  <div className="flex max-w-[250px] flex-col gap-3 md:max-w-[765px] md:gap-8">
                    <h3 className="font-display text-[20px] leading-[21px] text-black md:text-[24px] md:leading-[25px]">
                      {card.title}
                    </h3>
                    <p className="font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[20px] md:leading-6">
                      {card.description}
                    </p>
                  </div>
                  <div className="hidden shrink-0 md:block">
                    <ExploreLink href={card.href} />
                  </div>
                </div>
                <div className="md:hidden">
                  <ExploreLink href={card.href} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
