# Typer

A macOS CLI tool that simulates keyboard typing to work around paste-blocking in secured online assessment platforms.

## Why?

Many online assessment and exam platforms disable paste operations (`Cmd+V`) to prevent cheating. However, window switching is often still allowed. This creates scenarios where legitimate use cases are blocked:

- **Code snippets**: Copying code from your IDE for debugging
- **Configuration**: Pasting environment variables or connection strings
- **Documentation**: Referencing technical documentation
- **Accessibility**: Users who rely on paste for efficiency

**Typer** doesn't bypass security—it's a workaround that simulates human typing at the OS level, character by character.

## How It Works

1. **You run the CLI tool** with your text as an argument
2. **5-second countdown** gives you time to switch windows
3. **You move your cursor** to the secured text field
4. **Typer simulates keypresses** using macOS Core Graphics events
5. **Text appears** as if you typed it manually

The tool uses `CGEvent` APIs to generate keyboard events at the system level, which appear as physical keyboard input to applications.

## Design

### Architecture

```
┌─────────────────┐
│  CLI Interface  │
│  (main.swift)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Typing Engine   │
│ • CGEventSource │
│ • CGEvent       │
│ • Unicode       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  System Events  │
│  (macOS HID)    │
└─────────────────┘
```

### Key Components

- **CGEventSource**: Creates events from HID system state
- **CGEvent**: Generates keyboard events (keyDown/keyUp)
- **Unicode String Support**: Handles all characters including special chars, emojis, etc.
- **Configurable Delays**: 
  - `START_DELAY_SECONDS`: Time to switch windows (default: 5s)
  - `KEY_DELAY_US`: Microseconds between keypresses (default: 20ms)

### Why Character-by-Character?

Paste-blocking works by detecting clipboard operations. By simulating individual keypresses:
- Each character is a separate keyboard event
- No clipboard interaction occurs
- Applications see "real" typing behavior
- Works with any text input field

## Installation

### Prerequisites

- macOS (uses Core Graphics framework)
- Swift toolchain
- Accessibility permissions

### Build from Source

```bash
# Clone the repository
git clone https://github.com/yourusername/typer.git
cd typer

# Build release binary
swift build -c release

# Install to /usr/local/bin
cp .build/release/typer /usr/local/bin/
```

### Permissions

macOS requires accessibility permissions for keyboard automation:

1. Open **System Preferences** → **Security & Privacy** → **Privacy**
2. Select **Accessibility** from the left sidebar
3. Add your terminal app (Terminal.app, iTerm2, etc.)
4. Restart your terminal

## Usage

### Basic Usage

```bash
typer "Hello, World!"
```

### Multi-line Text

```bash
typer "Line 1
Line 2
Line 3"
```

### With Special Characters

```bash
typer "user@example.com: P@ssw0rd!"
```

### Code Snippets

```bash
typer 'const API_KEY = "abc123def456";'
```

### From Clipboard

```bash
typer "$(pbpaste)"
```

### Workflow

```bash
# 1. Copy your text
echo "Important text" | pbcopy

# 2. Run typer with clipboard content
typer "$(pbpaste)"

# 3. Within 5 seconds:
#    - Switch to exam window (Cmd+Tab)
#    - Click in the text field
#    - Wait for typing to complete
```

## Configuration

Edit constants in [main.swift](Sources/typer/main.swift):

```swift
let START_DELAY_SECONDS: UInt32 = 5      // Countdown before typing starts
let KEY_DELAY_US: useconds_t = 20_000    // Delay between keypresses (microseconds)
```

- **Increase `START_DELAY_SECONDS`**: If you need more time to switch windows
- **Increase `KEY_DELAY_US`**: If typing is too fast and characters are dropped
- **Decrease `KEY_DELAY_US`**: For faster typing (test carefully)

## Limitations

- **macOS only**: Uses Core Graphics framework
- **Requires accessibility permissions**: System-level keyboard events
- **Not instantaneous**: Types at ~50 chars/second (configurable)
- **No focus validation**: Ensure cursor is in the correct field
- **Character encoding**: UTF-16 support, may not work with all languages

## Ethical Considerations

⚠️ **This tool is designed for legitimate use cases only.**

### Acceptable Uses
- Personal debugging and development
- Accessibility needs
- Copying your own notes into forms
- Working around overly restrictive policies

### Unacceptable Uses
- ❌ Cheating on exams or assessments
- ❌ Bypassing security for unauthorized access
- ❌ Violating terms of service
- ❌ Academic dishonesty

**Use responsibly. Respect the purpose of security measures.**

## Technical Details

### How Paste-Blocking Works

Most platforms use JavaScript to intercept paste events:
```javascript
input.addEventListener('paste', (e) => e.preventDefault());
```

This blocks clipboard operations but cannot detect individual keyboard events.

### How Typer Works

Typer generates hardware-level keyboard events:
```swift
let keyDown = CGEvent(keyboardEventSource: source, virtualKey: 0, keyDown: true)
keyDown?.keyboardSetUnicodeString(stringLength: 1, unicodeString: [char])
keyDown?.post(tap: .cghidEventTap)
```

These events are indistinguishable from physical keyboard input.

## Troubleshooting

### "Operation not permitted"
- Grant accessibility permissions (see Installation)

### Characters are dropped
- Increase `KEY_DELAY_US` to give more time between keypresses

### Wrong window receives text
- Increase `START_DELAY_SECONDS`
- Ensure you click in the target field during countdown

### Special characters don't work
- Check if the target application supports Unicode input
- Some characters may require different input methods

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please open an issue or submit a pull request.

## Disclaimer

This tool is provided as-is for educational and legitimate purposes. Users are responsible for complying with applicable laws, terms of service, and ethical guidelines. The authors are not responsible for misuse.