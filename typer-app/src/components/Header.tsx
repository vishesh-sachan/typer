import {
  Keyboard,
  Github,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { GITHUB_URL, type Page } from "../constants";

interface HeaderProps {
  page: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ page, onNavigate }: HeaderProps) {
  return (
    <header className="app-header">
      {page === "settings" ? (
        <button className="nav-btn" onClick={() => onNavigate("home")}>
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>
      ) : (
        <div className="brand">
          <Keyboard size={20} className="brand-icon" />
          <span className="brand-name">Typer</span>
        </div>
      )}

      <div className="header-actions">
        {page === "home" && (
          <a
            className="header-icon-btn"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener"
            title="GitHub"
          >
            <Github size={18} />
          </a>
        )}
        {page === "home" && (
          <button
            className="header-icon-btn"
            onClick={() => onNavigate("settings")}
            title="Settings"
          >
            <Settings size={18} />
          </button>
        )}
      </div>
    </header>
  );
}
