"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { defaultTransition, fadeUp } from "@/lib/motion";

export default function Platforms() {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <section
      id="platforms"
      className="border-t border-border bg-bg px-6 py-16 sm:px-8 sm:py-16 lg:px-12 xl:px-16"
      aria-labelledby="platforms-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          whileInView={fadeUp.visible}
          viewport={{ once: true, margin: "-60px" }}
          transition={transition}
          className="max-w-2xl"
        >
          <SectionLabel className="mb-4 sm:mb-4" accent="coral">
            where I build
          </SectionLabel>
          <h2
            id="platforms-heading"
            className="font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl"
          >
            Custom-built, or wherever you already are.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
            Most of my work is fully custom, but if you&apos;re already on
            Wix, WordPress, or Shopify, I can work within that too.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
