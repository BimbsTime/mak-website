"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type UseApproachScrollOptions = {
  sectionRef: RefObject<HTMLElement | null>;
  pointRefs: RefObject<HTMLElement[]>;
  zoneRefs: RefObject<HTMLElement[]>;
  mediaRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

const desktopMotionQuery = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export function useApproachScroll({
  sectionRef,
  pointRefs,
  zoneRefs,
  mediaRef,
  activeIndex,
  onActiveIndexChange,
}: UseApproachScrollOptions) {
  const [isDesktopMotionEnabled, setIsDesktopMotionEnabled] = useState(false);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const query = window.matchMedia(desktopMotionQuery);
    const syncMotionPreference = () => setIsDesktopMotionEnabled(query.matches);
    syncMotionPreference();
    query.addEventListener("change", syncMotionPreference);

    return () => query.removeEventListener("change", syncMotionPreference);
  }, []);

  const scrollToPoint = useCallback((index: number) => {
    const target = isDesktopMotionEnabled ? zoneRefs.current[index] : pointRefs.current[index];
    if (!target) {
      return;
    }

    if (!isDesktopMotionEnabled) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const trigger = ScrollTrigger.getById(`approach-zone-${index + 1}`);
    const destination = trigger ? trigger.start + 2 : target;
    gsap.to(window, {
      duration: 0.75,
      ease: "power2.inOut",
      overwrite: true,
      scrollTo: destination,
      onComplete: () => ScrollTrigger.update(),
    });
  }, [isDesktopMotionEnabled, pointRefs, zoneRefs]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const points = pointRefs.current.filter(Boolean);
    const zones = zoneRefs.current.filter(Boolean);

    if (!isDesktopMotionEnabled || !section || !media || points.length === 0 || zones.length !== points.length) {
      return;
    }

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    const context = gsap.context(() => {
      const overlay = media.querySelector<HTMLElement>("[data-approach-overlay]");
      const overlayText = media.querySelector<HTMLElement>("[data-approach-overlay-text]");
      const pointTimelines = points.map((point) => {
        const title = point.querySelector<HTMLElement>("[data-approach-title]");
        const description = point.querySelector<HTMLElement>("[data-approach-description]");

        if (!title || !description) {
          return null;
        }

        gsap.set(title, { color: "rgba(0, 0, 0, 0.4)" });
        gsap.set(description, { height: 0, autoAlpha: 0, marginTop: 0 });

        return gsap.timeline({ paused: true })
          .to(title, { color: "#000000", duration: 0.25, ease: "power2.out" }, 0)
          .to(description, {
            height: "auto",
            autoAlpha: 1,
            marginTop: 20,
            duration: 0.35,
            ease: "power2.out",
          }, 0.05);
      });

      const overlayTimeline = gsap.timeline({ paused: true })
        .fromTo(overlay, { autoAlpha: 0.35 }, { autoAlpha: 0.62, duration: 0.2, ease: "power1.out" })
        .to(overlay, { autoAlpha: 0.5, duration: 0.25, ease: "power1.inOut" })
        .fromTo(overlayText, { autoAlpha: 0.45, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0);

      const activatePoint = (index: number) => {
        if (activeIndexRef.current === index) {
          return;
        }

        pointTimelines.forEach((timeline, timelineIndex) => {
          if (!timeline) {
            return;
          }
          if (timelineIndex === index) {
            timeline.play();
          } else {
            timeline.reverse();
          }
        });

        overlayTimeline.restart();
        activeIndexRef.current = index;
        onActiveIndexChange(index);
      };

      pointTimelines[0]?.progress(1);
      gsap.set(overlay, { autoAlpha: 0.5 });
      gsap.set(overlayText, { autoAlpha: 1, y: 0 });

      zones.forEach((zone, index) => {
        ScrollTrigger.create({
          id: `approach-zone-${index + 1}`,
          trigger: zone,
          start: "top center",
          end: "bottom center",
          invalidateOnRefresh: true,
          onEnter: () => activatePoint(index),
          onEnterBack: () => activatePoint(index),
        });
      });
    }, section);

    return () => context.revert();
  }, [isDesktopMotionEnabled, mediaRef, onActiveIndexChange, pointRefs, sectionRef, zoneRefs]);

  useEffect(() => {
    if (!isDesktopMotionEnabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }

      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
        return;
      }

      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = Math.min(Math.max(activeIndexRef.current + direction, 0), zoneRefs.current.length - 1);
      scrollToPoint(nextIndex);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesktopMotionEnabled, scrollToPoint, zoneRefs]);

  return { isDesktopMotionEnabled, scrollToPoint };
}
