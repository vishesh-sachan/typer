use enigo::{Enigo, Keyboard, Settings};
use std::thread;
use std::time::Duration;

// Configuration
const KEY_DELAY_MS: u64 = 20;

#[tauri::command]
async fn start_typing(text: String, delay_seconds: u64) -> Result<String, String> {
    // Countdown delay before starting
    thread::sleep(Duration::from_secs(delay_seconds));
    
    // Initialize keyboard controller
    let mut enigo = Enigo::new(&Settings::default()).map_err(|e| e.to_string())?;
    
    // Type each character with a delay
    for ch in text.chars() {
        enigo.text(&ch.to_string()).map_err(|e| e.to_string())?;
        thread::sleep(Duration::from_millis(KEY_DELAY_MS));
    }
    
    Ok("Typing completed successfully".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![start_typing])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
