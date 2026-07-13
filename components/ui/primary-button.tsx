type PrimaryButtonProps = {
  href: string;
  label: string;
  className?: string;
};

export function PrimaryButton({ href, label, className = "" }: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center bg-[var(--brand)] px-8 py-3 font-display text-[20px] leading-[21px] font-light text-[#f7f5f2] transition-colors duration-300 hover:bg-[var(--brand-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] ${className}`}
    >
      {label}
    </a>
  );
}
