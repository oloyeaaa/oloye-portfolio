import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import SignupForm from "@/components/SignupForm";
import Reveal from "@/components/home/Reveal";
import OneLiner from "@/components/home/OneLiner";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL, BOOKING_URL, CHECKLIST_URL } from "@/lib/site";

// The soft call to action on the home page. Given first, on the page, with no
// email wall. The email box underneath is an offer, never a gate.

const TITLE = "10 jobs to automate first";
const DESCRIPTION =
  "The small, repeat jobs most businesses can hand over first, and what each one gives you back.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${CHECKLIST_URL}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${CHECKLIST_URL}`, type: "article" },
};

const JOBS = [
  { job: "Save every new enquiry to one list", why: "Nobody slips through the cracks." },
  { job: "Reply to new enquiries straight away", why: "People hear back while they still care." },
  { job: "Let people book a call themselves", why: "No more back-and-forth emails." },
  { job: "Send a reminder before each call", why: "Fewer no-shows." },
  { job: "Welcome new customers the same way every time", why: "The forms, links and first email go out on their own." },
  { job: "Make a folder for every new customer", why: "Everything in one place from day one." },
  { job: "Send invoices when the work is done", why: "You get paid sooner." },
  { job: "Chase late payments politely", why: "The awkward email isn't yours to write." },
  { job: "Ask happy customers for a review", why: "More reviews, without remembering to ask." },
  { job: "Get a weekly summary of your numbers", why: "See how the week went in one look." },
];

export default function ChecklistPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: CHECKLIST_URL,
          title: TITLE,
          description: DESCRIPTION,
          type: "WebPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: TITLE, path: CHECKLIST_URL },
          ],
        })}
      />

      <div className="bg-surface px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Free checklist</p>
          <h1 className="display mt-6 text-5xl text-foreground sm:text-7xl">
            10 jobs to automate <span className="lime-mark">first.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Tick the ones that eat your week. Start with one.
          </p>

          <ol className="mt-16 divide-y divide-border border-y border-border">
            {JOBS.map((j, i) => (
              <Reveal key={j.job} delay={i * 60}>
                <li className="flex gap-6 py-7">
                  <span className="display w-10 shrink-0 text-3xl text-accent-dark">{i + 1}</span>
                  <div>
                    <p className="text-xl font-semibold text-foreground">{j.job}</p>
                    <p className="mt-1 text-muted">{j.why}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

        </div>
      </div>

      <OneLiner className="bg-surface" />

      <div className="bg-surface px-4 pb-32 pt-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-foreground p-8 text-center sm:p-12">
            <p className="display text-3xl !text-white sm:text-4xl">Ticked three or more?</p>
            <p className="mt-3 text-white/60">Those are the ones we&apos;d build first.</p>
            <a
              href={BOOKING_URL}
              className="mt-8 inline-flex rounded-lg bg-accent px-7 py-4 text-sm font-bold text-foreground transition hover:bg-accent-light"
            >
              Book a free call
            </a>
          </div>

          <div className="mt-10">
            <SignupForm
              notionUrl=""
              heading="Want simple automation ideas by email?"
              body="One short, useful email now and then. No spam."
              button="Keep me posted"
              doneText="You're on the list. The next one lands in your inbox."
            />
          </div>
        </div>
      </div>
    </>
  );
}
