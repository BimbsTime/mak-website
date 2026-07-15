import { ApproachSection } from "@/components/approach-section";
import { ContactSection } from "@/components/contact-section";
import { GrowthSectionV2 } from "@/components/growth-section-v2";
import { HeroIntroStage } from "@/components/hero-intro-stage";
import { PracticeSection } from "@/components/practice-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VerticalsSection } from "@/components/verticals-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-black">
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="overflow-x-clip">
        <HeroIntroStage />
        <PracticeSection />
        <VerticalsSection />
        <ApproachSection />
        <GrowthSectionV2 />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
