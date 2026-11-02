import Anthropic from "@anthropic-ai/sdk";
import type { Leak } from "@/lib/tools/leak-check";

/**
 * Claude for the website's free tools. Server only: the key is read from the
 * ANTHROPIC_API_KEY server setting and never reaches the page.
 *
 * Only our own fixed data goes in (answer labels, the business type from a
 * fixed list, the leaks our code picked). Nothing a visitor types reaches
 * Claude, so nobody can steer it.
 */

const MODEL = "claude-sonnet-5-5";

const VOICE = `You write for oloye.co.uk, a small UK business that builds simple systems so coaches, creators and small business owners stop losing the people who find them.

How to write:
- Plain, warm British English. Short sentences. Words a 10-year-old would follow.
- Speak to the reader as "you". They are the hero. Never say "I".
- No jargon, no business words, no hype. Never use: leverage, unlock, seamless, robust, game-changer, supercharge, funnel, autopilot, "while you sleep".
- No em dashes. Use commas or full stops.
- Never invent numbers, prices, tools or results.
- Each "leak" line names what is happening to their people, in their situation, in one or two sentences.
- Each "fix" line is the first small step they can take this week, in one or two sentences. Keep the meaning of the fix you are given; you may make it fit their answers and business.`;

const SCHEMA = {
  type: "object",
  properties: {
    leaks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          leak: { type: "string" },
          fix: { type: "string" },
        },
        required: ["id", "leak", "fix"],
        additionalProperties: false,
      },
    },
  },
  required: ["leaks"],
  additionalProperties: false,
};

export type Worded = { id: string; leak: string; fix: string };

/** Words the three leaks for this person. Returns null if Claude isn't available. */
export async function wordLeaks(input: {
  business: string | null;
  answers: { question: string; answer: string }[];
  total: number;
  leaks: Leak[];
}): Promise<Worded[] | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  const client = new Anthropic({ timeout: 25_000, maxRetries: 1 });

  const brief = [
    `Business type: ${input.business || "not given"}`,
    `Lead leak score: ${input.total} out of 100`,
    "",
    "Their answers:",
    ...input.answers.map((a) => `- ${a.question} ${a.answer}`),
    "",
    "Their three biggest leaks, in order. Rewrite each one's leak and fix for them, keeping the same id and order:",
    ...input.leaks.map((l) => `- id: ${l.id} (area: ${l.area})\n  leak: ${l.leak}\n  fix: ${l.fix}`),
  ].join("\n");

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 4000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: VOICE,
      output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
      messages: [{ role: "user", content: brief }],
    });
    if (response.stop_reason === "refusal" || response.stop_reason === "max_tokens") return null;
    const text = response.content.find((b) => b.type === "text");
    if (!text || text.type !== "text") return null;
    const parsed = JSON.parse(text.text) as { leaks: Worded[] };
    const ids = input.leaks.map((l) => l.id);
    const out = ids.map((id) => parsed.leaks.find((w) => w.id === id));
    if (out.some((w) => !w || !w.leak || !w.fix)) return null;
    // A last guard on the voice rules, since this goes straight to a stranger.
    return (out as Worded[]).map((w) => ({
      id: w.id,
      leak: w.leak.replace(/—/g, ",").slice(0, 400),
      fix: w.fix.replace(/—/g, ",").slice(0, 400),
    }));
  } catch (err) {
    // Status only, never the request or the key.
    const status = err instanceof Anthropic.APIError ? err.status : "network";
    console.error("Leak check: Claude call failed", status);
    return null;
  }
}
