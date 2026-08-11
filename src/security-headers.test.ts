import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const headers = readFileSync("public/_headers", "utf8");
const homeHtml = readFileSync("index.html", "utf8");
const pilotHtml = readFileSync("pilot.html", "utf8");
const globalRule = headers.split("\n\n")[0];
const contentSecurityPolicy = globalRule.split("\n").find(line => line.includes("Content-Security-Policy:")) || "";
const structuredData = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "";
const structuredDataHash = `sha256-${createHash("sha256").update(structuredData).digest("base64")}`;

describe("Cloudflare response headers", () => {
  it("denies framing, dynamic code, unsafe form targets and unnecessary browser capabilities", () => {
    expect(globalRule).toContain("default-src 'none'");
    expect(structuredData).not.toBe("");
    expect(globalRule).toContain(`script-src 'self' '${structuredDataHash}'`);
    expect(homeHtml).toContain(`script-src 'self' '${structuredDataHash}'`);
    expect(globalRule).toContain("script-src-attr 'none'");
    expect(globalRule).toContain("form-action 'none'");
    expect(globalRule).toContain("frame-ancestors 'none'");
    expect(globalRule).toContain("X-Frame-Options: DENY");
    expect(globalRule).toContain("Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=(), usb=()");
    expect(contentSecurityPolicy).not.toContain("'unsafe-inline'");
    expect(contentSecurityPolicy).not.toContain("*");
  });

  it("sets transport, MIME, referrer and cross-origin protections", () => {
    expect(globalRule).toContain("Strict-Transport-Security: max-age=31536000; includeSubDomains");
    expect(globalRule).toContain("X-Content-Type-Options: nosniff");
    expect(globalRule).toContain("Referrer-Policy: no-referrer");
    expect(globalRule).toContain("Cross-Origin-Opener-Policy: same-origin");
    expect(globalRule).toContain("Cross-Origin-Resource-Policy: same-origin");
  });

  it("keeps the pilot brief local until the buyer explicitly opens email", () => {
    expect(pilotHtml).toContain("form-action 'none'");
    expect(pilotHtml).toContain('name="referrer" content="no-referrer"');
    expect(pilotHtml).not.toContain("<form");
  });
});
