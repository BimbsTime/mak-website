"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

import { useIntroAnimationStore } from "@/hooks/use-intro-animation-store";
import { useMobileMenuStore } from "@/hooks/use-mobile-menu-store";
import { navItems } from "@/lib/content";
import type { NavKey } from "@/lib/types";

type SiteHeaderProps = {
  activeNavKey?: NavKey;
  forceTransparent?: boolean;
};

type HeaderTone = "light" | "brand";

function DesktopNav({ activeNavKey, tone, isCompact }: SiteHeaderProps & { tone: HeaderTone; isCompact: boolean }) {
  const isIntroComplete = useIntroAnimationStore((state) => state.isComplete);
  const textClass = tone === "light" ? "text-white hover:text-white/80" : "text-[var(--brand)] hover:text-black";
  const underlineClass = tone === "light" ? "bg-white" : "bg-[var(--brand)]";

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
              className={`group flex flex-col items-center gap-0 font-display text-[16px] leading-4 transition-colors duration-300 ${textClass}`}
            >
              <span className="inline-flex items-center gap-0">
                <span>{item.label}</span>
              </span>
              <span
                className={`mt-0.5 block h-px transition-all duration-300 group-hover:w-full ${underlineClass} ${
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
              className={`flex flex-col items-center gap-0 font-display text-[16px] leading-4 transition-colors duration-300 ${textClass}`}
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
                className={`mt-0.5 block h-px transition-all duration-300 group-hover:w-full group-focus-within:w-full ${underlineClass} ${
                  activeNavKey === item.key ? "w-full" : "w-0"
                }`}
              />
            </Link>

            <div
              className={`pointer-events-none absolute top-full left-1/2 z-50 -translate-x-1/2 opacity-0 transition-[padding,opacity] duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 ${
                isCompact ? "pt-0" : "pt-8"
              }`}
            >
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

export function SiteHeader({ activeNavKey, forceTransparent = false }: SiteHeaderProps) {
  const { openMenu } = useMobileMenuStore();
  const [isOnHeroFold, setIsOnHeroFold] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const isIntroComplete = useIntroAnimationStore((state) => state.isComplete);
  const lastScrollYRef = useRef(0);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearHideTimeout = () => {
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };

    const showHeader = () => {
      clearHideTimeout();
      setIsVisible(true);
    };

    const hideHeader = () => {
      if (hideTimeoutRef.current !== null) {
        return;
      }

      hideTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
        hideTimeoutRef.current = null;
      }, 300);
    };

    if (forceTransparent) {
      setIsOnHeroFold(true);
      showHeader();
      return;
    }

    const update = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (currentScrollY <= 1) {
        setIsOnHeroFold(true);
        showHeader();
        return;
      }

      const trigger = document.getElementById("considered-places");
      if (!trigger) {
        const nearTop = currentScrollY <= 8;
        setIsOnHeroFold(nearTop);
        if (nearTop || scrollingUp) {
          showHeader();
        } else {
          hideHeader();
        }
        return;
      }

      const triggerTop = trigger.getBoundingClientRect().top;
      const onHeroFold = triggerTop > 88;
      setIsOnHeroFold(onHeroFold);
      if (onHeroFold || scrollingUp) {
        showHeader();
      } else {
        hideHeader();
      }
    };

    lastScrollYRef.current = window.scrollY;
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      clearHideTimeout();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [forceTransparent]);

  const tone: HeaderTone = forceTransparent || isOnHeroFold ? "light" : "brand";
  const isTransparent = forceTransparent || isOnHeroFold;
  const isCompact = !isTransparent;
  const headerTextClass = tone === "light" ? "text-white" : "text-[var(--brand)]";
  const logoFilterClass = tone === "light" ? "brightness-0 invert" : "";

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
        className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-[transform,opacity,background-color,border-color] duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isTransparent ? "border-transparent bg-transparent" : "border-black/5 bg-[#fbfaf8]"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1695px] items-center justify-between px-6 transition-[padding] duration-300 md:flex-row md:gap-10 md:px-20 ${
            isCompact ? "py-0.5 md:py-0.5" : "py-4 md:py-4"
          }`}
        >
          <Link href="/" style={logoStyle}>
            <Image
              src="/images/brand/mak-logo.png"
              alt="MĀK"
              width={101}
              height={48}
              priority
              className={`origin-left transition-[width,height,filter] duration-300 ${
                isCompact ? "h-7 w-[59px] md:h-8 md:w-[67px]" : "h-[38px] w-20 md:h-12 md:w-[101px]"
              } ${logoFilterClass}`}
            />
          </Link>
          <DesktopNav activeNavKey={activeNavKey} tone={tone} isCompact={isCompact} />
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={openMenu}
            className={`inline-flex size-6 items-center justify-center md:hidden ${headerTextClass}`}
          >
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>
      <MobileOverlay />
    </>
  );
}
