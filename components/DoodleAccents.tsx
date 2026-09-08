"use client";

import { useReducedMotion } from "framer-motion";
import type { AccentTheme } from "@/lib/colors";

type DoodleVariant = "hero" | "process" | "about" | "stats";

interface Doodle {
  color: AccentTheme;
  className: string;
  size?: number;
}

const doodlesByVariant: Record<DoodleVariant, Doodle[]> = {
  hero: [
    { color: "coral", className: "left-[3%] top-[24%]", size: 18 },
    { color: "gold", className: "right-[4%] top-[18%]", size: 16 },
  ],
  stats: [{ color: "violet", className: "left-[5%] top-[20%]", size: 16 }],
  process: [
    { color: "gold", className: "right-[4%] top-[12%]", size: 16 },
    { color: "coral", className: "left-[3%] bottom-[14%]", size: 18 },
  ],
  about: [
    { color: "violet", className: "right-[5%] top-[16%]", size: 16 },
    { color: "coral", className: "left-[4%] bottom-[18%]", size: 18 },
  ],
};

const colorMap: Record<AccentTheme, string> = {
  coral: "rgb(var(--color-coral))",
  gold: "rgb(var(--color-gold))",
  violet: "rgb(var(--color-violet))",
};

interface DoodleAccentsProps {
  variant: DoodleVariant;
  className?: string;
}

export default function DoodleAccents({ variant, className = "" }: DoodleAccentsProps) {
  const prefersReducedMotion = useReducedMotion();
  const doodles = doodlesByVariant[variant];

  return (
    <div
      className={`pointer-events-none absolute inset-0 hidden overflow-hidden sm:block ${className}`}
      aria-hidden="true"
    >
      {doodles.map((doodle, index) => (
        <div
          key={`${variant}-${index}`}
          className={`absolute ${doodle.className} ${
            prefersReducedMotion ? "" : "motion-safe:animate-float-slow"
          }`}
          style={prefersReducedMotion ? undefined : { animationDelay: `${index * 1.4}s` }}
        >
          <span
            className="font-mono font-bold leading-none"
            style={{
              color: colorMap[doodle.color],
              opacity: 0.4,
              fontSize: doodle.size ?? 18,
            }}
          >
            *
          </span>
        </div>
      ))}
    </div>
  );
}
