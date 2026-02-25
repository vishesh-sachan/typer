import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [delaySeconds, setDelaySeconds] = useState(5);
  const [isTyping, setIsTyping] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  async function startTyping() {
    if (!text.trim()) {
      setStatus("Please enter text to type");
      return;
    }

    setIsTyping(true);
    setCountdown(delaySeconds);
    setStatus(`Switch to target window! Starting in ${delaySeconds} seconds...`);

    try {
      await invoke("start_typing", {
        text: text,
        delaySeconds: delaySeconds,
      });
      setStatus("✓ Typing completed successfully!");
    } catch (error) {
      setStatus(`Error: ${error}`);
    } finally {
      setIsTyping(false);
      setCountdown(0);
    }
  }

  return (
    <main className="container">
      <div className="header">
        <h1>⌨️ Typer</h1>
        <p className="subtitle">Simulate keyboard typing for paste-restricted applications</p>
      </div>

      <div className="content">
        <div className="form-group">
          <label htmlFor="text-input">Text to Type</label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Enter the text you want to type..."
            rows={8}
            disabled={isTyping}
          />
        </div>

        <div className="form-group">
          <label htmlFor="delay-input">
            Countdown Delay (seconds)
          </label>
          <input
            id="delay-input"
            type="number"
            min="1"
            max="30"
            value={delaySeconds}
            onChange={(e) => setDelaySeconds(parseInt(e.currentTarget.value) || 5)}
            disabled={isTyping}
          />
          <span className="hint">Time to switch windows before typing starts</span>
        </div>

        <button
          className="start-button"
          onClick={startTyping}
          disabled={isTyping || !text.trim()}
        >
          {isTyping ? "Typing..." : "Start Typing"}
        </button>

        {countdown > 0 && (
          <div className="countdown">
            <div className="countdown-number">{countdown}</div>
            <div className="countdown-text">Switch to target window now!</div>
          </div>
        )}

        {status && (
          <div className={`status ${status.includes("Error") ? "error" : ""}`}>
            {status}
          </div>
        )}
      </div>

      <div className="footer">
        <p className="info">
          💡 This tool simulates keyboard typing to work around paste-blocking in secured applications.
          <br />
          <strong>How it works:</strong> Enter text → Set delay → Click Start → Switch windows → Text types automatically
        </p>
      </div>
    </main>
  );
}

export default App;
