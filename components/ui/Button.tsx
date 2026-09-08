import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-bg hover:bg-ink/90 focus-visible:ring-coral shadow-sm hover:shadow-md",
  secondary:
    "bg-bg text-ink border border-border hover:border-coral focus-visible:ring-coral",
  ghost:
    "bg-transparent text-ink border border-border hover:border-coral focus-visible:ring-coral",
  inverse:
    "bg-bg text-ink hover:bg-bg/90 focus-visible:ring-coral shadow-md hover:shadow-lg",
};

const baseStyles =
  "inline-flex items-center justify-center rounded-pill px-6 py-3 font-body text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: ButtonVariant;
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", ...rest } = props;
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  return <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
