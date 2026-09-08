"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { AccentTheme } from "@/lib/colors";
import { themeClasses } from "@/lib/colors";
import DashboardMockup from "@/components/mockups/DashboardMockup";
import { defaultTransition } from "@/lib/motion";

interface ShowcaseSlide {
  id: string;
  label: string;
  theme: AccentTheme;
  url: string;
  image?: string;
  alt?: string;
}

const slides: ShowcaseSlide[] = [
  { id: "dashboard", label: "Dashboard", theme: "violet", url: "internal dashboard" },
  {
    id: "deli",
    label: "Landing page",
    theme: "coral",
    url: "goodguysdeli.com",
    image: "/images/work/good-guys-deli.jpg",
    alt: "Good Guys Deli website homepage",
  },
  {
    id: "lanoso",
    label: "Company site",
    theme: "violet",
    url: "lanosocorp.vercel.app",
    image: "/images/work/lanoso.jpg",
    alt: "Lanoso Corporation website homepage",
  },
  {
    id: "surf",
    label: "Booking site",
    theme: "gold",
    url: "sanjuansurfresort.ph",
    image: "/images/work/san-juan-surf.jpg",
    alt: "San Juan Surf Resort website homepage",
  },
  { id: "automation", label: "Automation", theme: "coral", url: "sipag.ph" },
];

const INTERVAL_MS = 4000;

function ScreenshotSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 560px"
      />
    </div>
  );
}

function AutomationMockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white p-4">
      <div className="relative w-full max-w-[200px]">
        <div className="absolute left-1/2 top-[28px] h-px w-[calc(100%-3rem)] -translate-x-1/2 bg-border" />
        <div className="absolute left-1/2 top-[68px] h-px w-[calc(50%-1.5rem)] -translate-x-1/2 bg-border" />
        <div className="absolute left-[calc(50%+1.5rem)] top-[68px] h-px w-[calc(50%-1.5rem)] bg-border" />

        <div className="mx-auto mb-6 flex w-fit flex-col items-center">
          <div className="rounded-md border border-coral/40 bg-coral-tint px-3 py-2">
            <div className="mb-1 h-1.5 w-10 rounded bg-coral/60" />
            <div className="h-1 w-14 rounded bg-ink/15" />
          </div>
          <div className="mt-1 h-2 w-px bg-border" />
        </div>

        <div className="flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="rounded-md border border-gold/40 bg-gold-tint px-3 py-2">
              <div className="mb-1 h-1.5 w-8 rounded bg-gold/60" />
              <div className="h-1 w-10 rounded bg-ink/15" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="rounded-md border border-violet/40 bg-violet-tint px-3 py-2">
              <div className="mb-1 h-1.5 w-8 rounded bg-violet/60" />
              <div className="h-1 w-10 rounded bg-ink/15" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full ${i === 1 ? "w-4 bg-coral" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const mockupComponents: Record<string, () => JSX.Element> = {
  dashboard: DashboardMockup,
  automation: AutomationMockup,
};

export default function HeroShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const theme = themeClasses[activeSlide.theme];
  const transition = prefersReducedMotion ? { duration: 0.01 } : defaultTransition;

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, activeIndex]);

  const Mockup = mockupComponents[activeSlide.id];

  return (
    <div className="relative w-full" aria-live="polite" aria-label="Product showcase">
      <motion.div
        className="card-base overflow-hidden bg-white shadow-[0_8px_40px_-12px_rgba(23,23,26,0.12)]"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.55 }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-bg px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <div className="flex w-full max-w-[240px] items-center justify-center rounded-md bg-white px-3 py-1 sm:max-w-[280px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSlide.url}
                  className="truncate font-mono text-[10px] text-muted sm:text-xs"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={transition}
                >
                  {activeSlide.url}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="w-[52px]" aria-hidden="true" />
        </div>

        {/* Mockup viewport */}
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              className="absolute inset-0"
              initial={
                prefersReducedMotion ? false : { opacity: 0, x: 24 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={transition}
            >
              {activeSlide.image ? (
                <ScreenshotSlide src={activeSlide.image} alt={activeSlide.alt ?? activeSlide.label} />
              ) : Mockup ? (
                <Mockup />
              ) : null}
            </motion.div>
          </AnimatePresence>

          {/* Bottom fade */}
          {!activeSlide.image && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent"
              aria-hidden="true"
            />
          )}
        </div>
      </motion.div>

      {/* Slide label + indicators */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="min-w-0">
          <span
            className={`inline-flex items-center rounded-pill px-3 py-1 font-mono text-xs font-medium ${theme.pill}`}
          >
            {activeSlide.label}
          </span>
        </p>

        <div className="-mr-2 flex shrink-0 items-center" role="tablist" aria-label="Showcase slides">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show ${slide.label}`}
              onClick={() => goTo(i)}
              className="flex h-11 w-8 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 sm:w-9"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? `h-2.5 w-5 ${theme.bg}`
                    : "h-2.5 w-2.5 bg-ink/25 hover:bg-ink/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
