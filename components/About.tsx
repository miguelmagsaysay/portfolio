"use client";

import { motion, useReducedMotion } from "framer-motion";
import DoodleAccents from "@/components/DoodleAccents";
import SectionLabel from "@/components/ui/SectionLabel";
import { aboutParagraphs } from "@/lib/data";
import { defaultTransition, fadeUp } from "@/lib/motion";

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <section
      id="about"
      className="relative overflow-hidden section-padding bg-bg"
      aria-labelledby="about-heading"
    >
      <DoodleAccents variant="about" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          whileInView={fadeUp.visible}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          className="max-w-prose"
        >
          <SectionLabel accent="gold">About me</SectionLabel>
          <h2
            id="about-heading"
            className="text-section-heading text-ink"
          >
            Good design that actually works. Not just a pretty{" "}
            <span className="text-gold">front door.</span>
          </h2>
          <div className="mt-6 space-y-4 text-body text-muted">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
