import Anthropic from "@anthropic-ai/sdk";
import { CARE_LINE, SECTIONS, type Answers, type Idea, type Lists, type SectionId } from "@/lib/tools/what-to-post";
import { FULL_RUN_SYSTEM, NEW_5_SYSTEM, UNCLEAR } from "@/lib/tools/what-to-post-prompts";

/**
 * Claude for "What to post and what to sell". Server only: the key is read from
 * the ANTHROPIC_API_KEY server setting and never reaches the page.
 *
 * Settings, prompts and JSON shape are the Product Lead's
 * (Projects/live-find-your-channel/): sonnet-5-5, effort low, structured
 * output, 4000 tokens for the full run and 1500 for "5 more".
 *
 * A visitor's own words reach Claude here (the "something else" boxes, 120
 * characters each), so on top of the prompt's own rule: the answers go in as
 * JSON inside tags, the reply must match a fixed shape, the counts are checked,
 * every line is cut to length, and links and dashes are stripped before
 * anything is shown or emailed.
 */

const MODEL = "claude-sonnet-5-5";

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

const MORE_SCHEMA = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["ideas", "unclear"] },
    section: { type: "string", enum: SECTIONS.map((s) => s.id) },
    ideas: { type: "array", items: { $ref: "#/$defs/idea" } },
    message: { type: "string" },
  },
  required: ["status", "section", "ideas", "message"],
  additionalProperties: false,
  $defs: { idea: IDEA },
};

export { UNCLEAR };

export type FullResult = { status: "ideas"; lists: Lists; careNote: string } | { status: "unclear" };
export type MoreResult = { status: "ideas"; ideas: Idea[] } | { status: "unclear" };

/** Last guard on what a stranger sees: no dashes, no links, short lines. */
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

function tidyList(list: unknown, avoid: string[] = []): Idea[] {
  if (!Array.isArray(list)) return [];
  const seen = new Set(avoid.map((t) => t.toLowerCase()));
  const out: Idea[] = [];
  for (const item of list) {
    const title = tidy((item as Idea)?.title, 90);
    const why = tidy((item as Idea)?.why, 180);
    if (!title || !why || seen.has(title.toLowerCase())) continue;
    seen.add(title.toLowerCase());
    out.push({ title, why });
    if (out.length === 5) break;
  }
  return out;
}

async function ask(
  system: string,
  user: string,
  schema: { [key: string]: unknown },
  maxTokens: number,
  label: string,
): Promise<Record<string, unknown> | null> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("What to post: ANTHROPIC_API_KEY is not set");
    return null;
  }
  const client = new Anthropic({ timeout: 50_000, maxRetries: 1 });
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      // The system prompt is the same for every visitor, so it can be cached.
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      output_config: { effort: "low", format: { type: "json_schema", schema } },
      messages: [{ role: "user", content: user }],
    });
    // Token counts only, so the real cost per run can be worked out. Never the words.
    const u = response.usage;
    console.log(
      `What to post (${label}): ${u.input_tokens} in, ${u.cache_read_input_tokens ?? 0} cached, ${u.cache_creation_input_tokens ?? 0} cache write, ${u.output_tokens} out`,
    );
    if (response.stop_reason === "refusal" || response.stop_reason === "max_tokens") {
      console.error(`What to post (${label}): stopped`, response.stop_reason);
      return null;
    }
    const text = response.content.find((b) => b.type === "text");
    if (!text || text.type !== "text") return null;
    return JSON.parse(text.text);
  } catch (err) {
    // Status only, never the request or the key.
    const status = err instanceof Anthropic.APIError ? err.status : "network";
    console.error(`What to post (${label}): Claude call failed`, status);
    return null;
  }
}

const answersTag = (answers: Answers) => `<answers>\n${JSON.stringify(answers, null, 2)}\n</answers>`;

/** All four lists of five. Null if Claude isn't available or the reply is wrong. */
export async function fullRun(answers: Answers): Promise<FullResult | null> {
  const parsed = await ask(FULL_RUN_SYSTEM, answersTag(answers), FULL_SCHEMA, 4000, "full run");
  if (!parsed) return null;
  if (parsed.status === "unclear") return { status: "unclear" };
  const lists = {} as Lists;
  for (const s of SECTIONS) {
    lists[s.id] = tidyList(parsed[s.id]);
    if (lists[s.id].length < 5) return null;
  }
  // Any care note from Claude is just the flag: the page shows the Copywriter's line.
  return {
    status: "ideas",
    lists,
    careNote: typeof parsed.care_note === "string" && parsed.care_note.trim() ? CARE_LINE : "",
  };
}

/** Five new ideas for one list, none of them already shown. */
export async function moreIdeas(answers: Answers, section: SectionId, shown: Idea[]): Promise<MoreResult | null> {
  const user = [
    answersTag(answers),
    `<section>${section}</section>`,
    `<already_shown>\n${JSON.stringify(shown, null, 2)}\n</already_shown>`,
  ].join("\n");
  const parsed = await ask(NEW_5_SYSTEM, user, MORE_SCHEMA, 1500, `5 more ${section}`);
  if (!parsed) return null;
  if (parsed.status === "unclear") return { status: "unclear" };
  const ideas = tidyList(parsed.ideas, shown.map((i) => i.title));
  return ideas.length ? { status: "ideas", ideas } : null;
}
