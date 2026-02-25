import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      {/* Glow effect */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-sm text-neutral-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          v0.1.0 — Now available
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
          <span className="text-white">The app that types</span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            so you don&apos;t have to.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
          Because some exam platforms think disabling Ctrl+V is &quot;security.&quot;
          <br />
          <span className="text-neutral-500">Spoiler: it isn&apos;t.</span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#download"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Now
          </Link>
          <Link
            href="https://github.com/vishesh-sachan/typer"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 px-8 py-3.5 text-base font-semibold text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
