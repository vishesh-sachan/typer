import { useState } from "react";
import type { Page } from "./constants";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { SettingsPage } from "./components/SettingsPage";
import "./App.css";

function App() {
  const [delaySeconds, setDelaySeconds] = useState(5);
  const [typingSpeed, setTypingSpeed] = useState(20);
  const [page, setPage] = useState<Page>("home");

  return (
    <main className="app">
      <Header page={page} onNavigate={setPage} />

      {page === "home" && (
        <p className="app-tagline">
          Paste text. Press start. Look innocent.
        </p>
      )}
      {page === "settings" && (
        <p className="app-tagline">Settings & About</p>
      )}

      {page === "home" ? (
        <HomePage delaySeconds={delaySeconds} typingSpeed={typingSpeed} />
      ) : (
        <SettingsPage
          delaySeconds={delaySeconds}
          setDelaySeconds={setDelaySeconds}
          typingSpeed={typingSpeed}
          setTypingSpeed={setTypingSpeed}
        />
      )}

      <Footer />
    </main>
  );
}

export default App;
