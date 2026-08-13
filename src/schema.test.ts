import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeHtml = readFileSync("index.html", "utf8");
const structuredDataSource = homeHtml.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
)?.[1];

describe("homepage structured data", () => {
  it("describes the real free and paid Evidence Studio paths", () => {
    expect(structuredDataSource).toBeTruthy();
    const structuredData = JSON.parse(structuredDataSource || "{}");

    expect(structuredData["@type"]).toBe("SoftwareApplication");
    expect(structuredData.downloadUrl).toContain("chromewebstore.google.com");
    expect(structuredData.author).toEqual(
      expect.objectContaining({ "@type": "Person", name: "Kuba Opoczka" }),
    );
    expect(structuredData.offers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Free — one local project", price: "0", priceCurrency: "EUR" }),
        expect.objectContaining({ name: "Founding auditor licence", price: "99", priceCurrency: "EUR" }),
      ]),
    );
  });

  it("does not manufacture ratings or reviews", () => {
    const structuredData = JSON.parse(structuredDataSource || "{}");
    expect(structuredData).not.toHaveProperty("aggregateRating");
    expect(structuredData).not.toHaveProperty("review");
  });
});
