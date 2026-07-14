"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useIntroAnimationStore } from "@/hooks/use-intro-animation-store";

type LoaderPhase = "enter" | "exit" | "done";

export function IntroLoader() {
  const complete = useIntroAnimationStore((state) => state.complete);
  const [phase, setPhase] = useState<LoaderPhase>("enter");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startExit = () => {
      setPhase("exit");
      window.setTimeout(() => {
        setPhase("done");
        complete();
        document.body.style.overflow = previousOverflow;
      }, 900);
    };

    if (document.readyState === "complete") {
      const id = window.setTimeout(startExit, 250);
      return () => {
        window.clearTimeout(id);
        document.body.style.overflow = previousOverflow;
      };
    }

    const onLoad = () => startExit();
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, [complete]);

  if (phase === "done") {
    return null;
  }

  const isExiting = phase === "exit";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0">
        <div
          className={`absolute inset-y-0 left-0 w-1/2 bg-[var(--background)] shadow-[12px_0_40px_rgba(0,0,0,0.04)] transition-transform duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExiting ? "-translate-x-full" : "translate-x-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 w-1/2 bg-[var(--background)] shadow-[-12px_0_40px_rgba(0,0,0,0.04)] transition-transform duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExiting ? "translate-x-full" : "translate-x-0"
          }`}
        />

        <div
          className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/12 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isExiting ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
          }`}
        />
      </div>

      <div className="relative flex h-full w-full items-center justify-center">
        <div className="relative h-[66px] w-[140px]">
          <div
            className={`absolute inset-0 transition-opacity duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isExiting ? "opacity-0" : "opacity-100"
            }`}
          >
            <div
              className={`absolute inset-y-0 left-0 w-1/2 overflow-hidden transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isExiting ? "-translate-x-5" : "translate-x-0"
              }`}
            >
              <div className="absolute inset-y-0 left-0 w-[140px]">
                <Image src="/images/brand/mak-logo.png" alt="MĀK" fill priority sizes="140px" className="object-contain" />
              </div>
            </div>

            <div
              className={`absolute inset-y-0 right-0 w-1/2 overflow-hidden transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isExiting ? "translate-x-5" : "translate-x-0"
              }`}
            >
              <div className="absolute inset-y-0 right-0 w-[140px]">
                <Image src="/images/brand/mak-logo.png" alt="MĀK" fill priority sizes="140px" className="object-contain" />
              </div>
            </div>
          </div>

          <div
            className={`absolute left-1/2 top-1/2 h-[74px] w-px -translate-x-1/2 -translate-y-1/2 bg-black/18 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isExiting ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
            }`}
          />

          <div
            className={`absolute inset-0 transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <Image src="/images/brand/mak-logo.png" alt="" fill priority sizes="140px" className="object-contain opacity-[0.06]" />
          </div>
        </div>
      </div>
    </div>
  );
}
