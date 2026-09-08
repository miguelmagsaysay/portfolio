import type { LucideIcon } from "lucide-react";
import type { AccentTheme } from "@/lib/colors";
import { themeClasses } from "@/lib/colors";

interface IconBadgeProps {
  icon: LucideIcon;
  theme: AccentTheme;
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses = {
  sm: "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4",
  md: "h-12 w-12 [&_svg]:h-5 [&_svg]:w-5",
};

export default function IconBadge({
  icon: Icon,
  theme,
  size = "md",
  className = "",
}: IconBadgeProps) {
  const t = themeClasses[theme];

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[14px] ${sizeClasses[size]} ${t.iconBadge} ${className}`}
    >
      <Icon strokeWidth={2} aria-hidden="true" />
    </div>
  );
}
