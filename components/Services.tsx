"use client";

import { CalendarCheck, Search, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import DoodleAccents from "@/components/DoodleAccents";
import IconBadge from "@/components/ui/IconBadge";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Service } from "@/lib/data";
import { services } from "@/lib/data";
import { serviceThemes, themeClasses, type AccentTheme } from "@/lib/colors";
import {
  defaultTransition,
  fadeUp,
  springTransition,
  staggerContainer,
} from "@/lib/motion";

const iconMap = {
  "calendar-check": CalendarCheck,
  search: Search,
  zap: Zap,
} as const;

function ServiceCard({
  service,
  theme,
  transition,
  prefersReducedMotion,
}: {
  service: Service;
  theme: AccentTheme;
  transition: typeof defaultTransition | { duration: number };
  prefersReducedMotion: boolean | null;
}) {
  const Icon = iconMap[service.icon];
  const t = themeClasses[theme];

  return (
    <motion.article
      variants={fadeUp}
      transition={transition}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      {...(prefersReducedMotion ? {} : { transition: springTransition })}
      className={`card-base hover-lift flex h-full flex-col p-7 sm:p-8 ${t.tint}`}
    >
      <IconBadge icon={Icon} theme={theme} size="md" className="mb-6" />

      <h3 className="text-card-title text-ink">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
        {service.description}
      </p>
    </motion.article>
  );
}

export default function Services() {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <section
      id="services"
      className="relative overflow-hidden section-padding bg-violet-tint"
      aria-labelledby="services-heading"
    >
      <DoodleAccents variant="about" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          whileInView={fadeUp.visible}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
        >
          <SectionLabel accent="violet">What I do</SectionLabel>
          <h2
            id="services-heading"
            className="max-w-2xl text-section-heading text-ink"
          >
            Websites that do their{" "}
            <span className="text-coral">job.</span>
          </h2>
          <p className="mt-6 max-w-prose text-body text-muted">
            No bloat, no unnecessary complexity. Just fast, well-built sites
            that make it easy for customers to book, buy, or get in touch.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              theme={serviceThemes[service.id]}
              transition={transition}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-14 sm:mt-14"
          initial={prefersReducedMotion ? false : fadeUp.hidden}
          whileInView={fadeUp.visible}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          <Button href="#get-started">Start a project</Button>
        </motion.div>
      </div>
    </section>
  );
}
