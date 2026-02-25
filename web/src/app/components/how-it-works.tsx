const steps = [
  { num: "01", title: "Paste your text", sub: "Ctrl+V still works here, we promise." },
  { num: "02", title: "Hit Start", sub: "Countdown begins. Time to alt-tab." },
  { num: "03", title: "Switch windows", sub: "Go to the exam/assessment window." },
  { num: "04", title: "Look innocent", sub: "Typer types it out. You take the credit." },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-neutral-400">
          Four steps. Zero brain cells required.
        </p>

        <div className="mt-16 space-y-0">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Vertical line */}
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-12 h-full w-px bg-neutral-800" />
              )}
              {/* Number circle */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-bold text-emerald-400">
                {s.num}
              </div>
              <div className="pt-1.5">
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
