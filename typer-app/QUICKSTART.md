# Quick Start Guide - Typer

## For Users (No Development Setup Required)

### Download & Install

1. **Download** the appropriate version for your system:
   - **macOS**: Download `Typer.app` or `Typer.dmg`
   - **Windows**: Download `Typer.exe` or `Typer.msi`
   - **Linux**: Download `Typer.AppImage`, `.deb`, or `.rpm`

### First-Time Setup

#### macOS
1. Double-click to open the app (or right-click → Open if it's blocked)
2. When prompted, go to **System Settings** → **Privacy & Security** → **Accessibility**
3. Click the lock to make changes
4. Enable "Typer" in the list
5. Restart the app

#### Windows
1. Run the installer or double-click the `.exe`
2. If Windows Defender SmartScreen appears, click "More info" → "Run anyway"
3. No additional permissions needed

#### Linux
1. Make the AppImage executable: `chmod +x Typer*.AppImage`
2. Double-click to run or execute from terminal: `./Typer*.AppImage`

### Using the App

1. **Enter your text** in the large text area
2. **Set the countdown delay** (default: 5 seconds)
   - This gives you time to switch windows
3. **Click "Start Typing"**
4. **Quickly switch** to your target window/application
5. **Position your cursor** where you want the text to appear
6. **Wait** for the countdown to complete
7. **Text types automatically!**

### Tips

- ✅ Use longer delays (10-15 seconds) if you need more time to switch windows
- ✅ Test with a simple text editor first to get comfortable
- ✅ The app simulates real typing at 20ms per character
- ✅ Click anywhere in target window to ensure it has focus
- ⚠️ Don't type during countdown - let the app take over

### Common Issues

**Text not appearing?**
- Make sure the target window has focus (click in the text field)
- On macOS, check Accessibility permissions
- Verify you're not in a full-screen app that blocks input

**Permission denied on macOS?**
- System Settings → Privacy & Security → Accessibility → Enable "Typer"

**Windows antivirus blocking?**
- Add an exception for Typer in your antivirus settings
- The app needs to simulate keyboard input, which some AVs flag

## For Developers

### Build from Source

```bash
# Prerequisites: Bun, Rust, platform-specific build tools

# Clone and install
cd typer-app
bun install

# Development mode (hot reload)
bunx tauri dev

# Production build
bunx tauri build

# Output in: src-tauri/target/release/bundle/
```

### Project Structure

```
typer-app/
├── src/                    # React frontend
│   ├── App.tsx            # Main UI component
│   └── App.css            # Styles
├── src-tauri/             # Tauri backend
│   ├── src/
│   │   └── lib.rs         # Rust typing logic
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # App configuration
└── README.md              # Full documentation
```

### Key Technologies

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Tauri 2 + Rust + Enigo (keyboard simulation)
- **Build**: Bun + Cargo

See [README.md](README.md) for full documentation.
