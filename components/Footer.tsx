import Logo from "@/components/ui/Logo";
import { socialLinks, techTags } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="flex items-baseline gap-2 font-body text-sm text-muted">
            <span>©</span>
            <Logo className="text-[1.05rem]" />
            <span>2026</span>
          </p>

          <ul className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-body text-sm text-muted transition-colors hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <details className="group border-t border-border pt-6">
          <summary className="cursor-pointer list-none font-mono text-xs uppercase tracking-widest text-muted marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              For developers
              <span className="text-coral transition-transform group-open:rotate-90" aria-hidden="true">
                →
              </span>
            </span>
          </summary>
          <p className="mt-3 font-mono text-xs text-muted/80">
            {techTags.join(" · ")}
          </p>
        </details>
      </div>
    </footer>
  );
}
