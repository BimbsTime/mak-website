import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ExploreLinkProps = {
  href: string;
  size?: "default" | "compact";
};

export function ExploreLink({ href, size = "default" }: ExploreLinkProps) {
  const compact = size === "compact";

  return (
    <Link
      href={href}
      className={`group inline-flex flex-col items-start gap-0.5 text-[14px] tracking-[0.01em] text-black transition-colors duration-300 ${
        compact
          ? "py-2 text-[11px] leading-[11px] md:text-[10px] md:leading-[10px]"
          : "py-3 leading-[14px] md:text-[20px] md:leading-5"
      }`}
    >
      <span className="inline-flex items-start gap-1.5">
        <span className="font-display">Explore</span>
        <ArrowUpRight
          aria-hidden="true"
          className={`mt-0.5 transition-colors duration-300 group-hover:text-black/50 ${
            compact ? "size-3 md:size-3" : "size-3.5 md:size-[18px]"
          }`}
          strokeWidth={1.5}
        />
      </span>
      <span
        className={`h-px bg-black transition-colors duration-300 group-hover:bg-black/50 ${
          compact ? "w-[44px] md:w-[46px]" : "w-[66px] md:w-[87px]"
        }`}
      />
    </Link>
  );
}
