import { useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Play, Square, Keyboard, Copy, Check } from "lucide-react";
import { StatusBar } from "./StatusBar";
import type { Status } from "../constants";

interface HomePageProps {
  delaySeconds: number;
  typingSpeed: number;
}

export function HomePage({ delaySeconds, typingSpeed }: HomePageProps) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [status, setStatus] = useState<Status>({ type: "", message: "" });
  const [copied, setCopied] = useState(false);
  const stoppedRef = useRef(false);

  async function startTyping() {
    if (!text.trim()) {
      setStatus({ type: "error", message: "Bro, you forgot the text." });
      return;
    }

    stoppedRef.current = false;
    setIsTyping(true);
    setCountdown(delaySeconds);
    setStatus({ type: "info", message: "GO GO GO! Switch windows now!" });

    // Client-side countdown
    let remaining = delaySeconds;
    const interval = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    try {
      await invoke("start_typing", {
        text: text,
        delaySeconds: delaySeconds,
      });
      const msg = stoppedRef.current ? "Stopped." : "Done. You're welcome.";
      setStatus({
        type: stoppedRef.current ? "info" : "success",
        message: msg,
      });
    } catch (error) {
      setStatus({ type: "error", message: `Skill issue: ${error}` });
    } finally {
      clearInterval(interval);
      setIsTyping(false);
      setCountdown(0);
    }
  }

  async function stopTyping() {
    try {
      await invoke("stop_typing");
      stoppedRef.current = true;
    } catch (_) {
      // ignore
    }
  }

  function handleCopyText() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="page-content">
      {/* Text Input Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Keyboard size={16} />
            <span>Text to Type</span>
          </div>
          <button
            className="icon-btn"
            onClick={handleCopyText}
            title="Copy text"
            disabled={!text.trim()}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          placeholder="Paste your text here... we don't judge 👀"
          disabled={isTyping}
          spellCheck={false}
        />
        <div className="card-footer">
          <span className="char-count">
            {text.length} {text.length === 1 ? "char" : "chars"}
          </span>
          {text.length > 0 && (
            <span className="eta">
              ~{Math.ceil((text.length * typingSpeed) / 1000)}s to type
            </span>
          )}
        </div>
      </div>

      {/* Action Area */}
      <div className="action-row">
        <button
          className="start-btn"
          onClick={startTyping}
          disabled={isTyping || !text.trim()}
        >
          {isTyping ? (
            <>
              <div className="spinner" />
              <span>
                {countdown > 0
                  ? `Switching in ${countdown}...`
                  : "Typing..."}
              </span>
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              <span>Start Typing</span>
            </>
          )}
        </button>

        {isTyping && (
          <button className="stop-btn" onClick={stopTyping}>
            <Square size={16} fill="currentColor" />
            <span>Stop</span>
          </button>
        )}
      </div>

      {/* Status */}
      <StatusBar status={status} />
    </div>
  );
}
