export type AccentTheme = "coral" | "gold" | "violet";

export const ACCENT_ROTATION: AccentTheme[] = ["coral", "gold", "violet"];

export function accentAt(index: number): AccentTheme {
  return ACCENT_ROTATION[index % ACCENT_ROTATION.length];
}

export const themeClasses: Record<
  AccentTheme,
  {
    text: string;
    bg: string;
    tint: string;
    border: string;
    iconBadge: string;
    pill: string;
    stepBadge: string;
    connector: string;
  }
> = {
  coral: {
    text: "text-coral",
    bg: "bg-coral",
    tint: "bg-coral-tint",
    border: "border-coral",
    iconBadge: "bg-coral-tint text-coral",
    pill: "bg-coral-tint text-coral",
    stepBadge: "bg-coral-tint text-coral border-coral/40",
    connector: "border-coral/40",
  },
  gold: {
    text: "text-gold",
    bg: "bg-gold",
    tint: "bg-gold-tint",
    border: "border-gold",
    iconBadge: "bg-gold-tint text-gold",
    pill: "bg-gold-tint text-gold",
    stepBadge: "bg-gold-tint text-gold border-gold/40",
    connector: "border-gold/40",
  },
  violet: {
    text: "text-violet",
    bg: "bg-violet",
    tint: "bg-violet-tint",
    border: "border-violet",
    iconBadge: "bg-violet-tint text-violet",
    pill: "bg-violet-tint text-violet",
    stepBadge: "bg-violet-tint text-violet border-violet/40",
    connector: "border-violet/40",
  },
};

export const serviceThemes: Record<string, AccentTheme> = {
  booking: "coral",
  seo: "gold",
  automation: "coral",
};
