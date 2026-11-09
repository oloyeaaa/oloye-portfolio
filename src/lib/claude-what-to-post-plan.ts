import Anthropic from "@anthropic-ai/sdk";
import { CARE_LINE, type Answers, type Idea, type SectionId } from "@/lib/tools/what-to-post";
import { PLAN_SYSTEM, PLAN_UNCLEAR } from "@/lib/tools/what-to-post-prompts";

/**
 * Version 2 of "What to post": a short plan for the ideas they picked (the
 * Product Lead's plan prompt and JSON shape, Projects/live-find-your-channel/).
 *
 * Claude gets their answers and picks only: never their name or email (the
 * Product Lead's rule). The page adds "Hi {name}" afterwards. Server only.
 */

export { PLAN_UNCLEAR };

const MODEL = process.env.WHAT_TO_POST_MODEL || "claude-sonnet-5-5";
const EFFORT = (process.env.WHAT_TO_POST_EFFORT || "low") as "low" | "medium" | "high";
const API_KEY = () => process.env.WHAT_TO_POST_ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY;

export type Picks = Record<SectionId, Idea | null>;

export type Plan = {
  /** The picked titles without v1's format words ("Hands only:"), empty where blank. The PDF shows these. */
  pickTitles: Record<SectionId, string>;
  whyItFits: string;
  firstPosts: { title: string; whatToShow: string }[];
  freeThing: string[];
  sell: { whatItIs: string; firstStep: string };
  careNote: string;
};

const SCHEMA = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["plan", "unclear"] },
    pick_titles: {
      type: "object",
      properties: {
        what_to_post: { type: "string" },
        who_its_for: { type: "string" },
        free_thing: { type: "string" },
        something_to_sell: { type: "string" },
      },
      required: ["what_to_post", "who_its_for", "free_thing", "something_to_sell"],
      additionalProperties: false,
    },
    why_it_fits: { type: "string" },
    first_posts: {
      type: "array",
      items: {
        type: "object",
        properties: { title: { type: "string" }, what_to_show: { type: "string" } },
        required: ["title", "what_to_show"],
        additionalProperties: false,
      },
    },
    free_thing: { type: "array", items: { type: "string" } },
    something_to_sell: {
      type: "object",
      properties: { what_it_is: { type: "string" }, first_step: { type: "string" } },
      required: ["what_it_is", "first_step"],
      additionalProperties: false,
    },
    care_note: { type: "string" },
    message: { type: "string" },
  },
  required: ["status", "pick_titles", "why_it_fits", "first_posts", "free_thing", "something_to_sell", "care_note", "message"],
  additionalProperties: false,
};

/** Last guard on what a stranger sees: no dashes, no links, sensible length. */
function tidy(text: unknown, max: number): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\b(?:https?:\/\/|www\.)\S+/gi, "")
    .replace(/\S+@\S+\.\S+/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

async function ask(answers: Answers, picks: Picks): Promise<Record<string, unknown> | null> {
  const client = new Anthropic({ apiKey: API_KEY(), timeout: 30_000, maxRetries: 0 });
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 3000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: PLAN_SYSTEM, cache_control: { type: "ephemeral" } }],
      output_config: { effort: EFFORT, format: { type: "json_schema", schema: SCHEMA } },
      messages: [
        {
          role: "user",
          content: `<answers>
${JSON.stringify(answers, null, 2)}
</answers>
<picks>
${JSON.stringify(picks, null, 2)}
</picks>`,
        },
      ],
    });
    // Token counts only, so the real cost can be worked out. Never the words.
    const u = response.usage;
    console.log(
      `What to post plan: ${u.input_tokens} in, ${u.cache_read_input_tokens ?? 0} cached, ${u.cache_creation_input_tokens ?? 0} cache write, ${u.output_tokens} out`,
    );
    if (response.stop_reason === "refusal" || response.stop_reason === "max_tokens") return null;
    const text = response.content.find((b) => b.type === "text");
    if (!text || text.type !== "text") return null;
    return JSON.parse(text.text);
  } catch (err) {
    const status = err instanceof Anthropic.APIError ? err.status : "network";
    console.error("What to post plan: Claude call failed", status);
    return null;
  }
}

type PlanResult = { status: "plan"; plan: Plan } | { status: "unclear" };

function read(p: Record<string, unknown> | null, picks: Picks): PlanResult | null {
  if (!p) return null;
  if (p.status === "unclear") return { status: "unclear" };
  const posts = Array.isArray(p.first_posts)
    ? (p.first_posts as { title?: unknown; what_to_show?: unknown }[])
        .map((x) => ({ title: tidy(x?.title, 100), whatToShow: tidy(x?.what_to_show, 220) }))
        .filter((x) => x.title && x.whatToShow)
    : [];
  // The hand-over: exactly 3 posts, or it counts as a bad reply.
  if (posts.length !== 3) return null;
  const sell = (p.something_to_sell || {}) as { what_it_is?: unknown; first_step?: unknown };
  const rawTitles = (p.pick_titles || {}) as Record<string, unknown>;
  const pickTitles = {} as Record<SectionId, string>;
  for (const id of ["what_to_post", "who_its_for", "free_thing", "something_to_sell"] as SectionId[]) {
    // Only for a real pick; fall back to the pick's own title if Claude left it empty.
    pickTitles[id] = picks[id] ? tidy(rawTitles[id], 90) || tidy(picks[id]!.title, 90) : "";
  }
  return {
    status: "plan",
    plan: {
      pickTitles,
      whyItFits: tidy(p.why_it_fits, 220),
      firstPosts: posts,
      // Blank picks stay blank: a part is only kept when its pick was made.
      freeThing: picks.free_thing && Array.isArray(p.free_thing) ? (p.free_thing as unknown[]).map((l) => tidy(l, 200)).filter(Boolean).slice(0, 4) : [],
      sell: picks.something_to_sell
        ? { whatItIs: tidy(sell.what_it_is, 220), firstStep: tidy(sell.first_step, 220) }
        : { whatItIs: "", firstStep: "" },
      careNote: typeof p.care_note === "string" && p.care_note.trim() ? CARE_LINE : "",
    },
  };
}

/** The plan, "unclear", or null if Claude failed twice or the reply broke the shape twice. */
export async function planRun(answers: Answers, picks: Picks): Promise<PlanResult | null> {
  if (!API_KEY()) {
    console.error("What to post plan: no Claude key is set");
    return null;
  }
  const started = Date.now();
  const first = read(await ask(answers, picks), picks);
  if (first) return first;
  // One more try, only while it still fits inside the server's 60 seconds.
  if (Date.now() - started > 25_000) return null;
  console.error("What to post plan: trying once more");
  return read(await ask(answers, picks), picks);
}
