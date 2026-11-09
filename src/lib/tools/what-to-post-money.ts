import type { Answers } from "@/lib/tools/what-to-post";

/**
 * A backstop for "never a price, a fee or an amount of money" (the prompts'
 * own rule, Marketing Director 9 Nov 2026). If Claude writes £, $ or € with a
 * number that isn't in the visitor's own answers, the server tries once more,
 * then drops that line. Server only.
 */

const MONEY = /[£$€]\s?\d[\d,.]*(?:\s?(?:k|m|bn|million|thousand))?/gi;

/** The money amounts the visitor typed themselves (they may mention one). */
export function theirAmounts(answers: Answers): Set<string> {
  const text = Object.values(answers)
    .map((a) => a.other)
    .join(" ");
  return new Set((text.match(MONEY) || []).map((m) => m.replace(/\s/g, "").toLowerCase()));
}

/** True when a line has an amount of money the visitor didn't give. */
export function hasStrayMoney(text: string, theirs: Set<string>): boolean {
  return (text.match(MONEY) || []).some((m) => !theirs.has(m.replace(/\s/g, "").toLowerCase()));
}

/** For a title that must stay: takes the stray amount out, and tidies what's left. */
export function stripStrayMoney(text: string, theirs: Set<string>): string {
  return text
    .replace(MONEY, (m) => (theirs.has(m.replace(/\s/g, "").toLowerCase()) ? m : ""))
    .replace(/\s+([,.:;])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}
