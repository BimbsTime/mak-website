"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Hero } from "@/components/hero";
import { IntroSection } from "@/components/intro-section";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type HeroMode = "top" | "fixed" | "bottom";

export function HeroIntroStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const heroMeasureRef = useRef<HTMLDivElement | null>(null);
  const introMeasureRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const [heroHeight, setHeroHeight] = useState(0);
  const [introHeight, setIntroHeight] = useState(0);
  const [mode, setMode] = useState<HeroMode>("top");
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const heroStyle = useMemo(() => {
    if (mode === "fixed") {
      return {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
      };
    }

    return {
      position: "absolute" as const,
      top: mode === "bottom" ? `${introHeight}px` : 0,
      left: 0,
      right: 0,
      zIndex: 0,
    };
  }, [introHeight, mode]);

  useEffect(() => {
    if (!heroMeasureRef.current) {
      return;
    }

    const sync = () => {
      const nextHeroHeight = heroMeasureRef.current?.offsetHeight ?? 0;
      setHeroHeight(nextHeroHeight);
    };

    sync();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", sync);
      return () => window.removeEventListener("resize", sync);
    }

    const observer = new ResizeObserver(sync);
    observer.observe(heroMeasureRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!introMeasureRef.current) {
      return;
    }

    const sync = () => {
      const nextIntroHeight = introMeasureRef.current?.offsetHeight ?? 0;
      setIntroHeight(nextIntroHeight);
    };

    sync();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", sync);
      return () => window.removeEventListener("resize", sync);
    }

    const observer = new ResizeObserver(sync);
    observer.observe(introMeasureRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      if (!stageRef.current) {
        return;
      }

      const stageTop = stageRef.current.offsetTop;
      const scrollY = window.scrollY;
      const start = stageTop;
      const end = stageTop + introHeight;
      const isPinned = scrollY >= start && scrollY <= end;
      const nextMode: HeroMode = scrollY < start ? "top" : isPinned ? "fixed" : "bottom";
      const progress = introHeight > 0 ? clamp((scrollY - start) / introHeight, 0, 1) : 0;

      setMode((current) => (current === nextMode ? current : nextMode));
      setOverlayOpacity(progress * 0.52);
    };

    const schedule = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        update();
        frameRef.current = null;
      });
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [introHeight]);

  return (
    <div ref={stageRef} className="relative">
      <div style={{ height: heroHeight }} />
      <div ref={introMeasureRef} className="relative z-10">
        <IntroSection />
      </div>
      <div style={{ height: heroHeight, ...heroStyle }}>
        <div ref={heroMeasureRef}>
          <Hero overlayOpacity={overlayOpacity} />
        </div>
      </div>
    </div>
  );
}
