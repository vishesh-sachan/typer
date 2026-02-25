use enigo::{Enigo, Keyboard, Settings};
use std::sync::atomic::{AtomicBool, Ordering};
use std::thread;
use std::time::Duration;

// Configuration
const KEY_DELAY_MS: u64 = 20;

static STOP_FLAG: AtomicBool = AtomicBool::new(false);

#[tauri::command]
async fn start_typing(text: String, delay_seconds: u64) -> Result<String, String> {
    STOP_FLAG.store(false, Ordering::SeqCst);

    // Countdown delay — check stop flag each second
    for _ in 0..delay_seconds {
        if STOP_FLAG.load(Ordering::SeqCst) {
            return Ok("Stopped during countdown.".to_string());
        }
        thread::sleep(Duration::from_secs(1));
    }

    // Initialize keyboard controller
    let mut enigo = Enigo::new(&Settings::default()).map_err(|e| e.to_string())?;

    // Type each character with a delay, checking stop flag
    for ch in text.chars() {
        if STOP_FLAG.load(Ordering::SeqCst) {
            return Ok("Stopped mid-typing.".to_string());
        }
        enigo.text(&ch.to_string()).map_err(|e| e.to_string())?;
        thread::sleep(Duration::from_millis(KEY_DELAY_MS));
    }

    Ok("Typing completed successfully".to_string())
}

#[tauri::command]
async fn stop_typing() -> Result<String, String> {
    STOP_FLAG.store(true, Ordering::SeqCst);
    Ok("Stop signal sent.".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![start_typing, stop_typing])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
