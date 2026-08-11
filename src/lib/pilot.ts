import { reviewEmail } from "./site";

export type PilotOption = {
  value: string;
  label: string;
};

export type PilotAnswers = {
  teamSize: string;
  currentWorkflow: string;
  breakPoint: string;
  projectReadiness: string;
};

export const teamSizeOptions: PilotOption[] = [
  { value: "one", label: "One specialist" },
  { value: "two-five", label: "2–5 people" },
  { value: "six-twenty", label: "6–20 people" },
  { value: "twenty-plus", label: "More than 20 people" },
];

export const projectReadinessOptions: PilotOption[] = [
  { value: "ready", label: "Yes, we have a suitable anonymized audit" },
  { value: "can-anonymize", label: "We can prepare an anonymized audit" },
  { value: "need-to-check", label: "We need to check before sharing anything" },
];

export const emptyPilotAnswers = (): PilotAnswers => ({
  teamSize: "",
  currentWorkflow: "",
  breakPoint: "",
  projectReadiness: "",
});

const labelFor = (options: PilotOption[], value: string) =>
  options.find((option) => option.value === value)?.label || "Not answered";

export function buildPilotBody(answers: PilotAnswers) {
  return [
    "Hi Kuba,",
    "",
    "We would like to review the fixed-scope Evidence Studio workflow pilot.",
    "",
    `Team size: ${labelFor(teamSizeOptions, answers.teamSize)}`,
    "",
    "Our current audit-to-report workflow:",
    answers.currentWorkflow.trim(),
    "",
    "Where evidence currently breaks apart:",
    answers.breakPoint.trim(),
    "",
    `Anonymized project readiness: ${labelFor(projectReadinessOptions, answers.projectReadiness)}`,
    "",
    "I understand this is an enquiry. Scope, inputs, timing, price, and payment must be agreed in writing before work starts.",
  ].join("\n");
}

export function buildPilotEmailHref(answers: PilotAnswers) {
  const subject = encodeURIComponent("Evidence Studio agency workflow pilot");
  const body = encodeURIComponent(buildPilotBody(answers));
  return `mailto:${reviewEmail}?subject=${subject}&body=${body}`;
}
