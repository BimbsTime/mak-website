"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  as?: "div" | "span";
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  scale?: number;
  threshold?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  as = "div",
  className,
  delay = 0,
  distance = 0,
  duration = 800,
  scale = 1,
  threshold = 0.18,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setIsVisible(true);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsVisible(true);
      }
    };

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [once, prefersReducedMotion, threshold]);

  const Component = as;

  return (
    <Component
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale(1)"
          : `translate3d(0, ${distance}px, 0) scale(${scale})`,
        transitionProperty: prefersReducedMotion ? "none" : "opacity, transform",
        transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: prefersReducedMotion ? "0ms" : `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
