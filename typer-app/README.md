# Typer - Cross-Platform Keyboard Simulator

A modern Tauri + React application that simulates keyboard typing to work around paste-blocking in secured online assessment platforms.

## Features

- 🎨 **Modern UI**: Clean, intuitive interface built with React
- ⏱️ **Countdown Timer**: Configurable delay (1-30 seconds) before typing starts
- ⌨️ **Realistic Typing**: Simulates keyboard input at the OS level (20ms delay between keys)
- 🔒 **Cross-Platform**: Works on Windows, macOS, and Linux
- 📦 **No Compilation Required**: Distributed as ready-to-run executables

## Why?

Many online assessment and exam platforms disable paste operations to prevent cheating. However, window switching is often still allowed. This creates scenarios where legitimate use cases are blocked:

- **Code snippets**: Copying code from your IDE for debugging
- **Configuration**: Pasting environment variables or connection strings
- **Documentation**: Referencing technical documentation
- **Accessibility**: Users who rely on paste for efficiency

**Typer** doesn't bypass security—it's a workaround that simulates human typing at the OS level, character by character.

## How It Works

1. Enter your text in the textarea
2. Set the countdown delay (default: 5 seconds)
3. Click "Start Typing"
4. Switch to your target window
5. Text types automatically after the countdown

## Prerequisites

- **Development**: 
  - Bun (latest version)
  - Rust (latest stable)
  - Platform-specific requirements:
    - **macOS**: Xcode Command Line Tools
    - **Windows**: Microsoft C++ Build Tools
    - **Linux**: Development packages (see Tauri docs)

## Development

### Install Dependencies

```bash
cd typer-app
bun install
```

### Run Development Server

```bash
bunx tauri dev
```

This starts the Vite dev server and launches the Tauri app in development mode with hot-reload.

### Build for Production

```bash
bunx tauri build
```

The built application will be in `src-tauri/target/release/bundle/`.

## Distribution

### macOS

1. Build the app: `bunx tauri build`
2. Find the `.app` bundle in `src-tauri/target/release/bundle/macos/`
3. **Important**: On first run, users need to:
   - Right-click the app and select "Open" (or go to System Settings)
   - Grant **Accessibility** permissions in System Settings → Privacy & Security → Accessibility
   - This allows the app to simulate keyboard input system-wide

### Windows

1. Build the app: `bunx tauri build`
2. Find the `.exe` or `.msi` installer in `src-tauri/target/release/bundle/`
3. Distribute the installer to users
4. No special permissions required

### Linux

1. Build the app: `bunx tauri build`
2. Find the `.AppImage`, `.deb`, or `.rpm` in `src-tauri/target/release/bundle/`
3. Users may need to make the AppImage executable: `chmod +x Typer.AppImage`

## Architecture

```
┌─────────────────────────────┐
│     React Frontend          │
│  • Text input & controls    │
│  • Countdown timer          │
│  • Status display           │
└──────────┬──────────────────┘
           │ Tauri IPC
           ▼
┌─────────────────────────────┐
│     Rust Backend            │
│  • Enigo keyboard library   │
│  • Cross-platform typing    │
│  • Character-by-character   │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│   Operating System          │
│  • Keyboard events (HID)    │
│  • Application input        │
└─────────────────────────────┘
```

## Technical Details

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Tauri 2 + Rust
- **Keyboard Simulation**: Enigo crate (cross-platform)
- **Key Delay**: 20ms between characters
- **Package Manager**: Bun

## Troubleshooting

### macOS: "App is damaged and can't be opened"

This happens with unsigned apps. Fix:
```bash
xattr -cr /path/to/Typer.app
```

### macOS: Typing doesn't work

Grant Accessibility permissions:
1. System Settings → Privacy & Security → Accessibility
2. Enable "Typer"

### Windows: Antivirus blocks the app

Some antivirus software may flag keyboard automation tools. Add an exception if you trust the source.

### Linux: Permission denied

Make the AppImage executable:
```bash
chmod +x Typer*.AppImage
```

## Security & Ethics

This tool is designed for **legitimate use cases** where paste functionality is blocked but not prohibited (e.g., technical limitations rather than security requirements). 

**Do not use this tool to:**
- Violate exam integrity policies
- Bypass security measures intended to prevent cheating
- Circumvent authentication or authorization systems

Users are responsible for ensuring their use complies with applicable policies and regulations.

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please open an issue or PR on GitHub.

## Credits

Built with:
- [Tauri](https://tauri.app/) - Cross-platform app framework
- [React](https://react.dev/) - UI framework
- [Enigo](https://github.com/enigo-rs/enigo) - Cross-platform keyboard automation
- [Bun](https://bun.sh/) - JavaScript runtime and package manager
