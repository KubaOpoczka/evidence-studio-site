import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/manrope/wght.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PilotBriefForm } from "./components/PilotBriefForm";
import { ThemeToggle } from "./components/ThemeToggle";
import { contactHref } from "./lib/site";
import "./styles.css";

function PilotPage() {
  return (
    <>
      <a className="skip-link" href="#pilot-main">Skip to pilot brief</a>
      <header className="site-header">
        <nav className="site-nav shell" aria-label="Pilot brief navigation">
          <a className="brand" href="./index.html" aria-label="Evidence Studio home">
            <img src="./assets/icon.png" alt="" width="34" height="34" />
            <span>Evidence Studio</span>
          </a>
          <div className="nav-actions">
            <a className="review-demo-link" href="./index.html#agency">Pilot scope</a>
            <a className="review-demo-link" href="./index.html#demo">Try the demo</a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="pilot-main" tabIndex={-1}>
        <section className="review-hero shell-wide" aria-labelledby="pilot-title">
          <div className="review-hero-copy">
            <p className="section-label">One anonymized workflow · €750 fixed scope</p>
            <h1 id="pilot-title">
              <span>Scope one audit.</span>
              <span>Keep the proof together.</span>
            </h1>
            <p>Map one existing audit-to-report workflow into a sample project, export, and written handoff notes. One licence is included and the agreed pilot is delivered within five working days.</p>
          </div>
          <figure className="review-hero-media">
            <picture>
              <source
                srcSet="./assets/campaign-still-768.avif 768w, ./assets/campaign-still-1200.avif 1200w, ./assets/campaign-still.avif 1536w"
                sizes="(max-width: 900px) calc(100vw - 20px), 48vw"
                type="image/avif"
              />
              <img
                src="./assets/campaign-still.jpg"
                alt="Layered accessibility evidence and redaction material on a dark archival table"
                width="1536"
                height="1024"
                fetchPriority="high"
              />
            </picture>
            <picture className="review-hero-slice">
              <source srcSet="./assets/evidence-redacted.webp" type="image/webp" />
              <img
                src="./assets/evidence-redacted.png"
                alt="Protected client evidence with private details covered"
                width="1180"
                height="740"
              />
            </picture>
          </figure>
        </section>

        <section className="review-section shell-wide" aria-label="Evidence Studio pilot brief form">
          <PilotBriefForm />
        </section>
      </main>

      <footer className="site-footer review-footer">
        <div className="footer-inner shell">
          <a className="brand footer-brand" href="./index.html" aria-label="Evidence Studio home">
            <img src="./assets/icon.png" alt="" width="34" height="34" />
            <span>Evidence Studio</span>
          </a>
          <p>Scope, inputs, timing, price, and payment are agreed before work starts.</p>
          <div className="footer-links">
            <a href={contactHref}>Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PilotPage />
  </StrictMode>,
);
