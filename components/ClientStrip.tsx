"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { clients } from "@/lib/data";

function LogoRow({
  id,
  hidden = false,
}: {
  id: string;
  hidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-x-12 px-6 sm:gap-x-16 sm:px-8"
      aria-hidden={hidden || undefined}
    >
      {clients.map((client) => (
        <li key={`${id}-${client.name}`} className="shrink-0">
          <a
            href={client.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : undefined}
            aria-label={hidden ? undefined : `Visit ${client.name}`}
            className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
          >
            <Image
              src={client.logo}
              alt={hidden ? "" : `${client.name} logo`}
              width={270}
              height={84}
              className="h-8 w-auto object-contain sm:h-10"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ClientStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Clients"
      className="border-b border-border bg-bg px-0 pb-10 pt-8 sm:pb-10 sm:pt-8"
    >
      <p className="mb-8 px-6 text-center font-mono text-xs uppercase tracking-widest text-muted sm:px-8 lg:px-12 xl:px-16">
        Trusted by local businesses
      </p>

      {prefersReducedMotion ? (
        <div className="overflow-x-auto px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-8">
          <LogoRow id="static" />
        </div>
      ) : (
        <div className="group relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent sm:w-20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent sm:w-20"
            aria-hidden="true"
          />
          <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
            <LogoRow id="a" />
            <LogoRow id="b" hidden />
            <LogoRow id="c" hidden />
            <LogoRow id="d" hidden />
          </div>
        </div>
      )}
    </section>
  );
}
