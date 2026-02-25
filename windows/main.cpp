#include <windows.h>
#include <iostream>
#include <string>
#include <thread>
#include <chrono>

// MARK: - Config
const int START_DELAY_SECONDS = 5;
const int KEY_DELAY_MS = 20;

// MARK: - Typing Engine
void typeCharacter(wchar_t character) {
    INPUT inputs[2] = {};
    
    // Key down
    inputs[0].type = INPUT_KEYBOARD;
    inputs[0].ki.wVk = 0;
    inputs[0].ki.wScan = character;
    inputs[0].ki.dwFlags = KEYEVENTF_UNICODE;
    inputs[0].ki.time = 0;
    inputs[0].ki.dwExtraInfo = 0;
    
    // Key up
    inputs[1].type = INPUT_KEYBOARD;
    inputs[1].ki.wVk = 0;
    inputs[1].ki.wScan = character;
    inputs[1].ki.dwFlags = KEYEVENTF_UNICODE | KEYEVENTF_KEYUP;
    inputs[1].ki.time = 0;
    inputs[1].ki.dwExtraInfo = 0;
    
    SendInput(2, inputs, sizeof(INPUT));
    Sleep(KEY_DELAY_MS);
}

// MARK: - Unicode conversion helper
std::wstring stringToWString(const std::string& str) {
    if (str.empty()) return std::wstring();
    
    int size_needed = MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), NULL, 0);
    std::wstring wstr(size_needed, 0);
    MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), &wstr[0], size_needed);
    return wstr;
}

// MARK: - Main
int main(int argc, char* argv[]) {
    // Parse arguments
    if (argc < 2) {
        std::cout << "Usage: typer \"text to type\"" << std::endl;
        return 1;
    }
    
    // Join all arguments into one string
    std::string text;
    for (int i = 1; i < argc; i++) {
        if (i > 1) text += " ";
        text += argv[i];
    }
    
    if (text.empty()) {
        std::cout << "Usage: typer \"text to type\"" << std::endl;
        return 1;
    }
    
    // Convert to wide string for Unicode support
    std::wstring wtext = stringToWString(text);
    
    // Countdown
    std::cout << "Typing will start in " << START_DELAY_SECONDS << " seconds..." << std::endl;
    std::cout << "Switch to the target window now." << std::endl;
    
    for (int i = START_DELAY_SECONDS; i > 0; i--) {
        std::cout << i << "..." << std::flush;
        Sleep(1000);
    }
    std::cout << std::endl;
    
    // Type each character
    for (wchar_t ch : wtext) {
        typeCharacter(ch);
    }
    
    std::cout << "\nDone." << std::endl;
    return 0;
}
