// The system behind each case study, step by step, for its animated card
// (3 Nov 2026). Every step and tool comes from the study's own markdown
// ("What was built" and the tools line). Never add a step that isn't there.

export type FlowStep = {
  /** A real logo in /images/tools/, or a plain line icon when there's no logo file. */
  logo?: "airtable" | "make" | "claude";
  icon?: "form" | "mail" | "doc" | "person" | "check";
  label: string;
  sub?: string;
};

export const CASE_STUDY_FLOWS: Record<string, FlowStep[]> = {
  "website-forms-to-lead-list": [
    { icon: "form", label: "Website form", sub: "someone asks" },
    { logo: "make", label: "Make", sub: "picks it up" },
    { logo: "airtable", label: "Airtable", sub: "one list" },
    { icon: "mail", label: "Gmail", sub: "the right email" },
  ],
  "morning-lead-brief": [
    { logo: "airtable", label: "Airtable", sub: "who's waiting" },
    { logo: "claude", label: "Claude", sub: "drafts replies" },
    { icon: "doc", label: "Google Doc", sub: "the brief" },
    { icon: "person", label: "You", sub: "send it" },
  ],
  "daily-task-emails": [
    { logo: "airtable", label: "Airtable", sub: "one task list" },
    { logo: "make", label: "Make", sub: "6pm and 6am" },
    { icon: "mail", label: "Gmail", sub: "one clean list" },
  ],
  "ai-team": [
    { icon: "person", label: "You", sub: "ask" },
    { logo: "claude", label: "Chief of Staff", sub: "plans it" },
    { logo: "claude", label: "Agent", sub: "does the task" },
    { icon: "check", label: "Final check", sub: "then you see it" },
  ],
};

export function getFlow(slug: string): FlowStep[] | undefined {
  return CASE_STUDY_FLOWS[slug];
}

/** Alt text that names the steps, e.g. "Website form, then Make, then Airtable, then Gmail". */
export function flowAlt(steps: FlowStep[]): string {
  return steps.map((s) => s.label).join(", then ");
}
