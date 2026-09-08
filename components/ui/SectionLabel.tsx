interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
  accent?: "coral" | "gold" | "violet";
}

export default function SectionLabel({
  children,
  className = "",
  inverted = false,
  accent = "coral",
}: SectionLabelProps) {
  const accentClass =
    accent === "gold"
      ? "text-gold"
      : accent === "violet"
        ? "text-violet"
        : "text-coral";

  return (
    <p
      className={`font-mono text-label uppercase mb-6 sm:mb-6 ${
        inverted ? "text-muted-dark" : "text-muted"
      } ${className}`}
    >
      <span aria-hidden="true" className={`mr-1.5 ${accentClass}`}>
        {"//"}
      </span>
      {children}
    </p>
  );
}
