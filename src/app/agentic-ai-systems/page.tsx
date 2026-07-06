import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  webPageSchema,
  faqPageSchema,
  howToSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { VERTICALS } from "@/lib/verticals";

export const metadata: Metadata = {
  title:
    "What Is an Agentic AI System? A Practical Guide for Small Business (2026)",
  description:
    "An agentic AI system reads, decides, and acts. Not a chatbot. Not RPA. This is the plain-English guide: what agentic AI is, how it differs from LLM agents, the four-part architecture, thresholds, and how to build one.",
  alternates: { canonical: `${SITE_URL}/agentic-ai-systems` },
  openGraph: {
    title:
      "What Is an Agentic AI System? A Practical Guide for Small Business",
    description:
      "The practical guide to agentic AI systems: what they are, how they differ from LLM agents and RPA, the architecture, and how to build one.",
    url: `${SITE_URL}/agentic-ai-systems`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is an agentic AI system in plain English?",
    answer:
      "An agentic AI system is a software worker that reads a situation, decides what to do, and takes an action. It differs from a chatbot in that it does not just reply. It differs from RPA in that it does not need a rigid script. It reads, decides, and acts, and it can be gated by human approval where the action is high-risk.",
  },
  {
    question: "How is agentic AI different from an LLM agent?",
    answer:
      "Every agentic AI system uses an LLM as its brain, but not every LLM agent is agentic. An LLM agent that only chats is a chatbot. It becomes agentic when it can also use tools (send an email, book a slot, refund a payment) and make decisions about which tool to use next based on context and rules.",
  },
  {
    question: "How is agentic AI different from RPA?",
    answer:
      "Robotic Process Automation follows a fixed script: if X, do Y. It breaks when the input format changes. Agentic AI reads intent, handles variation, and asks for help when it is unsure. RPA is right for high-volume, rigid workflows. Agentic AI is right for lower-volume, judgement-heavy workflows.",
  },
  {
    question: "Do agentic AI systems need human approval?",
    answer:
      "The good ones do, above set thresholds. A well-built agentic system lets the owner draw the line: refunds under 50 pounds go automatically, refunds above hold for a yes. Standard bookings auto-book. VIP or edge cases flag for review. Full autonomy day one fails; earned autonomy over time works.",
  },
  {
    question: "What is the smallest useful agentic AI system to build first?",
    answer:
      "Pick one workflow that happens daily, touches software the agent can already read, and has a clear finish line. Common first agents: reply-and-book (customer support), triage (route inbound), and coordinate (chase missing info). Do not try to build an all-knowing agent first.",
  },
];

const howToSteps = [
  {
    name: "Pick a workflow with a paycheck attached",
    text: "Choose a job in a specific niche where money is already being spent. It should happen at least daily, have a clear finish line, touch software the agent can read and write, and the buyer should feel the loss when it goes wrong.",
  },
  {
    name: "Shadow the human who does it now",
    text: "Watch 10 to 20 real jobs before writing a prompt. Ask what makes a case easy, what makes it weird, what gets checked before deciding, and where mistakes happen. The detail is the product.",
  },
  {
    name: "Write the agent spec",
    text: "Trigger, context, tools, rules, handoffs, evals. What wakes it up. What context it needs to read. Which tools it can call. What actions are allowed without approval. Where it must escalate. How you will know it is working.",
  },
  {
    name: "Run the workflow manually with AI first",
    text: "Before writing production code, run the workflow by hand with Claude or GPT in the loop. Copy in the context. Ask for the draft. Approve it. This tests whether AI actually helps before you build software around it.",
  },
  {
    name: "Build the Minimum Useful Agent (MUA)",
    text: "Choose one of four archetypes: draft-and-approve, triage, coordinator, or bounded-action. Start as a workflow (predictable path). Earn autonomy only when it creates value.",
  },
  {
    name: "Build the eval set",
    text: "Take 50 real historical examples of the job with graded correct answers. Run the agent against them. Score. That eval set is both your gym and your sales asset when talking to the next customer.",
  },
  {
    name: "Wrap it in a SaaS trust layer",
    text: "Logs, approvals, handoff rules, a test mode. The agent lives in the phone, inbox, or CRM. The dashboard is the control room. Customers pay for the trust layer as much as the agent itself.",
  },
];

const differences = [
  {
    system: "Chatbot",
    input: "Text prompt",
    action: "Reply with text",
    fits: "Simple Q&A",
  },
  {
    system: "RPA (Robotic Process Automation)",
    input: "Structured trigger",
    action: "Fixed script",
    fits: "High-volume rigid workflows",
  },
  {
    system: "LLM agent",
    input: "Prompt + tools",
    action: "Chooses tool or replies",
    fits: "Multi-step reasoning",
  },
  {
    system: "Agentic AI system",
    input: "Trigger + context + rules",
    action: "Reads, decides, acts, escalates",
    fits: "Judgement-heavy workflows with a paycheck",
  },
];

const examples = [
  {
    name: "Front-desk agents for home services",
    body: "Plumbers, HVAC contractors, roofers. Inbound call or form gets read, questions get answered, a slot gets booked, the tech gets dispatched. The agent handles the routine, the owner handles the surprise.",
  },
  {
    name: "Reservation and reception for restaurants",
    body: "Tools like SlangAI and RingCentral's AI receptionist read the phone, answer opening hours or menu questions, book the table, and route private dining. Same read-decide-act pattern.",
  },
  {
    name: "Support inbox agents for ecom",
    body: "Reads WISMO tickets, tracks the order through the shipping API, drafts the reply in the brand voice, refunds under threshold, files the return. Sits inside Gorgias or Zendesk or a plain inbox.",
  },
  {
    name: "Lead qualification for real estate",
    body: "Website form or DM triggers a series of qualifying questions, then books a viewing on the agent's calendar or hands off to the human if the buyer is above budget threshold.",
  },
  {
    name: "Our own Adzuna research pipeline",
    body: "Weekly agent scrapes 1,256 UK job ads, classifies against a taxonomy, drafts a report, updates a database. Same read-classify-act pattern that powers our Front Desk product.",
  },
];

export default function AgenticAiSystems() {
  const webPage = webPageSchema({
    path: "/agentic-ai-systems",
    title:
      "What Is an Agentic AI System? A Practical Guide for Small Business",
    description:
      "The plain-English guide to agentic AI systems: definition, architecture, thresholds, examples, and how to build one.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Agentic AI Systems", path: "/agentic-ai-systems" },
    ],
  });

  const howTo = howToSchema({
    name: "How to Build an Agentic AI System",
    description:
      "Seven-step process for building an agentic AI system that ships work, based on real production patterns.",
    steps: howToSteps,
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={howTo} />
      <JsonLd data={faqPageSchema(faqs)} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            The pillar
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-display leading-[1.1]">
            What Is an Agentic AI System? A Practical Guide for Small Business.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed mb-8 max-w-3xl">
            An agentic AI system reads a situation, decides what to do, and takes an action. It is not a chatbot. It is not RPA. It is a software worker with context, tools, and rules, gated by owner approval where the action is high-risk. This guide covers what agentic AI is, how it differs from LLM agents and RPA, the four-part architecture, thresholds, real examples, and how to build one that ships real work.
          </p>
          <nav className="bg-surface border border-border rounded-lg p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4 font-display">
              On this page
            </p>
            <ol className="text-sm text-primary-dim space-y-2 list-decimal list-inside">
              <li>
                <a href="#what-is" className="hover:text-accent">
                  What is an agentic AI system?
                </a>
              </li>
              <li>
                <a href="#differences" className="hover:text-accent">
                  Agentic AI vs LLM agents vs RPA
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-accent">
                  The four-part architecture
                </a>
              </li>
              <li>
                <a href="#thresholds" className="hover:text-accent">
                  Thresholds and human-in-the-loop
                </a>
              </li>
              <li>
                <a href="#examples" className="hover:text-accent">
                  Real examples in the wild
                </a>
              </li>
              <li>
                <a href="#how-to-build" className="hover:text-accent">
                  How to build one
                </a>
              </li>
              <li>
                <a href="#when-not" className="hover:text-accent">
                  When not to use agentic AI
                </a>
              </li>
              <li>
                <a href="#glossary" className="hover:text-accent">
                  Glossary
                </a>
              </li>
              <li>
                <a href="#for-your-industry" className="hover:text-accent">
                  The Front Desk for your industry
                </a>
              </li>
              <li>
                <a href="#further-reading" className="hover:text-accent">
                  Further reading
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent">
                  Common questions
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Body content */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* What is */}
        <section id="what-is" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            What is an agentic AI system?
          </h2>
          <div className="prose">
            <p>
              An agentic AI system is a software worker that reads a situation, decides what to do, and takes an action on your behalf. It differs from a chatbot in that it does not just reply, it acts. It differs from a simple automation in that it can handle judgement, not just rules.
            </p>
            <p>
              Every agentic AI system has three ingredients. It perceives (reads inbound signal, whether a message, a form submission, a phone call, a webhook). It decides (uses a large language model plus the operator&apos;s rules to choose what to do). It acts (calls a tool: book a slot, send a quote, refund a payment, escalate to the human).
            </p>
            <p>
              A useful mental model: an agentic AI system is a junior employee who never sleeps, never asks for a raise, follows the rules you set, and asks for approval when the situation is above the pay grade you drew. The best ones save owner time. The bad ones create more work than they save.
            </p>
            <p>
              The category exploded in 2025 as LLMs got reliable enough to call tools without going off-script. Big definitional coverage now lives on{" "}
              <a
                href="https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIT Sloan
              </a>
              ,{" "}
              <a
                href="https://www.ibm.com/think/topics/agentic-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                IBM
              </a>
              ,{" "}
              <a
                href="https://aws.amazon.com/what-is/agentic-ai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AWS
              </a>{" "}
              and{" "}
              <a
                href="https://cloud.google.com/discover/what-is-agentic-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Cloud
              </a>
              , which agree on the direction but not the exact scope. For our purposes, an agentic AI system is any system that reads, decides, and acts in a bounded workflow that a small business would otherwise pay a person to do.
            </p>
          </div>
        </section>

        {/* Differences */}
        <section id="differences" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Agentic AI vs LLM agents vs RPA
          </h2>
          <div className="prose">
            <p>
              These four terms get thrown around interchangeably. They are not the same thing. The distinction matters because picking the wrong tool for the job wastes months of build time.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-semibold text-foreground py-3 pr-4 font-display">
                    System
                  </th>
                  <th className="text-left font-semibold text-foreground py-3 pr-4 font-display">
                    Input
                  </th>
                  <th className="text-left font-semibold text-foreground py-3 pr-4 font-display">
                    Action
                  </th>
                  <th className="text-left font-semibold text-foreground py-3 font-display">
                    Fits
                  </th>
                </tr>
              </thead>
              <tbody>
                {differences.map((d) => (
                  <tr key={d.system} className="border-b border-border">
                    <td className="py-4 pr-4 text-foreground font-medium">
                      {d.system}
                    </td>
                    <td className="py-4 pr-4 text-primary-dim">{d.input}</td>
                    <td className="py-4 pr-4 text-primary-dim">{d.action}</td>
                    <td className="py-4 text-primary-dim">{d.fits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="prose mt-6">
            <p>
              Rule of thumb: if your workflow is high-volume and identical every time, use RPA or a Zap. If your workflow needs to reply and hold a conversation but not act, use a chatbot. If your workflow needs multi-step reasoning without side effects, use an LLM agent. If your workflow reads, decides, and acts on real business systems with a paycheck attached, you want an agentic AI system.
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            The four-part architecture
          </h2>
          <div className="prose">
            <p>
              Every agentic AI system that ships to production has the same four parts. Miss any of them and it breaks the first time a real customer message comes in.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: "01",
                name: "Trigger",
                body: "The event that wakes the agent up. Inbound email, form submission, DM, phone call, webhook, cron schedule. Reliable triggers are the difference between an agent that fires and one that misses.",
              },
              {
                num: "02",
                name: "Context",
                body: "What the agent knows when it wakes up. Business data (customer history, product catalogue, pricing), operator rules (tone, threshold, escalation policy), and the situation itself. Weak context produces generic output.",
              },
              {
                num: "03",
                name: "Tools",
                body: "The functions the agent can call: send email, book calendar slot, refund order, look up shipping status, notify Slack. Tools bounded by permission. The agent can only do what its tools let it do.",
              },
              {
                num: "04",
                name: "Action + gate",
                body: "The output, filtered through the owner's threshold. Under the line: auto-execute. Above the line: hold for approval. Every action logged so you can audit and improve.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <p className="text-xs font-semibold text-accent font-display mb-2 tracking-widest">
                  {step.num}
                </p>
                <h3 className="text-lg font-semibold text-foreground font-display mb-2">
                  {step.name}
                </h3>
                <p className="text-sm text-primary-dim leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="prose mt-6">
            <p>
              The threshold gate between Tools and Action is what separates a well-designed agentic AI system from a science-fair demo. Full autonomy on day one fails almost every time because the eval set is not deep enough to trust it. Bounded autonomy with earned expansion works. Start with draft-and-approve on every action, ratchet down as the eval score climbs.{" "}
              <a
                href="https://www.anthropic.com/research/building-effective-agents"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anthropic&apos;s guidance on building effective agents
              </a>{" "}
              lands on the same principle: most agent problems should start as workflows and earn autonomy over time.
            </p>
          </div>
        </section>

        {/* Thresholds */}
        <section id="thresholds" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Thresholds and human-in-the-loop
          </h2>
          <div className="prose">
            <p>
              Full autonomy is not the goal. Earned autonomy is. Every action an agent takes should be judged against a threshold set by the owner. Below the line, the agent acts. Above the line, it drafts and holds.
            </p>
            <p>Concrete threshold examples we deploy:</p>
            <ul>
              <li>
                Refunds under 50 pounds process automatically. Above 50 pounds, the agent drafts the refund and pings the owner for approval.
              </li>
              <li>
                Standard appointment bookings on open slots auto-confirm. VIP flags or requests for the owner&apos;s direct time hold for review.
              </li>
              <li>
                Template quotes for jobs under 1,000 pounds send automatically. Anything larger goes into a review queue.
              </li>
              <li>
                Order status replies auto-send. Any customer asking for a manager or expressing dissatisfaction escalates to the owner within seconds.
              </li>
            </ul>
            <p>
              The threshold is the trust dial. Day one, it can sit high (nothing acts without a human yes). As the eval set grows and the agent proves it handles the routine, the threshold moves down. That is what we mean by earned autonomy.
            </p>
            <p>
              The other trust mechanism is the eval set. Take 50 real historical examples of the workflow. Grade the correct answer for each. Run the agent. Score. That set is the gym the agent trains against. It is also the strongest sales asset in this category, because it lets you tell a prospective customer &quot;we tested this on 50 of your last messages, it got 42 right, flagged 6 for review, made 2 mistakes and here is what we fixed.&quot;
            </p>
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Real examples in the wild
          </h2>
          <div className="prose">
            <p>
              The pattern is the same across every industry. Only the action list changes. Here are five agentic AI systems in real deployment (ours and others).
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {examples.map((ex) => (
              <div
                key={ex.name}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <h3 className="font-semibold text-foreground mb-2 font-display">
                  {ex.name}
                </h3>
                <p className="text-sm text-primary-dim leading-relaxed">
                  {ex.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Front Desk per industry */}
        <section id="for-your-industry" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            The Front Desk for your industry
          </h2>
          <div className="prose mb-6">
            <p>
              Same read-decide-act pattern, different action list. Every industry has its own inbound triggers, its own booking system, its own regulatory line. The practical guides below cover exactly what the Front Desk does for each one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VERTICALS.map((v) => (
              <Link
                key={v.slug}
                href={`/for/${v.slug}`}
                className="group bg-surface border border-border hover:border-accent rounded-lg p-6 transition-colors"
              >
                <p className="text-xs font-semibold text-accent uppercase tracking-widest font-display mb-2">
                  {v.kicker}
                </p>
                <p className="text-foreground font-display font-semibold group-hover:text-accent transition-colors">
                  The Front Desk for {v.fullName} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* How to build */}
        <section id="how-to-build" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            How to build an agentic AI system
          </h2>
          <div className="prose">
            <p>
              Seven steps. Compressed from real production builds and industry teardowns. Do them in order. Skipping any one of them produces a demo that never becomes a business.
            </p>
          </div>
          <ol className="mt-8 space-y-4">
            {howToSteps.map((step, i) => (
              <li
                key={step.name}
                className="bg-surface border border-border rounded-lg p-6 flex gap-4"
              >
                <span className="text-accent font-display font-bold text-2xl shrink-0 w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 font-display">
                    {step.name}
                  </h3>
                  <p className="text-sm text-primary-dim leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* When not */}
        <section id="when-not" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            When not to use agentic AI
          </h2>
          <div className="prose">
            <p>
              Agentic AI is not the answer to every workflow. Three cases where it makes things worse.
            </p>
            <p>
              <strong>Pure automation.</strong> If the workflow is truly &quot;if X, do Y&quot; with no judgement or variation, an agent is overkill. A Zap, a Make scenario, or a plain database trigger will do it faster and cheaper. Reach for RPA before you reach for an agent.
            </p>
            <p>
              <strong>Pure human judgement.</strong> Creative direction, high-stakes negotiation, delicate emotional conversations. These are workflows where the human being IS the value. An agent that pretends to do them erodes trust. Do not automate the ones customers came for.
            </p>
            <p>
              <strong>Low frequency.</strong> If the workflow only fires once a month, the cost of building and maintaining the agent outweighs the time saved. Agents earn their keep on workflows that repeat daily or hourly.
            </p>
          </div>
        </section>

        {/* Glossary */}
        <section id="glossary" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Glossary
          </h2>
          <dl className="space-y-4">
            {[
              {
                term: "Agent",
                def: "A software entity that reads, decides, and acts autonomously within bounded rules.",
              },
              {
                term: "Agentic",
                def: "Adjective. Describes a system that behaves like an agent rather than a passive tool.",
              },
              {
                term: "Autonomy",
                def: "The degree to which an agent acts without human approval. Ranges from full draft-and-approve to fully autonomous under threshold.",
              },
              {
                term: "Threshold",
                def: "The line above which an agent must ask for approval before acting. Set per action type by the operator.",
              },
              {
                term: "Eval set",
                def: "A collection of real historical examples with graded correct answers, used to measure agent performance before deployment.",
              },
              {
                term: "MUA (Minimum Useful Agent)",
                def: "The smallest agent that saves the owner real time on one workflow. The first thing to ship.",
              },
              {
                term: "Tool use",
                def: "The ability of an agent to call external functions (send email, book slot, refund) rather than just generating text.",
              },
              {
                term: "RAG (Retrieval-Augmented Generation)",
                def: "A pattern where the agent looks up relevant business data before deciding, so the answer is grounded in the operator's actual world.",
              },
            ].map((g) => (
              <div key={g.term} className="border-b border-border pb-4">
                <dt className="font-semibold text-foreground font-display mb-1">
                  {g.term}
                </dt>
                <dd className="text-sm text-primary-dim leading-relaxed">
                  {g.def}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Further reading */}
        <section id="further-reading" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Further reading
          </h2>
          <p className="text-muted mb-8 leading-relaxed">
            The best independent sources on agentic AI, if you want to go deeper than this guide.
          </p>
          <ul className="space-y-4">
            {[
              {
                name: "MIT Sloan — Agentic AI, explained",
                url: "https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained",
                note:
                  "Business-school framing on what agentic AI is and where it fits in an operational strategy.",
              },
              {
                name: "IBM — What is Agentic AI?",
                url: "https://www.ibm.com/think/topics/agentic-ai",
                note:
                  "Enterprise-oriented explainer with clear component definitions and governance considerations.",
              },
              {
                name: "AWS — What is Agentic AI?",
                url: "https://aws.amazon.com/what-is/agentic-ai/",
                note:
                  "Cloud-provider perspective on the difference between generative AI and agentic AI.",
              },
              {
                name: "Google Cloud — What is agentic AI? Definition and differentiators",
                url: "https://cloud.google.com/discover/what-is-agentic-ai",
                note:
                  "Google's take on autonomous decision-making and where agentic AI diverges from earlier categories.",
              },
              {
                name: "Red Hat — What is agentic AI?",
                url: "https://www.redhat.com/en/topics/ai/what-is-agentic-ai",
                note:
                  "Open-source view of agentic AI, with focus on tool interaction and minimal human intervention.",
              },
              {
                name: "Anthropic — Building effective agents",
                url: "https://www.anthropic.com/research/building-effective-agents",
                note:
                  "The most-cited practical article on building production agents. Start most problems as workflows; earn autonomy.",
              },
            ].map((r) => (
              <li
                key={r.url}
                className="bg-surface border border-border rounded-lg p-5"
              >
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:text-accent-light font-display"
                >
                  {r.name} ↗
                </a>
                <p className="text-sm text-primary-dim mt-2 leading-relaxed">
                  {r.note}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Common questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-surface border border-border rounded-lg p-6"
              >
                <summary className="cursor-pointer text-foreground font-semibold font-display list-none flex justify-between items-center gap-4">
                  <span>{faq.question}</span>
                  <span className="text-accent text-xl group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-sm text-primary-dim leading-relaxed mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </article>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="border border-accent/40 rounded-xl p-10 bg-surface">
            <p className="text-xs font-semibold text-accent font-display uppercase tracking-widest mb-4">
              See it running
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display leading-tight">
              We build agentic AI systems for owner-operated businesses.
            </h2>
            <p className="text-primary-dim mb-8 max-w-2xl leading-relaxed">
              Our flagship product is The Front Desk, an agentic AI first responder that reads inbound in under 60 seconds, replies in your voice, and does the next step under your thresholds. Test it on 10 real messages from your own business, free.
            </p>
            <Link
              href="/test-drive"
              className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Book my test
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
