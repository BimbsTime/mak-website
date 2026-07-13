import Image from "next/image";
import type { ReactNode } from "react";

type ImmersiveSceneProps = {
  backgroundSrc: string;
  foregroundSrc: string;
  backgroundAlt: string;
  children: ReactNode;
};

export function ImmersiveScene({
  backgroundSrc,
  foregroundSrc,
  backgroundAlt,
  children,
}: ImmersiveSceneProps) {
  return (
    <section className="relative isolate min-h-[calc(100vh-70px)] overflow-hidden md:min-h-[calc(100vh-146px)]">
      <div className="absolute inset-0">
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 scale-105 blur-md md:scale-110 md:blur-xl">
        <Image
          src={foregroundSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.16)_100%)]" />
      <div className="relative">{children}</div>
    </section>
  );
}
