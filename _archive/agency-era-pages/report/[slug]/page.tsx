import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFrontDeskReport, type FrontDeskMessage } from "@/lib/frontdesk";

export const revalidate = 60;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

// Private client deliverable: shareable by link, never indexed.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const report = await getFrontDeskReport(slug);
  const title = report
    ? `Front Desk report — ${report.test.business}`
    : "Front Desk report";
  return {
    title,
    robots: { index: false, follow: false },
  };
}

const ACTION_LABEL: Record<string, string> = {
  "track-order": "Track order",
  refund: "Refund",
  "return-label": "Send return label",
  "answer-question": "Answer question",
  escalate: "Escalate to you",
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function MessageCard({ m }: { m: FrontDeskMessage }) {
  const held = m.thresholdDecision === "Hold" || m.escalated;
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted font-display">
          Message {m.order}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-background bg-accent px-2.5 py-1 rounded-full font-display">
            {ACTION_LABEL[m.proposedAction] || m.proposedAction}
          </span>
          {held ? (
            <span className="text-xs font-semibold text-alert border border-alert/50 px-2.5 py-1 rounded-full font-display">
              {m.escalated ? "Escalated" : "Held for you"}
            </span>
          ) : (
            <span className="text-xs font-semibold text-accent border border-accent/40 px-2.5 py-1 rounded-full font-display">
              Auto
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Their side */}
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3 font-display">
            The customer
          </p>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            {m.inbound}
          </p>
          <div className="mt-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1 font-display">
              You replied
            </p>
            {m.theirReply ? (
              <p className="text-sm text-primary-dim leading-relaxed">
                {m.theirReply}
              </p>
            ) : (
              <p className="text-sm text-alert leading-relaxed italic">
                No reply sent.
              </p>
            )}
            {m.theirResponseTime && (
              <p className="text-xs text-muted mt-2">
                Response time: {m.theirResponseTime}
              </p>
            )}
          </div>
        </div>

        {/* Front Desk side */}
        <div className="p-5 bg-surface-alt">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent font-display">
              The Front Desk
            </p>
            <span className="text-xs text-muted">under 60s in production</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {m.draftReply}
          </p>
          {m.escalated && m.escalateReason && (
            <p className="text-xs text-alert mt-4 border-t border-border pt-3">
              Held for you: {m.escalateReason}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ReportPage({ params }: Props) {
  const { slug } = await params;
  const report = await getFrontDeskReport(slug);
  if (!report) notFound();

  const { test, messages } = report;

  return (
    <>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            Front Desk test report
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display leading-[1.1]">
            {test.business}: {test.handledEndToEnd} of {test.messageCount}{" "}
            handled end to end.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed max-w-3xl">
            We ran the Front Desk over {test.messageCount} of your real customer
            messages. Here is what it would have replied in your voice, what
            action it would have taken, and where it would have flagged you for a
            decision. Nothing was sent. This is a look under the bonnet.
          </p>
          {test.runDate && (
            <p className="text-sm text-muted mt-4">
              Run {formatDate(test.runDate)}
            </p>
          )}
        </div>
      </section>

      {/* Summary stats */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-3xl font-bold text-accent mb-1 font-display tabular-nums">
                {test.handledEndToEnd}
              </p>
              <p className="text-sm text-primary-dim">
                handled end to end, no involvement from you
              </p>
            </div>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-3xl font-bold text-foreground mb-1 font-display tabular-nums">
                {test.flagged}
              </p>
              <p className="text-sm text-primary-dim">
                flagged and held for your decision
              </p>
            </div>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-3xl font-bold text-foreground mb-1 font-display">
                &lt; 60s
              </p>
              <p className="text-sm text-primary-dim">
                the reply time on every one, any hour
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-2xl font-bold text-foreground mb-8 font-display">
            Message by message
          </h2>
          <div className="flex flex-col gap-5">
            {messages.map((m) => (
              <MessageCard key={m.id} m={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Honest caveat */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="bg-surface border border-border rounded-lg p-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3 font-display">
              How to read this
            </p>
            <ul className="text-sm text-primary-dim leading-relaxed space-y-2 list-disc pl-5">
              <li>
                The drafts are written from a voice profile of your brand. Wired
                to your live store, the Front Desk fills the{" "}
                <span className="text-foreground">[would look up: ...]</span>{" "}
                gaps with real order and tracking data.
              </li>
              <li>
                Anything over your thresholds (a refund above your line, an
                angry customer, a health or safety issue) is held for your yes,
                never sent automatically.
              </li>
              <li>
                Under 60 seconds is the live response time in production. These
                drafts are what would have gone out.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="border border-accent/40 rounded-xl p-10 bg-surface text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-display">
              Want this running on your inbox?
            </h2>
            <p className="text-primary-dim mb-6 max-w-xl mx-auto">
              15 minutes to walk through the report and scope the setup. No
              lock-in, no pitch you did not ask for.
            </p>
            <Link
              href="/test-drive"
              className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Book the walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
