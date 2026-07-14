"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

import { useIntroAnimationStore } from "@/hooks/use-intro-animation-store";
import { useMobileMenuStore } from "@/hooks/use-mobile-menu-store";
import { navItems } from "@/lib/content";
import type { NavKey } from "@/lib/types";

type SiteHeaderProps = {
  activeNavKey?: NavKey;
};

function DesktopNav({ activeNavKey }: SiteHeaderProps) {
  const isIntroComplete = useIntroAnimationStore((state) => state.isComplete);

  return (
    <div className="hidden flex-1 items-center justify-end gap-14 md:flex">
      {navItems.map((item, index) => {
        const baseStyle = {
          opacity: isIntroComplete ? 1 : 0,
          transform: isIntroComplete ? "translate3d(0,0,0)" : "translate3d(0, 14px, 0)",
          transitionProperty: "opacity, transform",
          transitionDuration: "700ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: `${400 + index * 90}ms`,
          pointerEvents: isIntroComplete ? ("auto" as const) : ("none" as const),
        };

        if (!item.children) {
          return (
            <Link
              key={item.label}
              href={item.href}
              style={baseStyle}
              className="group flex flex-col items-center gap-0 font-display text-[16px] leading-4 text-[var(--brand)] transition-colors duration-300 hover:text-black"
            >
              <span className="inline-flex items-center gap-0">
                <span>{item.label}</span>
              </span>
              <span
                className={`mt-0.5 block h-px bg-[var(--brand)] transition-all duration-300 group-hover:w-full ${
                  activeNavKey === item.key ? "w-full" : "w-0"
                }`}
              />
            </Link>
          );
        }

        return (
          <div
            key={item.label}
            style={baseStyle}
            className="group relative flex flex-col items-center"
          >
            <Link
              href={item.href}
              className="flex flex-col items-center gap-0 font-display text-[16px] leading-4 text-[var(--brand)] transition-colors duration-300 hover:text-black"
            >
              <span className="inline-flex items-center gap-0">
                <span>{item.label}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-3 transition-transform duration-200 group-hover:-rotate-180 group-focus-within:-rotate-180"
                  strokeWidth={1.5}
                />
              </span>
              <span
                className={`mt-0.5 block h-px bg-[var(--brand)] transition-all duration-300 group-hover:w-full group-focus-within:w-full ${
                  activeNavKey === item.key ? "w-full" : "w-0"
                }`}
              />
            </Link>

            <div className="pointer-events-none absolute top-full left-1/2 z-50 -translate-x-1/2 pt-8 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <div className="min-w-[240px] overflow-hidden border border-black/10 bg-[#fbfaf8] shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="group/submenu block px-6 py-4 text-left font-body text-[16px] leading-[18px] text-[var(--brand)] transition-colors duration-200 hover:bg-[#f7f2e9] hover:text-black focus-visible:bg-[#f7f2e9] focus-visible:text-black"
                  >
                    <span className="inline-flex flex-col items-start whitespace-nowrap">
                      <span>{child.label}</span>
                      <span className="mt-1 block h-px w-0 bg-current transition-all duration-200 group-hover/submenu:w-full group-focus-visible/submenu:w-full" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileOverlay() {
  const { isOpen, residentialExpanded, closeMenu, toggleResidential } = useMobileMenuStore();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#fbfaf8] md:hidden">
      <div className="flex h-[70px] items-center justify-between px-6 pt-4">
        <div className="w-6" />
        <Link href="/" onClick={closeMenu}>
          <Image src="/images/brand/mak-logo.png" alt="MĀK" width={80} height={38} priority />
        </Link>
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="inline-flex size-6 items-center justify-center text-black"
        >
          <X className="size-6" strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col items-center px-6 pt-12 text-center font-display text-[20px] leading-5 text-[var(--brand)]">
        {navItems.map((item) => {
          const isResidential = item.label === "Residential";

          if (!isResidential) {
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="block py-8"
              >
                {item.label}
              </Link>
            );
          }

          return (
            <div key={item.label} className="flex flex-col items-center">
              <button
                type="button"
                aria-expanded={residentialExpanded}
                aria-controls="mobile-residential-links"
                onClick={toggleResidential}
                className="inline-flex items-center gap-2 py-8"
              >
                <span>{item.label}</span>
                {residentialExpanded ? (
                  <ChevronUp className="size-4" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="size-4" strokeWidth={1.5} />
                )}
              </button>

              {residentialExpanded ? (
                <div
                  id="mobile-residential-links"
                  className="flex flex-col items-center gap-8 pb-8 font-body text-[16px] leading-[18px]"
                >
                  {item.children?.map((child) => (
                    <Link key={child.label} href={child.href} onClick={closeMenu}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export function SiteHeader({ activeNavKey }: SiteHeaderProps) {
  const { openMenu } = useMobileMenuStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const isIntroComplete = useIntroAnimationStore((state) => state.isComplete);

  useEffect(() => {
    const update = () => {
      if (window.scrollY <= 1) {
        setIsScrolled(false);
        return;
      }

      const trigger = document.getElementById("considered-places");
      if (!trigger) {
        setIsScrolled(window.scrollY > 8);
        return;
      }

      const triggerTop = trigger.getBoundingClientRect().top;
      setIsScrolled(triggerTop <= 88);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const logoStyle = {
    opacity: isIntroComplete ? 1 : 0,
    transform: isIntroComplete ? "translate3d(0,0,0)" : "translate3d(0, 14px, 0)",
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: "220ms",
    pointerEvents: isIntroComplete ? ("auto" as const) : ("none" as const),
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-colors duration-300 ${
          isScrolled ? "border-black/5 bg-[#fbfaf8]" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1695px] items-center justify-between px-6 py-4 md:flex-row md:gap-10 md:px-20 md:py-4">
          <div className="w-6 md:hidden" />
          <Link href="/" style={logoStyle}>
            <Image
              src="/images/brand/mak-logo.png"
              alt="MĀK"
              width={101}
              height={48}
              priority
              className="h-[38px] w-20 md:h-12 md:w-[101px]"
            />
          </Link>
          <DesktopNav activeNavKey={activeNavKey} />
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={openMenu}
            className="inline-flex size-6 items-center justify-center text-black md:hidden"
          >
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>
      <MobileOverlay />
    </>
  );
}
