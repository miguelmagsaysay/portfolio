interface BrowserFrameProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export default function BrowserFrame({
  url,
  children,
  className = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`card-base overflow-hidden bg-white shadow-[0_8px_40px_-12px_rgba(23,23,26,0.12)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-border bg-bg px-3 py-2.5 sm:px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="flex w-full max-w-[280px] items-center justify-center rounded-md bg-white px-3 py-1">
            <span className="truncate font-mono text-[10px] text-muted sm:text-xs">
              {url}
            </span>
          </div>
        </div>
        <div className="w-[52px]" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-white">{children}</div>
    </div>
  );
}
