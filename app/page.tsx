import { ApproachSection } from "@/components/approach-section";
import { ContactSection } from "@/components/contact-section";
import { GrowthSection } from "@/components/growth-section";
import { Hero } from "@/components/hero";
import { IntroSection } from "@/components/intro-section";
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
      <main id="main-content" className="overflow-x-hidden">
        <Hero />
        <IntroSection />
        <PracticeSection />
        <VerticalsSection />
        <ApproachSection />
        <GrowthSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
