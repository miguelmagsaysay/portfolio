"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

interface MotionOrbsProps {
  className?: string;
}

export default function MotionOrbs({ className = "" }: MotionOrbsProps) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 24);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 24);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion, mouseX, mouseY]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div style={{ x: springX, y: springY }}>
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-border/60 blur-3xl motion-safe:animate-[drift_20s_ease-in-out_infinite]" />
        <div className="absolute right-[12%] top-[40%] h-[240px] w-[240px] rounded-full bg-border/40 blur-3xl motion-safe:animate-[float_16s_ease-in-out_infinite]" />
      </motion.div>

      <span className="absolute left-[8%] top-[22%] font-mono text-xs text-accent/30 select-none">
        {"<div>"}
      </span>
      <span className="absolute right-[10%] top-[18%] font-mono text-xs text-muted/25 select-none">
        {"{ }"}
      </span>

      <div
        className="absolute inset-0 opacity-[0.18] motion-safe:animate-[grid-shift_40s_linear_infinite]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(10 10 10 / 0.04) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
