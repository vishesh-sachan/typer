import { Shield, Zap, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-features">
        <span>
          <Shield size={12} /> Stealth
        </span>
        <span className="dot">&middot;</span>
        <span>
          <Zap size={12} /> Fast
        </span>
        <span className="dot">&middot;</span>
        <span>
          <Globe size={12} /> Cross-platform
        </span>
      </div>
    </footer>
  );
}
