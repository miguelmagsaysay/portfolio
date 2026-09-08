export default function DashboardMockup() {
  const stats = [
    { barWidth: "2.5rem", color: "bg-violet" },
    { barWidth: "2rem", color: "bg-coral" },
    { barWidth: "3rem", color: "bg-gold" },
  ];

  return (
    <div className="flex h-full flex-col bg-white p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-2.5 w-16 rounded bg-ink/80" />
        <div className="h-4 w-4 rounded-full bg-violet-tint" />
      </div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <div key={i} className="rounded-md border border-border p-2">
            <div className="mb-1.5 h-1 w-8 rounded bg-ink/15" />
            <div className={`h-2 rounded ${s.color}`} style={{ width: s.barWidth }} />
          </div>
        ))}
      </div>
      <div className="mb-3 flex-1 rounded-md border border-border p-2">
        <div className="mb-2 h-1.5 w-12 rounded bg-ink/20" />
        <div className="flex h-[calc(100%-1rem)] items-end gap-1">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-violet/30"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-violet-tint" />
            <div className="h-1.5 flex-1 rounded bg-ink/10" />
            <div className="h-1.5 w-6 rounded bg-ink/15" />
          </div>
        ))}
      </div>
    </div>
  );
}
