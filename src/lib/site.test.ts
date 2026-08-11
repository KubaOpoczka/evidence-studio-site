import { describe, expect, it } from "vitest";
import { agencyPilotHref, safeCheckoutUrl, safeReviewEmail } from "./site";

describe("site configuration safety", () => {
  it("allows only HTTPS Gumroad product checkout links", () => {
    expect(safeCheckoutUrl("https://evidence-studio.gumroad.com/l/evidence-studio"))
      .toBe("https://evidence-studio.gumroad.com/l/evidence-studio");
    expect(safeCheckoutUrl("javascript:alert(1)")).toBeNull();
    expect(safeCheckoutUrl("https://gumroad.com.evil.test/l/evidence-studio")).toBeNull();
    expect(safeCheckoutUrl("https://example.test/checkout/buy/example")).toBeNull();
  });

  it("falls back when the configured contact address is malformed", () => {
    expect(safeReviewEmail("support@example.test")).toBe("support@example.test");
    expect(safeReviewEmail("not-an-email")).toBe("kuba.opoczka@gmail.com");
    expect(safeReviewEmail("support@example.test?bcc=attacker@example.test")).toBe("kuba.opoczka@gmail.com");
  });

  it("routes the agency offer through the local-first pilot brief", () => {
    expect(agencyPilotHref).toBe("/pilot");
  });
});
