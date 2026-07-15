"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type UseHorizontalScrollOptions = {
  sectionRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
};

/**
 * Converts vertical scroll progress into a pinned horizontal card sequence on
 * desktop. The markup remains a regular vertical stack when motion is reduced
 * or the viewport is below the desktop breakpoint.
 */
export function useHorizontalScroll({
  sectionRef,
  trackRef,
}: UseHorizontalScrollOptions) {
  const [isDesktopMotionEnabled, setIsDesktopMotionEnabled] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const query = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const updateMotionState = () => setIsDesktopMotionEnabled(query.matches);

    updateMotionState();
    query.addEventListener("change", updateMotionState);

    return () => {
      query.removeEventListener("change", updateMotionState);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!isDesktopMotionEnabled || !section || !track) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-growth-card]", track);

      if (cards.length < 2) {
        return;
      }

      const lastCard = cards.at(-1);
      const finalCardLeftOffset = () => window.innerWidth * 0.22;
      const horizontalDistance = () =>
        lastCard ? Math.max(0, lastCard.offsetLeft - finalCardLeftOffset()) : 0;

      const horizontalTween = gsap.to(track, {
        x: () => -horizontalDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${horizontalDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>("[data-growth-image]");
        const content = card.querySelector<HTMLElement>("[data-growth-content]");
        const cardTrigger = {
          trigger: card,
          containerAnimation: horizontalTween,
          start: "left 78%",
          end: "right 22%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        };

        gsap.timeline({ scrollTrigger: cardTrigger })
          .fromTo(card, { autoAlpha: 0.58 }, {
            autoAlpha: 1,
            ease: "power2.out",
            duration: 0.35,
          })
          .to(card, {
            autoAlpha: 0.58,
            ease: "power2.in",
            duration: 0.35,
          }, 0.65);

        if (image) {
          gsap.fromTo(image, { scale: 1.08, yPercent: -3 }, {
            scale: 1.12,
            yPercent: 3,
            ease: "none",
            scrollTrigger: { ...cardTrigger },
          });
        }

        if (content) {
          gsap.fromTo(content, { autoAlpha: 0, y: 28 }, {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: { ...cardTrigger },
          });
        }
      });

      return () => {
        horizontalTween.kill();
      };
    }, section);

    return () => {
      context.revert();
    };
  }, [isDesktopMotionEnabled, sectionRef, trackRef]);

  return isDesktopMotionEnabled;
}
