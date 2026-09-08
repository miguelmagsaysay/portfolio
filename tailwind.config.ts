import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "!./**/node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        foreground: "rgb(var(--color-ink) / <alpha-value>)",
        background: "rgb(var(--color-bg) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--color-muted) / <alpha-value>)",
          dark: "rgb(var(--color-muted-dark) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",
        coral: {
          DEFAULT: "rgb(var(--color-coral) / <alpha-value>)",
          tint: "rgb(var(--color-coral-tint) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--color-gold) / <alpha-value>)",
          tint: "rgb(var(--color-gold-tint) / <alpha-value>)",
        },
        violet: {
          DEFAULT: "rgb(var(--color-violet) / <alpha-value>)",
          tint: "rgb(var(--color-violet-tint) / <alpha-value>)",
        },
      },
      fontFamily: {
        logo: ["var(--font-logo)", "Outfit", "system-ui", "sans-serif"],
        heading: [
          "var(--font-heading)",
          "Space Grotesk",
          "system-ui",
          "sans-serif",
        ],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        serif: [
          "var(--font-serif)",
          "Instrument Serif",
          "Georgia",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      fontSize: {
        hero: [
          "clamp(2.75rem, 6vw + 0.5rem, 5rem)",
          {
            lineHeight: "1.0",
            letterSpacing: "-0.04em",
            fontWeight: "700",
          },
        ],
        "section-heading": [
          "clamp(2rem, 4vw + 0.25rem, 3rem)",
          {
            lineHeight: "1.08",
            letterSpacing: "-0.03em",
            fontWeight: "700",
          },
        ],
        "card-title": ["1.125rem", { lineHeight: "1.3", fontWeight: "700" }],
        body: ["1.0625rem", { lineHeight: "1.65", fontWeight: "400" }],
        label: [
          "0.6875rem",
          {
            lineHeight: "1.4",
            fontWeight: "500",
            letterSpacing: "0.08em",
          },
        ],
      },
      borderRadius: {
        card: "var(--radius-card)",
        button: "var(--radius-button)",
        pill: "var(--radius-pill)",
      },
      maxWidth: {
        prose: "60ch",
      },
      animation: {
        "cursor-blink": "cursor-blink 1.1s step-end infinite",
        marquee: "marquee 28s linear infinite",
        float: "float 16s ease-in-out infinite",
        "float-slow": "float-slow 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
