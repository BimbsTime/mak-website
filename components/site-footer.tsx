import Image from "next/image";
import Link from "next/link";

import { footerDisabledLinks, footerPrimaryLinks, footerSecondaryLinks } from "@/lib/content";

function FooterLinkRow({ links }: { links: typeof footerPrimaryLinks }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[12px] leading-4 md:gap-3 md:text-[16px] md:leading-[18px]">
      {links.map((link, index) => (
        <div key={link.label} className="flex items-center gap-2 md:gap-3">
          <Link href={link.href} className="font-body text-black transition-colors duration-300 hover:text-black/50">
            {link.label}
          </Link>
          {index < links.length - 1 ? <span className="text-black/40">/</span> : null}
        </div>
      ))}
    </div>
  );
}

function FooterUtilityRow() {
  const utilityItems = [
    ...footerSecondaryLinks.map((link) => ({ ...link, type: "link" as const })),
    ...footerDisabledLinks.map((link) => ({ ...link, type: "disabled" as const })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 text-[12px] leading-4 md:gap-3 md:text-[16px] md:leading-[18px]">
      {utilityItems.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2 md:gap-3">
          {item.type === "link" ? (
            <Link href={item.href} className="font-body text-black transition-colors duration-300 hover:text-black/50">
              {item.label}
            </Link>
          ) : (
            <span aria-disabled="true" className="font-body text-black/35">
              {item.label}
            </span>
          )}
          {index < utilityItems.length - 1 ? (
            <span className={item.type === "link" ? "text-black/40" : "text-black/20"}>/</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#fbfaf8] px-6 py-8 md:px-20 md:py-10">
      <div className="mx-auto flex max-w-[1695px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-[260px] flex-col gap-3">
          <Link href="/">
            <Image src="/images/brand/mak-logo.png" alt="MĀK" width={80} height={38} className="h-[38px] w-20" />
          </Link>
          <p className="font-body text-[12px] leading-4 tracking-[0.04em] text-black md:text-[14px] md:leading-[18px]">
            A Mumbai-based, design-led real estate developer.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex flex-col gap-3 md:items-end">
            <FooterLinkRow links={footerPrimaryLinks} />
            <FooterUtilityRow />
          </div>
          <p className="font-body text-[12px] leading-4 tracking-[0.04em] text-black/70">
            © MĀK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
