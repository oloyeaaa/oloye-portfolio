import Anthropic from "@anthropic-ai/sdk";
import { CARE_LINE, SECTIONS, type Answers, type Idea, type Lists } from "@/lib/tools/what-to-post";
import { FULL_RUN_SYSTEM, UNCLEAR } from "@/lib/tools/what-to-post-prompts";

/**
 * Claude for "What to post and what to sell". Server only: the key is read from
 * the ANTHROPIC_API_KEY server setting and never reaches the page.
 *
 * One call per visitor (Product Lead, 9 Nov 2026, Oloye's yes): 10 ideas a
 * list, best first. The page shows 1 to 5, and "5 more" shows 6 to 10 with no
 * second call. Prompt and JSON shape: Projects/live-find-your-channel/.
 *
 * A visitor's own words reach Claude here (the typed boxes, 120 characters
 * each), so on top of the prompt's own rule: the answers go in as JSON inside
 * tags (with < and > already stripped, so nobody can close a tag early), the
 * reply must match a fixed shape, the counts are checked, every line is cut to
 * length, and links and dashes are stripped. The page shows it as plain text.
 */

export { UNCLEAR };

// Settings, not code: the model and effort can change without a code change.
const MODEL = process.env.WHAT_TO_POST_MODEL || "claude-sonnet-5-5";
const EFFORT = (process.env.WHAT_TO_POST_EFFORT || "low") as "low" | "medium" | "high";
const PER_LIST = 10;

const IDEA = {
  type: "object",
  properties: { title: { type: "string" }, why: { type: "string" } },
  required: ["title", "why"],
  additionalProperties: false,
};

const FULL_SCHEMA = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["ideas", "unclear"] },
    what_to_post: { type: "array", items: { $ref: "#/$defs/idea" } },
    who_its_for: { type: "array", items: { $ref: "#/$defs/idea" } },
    free_thing: { type: "array", items: { $ref: "#/$defs/idea" } },
    something_to_sell: { type: "array", items: { $ref: "#/$defs/idea" } },
    care_note: { type: "string" },
    message: { type: "string" },
  },
  required: ["status", "what_to_post", "who_its_for", "free_thing", "something_to_sell", "care_note", "message"],
  additionalProperties: false,
  $defs: { idea: IDEA },
};

export type FullResult = { status: "ideas"; lists: Lists; careNote: string } | { status: "unclear" };

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

function tidyList(list: unknown): Idea[] {
  if (!Array.isArray(list)) return [];
  const seen = new Set<string>();
  const out: Idea[] = [];
  for (const item of list) {
    // Titles are kept to 70 characters by the prompt (85 for "Who it's for");
    // this only stops a runaway line. The page wraps titles, never cuts them.
    const title = tidy((item as Idea)?.title, 120);
    const why = tidy((item as Idea)?.why, 200);
    if (!title || !why || seen.has(title.toLowerCase())) continue;
    seen.add(title.toLowerCase());
    out.push({ title, why });
    if (out.length === PER_LIST) break;
  }
  return out;
}

/** All four lists, up to 10 each, best first. Null if Claude isn't available or the reply is wrong. */
export async function fullRun(answers: Answers): Promise<FullResult | null> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("What to post: ANTHROPIC_API_KEY is not set");
    return null;
  }
  const client = new Anthropic({ timeout: 55_000, maxRetries: 0 });
  let parsed: Record<string, unknown>;
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 6000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      // The system prompt is the same for every visitor, so it's cached.
      system: [{ type: "text", text: FULL_RUN_SYSTEM, cache_control: { type: "ephemeral" } }],
      output_config: { effort: EFFORT, format: { type: "json_schema", schema: FULL_SCHEMA } },
      messages: [{ role: "user", content: `<answers>\n${JSON.stringify(answers, null, 2)}\n</answers>` }],
    });
    // Token counts only, so the real cost per run can be worked out. Never the words.
    const u = response.usage;
    console.log(
      `What to post: ${u.input_tokens} in, ${u.cache_read_input_tokens ?? 0} cached, ${u.cache_creation_input_tokens ?? 0} cache write, ${u.output_tokens} out`,
    );
    if (response.stop_reason === "refusal" || response.stop_reason === "max_tokens") {
      console.error("What to post: stopped", response.stop_reason);
      return null;
    }
    const text = response.content.find((b) => b.type === "text");
    if (!text || text.type !== "text") return null;
    parsed = JSON.parse(text.text);
  } catch (err) {
    // Status only, never the request or the key.
    const status = err instanceof Anthropic.APIError ? err.status : "network";
    console.error("What to post: Claude call failed", status);
    return null;
  }

  if (parsed.status === "unclear") return { status: "unclear" };
  const lists = {} as Lists;
  for (const s of SECTIONS) {
    lists[s.id] = tidyList(parsed[s.id]);
    // At least the first 5 must be there; "5 more" shows whatever is left.
    if (lists[s.id].length < 5) return null;
  }
  // Any care note from Claude is just the flag: the page shows the Copywriter's line.
  return {
    status: "ideas",
    lists,
    careNote: typeof parsed.care_note === "string" && parsed.care_note.trim() ? CARE_LINE : "",
  };
}
