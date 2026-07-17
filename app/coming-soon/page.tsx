import type { Metadata } from "next";

import { ImmersiveScene } from "@/components/immersive-scene";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteHeader } from "@/components/site-header";
import { resolveNavKey } from "@/lib/content";

export const metadata: Metadata = {
  title: "Coming Soon | MĀK",
  description: "Future MĀK destination page placeholder.",
};

type ComingSoonPageProps = {
  searchParams?: Promise<{ tab?: string }>;
};

export default async function ComingSoonPage({ searchParams }: ComingSoonPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeNavKey = resolveNavKey(resolvedSearchParams?.tab);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader activeNavKey={activeNavKey} />
      <ImmersiveScene
        foregroundSrc="/images/coming-soon/foreground.png"
      >
        <div className="flex min-h-screen items-center justify-center px-6 pb-6 pt-[70px] md:pb-10 md:pt-20">
          <ScrollReveal delay={0}>
            <h1 className="font-display text-[32px] leading-[36px] text-white md:text-[36px] md:leading-9">
              Coming Soon
            </h1>
          </ScrollReveal>
        </div>
      </ImmersiveScene>
    </div>
  );
}
