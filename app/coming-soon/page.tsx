import type { Metadata } from "next";

import { ImmersiveScene } from "@/components/immersive-scene";
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
        backgroundSrc="/images/coming-soon/background.png"
        foregroundSrc="/images/coming-soon/foreground.png"
        backgroundAlt="Softly blurred architectural development view used as the MĀK coming soon background."
      >
        <div className="flex min-h-[calc(100vh-70px)] items-center justify-center px-6 md:min-h-[calc(100vh-146px)]">
          <h1 className="font-display text-[32px] leading-[36px] text-white md:text-[36px] md:leading-9">
            Coming Soon
          </h1>
        </div>
      </ImmersiveScene>
    </div>
  );
}
