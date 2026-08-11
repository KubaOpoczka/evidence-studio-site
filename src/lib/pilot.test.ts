import { describe, expect, it } from "vitest";
import { buildPilotBody, buildPilotEmailHref, type PilotAnswers } from "./pilot";

const completeAnswers: PilotAnswers = {
  teamSize: "two-five",
  currentWorkflow: "Spreadsheet, screenshots, then a document export.",
  breakPoint: "Repeated components and retest notes lose their connection.",
  projectReadiness: "can-anonymize",
};

describe("pilot brief", () => {
  it("creates an evidence-safe enquiry without implying payment or agreement", () => {
    const body = buildPilotBody(completeAnswers);

    expect(body).toContain("2–5 people");
    expect(body).toContain("We can prepare an anonymized audit");
    expect(body).toContain("this is an enquiry");
    expect(body).toContain("must be agreed in writing before work starts");
  });

  it("encodes the prepared brief for the configured review address", () => {
    const href = buildPilotEmailHref(completeAnswers);

    expect(href).toMatch(/^mailto:kuba\.opoczka@gmail\.com\?/);
    expect(decodeURIComponent(href)).toContain("Evidence Studio agency workflow pilot");
  });
});
