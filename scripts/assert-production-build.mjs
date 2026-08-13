import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const outputDirectory = resolve(process.env.BUILD_OUTPUT_DIR || "dist");
const assetsDirectory = resolve(outputDirectory, "assets");
const pilotPath = resolve(outputDirectory, "pilot.html");
const fieldNotePath = resolve(outputDirectory, "field-notes/retestable-accessibility-findings.html");

if (!existsSync(assetsDirectory) || !existsSync(pilotPath) || !existsSync(fieldNotePath)) {
  throw new Error("Production build assertion failed: dist assets, pilot.html, or the field note are missing.");
}

const javascript = readdirSync(assetsDirectory)
  .filter((file) => file.endsWith(".js"))
  .map((file) => readFileSync(resolve(assetsDirectory, file), "utf8"))
  .join("\n");
const pilotHtml = readFileSync(pilotPath, "utf8");
const fieldNoteHtml = readFileSync(fieldNotePath, "utf8");

const requiredSignals = [
  ["verified Gumroad checkout", "https://opoczka.gumroad.com/l/evidence-studio", javascript],
  ["paid hero CTA", "Get licence — €99", javascript],
  ["local pilot route", "/pilot", javascript],
  ["pilot entry bundle", "assets/pilot-", pilotHtml],
  ["retestable findings field note", "Seven fields that make an accessibility finding retestable", fieldNoteHtml],
  ["field note author disclosure", "The checklist stands on its own and requires no product.", fieldNoteHtml],
];

const missingSignals = requiredSignals
  .filter(([, expected, source]) => !source.includes(expected))
  .map(([label]) => label);

if (missingSignals.length > 0) {
  throw new Error(`Production build assertion failed: missing ${missingSignals.join(", ")}.`);
}

console.log("Production build assertion passed: paid checkout, paid CTA, pilot entry, and vendor-neutral field note are present.");
