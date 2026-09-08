"use client";

import { motion, useReducedMotion } from "framer-motion";
import DoodleAccents from "@/components/DoodleAccents";
import SectionLabel from "@/components/ui/SectionLabel";
import { processSteps } from "@/lib/data";
import { accentAt, themeClasses } from "@/lib/colors";
import {
  defaultTransition,
  fadeUp,
  staggerContainer,
} from "@/lib/motion";

function StepNumber({ step, index }: { step: number; index: number }) {
  const theme = accentAt(index);
  const t = themeClasses[theme];

  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border font-mono text-sm font-semibold ${t.stepBadge}`}
    >
      {String(step).padStart(2, "0")}
    </span>
  );
}

function ProcessStepItem({
  step,
  index,
  isLast,
  layout,
}: {
  step: (typeof processSteps)[number];
  index: number;
  isLast: boolean;
  layout: "vertical" | "horizontal";
}) {
  const theme = accentAt(index);
  const t = themeClasses[theme];
  const tintClass = t.tint;

  if (layout === "horizontal") {
    return (
      <motion.li
        variants={fadeUp}
        className={`relative flex flex-1 flex-col gap-4 rounded-card border border-border p-5 ${tintClass}`}
      >
        <StepNumber step={step.step} index={index} />
        <div>
          <h3 className="text-base font-bold tracking-tight text-ink lg:text-lg">
            {step.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
            {step.description}
          </p>
        </div>
        {!isLast && (
          <div
            className={`pointer-events-none absolute -right-3 top-5 hidden h-px w-6 border-t-2 border-dotted lg:block ${t.connector}`}
            aria-hidden="true"
          />
        )}
      </motion.li>
    );
  }

  return (
    <motion.li
      variants={fadeUp}
        className={`relative flex gap-5 rounded-card border border-border p-6 sm:gap-6 sm:p-6 ${tintClass}`}
    >
      <div className="flex flex-col items-center">
        <StepNumber step={step.step} index={index} />
        {!isLast && (
          <div
            className={`mt-3 flex-1 border-l-2 border-dotted ${t.connector}`}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex-1 pb-1">
        <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
          {step.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}

export default function Process() {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <section
      id="process"
      className="relative overflow-hidden section-padding bg-bg"
      aria-labelledby="process-heading"
    >
      <DoodleAccents variant="process" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          whileInView={fadeUp.visible}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
        >
          <SectionLabel accent="violet">How it works</SectionLabel>
          <h2
            id="process-heading"
            className="max-w-2xl text-section-heading text-ink"
          >
            From first call to{" "}
            <span className="text-violet">live site.</span>
          </h2>
        </motion.div>

        <div className="relative mt-14 sm:mt-14">
          <motion.ol
            className="relative hidden gap-3 lg:flex"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {processSteps.map((step, index) => (
              <ProcessStepItem
                key={step.id}
                step={step}
                index={index}
                isLast={index === processSteps.length - 1}
                layout="horizontal"
              />
            ))}
          </motion.ol>

          <motion.ol
            className="relative flex flex-col gap-5 lg:hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {processSteps.map((step, index) => (
              <ProcessStepItem
                key={step.id}
                step={step}
                index={index}
                isLast={index === processSteps.length - 1}
                layout="vertical"
              />
            ))}
          </motion.ol>
        </div>

        <motion.p
          className="mt-12 text-center font-mono text-sm text-muted"
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          whileInView={fadeUp.visible}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.15 }}
        >
          <span className="text-gold" aria-hidden="true">
            {"/* "}
          </span>
          Every project moves at this pace. No black box, no guessing.
          <span className="text-gold" aria-hidden="true">
            {" */"}
          </span>
        </motion.p>
      </div>
    </section>
  );
}
