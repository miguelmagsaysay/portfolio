import { siteConfig } from "@/lib/data";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-logo text-[1.2rem] font-semibold lowercase leading-none tracking-[-0.05em] text-ink ${className}`}
    >
      {siteConfig.name}
      <span className="text-coral" aria-hidden="true">
        .
      </span>
    </span>
  );
}
