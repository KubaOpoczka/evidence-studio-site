import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/manrope/wght.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeToggle } from "./components/ThemeToggle";
import { contactHref } from "./lib/site";
import "./styles.css";

type LegalPage = "privacy" | "terms";

function LegalHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav shell" aria-label="Legal page navigation">
        <a className="brand" href="./index.html" aria-label="Evidence Studio home">
          <img src="./assets/icon.png" alt="" width="34" height="34" />
          <span>Evidence Studio</span>
        </a>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="nav-cta" href="./index.html#founding">Founding offer</a>
        </div>
      </nav>
    </header>
  );
}

function LegalFooter() {
  return (
    <footer className="site-footer legal-footer">
      <div className="footer-inner shell">
        <a className="brand footer-brand" href="./index.html" aria-label="Evidence Studio home">
          <img src="./assets/icon.png" alt="" width="34" height="34" />
          <span>Evidence Studio</span>
        </a>
        <div className="footer-links">
          <a href={contactHref}>Contact</a>
          <a href="/support">Support</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

function PrivacyPage() {
  return (
    <article className="legal-page shell" aria-labelledby="legal-title">
      <header className="legal-title-block">
        <p>Privacy</p>
        <h1 id="legal-title">Your audit evidence is not marketing data.</h1>
        <span>Last updated 29 July 2026</span>
      </header>

      <div className="legal-content">
        <section>
          <h2>The website</h2>
          <p>This website build contains no analytics scripts, advertising trackers, or marketing cookies.</p>
          <p>The website is hosted on Cloudflare Pages. Like other web hosts, Cloudflare processes ordinary request data needed to deliver and protect the site, such as IP address, browser and device information, requested page, and request time. Evidence Studio does not use that data to build advertising profiles.</p>
          <p>The guided specialist review and pilot brief keep answers on the page until you prepare an email. The website does not transmit or store those answers. Your email provider handles the message after you choose to open your email app.</p>
        </section>

        <section>
          <h2>The Chrome extension</h2>
          <p>Evidence Studio keeps project content in browser storage on the reviewer’s device. Project content includes imported results, notes, screenshots, redactions, retests, report drafts, and any client or contact details the reviewer chooses to enter.</p>
          <p>When the reviewer clicks the pinned extension icon, Evidence Studio handles website content and browsing activity needed for that capture: the visible page screenshot, page title, URL, document language, viewport, browser zoom, colour mode, forced-colour state, reduced-motion state, and device scale. The extension does not monitor browsing in the background or keep permanent access to websites.</p>
          <p>Reports and backups leave the browser only when the reviewer chooses to export them. Anyone who receives an exported file may be able to read its contents.</p>
        </section>

        <section>
          <h2>Licence activation</h2>
          <p>When you choose to activate a commercial licence, Evidence Studio asks Chrome for access to Gumroad’s licence service. Activation sends the licence key you entered, Evidence Studio’s public product ID, and a flag that records the first activation check. Later validation sends the key and product ID without incrementing that count. Validation runs no more than once every 30 days.</p>
          <p>Activation never includes project names, client names, screenshots, findings, tested URLs, report content, browser history, a computer name, or a device fingerprint. Gumroad may return customer and order metadata in its response; Evidence Studio discards those unnecessary fields.</p>
          <p>The extension stores the licence key, provider and product identifiers, status, use count, and verification dates in Chrome’s local extension storage. This information stays until you remove the saved licence, remove the extension data, or uninstall the extension. It is not included in project backups.</p>
          <p>If Gumroad is temporarily unavailable, a previously active licence remains usable. Only an explicit invalid, refunded, disputed, charged-back, ended, or wrong-product response changes the paid entitlement.</p>
        </section>

        <section>
          <h2>Chrome Web Store data use</h2>
          <p>Evidence Studio requests the minimum browser access needed to capture and organize accessibility audit evidence. Website content, browsing activity, and user-generated project content are used only for that user-facing purpose and are not sold, used for advertising, or transferred to data brokers.</p>
          <p>No developer or support person can read local project content. A person sees it only if the reviewer deliberately includes it in a support email or attachment. The use of information received from Chrome APIs complies with the Chrome Web Store User Data Policy, including the Limited Use requirements.</p>
        </section>

        <section>
          <h2>Browser storage and backups</h2>
          <p>Local storage is not a guaranteed backup. Browser cleanup, profile loss, device damage, or an extension removal can remove local data. Evidence Studio provides an explicit project backup so reviewers can store a recoverable copy somewhere they trust.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Questions about this privacy notice can be sent through the <a href={contactHref}>Evidence Studio contact email</a>.</p>
        </section>
      </div>
    </article>
  );
}

function TermsPage() {
  return (
    <article className="legal-page shell" aria-labelledby="legal-title">
      <header className="legal-title-block">
        <p>Founding licence terms</p>
        <h1 id="legal-title">Plain terms for a professional local-first tool.</h1>
        <span>Last updated 11 August 2026</span>
      </header>

      <div className="legal-content">
        <section>
          <h2>The product</h2>
          <p>Evidence Studio is a Chrome extension for organizing accessibility audit evidence, findings, retests, and reports. The website demo uses sample data. The extension is installed from its public Chrome Web Store listing; Gumroad delivers the founding licence key.</p>
          <p>The Chrome Web Store listing and Gumroad checkout are separate: installing the extension does not charge the user, and buying a founding licence does not grant Google account access.</p>
        </section>

        <section>
          <h2>Founding licence</h2>
          <p>The founding price is €99 one-time for one specialist user. It includes perpetual access to version 1, unlimited local projects and reports, and 12 months of product updates from the purchase date.</p>
          <p>The founding offer is limited to 25 licences. Gumroad shows the final amount, applicable tax, product files, licence scope, and seller details before payment is completed.</p>
        </section>

        <section>
          <h2>Updates</h2>
          <p>A version 1 licence keeps working after the included update period. Future major versions or optional update plans may be priced separately. Existing buyers will see the terms before choosing any paid update.</p>
        </section>

        <section>
          <h2>Delivery and refunds</h2>
          <p>The founding licence includes a 30-day money-back guarantee from the purchase date. Buyers can request a refund through the contact address below or Gumroad’s purchase support. This does not limit any statutory consumer rights that apply.</p>
          <p>Buyers should review the product description, browser requirements, local-storage limits, and licence scope before purchase. Any additional refund terms shown at checkout also apply.</p>
        </section>

        <section>
          <h2>Professional responsibility</h2>
          <p>Evidence Studio organizes testing evidence and reports. It does not certify legal compliance, replace professional judgment, or provide legal advice. Reviewers remain responsible for their testing decisions and client deliverables.</p>
        </section>

        <section>
          <h2>Agency workflow pilot</h2>
          <p>The agency workflow pilot shown on the product site is a separate professional service, not part of the self-serve founding licence except for the single licence explicitly included in a completed pilot. Each engagement starts only after the anonymized input, deliverable, timing, price and payment method are agreed in writing.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Questions about the licence can be sent through the <a href={contactHref}>Evidence Studio contact email</a>.</p>
        </section>
      </div>
    </article>
  );
}

function LegalApp({ page }: { page: LegalPage }) {
  return (
    <>
      <a className="skip-link" href="#legal-main">Skip to legal content</a>
      <LegalHeader />
      <main id="legal-main" tabIndex={-1}>{page === "privacy" ? <PrivacyPage /> : <TermsPage />}</main>
      <LegalFooter />
    </>
  );
}

const page = document.body.dataset.legal === "terms" ? "terms" : "privacy";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LegalApp page={page} />
  </StrictMode>,
);
