import Foundation
import Cocoa

// MARK: - Config
let START_DELAY_SECONDS: UInt32 = 5
let KEY_DELAY_US: useconds_t = 20_000

// MARK: - Typing Engine
func typeCharacter(_ char: UniChar) {
    let source = CGEventSource(stateID: .hidSystemState)

    let keyDown = CGEvent(
        keyboardEventSource: source,
        virtualKey: 0,
        keyDown: true
    )
    keyDown?.keyboardSetUnicodeString(
        stringLength: 1,
        unicodeString: [char]
    )

    let keyUp = CGEvent(
        keyboardEventSource: source,
        virtualKey: 0,
        keyDown: false
    )
    keyUp?.keyboardSetUnicodeString(
        stringLength: 1,
        unicodeString: [char]
    )
    keyDown?.post(tap: .cghidEventTap)
    usleep(KEY_DELAY_US)
    keyUp?.post(tap: .cghidEventTap)
}

// MARK: - Input
let text = CommandLine.arguments.dropFirst().joined(separator: " ")

if text.isEmpty {
    print("Usage: typer \"text to type\"")
    exit(1)
}

// MARK: - Countdown
print("Typing will start in \(START_DELAY_SECONDS) seconds…")
print("Switch to the target window now.")

sleep(START_DELAY_SECONDS)

// MARK: - Type text (FIXED)
for char in text {
    for unit in String(char).utf16 {
        typeCharacter(unit)
        usleep(KEY_DELAY_US)
    }
}

print("\nDone.")
