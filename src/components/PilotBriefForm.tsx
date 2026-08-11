import { FormEvent, useMemo, useRef, useState } from "react";
import {
  buildPilotBody,
  buildPilotEmailHref,
  emptyPilotAnswers,
  type PilotAnswers,
  type PilotOption,
  projectReadinessOptions,
  teamSizeOptions,
} from "../lib/pilot";

type RequiredField = keyof PilotAnswers;
type PilotErrors = Partial<Record<RequiredField, string>>;

const questionLinks: Record<RequiredField, { href: string; label: string }> = {
  teamSize: { href: "#pilot-team", label: "Team size" },
  currentWorkflow: { href: "#pilot-workflow", label: "Current workflow" },
  breakPoint: { href: "#pilot-breakpoint", label: "Evidence handoff" },
  projectReadiness: { href: "#pilot-project", label: "Anonymized project" },
};

function validatePilot(answers: PilotAnswers): PilotErrors {
  const errors: PilotErrors = {};
  if (!answers.teamSize) errors.teamSize = "Choose the closest team size.";
  if (!answers.currentWorkflow.trim()) errors.currentWorkflow = "Describe the workflow you use now.";
  if (!answers.breakPoint.trim()) errors.breakPoint = "Describe where evidence or reporting breaks apart.";
  if (!answers.projectReadiness) errors.projectReadiness = "Choose the current anonymized-project status.";
  return errors;
}

function OptionGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: PilotOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="review-options">
      {options.map((option) => (
        <label key={option.value} data-selected={value === option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            required
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

function PilotPreview({ answers, answeredCount }: { answers: PilotAnswers; answeredCount: number }) {
  const optionLabel = (options: PilotOption[], value: string) =>
    options.find((option) => option.value === value)?.label || "Not answered yet";

  return (
    <aside className="review-preview" aria-label="Live pilot brief summary">
      <div className="review-preview-heading">
        <span>Pilot brief</span>
        <strong>{answeredCount} of 4 answered</strong>
      </div>
      <div className="review-preview-body" aria-live="polite">
        <div data-complete={Boolean(answers.teamSize)}>
          <span>Team size</span>
          <strong>{optionLabel(teamSizeOptions, answers.teamSize)}</strong>
        </div>
        <div data-complete={Boolean(answers.currentWorkflow.trim())}>
          <span>Current workflow</span>
          <strong>{answers.currentWorkflow.trim() || "Not answered yet"}</strong>
        </div>
        <div data-complete={Boolean(answers.breakPoint.trim())}>
          <span>Evidence handoff</span>
          <strong>{answers.breakPoint.trim() || "Not answered yet"}</strong>
        </div>
        <div data-complete={Boolean(answers.projectReadiness)}>
          <span>Anonymized project</span>
          <strong>{optionLabel(projectReadinessOptions, answers.projectReadiness)}</strong>
        </div>
      </div>
      <p>Nothing is stored or sent from this page.</p>
    </aside>
  );
}

export function PilotBriefForm() {
  const [answers, setAnswers] = useState<PilotAnswers>(emptyPilotAnswers);
  const [errors, setErrors] = useState<PilotErrors>({});
  const [prepared, setPrepared] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLDivElement>(null);

  const answeredCount = useMemo(
    () => [
      answers.teamSize,
      answers.currentWorkflow.trim(),
      answers.breakPoint.trim(),
      answers.projectReadiness,
    ].filter(Boolean).length,
    [answers],
  );

  const emailHref = useMemo(() => buildPilotEmailHref(answers), [answers]);

  const updateAnswer = (field: RequiredField, value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const preparePilot = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validatePilot(answers);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    setErrors({});
    setPrepared(true);
    setCopyStatus("");
    requestAnimationFrame(() => readyRef.current?.focus());
  };

  const copyPilot = async () => {
    try {
      await navigator.clipboard.writeText(buildPilotBody(answers));
      setCopyStatus("Pilot brief copied. Paste it into any message.");
    } catch {
      setCopyStatus("Copy failed. Open the email app instead.");
    }
  };

  const errorEntries = (Object.entries(errors) as [RequiredField, string | undefined][])
    .filter((entry): entry is [RequiredField, string] => Boolean(entry[1]));

  return (
    <div className="review-workspace">
      <div className="review-form-panel">
        {prepared ? (
          <section className="review-ready" aria-labelledby="pilot-ready-title" tabIndex={-1} ref={readyRef}>
            <p className="section-label">Pilot brief prepared</p>
            <h2 id="pilot-ready-title">Your scope notes are ready.</h2>
            <p>Nothing has been sent. Open your email app, copy the brief, or return to your answers. This does not start work or take payment.</p>
            <div className="review-ready-actions">
              <a className="button button-primary" href={emailHref}>Open email app</a>
              <button className="button button-secondary" type="button" onClick={copyPilot}>Copy pilot brief</button>
              <button className="text-button" type="button" onClick={() => setPrepared(false)}>Edit answers</button>
            </div>
            <p className="review-copy-status" role="status" aria-live="polite">{copyStatus}</p>
          </section>
        ) : (
          <form noValidate onSubmit={preparePilot} aria-labelledby="pilot-form-title">
            <header className="review-form-header">
              <p className="section-label">€750 fixed-scope pilot</p>
              <h2 id="pilot-form-title">Prepare the useful part before email.</h2>
              <p>Four answers create a concise enquiry. The page stores nothing and sends nothing until you choose your email app.</p>
            </header>

            {errorEntries.length > 0 ? (
              <div className="review-error-summary" role="alert" tabIndex={-1} ref={errorSummaryRef}>
                <strong>Finish these questions</strong>
                <ul>
                  {errorEntries.map(([field, message]) => (
                    <li key={field}><a href={questionLinks[field].href}>{questionLinks[field].label}: {message}</a></li>
                  ))}
                </ul>
              </div>
            ) : null}

            <fieldset
              className="review-question"
              id="pilot-team"
              tabIndex={-1}
              aria-invalid={Boolean(errors.teamSize)}
              aria-describedby={`pilot-team-help${errors.teamSize ? " pilot-team-error" : ""}`}
            >
              <legend>How many people touch this workflow?</legend>
              <p className="review-helper" id="pilot-team-help">Choose the closest current team size.</p>
              <OptionGroup name="teamSize" options={teamSizeOptions} value={answers.teamSize} onChange={(value) => updateAnswer("teamSize", value)} />
              {errors.teamSize ? <p className="review-field-error" id="pilot-team-error">Error: {errors.teamSize}</p> : null}
            </fieldset>

            <fieldset
              className="review-question"
              id="pilot-workflow"
              tabIndex={-1}
              aria-invalid={Boolean(errors.currentWorkflow)}
              aria-describedby={`pilot-workflow-help${errors.currentWorkflow ? " pilot-workflow-error" : ""}`}
            >
              <legend>What audit-to-report workflow do you use now?</legend>
              <label className="review-text-field">
                <span>Current workflow</span>
                <textarea
                  value={answers.currentWorkflow}
                  onChange={(event) => updateAnswer("currentWorkflow", event.target.value)}
                  maxLength={600}
                  rows={5}
                  required
                  aria-invalid={Boolean(errors.currentWorkflow)}
                />
              </label>
              <div className="review-field-meta" id="pilot-workflow-help">
                <span>Name the tools and the handoffs, without client-identifying details.</span>
                <span>{answers.currentWorkflow.length}/600</span>
              </div>
              {errors.currentWorkflow ? <p className="review-field-error" id="pilot-workflow-error">Error: {errors.currentWorkflow}</p> : null}
            </fieldset>

            <fieldset
              className="review-question"
              id="pilot-breakpoint"
              tabIndex={-1}
              aria-invalid={Boolean(errors.breakPoint)}
              aria-describedby={`pilot-breakpoint-help${errors.breakPoint ? " pilot-breakpoint-error" : ""}`}
            >
              <legend>Where does evidence currently break apart?</legend>
              <label className="review-text-field">
                <span>Evidence or reporting handoff</span>
                <textarea
                  value={answers.breakPoint}
                  onChange={(event) => updateAnswer("breakPoint", event.target.value)}
                  maxLength={600}
                  rows={5}
                  required
                  aria-invalid={Boolean(errors.breakPoint)}
                />
              </label>
              <div className="review-field-meta" id="pilot-breakpoint-help">
                <span>Examples include repeated components, screenshots, retests, or developer exports.</span>
                <span>{answers.breakPoint.length}/600</span>
              </div>
              {errors.breakPoint ? <p className="review-field-error" id="pilot-breakpoint-error">Error: {errors.breakPoint}</p> : null}
            </fieldset>

            <fieldset
              className="review-question"
              id="pilot-project"
              tabIndex={-1}
              aria-invalid={Boolean(errors.projectReadiness)}
              aria-describedby={`pilot-project-help${errors.projectReadiness ? " pilot-project-error" : ""}`}
            >
              <legend>Could you use one anonymized past audit?</legend>
              <p className="review-helper" id="pilot-project-help">Do not enter or attach client data here. Suitability is confirmed by email before payment.</p>
              <OptionGroup name="projectReadiness" options={projectReadinessOptions} value={answers.projectReadiness} onChange={(value) => updateAnswer("projectReadiness", value)} />
              {errors.projectReadiness ? <p className="review-field-error" id="pilot-project-error">Error: {errors.projectReadiness}</p> : null}
            </fieldset>

            <div className="review-submit-row">
              <button className="button button-primary" type="submit">Prepare pilot email</button>
              <p>Preparing the brief does not send it, start work, or take payment.</p>
            </div>
          </form>
        )}
      </div>

      <PilotPreview answers={answers} answeredCount={answeredCount} />
    </div>
  );
}
