"use client";

import { track } from "@vercel/analytics";

const GITHUB_RELEASE = "https://github.com/vishesh-sachan/typer/releases/latest";

const platforms = [
  {
    name: "macOS",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    files: [
      { label: "Apple Silicon (.dmg)", asset: "aarch64.dmg" },
      { label: "Intel (.dmg)", asset: "x64.dmg" },
    ],
  },
  {
    name: "Windows",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
    files: [
      { label: "Installer (.msi)", asset: "x64_en-US.msi" },
      { label: "Portable (.exe)", asset: "x64-setup.exe" },
    ],
  },
  {
    name: "Linux",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.504 0c-.155 0-.311.003-.466.008a11.21 11.21 0 00-.481.02c-.087.005-.173.012-.26.02C8.13.335 5.2 2.096 3.631 4.77 2.06 7.446 1.586 10.72 2.36 13.8c.37 1.47.967 2.87 1.76 4.12.793 1.25 1.777 2.34 2.905 3.2a11.02 11.02 0 003.709 1.91c.66.17 1.34.27 2.026.3.15.007.301.01.454.01.152 0 .304-.003.455-.01a9.93 9.93 0 002.026-.3 11.08 11.08 0 003.71-1.91 11.4 11.4 0 002.904-3.2 12.14 12.14 0 001.76-4.12c.774-3.08.3-6.354-1.27-9.03C20.8 2.096 17.87.334 14.703.048a11.21 11.21 0 00-.26-.02 9.98 9.98 0 00-.48-.02A12.67 12.67 0 0012.504 0zm-.23 1.503c.075 0 .15.002.225.005a9.7 9.7 0 01.392.017H12.5a.57.57 0 01.078.005c2.674.245 5.072 1.702 6.396 3.886 1.325 2.184 1.733 4.907 1.087 7.468a10.65 10.65 0 01-1.54 3.61 9.95 9.95 0 01-2.541 2.8 9.57 9.57 0 01-3.233 1.67c-.548.14-1.112.22-1.68.25-.125.005-.25.008-.376.008s-.251-.003-.376-.008a8.44 8.44 0 01-1.68-.25 9.57 9.57 0 01-3.233-1.67 9.95 9.95 0 01-2.541-2.8 10.65 10.65 0 01-1.54-3.61c-.646-2.56-.238-5.284 1.087-7.468 1.324-2.184 3.722-3.64 6.396-3.886a9.7 9.7 0 01.47-.022z" />
      </svg>
    ),
    files: [
      { label: "Debian (.deb)", asset: "amd64.deb" },
      { label: "AppImage", asset: "amd64.AppImage" },
    ],
  },
];

function trackDownload(platform: string, asset: string) {
  track("download", { platform, asset });
}

export function Download() {
  return (
    <section id="download" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          Download Typer
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-neutral-400">
          No compiling. No terminal. No PhD required.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 text-center"
            >
              <div className="mx-auto mb-4 inline-flex rounded-lg bg-emerald-500/10 p-3 text-emerald-400">
                {p.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{p.name}</h3>
              <div className="mt-4 space-y-2">
                {p.files.map((f) => (
                  <a
                    key={f.asset}
                    href={`${GITHUB_RELEASE}/download/${f.asset}`}
                    onClick={() => trackDownload(p.name, f.asset)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-emerald-500/40 hover:bg-neutral-800 hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {f.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-neutral-500">
          All downloads from{" "}
          <a
            href={GITHUB_RELEASE}
            target="_blank"
            className="text-emerald-400 hover:underline"
          >
            GitHub Releases
          </a>
          . Open source. Free forever. We&apos;re not monsters.
        </p>
      </div>
    </section>
  );
}
