import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PilotBriefForm } from "./PilotBriefForm";

describe("PilotBriefForm", () => {
  it("shows an actionable error summary when required answers are missing", async () => {
    const user = userEvent.setup();
    render(<PilotBriefForm />);

    await user.click(screen.getByRole("button", { name: "Prepare pilot email" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Finish these questions");
    expect(screen.getByRole("alert")).toHaveTextContent("Choose the closest team size");
    expect(screen.getByRole("alert")).toHaveTextContent("Describe where evidence or reporting breaks apart");
  });

  it("prepares a bounded enquiry only after all four answers are complete", async () => {
    const user = userEvent.setup();
    render(<PilotBriefForm />);

    await user.click(screen.getByRole("radio", { name: "2–5 people" }));
    await user.type(screen.getByRole("textbox", { name: "Current workflow" }), "Spreadsheet, screenshots, then a document export.");
    await user.type(screen.getByRole("textbox", { name: "Evidence or reporting handoff" }), "Repeated components and retest notes lose their connection.");
    await user.click(screen.getByRole("radio", { name: "We can prepare an anonymized audit" }));
    await user.click(screen.getByRole("button", { name: "Prepare pilot email" }));

    expect(screen.getByRole("heading", { name: "Your scope notes are ready." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open email app" })).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
    expect(screen.getByText(/does not start work or take payment/i)).toBeInTheDocument();
  });
});
