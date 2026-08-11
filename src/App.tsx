import { PremiumDemo } from "./components/PremiumDemo";
import { Reveal } from "./components/Reveal";
import { ThemeToggle } from "./components/ThemeToggle";
import { agencyPilotHref, checkoutHref, checkoutIsLive, chromeWebStoreHref, contactHref } from "./lib/site";

const workflowWords = ["Capture context", "Connect results", "Protect evidence", "Retest", "Report"];

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <nav className="site-nav shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Evidence Studio home">
            <img src="./assets/icon.png" alt="" width="34" height="34" />
            <span>Evidence Studio</span>
          </a>
          <div className="nav-links">
            <a href="#workflow">Workflow</a>
            <a href="#demo">Try premium</a>
            <a href="#offers">Plans</a>
            <a href="#agency">Agency pilot</a>
            <a href="#resources">Guides</a>
            <a href="#questions">Questions</a>
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="nav-cta" href={checkoutHref}>
              {checkoutIsLive ? "Get licence — €99" : "Join specialist review"}
            </a>
          </div>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero shell" id="top" aria-labelledby="hero-title">
          <div className="hero-title">
            <p className="hero-audience">For accessibility specialists and audit teams</p>
            <h1 id="hero-title">
              <span>Audit evidence.</span>
              <span>Ready for handoff.</span>
            </h1>
          </div>

          <div className="hero-copy">
            <p>Keep page state, screenshots, repeated occurrences, and retests together in one local Chrome workflow—then export client-ready reports.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={checkoutHref}>
                {checkoutIsLive ? "Get licence — €99" : "Join specialist review"}
              </a>
              <a className="button button-secondary" href="#agency">Agency pilot — €750</a>
              <a className="hero-free-link" href={chromeWebStoreHref}>Try one project free in Chrome →</a>
            </div>
          </div>

          <div className="hero-media">
            <figure className="campaign-frame">
              <picture className="campaign-picture">
                <source
                  srcSet="./assets/campaign-still-768.avif 768w, ./assets/campaign-still-1200.avif 1200w, ./assets/campaign-still.avif 1536w"
                  sizes="(max-width: 900px) calc(100vw - 32px), min(62vw, 1536px)"
                  type="image/avif"
                />
                <img
                  className="campaign-image"
                  src="./assets/campaign-still.jpg"
                  alt="Layered report sheets, black redaction material, and a signal-green marker on a dark archival table"
                  width="1536"
                  height="1024"
                  fetchPriority="high"
                />
              </picture>
              <div className="product-slice">
                <picture>
                  <source srcSet="./assets/sidepanel.webp" type="image/webp" />
                  <img
                    src="./assets/sidepanel.png"
                    alt="Evidence Studio Chrome side panel showing local-only page capture guidance"
                    width="720"
                    height="1250"
                  />
                </picture>
              </div>
            </figure>
          </div>
        </section>

        <section className="continuity" aria-label="Evidence workflow summary">
          <p className="visually-hidden">{workflowWords.join(". ")}.</p>
          <div className="continuity-track" aria-hidden="true">
            {[...workflowWords, ...workflowWords].map((word, index) => (
              <span key={`${word}-${index}`}>{word}</span>
            ))}
          </div>
        </section>

        <section className="manifesto shell" aria-labelledby="manifesto-title">
          <Reveal>
            <h2 id="manifesto-title">Scanner output is only the start.</h2>
            <p>
              Audits break apart across tabs, screenshots, spreadsheets, and retest notes. Evidence Studio keeps the decision and its proof together.
            </p>
          </Reveal>
        </section>

        <section className="demo-section shell-wide" id="demo" aria-labelledby="demo-title">
          <Reveal className="section-intro section-intro-demo">
            <p className="section-label">Interactive premium demo</p>
            <h2 id="demo-title">Build one finding into client-ready proof.</h2>
            <p>
              This is a working sample, not a video. Change the evidence chain and watch the report respond.
            </p>
          </Reveal>
          <PremiumDemo />
        </section>

        <section className="workflow-section" id="workflow" aria-labelledby="workflow-title">
          <div className="workflow-heading shell">
            <Reveal>
              <h2 id="workflow-title">One finding. Every piece of proof.</h2>
              <p>The source result, page state, protected screenshot, decision, and retest remain connected.</p>
            </Reveal>
          </div>

          <div className="proof-stack shell-wide">
            <article className="proof-panel proof-panel-context">
              <div className="proof-copy">
                <span>Capture context</span>
                <h3>Record the page as it was tested.</h3>
                <p>Viewport, zoom, language, contrast mode, and human context stay attached to the screenshot.</p>
              </div>
              <figure>
                <img
                  src="./assets/evidence-original.webp"
                  alt="Evidence Studio attaching browser conditions and the tested page state to a screenshot"
                  width="1164"
                  height="639"
                  loading="lazy"
                />
              </figure>
            </article>

            <article className="proof-panel proof-panel-connect">
              <div className="proof-copy">
                <span>Connect repeats</span>
                <h3>Describe one problem without losing its occurrences.</h3>
                <p>Group repeated scanner results around the issue a client needs to fix. Original source details remain available.</p>
              </div>
              <figure>
                <img
                  src="./assets/grouped-finding.webp"
                  alt="Evidence Studio grouping related scanner results under one human accessibility finding"
                  width="1440"
                  height="1000"
                  loading="lazy"
                />
              </figure>
            </article>

            <article className="proof-panel proof-panel-protect">
              <div className="proof-copy">
                <span>Protect evidence</span>
                <h3>Share the proof, not private client data.</h3>
                <p>Redact the report copy while preserving the untouched original inside the local project.</p>
              </div>
              <figure>
                <img
                  src="./assets/evidence-redacted.webp"
                  alt="Checkout evidence with email and payment details covered by opaque redaction blocks"
                  width="1180"
                  height="740"
                  loading="lazy"
                />
              </figure>
            </article>
          </div>
        </section>

        <section className="specialist-section shell" aria-labelledby="specialist-title">
          <Reveal>
            <p className="section-label">Built for qualified specialists</p>
            <h2 id="specialist-title">The judgment stays human.</h2>
            <div className="specialist-layout">
              <p className="specialist-lead">
                Evidence Studio organizes a manual audit. It does not replace the specialist who understands context, impact, and the right fix.
              </p>
              <div className="specialist-notes">
                <p><strong>It helps with</strong> multi-page evidence, repeated components, redaction, retest history, and accessible reports.</p>
                <p><strong>It does not claim</strong> legal certification, complete automated coverage, or a pass without human review.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="privacy-section shell-wide" id="privacy" aria-labelledby="privacy-title">
          <div className="privacy-type">
            <Reveal>
              <h2 id="privacy-title">Client evidence stays under your control.</h2>
            </Reveal>
          </div>
          <div className="privacy-details">
            <div>
              <strong>Local projects</strong>
              <p>Audit content stays inside Chrome on the reviewer’s device.</p>
            </div>
            <div>
              <strong>Explicit exports</strong>
              <p>A report or backup leaves the browser only when the reviewer chooses it.</p>
            </div>
            <div>
              <strong>Honest limits</strong>
              <p>Browser storage is not a guaranteed backup. The product makes export and recovery boundaries visible.</p>
            </div>
          </div>
        </section>

        <section className="offer-map-section shell" id="offers" aria-labelledby="offers-title">
          <Reveal className="section-intro offer-map-intro">
            <p className="section-label">Choose by workflow, not feature theatre</p>
            <h2 id="offers-title">Start free. Buy the licence. Or prove it on one audit.</h2>
            <p>Each path uses the same local-first workflow. The difference is project capacity, export access, and whether you want founder-assisted setup.</p>
          </Reveal>

          <div className="offer-map-grid">
            <article className="offer-card">
              <p className="offer-card-label">Explore</p>
              <h3>Free</h3>
              <strong>One local project</strong>
              <ul>
                <li>Manual and supported imported findings</li>
                <li>Page evidence, redaction, and retests</li>
                <li>Report preview plus backup and restore</li>
              </ul>
              <a className="button button-secondary" href={chromeWebStoreHref}>Try one project free</a>
            </article>

            <article className="offer-card offer-card-featured">
              <p className="offer-card-label">For one specialist</p>
              <h3>Founding licence</h3>
              <strong>€99 once</strong>
              <ul>
                <li>Unlimited local projects and reports</li>
                <li>HTML, CSV, Markdown, and statement exports</li>
                <li>Perpetual version 1 access and 12 months of updates</li>
              </ul>
              <a className="button button-primary" href={checkoutHref}>
                {checkoutIsLive ? "Get founding licence" : "Join specialist review"}
              </a>
              <a className="offer-proof-link" href="/sample-accessibility-report">Open the sample report →</a>
            </article>

            <article className="offer-card">
              <p className="offer-card-label">For audit teams and agencies</p>
              <h3>Workflow pilot</h3>
              <strong>€750 fixed scope</strong>
              <ul>
                <li>Map one anonymized audit-to-report workflow</li>
                <li>Receive a sample project, export, and written notes</li>
                <li>One licence included; delivery within five working days</li>
              </ul>
              <a className="button button-secondary" href="#agency">Review the pilot scope</a>
              <a className="offer-proof-link" href="#demo">Try the interactive workflow →</a>
            </article>
          </div>

          <p className="offer-proof-note">Decide from the product itself: try the workflow, inspect the sample report, and review the local-data boundaries before paying.</p>
        </section>

        <section className="founding-section shell" id="founding" aria-labelledby="founding-title">
          <Reveal>
            <div className="founding-layout">
              <div className="founding-price">
                <p className="section-label">Founding auditor licence</p>
                <h2 id="founding-title">€99 <span>one-time</span></h2>
                <p>Perpetual access to version 1, plus 12 months of product updates.</p>
              </div>
              <div className="founding-terms">
                <h3>What the founding licence includes</h3>
                <ul>
                  <li>One specialist user</li>
                  <li>Unlimited local projects and reports</li>
                  <li>Accessible HTML report export</li>
                  <li>Local backup and restore</li>
                  <li>30-day money-back guarantee</li>
                </ul>
                <p className="validation-note">
                  The founding release is deliberately limited to 25 specialist licences, keeping support direct while the first professional workflows are proven.
                </p>
                <div className="founding-actions">
                  <a className="button button-primary founding-cta" href={checkoutHref}>
                    {checkoutIsLive ? "Get founding licence" : "Join specialist review"}
                  </a>
                  <a className="button button-secondary founding-cta" href={chromeWebStoreHref}>
                    Install extension
                  </a>
                </div>
                {!checkoutIsLive ? (
                  <p className="cta-note">Answer six questions. Nothing is sent until you choose to open an email.</p>
                ) : null}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="agency-section shell-wide" id="agency" aria-labelledby="agency-title">
          <Reveal>
            <div className="agency-layout">
              <div className="agency-heading">
                <p className="section-label">For audit teams and agencies</p>
                <h2 id="agency-title">Make one evidence workflow repeatable.</h2>
                <p>A fixed-scope, async pilot built around one anonymized audit—not a consulting retainer and no sales call required.</p>
              </div>
              <div className="agency-offer">
                <div className="agency-price"><strong>€750</strong><span>one workflow pilot</span></div>
                <ul>
                  <li>Map one existing audit-to-report workflow</li>
                  <li>Configure one sample Evidence Studio project</li>
                  <li>Deliver a sample export and written workflow notes</li>
                  <li>Include one founding specialist licence</li>
                  <li>Complete the agreed pilot within five working days</li>
                </ul>
                <p>The sample must be anonymized. Scope, inputs, timing and payment are confirmed by email before work starts.</p>
                <a className="button button-primary" href={agencyPilotHref}>Send the pilot brief</a>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="resources-section shell" id="resources" aria-labelledby="resources-title">
          <Reveal>
            <p className="section-label">Field guides</p>
            <h2 id="resources-title">Keep the finding and its proof together.</h2>
          </Reveal>
          <div className="resource-grid">
            <a className="resource-link" href="/accessibility-audit-evidence-checklist.html">
              <span>Checklist</span>
              <h3>Accessibility audit evidence checklist</h3>
              <p>The minimum context, screenshot, decision and retest evidence that makes a finding usable.</p>
              <strong>Read the checklist →</strong>
            </a>
            <a className="resource-link" href="/local-accessibility-audit-reporting.html">
              <span>Workflow guide</span>
              <h3>Local-first accessibility audit reporting</h3>
              <p>What local-first protects, what it does not, and how to build a recoverable client workflow.</p>
              <strong>Read the guide →</strong>
            </a>
          </div>
        </section>

        <section className="questions-section shell" id="questions" aria-labelledby="questions-title">
          <Reveal>
            <h2 id="questions-title">Exact questions, straight answers.</h2>
          </Reveal>
          <div className="question-list">
            <details>
              <summary>Is this another accessibility scanner?</summary>
              <p>No. It imports and organizes results, evidence, decisions, and retests. Existing testing tools still do the scanning.</p>
            </details>
            <details>
              <summary>Why not charge monthly?</summary>
              <p>A local-only tool does not justify a recurring bill. A subscription would make sense only after real ongoing services such as team review or hosted reports exist.</p>
            </details>
            <details>
              <summary>Does project content leave the browser?</summary>
              <p>Not during the designed audit workflow. The reviewer chooses when to export a report or backup. Licence activation will not include project content.</p>
            </details>
            <details>
              <summary>What happens after 12 months of updates?</summary>
              <p>The version 1 licence keeps working. An optional annual update plan may be offered later, with its price shown before anyone buys.</p>
            </details>
            <details>
              <summary>Will it certify a website as compliant?</summary>
              <p>No. It supports professional evidence and reporting. It does not provide legal advice or replace a qualified accessibility assessment.</p>
            </details>
            <details>
              <summary>Is the agency pilot part of the €99 licence?</summary>
              <p>No. The founding licence is the self-serve product. The €750 pilot is a separate fixed-scope professional service for one anonymized workflow, agreed by email before payment.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner shell">
          <a className="brand footer-brand" href="#top" aria-label="Evidence Studio home">
            <img src="./assets/icon.png" alt="" width="34" height="34" />
            <span>Evidence Studio</span>
          </a>
          <p>Accessibility evidence that holds together.</p>
          <div className="footer-links">
            <a href={contactHref}>Contact</a>
            <a href={agencyPilotHref}>Pilot brief</a>
            <a href="/support">Support</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="#resources">Field guides</a>
            <a href="/sample-accessibility-report">Static sample report</a>
          </div>
        </div>
      </footer>
    </>
  );
}
