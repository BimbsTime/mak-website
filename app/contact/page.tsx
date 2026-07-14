import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { ImmersiveScene } from "@/components/immersive-scene";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact | MĀK",
  description: "Inquiry form for MĀK.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-[70px] md:pt-20">
      <SiteHeader />
      <ImmersiveScene
        backgroundSrc="/images/contact/background.png"
        foregroundSrc="/images/contact/foreground.png"
        backgroundAlt="Blurred branded development entrance used as the MĀK contact page background."
      >
        <div className="flex min-h-[calc(100vh-70px)] items-center justify-center px-6 py-10 md:min-h-[calc(100vh-80px)] md:px-20">
          <div className="w-full max-w-[816px] md:max-w-[1110px]">
            <ContactForm />
          </div>
        </div>
      </ImmersiveScene>
    </div>
  );
}
