"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { defaultTransition, fadeUp } from "@/lib/motion";

export default function WorkspaceImage() {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <section
      ref={ref}
      aria-label="Workspace"
      className="relative w-full overflow-hidden"
    >
      <motion.div
        className="relative w-full min-h-[420px] h-[56vh] max-h-[820px] sm:min-h-[520px] sm:h-[62vh]"
        initial={prefersReducedMotion ? false : fadeUp.hidden}
        whileInView={fadeUp.visible}
        viewport={{ once: true, margin: "-40px" }}
        transition={transition}
      >
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? undefined : { y, scale }}
        >
          <Image
            src="/images/workspace.png"
            alt="Developer working at a modern desk with dual monitors in a bright, minimalist office"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <p className="max-w-xl font-serif text-2xl leading-snug text-bg sm:text-3xl lg:text-4xl">
            Built for the people who run the place, not just the ones who visit.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
