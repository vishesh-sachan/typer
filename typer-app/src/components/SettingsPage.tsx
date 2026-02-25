import {
  Timer,
  Zap,
  Sparkles,
  Shield,
  Globe,
  Clock,
  Heart,
  Github,
  Star,
  ExternalLink,
} from "lucide-react";
import { GITHUB_URL, APP_VERSION } from "../constants";

interface SettingsPageProps {
  delaySeconds: number;
  setDelaySeconds: (value: number) => void;
  typingSpeed: number;
  setTypingSpeed: (value: number) => void;
}

export function SettingsPage({
  delaySeconds,
  setDelaySeconds,
  typingSpeed,
  setTypingSpeed,
}: SettingsPageProps) {
  return (
    <div className="page-content settings-page">
      {/* Countdown Setting */}
      <div className="card">
        <div className="card-title">
          <Timer size={16} />
          <span>Countdown Delay</span>
        </div>
        <p className="card-desc">
          Seconds before typing starts. Enough time to alt-tab like a pro.
        </p>
        <div className="delay-row">
          {[3, 5, 10, 15].map((s) => (
            <button
              key={s}
              className={`preset-btn ${delaySeconds === s ? "active" : ""}`}
              onClick={() => setDelaySeconds(s)}
            >
              {s}s
            </button>
          ))}
          <div className="custom-input-wrap">
            <input
              type="number"
              min={1}
              max={60}
              value={delaySeconds}
              onChange={(e) =>
                setDelaySeconds(
                  Math.max(1, parseInt(e.currentTarget.value) || 5)
                )
              }
            />
            <span className="unit">sec</span>
          </div>
        </div>
      </div>

      {/* Typing Speed */}
      <div className="card">
        <div className="card-title">
          <Zap size={16} />
          <span>Typing Speed</span>
        </div>
        <p className="card-desc">
          Delay between each keypress in milliseconds. Lower = faster.
        </p>
        <div className="delay-row">
          {[10, 20, 50, 100].map((ms) => (
            <button
              key={ms}
              className={`preset-btn ${typingSpeed === ms ? "active" : ""}`}
              onClick={() => setTypingSpeed(ms)}
            >
              {ms}ms
            </button>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="card about-card">
        <div className="card-title">
          <Sparkles size={16} />
          <span>About Typer</span>
        </div>
        <p className="about-text">
          A beautifully over-engineered solution to a problem that shouldn't
          exist. Built because some exam platforms think disabling Ctrl+V
          counts as "security." <strong>Spoiler: it doesn't.</strong>
        </p>

        <div className="about-features">
          <div className="about-feature">
            <Shield size={15} />
            <span>Bypasses paste restrictions</span>
          </div>
          <div className="about-feature">
            <Zap size={15} />
            <span>Simulates real keystrokes</span>
          </div>
          <div className="about-feature">
            <Globe size={15} />
            <span>Cross-platform (macOS, Windows, Linux)</span>
          </div>
          <div className="about-feature">
            <Clock size={15} />
            <span>Configurable countdown & speed</span>
          </div>
        </div>
      </div>

      {/* Creator */}
      <div className="card creator-card">
        <div className="creator-row">
          <div>
            <div className="creator-name">
              Built by <strong>Vishesh Sachan</strong>
            </div>
            <div className="creator-tagline">
              Because I was too lazy to type and too smart to get caught.
            </div>
          </div>
          <Heart size={18} className="heart-icon" />
        </div>
      </div>

      {/* Links */}
      <div className="links-row">
        <a
          className="link-btn"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener"
        >
          <Github size={16} />
          <span>Source Code</span>
          <ExternalLink size={12} />
        </a>
        <a
          className="link-btn"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener"
        >
          <Star size={16} />
          <span>Star on GitHub</span>
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="version-text">
        Typer v{APP_VERSION} &middot; Made with spite and caffeine ☕
      </div>
    </div>
  );
}
