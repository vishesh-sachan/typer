<div align="center">

# ⚡ Typer

**The app that types so you don't have to.**

Because some exam platforms think disabling Ctrl+V is "security."<br/>
Spoiler: it isn't.

[![Star on GitHub](https://img.shields.io/github/stars/vishesh-sachan/typer?style=social)](https://github.com/vishesh-sachan/typer)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## 🎬 Demo

<!-- Replace with your actual demo video/gif -->
<div align="center">

https://github.com/user-attachments/assets/YOUR_VIDEO_ID_HERE

*Paste text. Press start. Look innocent.*

</div>

---

## 💡 What is this?

A desktop app that simulates real keyboard input — character by character, at the OS level. Paste your text, switch windows, and watch it type itself out like a very fast intern.

**Works on:** macOS · Windows · Linux

---

## 📦 Install

Head to [**Releases**](https://github.com/vishesh-sachan/typer/releases) and grab the installer for your OS:

| Platform | File |
|----------|------|
| macOS (Apple Silicon) | `.dmg` |
| macOS (Intel) | `.dmg` |
| Windows | `.msi` / `.exe` |
| Linux | `.deb` / `.AppImage` |

Download. Install. Done. No compiling. No terminal. No PhD required.

---

## 🏗️ Architecture

```
typer/
├── typer-app/          ← Desktop app (Tauri + React)
│   ├── src/            ← React frontend (TypeScript)
│   ├── src-tauri/      ← Rust backend (enigo for keystrokes)
│   └── ...
├── cli/                ← Original CLI tools
│   ├── mac/            ← Swift CLI version
│   └── windows/        ← C++ CLI version
└── .github/workflows/  ← CI/CD (auto-builds on tag)
```

**Frontend:** React 19 + TypeScript + Vite — dark themed, minimal, gets out of your way.

**Backend:** Rust + [Enigo](https://github.com/enigo-rs/enigo) — simulates OS-level keystrokes. Not a clipboard hack. Actual key events.

**Build:** Tauri 2 — wraps it all into a native app that's ~5MB, not 200MB like Electron.

---

## 🚀 How it works

1. Paste your text
2. Hit **Start Typing**
3. Alt-tab to your target window
4. Typer types it out, one key at a time
5. Play dumb

---

## ⭐ Star This Repo

If Typer saved you from manually typing 500 lines into a textbox like a caveman, consider starring the repo. It's free and makes me mass produce serotonin.

[![Star on GitHub](https://img.shields.io/github/stars/vishesh-sachan/typer?style=for-the-badge&logo=github&label=Star&color=10b981)](https://github.com/vishesh-sachan/typer)

---

## 🧑‍💻 Development

See [typer-app/README.md](typer-app/README.md) for setup instructions.

---

<div align="center">

**Built by [Vishesh Sachan](https://github.com/vishesh-sachan)**<br/>
*Because I was too lazy to type and too smart to get caught.*

</div>
