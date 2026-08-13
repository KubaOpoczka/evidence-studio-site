import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const pagePath = "public/field-notes/retestable-accessibility-findings.html";
const pageHtml = readFileSync(pagePath, "utf8");
const page = new DOMParser().parseFromString(pageHtml, "text/html");
const sitemap = readFileSync("public/sitemap.xml", "utf8");

describe("retestable accessibility findings field note", () => {
  it("publishes a crawlable, self-contained seven-field record", () => {
    expect(page.documentElement.lang).toBe("en");
    expect(page.title).toBe("Seven fields that make an accessibility finding retestable");
    expect(page.querySelectorAll("h1")).toHaveLength(1);
    expect(page.querySelectorAll(".field-list > li")).toHaveLength(7);
    expect(page.querySelector('a[href="#main-content"]')?.textContent).toContain("Skip");
    expect(page.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://evidence-studio-site.pages.dev/field-notes/retestable-accessibility-findings",
    );
    expect(sitemap).toContain(
      "https://evidence-studio-site.pages.dev/field-notes/retestable-accessibility-findings",
    );
  });

  it("keeps the method sourced, disclosed and free of paid calls to action", () => {
    const text = page.body.textContent || "";
    const links = [...page.querySelectorAll("a")].map(link => link.getAttribute("href") || "");

    expect(text).toContain("This is a practical record format, not a WCAG requirement.");
    expect(text).toContain("This field note was written by Kuba Opoczka.");
    expect(links).toContain("https://www.w3.org/TR/wcag-em-2/");
    expect(links).toContain("https://www.w3.org/TR/WCAG22/");
    expect(links.some(link => /gumroad|chromewebstore|#agency|\/pilot/i.test(link))).toBe(false);
    expect(text).not.toMatch(/€|buy now|get (?:a |the )?licen[cs]e|send the pilot brief/i);
  });
});
