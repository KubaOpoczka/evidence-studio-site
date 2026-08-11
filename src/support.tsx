import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/manrope/wght.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeToggle } from "./components/ThemeToggle";
import { supportHref } from "./lib/site";
import "./styles.css";

const firstRun = [
  ["01", "Create a project", "Name the audit and add the client only if that detail belongs in the report."],
  ["02", "Capture page proof", "Open the tested page and click the pinned Evidence Studio icon. Access ends when you leave the page."],
  ["03", "Record the finding", "Create a manual finding or import supported Accessibility Insights JSON, then connect its evidence."],
  ["04", "Prepare the handoff", "Review the report, redact private details, then export HTML, CSV or Markdown locally."],
] as const;

function SupportPage() {
  return (
    <>
      <a className="skip-link" href="#support-main">Skip to support</a>
      <header className="site-header">
        <nav className="site-nav shell" aria-label="Support navigation">
          <a className="brand" href="./index.html" aria-label="Evidence Studio home">
            <img src="./assets/icon.png" alt="" width="34" height="34" />
            <span>Evidence Studio</span>
          </a>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="nav-cta" href={supportHref}>Email support</a>
          </div>
        </nav>
      </header>

      <main id="support-main" tabIndex={-1}>
        <section className="support-hero shell-wide" aria-labelledby="support-title">
          <div className="support-hero-copy">
            <p>Product support</p>
            <h1 id="support-title">Keep the audit moving.</h1>
            <p>Practical help for setup, recovery and licence activation. No account or project upload is required.</p>
            <a className="button button-primary" href={supportHref}>Email support</a>
          </div>
          <div className="support-signal" aria-hidden="true">
            <span>LOCAL</span>
            <div className="support-signal-lines"><i /><i /><i /><i /><i /></div>
            <strong>YOUR PROOF<br />STAYS YOURS</strong>
          </div>
        </section>

        <section className="support-runbook shell" aria-labelledby="first-run-title">
          <div className="support-section-heading">
            <p>First run</p>
            <h2 id="first-run-title">From tested page to report.</h2>
          </div>
          <ol className="support-steps">
            {firstRun.map(([number, title, detail]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="support-grid shell-wide" aria-label="Recovery and licence help">
          <article className="support-card support-card-backup">
            <p>Recovery</p>
            <h2>Back up before browser changes.</h2>
            <p>Chrome storage is local, not permanent. Export a complete project backup before removing the extension, clearing browser data or moving profiles.</p>
            <ul>
              <li>Restore creates a separate copy.</li>
              <li>Existing work is not silently replaced.</li>
              <li>Backups contain original and edited evidence.</li>
            </ul>
          </article>
          <article className="support-card support-card-licence">
            <p>Licence</p>
            <h2>Activation sends two values.</h2>
            <p>Only the licence key and Evidence Studio’s public product ID go to Gumroad. Project names, findings, screenshots, URLs and reports do not.</p>
            <dl>
              <div><dt>Service unavailable</dt><dd>An active licence stays available.</dd></div>
              <div><dt>Move browser</dt><dd>Remove the saved key here, then activate in the other browser.</dd></div>
              <div><dt>Wrong product</dt><dd>Use the key from the Evidence Studio receipt.</dd></div>
            </dl>
          </article>
        </section>

        <section className="support-contact shell" aria-labelledby="contact-title">
          <div>
            <p>When you need a person</p>
            <h2 id="contact-title">Send a useful support note.</h2>
          </div>
          <div className="support-contact-copy">
            <p>Include the Evidence Studio version, Chrome version, what you expected and what happened. If you attach a screenshot, remove client names and private page content first.</p>
            <a className="button button-secondary" href={supportHref}>Prepare support email</a>
            <p className="support-note">Opening the link prepares an email in your mail app. This website does not receive or store the message.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner shell">
          <a className="brand footer-brand" href="./index.html" aria-label="Evidence Studio home">
            <img src="./assets/icon.png" alt="" width="34" height="34" />
            <span>Evidence Studio</span>
          </a>
          <p>Accessibility evidence that holds together.</p>
          <div className="footer-links">
            <a href="/support" aria-current="page">Support</a>
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
    <SupportPage />
  </StrictMode>,
);
