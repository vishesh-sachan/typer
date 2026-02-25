# typer-app

Technical docs for the Tauri desktop app.

## Tech Stack

| Layer | Tech | Version |
|-------|------|---------|
| Frontend | React + TypeScript | 19 |
| Bundler | Vite | 7 |
| Backend | Rust (Tauri 2) | stable |
| Keyboard | [Enigo](https://github.com/enigo-rs/enigo) | 0.6 |
| Package Manager | [Bun](https://bun.sh) | latest |
| Icons | [Lucide React](https://lucide.dev) | 0.575 |

## Prerequisites

- **Bun** (latest)
- **Rust** (stable)
- Platform deps:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Microsoft C++ Build Tools
  - **Linux**: `sudo apt install libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf libxtst-dev`

## Commands

```bash
bun install          # Install frontend deps
bun run dev          # Dev mode (Tauri + Vite HMR)
bun run build        # Production build
bun run vite:dev     # Frontend only (no Tauri)
bun run vite:build   # Frontend build only
```

## Project Structure

```
typer-app/
├── src/
│   ├── App.tsx              # Root component (routing)
│   ├── App.css              # Global styles + CSS variables
│   ├── constants.ts         # Shared types & constants
│   └── components/
│       ├── Header.tsx       # Nav bar (brand, settings, GitHub)
│       ├── Footer.tsx       # Feature badges
│       ├── StatusBar.tsx    # Success/error/info messages
│       ├── HomePage.tsx     # Text input, start/stop, typing logic
│       └── SettingsPage.tsx # Delay, speed, about, creator
├── src-tauri/
│   ├── src/lib.rs           # Rust backend (start_typing, stop_typing)
│   ├── Cargo.toml           # Rust dependencies
│   └── tauri.conf.json      # App config (window, bundle, icons)
└── package.json
```

## Architecture

```
┌──────────────────────────────┐
│  React Frontend (WebView)    │
│  Text input → invoke()       │
└──────────┬───────────────────┘
           │ Tauri IPC (JSON)
           ▼
┌──────────────────────────────┐
│  Rust Backend                │
│  start_typing(text, delay)   │
│  stop_typing() → AtomicBool  │
└──────────┬───────────────────┘
           │ enigo::Keyboard::text()
           ▼
┌──────────────────────────────┐
│  OS Keyboard Events (HID)    │
└──────────────────────────────┘
```

### Typing Flow

1. Frontend calls `invoke("start_typing", { text, delaySeconds })`
2. Rust sleeps for `delay_seconds` (checking stop flag each second)
3. Loops through each char, calls `enigo.text()` with 20ms delay
4. `stop_typing` sets an `AtomicBool` flag — checked every iteration

## Build Output

| Platform | Path | Formats |
|----------|------|---------|
| macOS | `src-tauri/target/release/bundle/macos/` | `.app`, `.dmg` |
| Windows | `src-tauri/target/release/bundle/` | `.exe`, `.msi` |
| Linux | `src-tauri/target/release/bundle/` | `.deb`, `.AppImage` |

## Troubleshooting

**macOS: "App is damaged"** → `xattr -cr /path/to/Typer.app`

**macOS: Typing doesn't work** → System Settings → Privacy & Security → Accessibility → Enable Typer

**Windows: Antivirus blocks it** → Add exception for the `.exe`

**Linux: Permission denied** → `chmod +x Typer*.AppImage`

## CI/CD

Release workflow at `../.github/workflows/release.yml` — triggered on `v*` tags. Builds on macOS, Windows, and Ubuntu runners in parallel, uploads artifacts to GitHub Releases as a draft.

```bash
git tag v0.1.0 && git push origin v0.1.0  # triggers build
```
