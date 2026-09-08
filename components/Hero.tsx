"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import DoodleAccents from "@/components/DoodleAccents";
import HeroShowcase from "@/components/HeroShowcase";
import { defaultTransition, fadeUp, staggerFast } from "@/lib/motion";

const headlineBefore = "I build what ";
const headlineAccent = "your business";
const headlineAfter = " needs.";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-bg section-padding pt-48 pb-20 sm:pt-32 sm:pb-24 lg:pt-36"
      aria-labelledby="hero-heading"
    >
      <DoodleAccents variant="hero" />

      <div className="relative mx-auto w-full max-w-7xl">
      <div className="grid w-full items-center gap-14 sm:gap-16 lg:grid-cols-[1fr,min(440px,42%)] lg:gap-16 xl:grid-cols-[1fr,min(480px,44%)]">
        <div className="min-w-0">
        <motion.p
          className="mb-7 mt-4 inline-flex items-center gap-2 rounded-pill bg-coral-tint px-4 py-1.5 font-mono text-xs text-coral backdrop-blur-sm sm:mb-8 sm:mt-0"
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          animate={fadeUp.visible}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.05 }}
        >
          <span aria-hidden="true">&lt;/&gt;</span>
          <span className="sm:hidden">Software builder, based in PH</span>
          <span className="hidden sm:inline">Software builder, based in the Philippines</span>
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="text-hero font-heading text-balance text-ink max-w-5xl"
          variants={staggerFast}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.span
            className="inline"
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition },
            }}
          >
            {headlineBefore}
          </motion.span>
          <motion.span
            className="inline text-accent-highlight"
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...transition, delay: prefersReducedMotion ? 0 : 0.12 },
              },
            }}
          >
            {headlineAccent}
          </motion.span>
          <motion.span
            className="inline"
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...transition, delay: prefersReducedMotion ? 0 : 0.18 },
              },
            }}
          >
            {headlineAfter}
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-body text-muted sm:mt-7"
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          animate={fadeUp.visible}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.35 }}
        >
          Landing pages, booking systems, dashboards, automations. Built
          around how you actually work. From surf resorts to local delis to
          service businesses.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-row flex-wrap items-center justify-center gap-3 sm:mt-7 sm:justify-start sm:gap-4"
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          animate={fadeUp.visible}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.5 }}
        >
          <Button href="#services" className="whitespace-nowrap">
            See my work
          </Button>
          <Button href="#get-started" variant="ghost" className="whitespace-nowrap">
            Start a project
          </Button>
        </motion.div>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <HeroShowcase />
        </div>
      </div>

      <motion.div
        className="mt-16 flex items-center gap-0 sm:mt-16"
        aria-hidden="true"
        initial={prefersReducedMotion ? false : fadeUp.hidden}
        animate={fadeUp.visible}
        transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.65 }}
      >
        <div className="h-px w-12 bg-coral" />
        <div className="h-px flex-1 max-w-xs bg-border" />
        <span className="ml-3 font-mono text-xs text-muted">
          scroll
          <span className="ml-0.5 inline-block w-[2px] h-3.5 bg-coral align-middle animate-cursor-blink" />
        </span>
      </motion.div>
      </div>
    </section>
  );
}
