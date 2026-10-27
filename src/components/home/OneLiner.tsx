import Reveal from "./Reveal";

// The one-liner (problem + solution = result). It shows up on several pages
// so visitors hear the same thing wherever they land. Change it here only.
export const ONE_LINER = {
  problem: "Most small businesses lose hours every week to the same small jobs.",
  solution: "We build simple automations that do those jobs for you,",
  result: "so you save time, save money and get back to the real work.",
};

export default function OneLiner({ className = "" }: { className?: string }) {
  return (
    <section className={`px-4 sm:px-6 ${className}`}>
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-8 sm:p-14">
          <span className="absolute inset-y-0 left-0 w-2 bg-accent" aria-hidden="true" />
          <p className="eyebrow">In one line</p>
          <p className="display mt-6 text-2xl leading-snug text-foreground sm:text-4xl sm:leading-tight">
            {ONE_LINER.problem} {ONE_LINER.solution}{" "}
            <span className="lime-mark">{ONE_LINER.result}</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
