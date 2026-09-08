import type { AccentTheme } from "@/lib/colors";
import { themeClasses } from "@/lib/colors";

interface PillTagProps {
  label: string;
  theme: AccentTheme;
  className?: string;
}

export default function PillTag({ label, theme, className = "" }: PillTagProps) {
  const t = themeClasses[theme];

  return (
    <span
      className={`inline-flex items-center rounded-pill px-3.5 py-1.5 font-mono text-xs font-medium text-ink ${t.tint} ${className}`}
    >
      <span className={t.text}>{"// "}</span>
      {label}
    </span>
  );
}
