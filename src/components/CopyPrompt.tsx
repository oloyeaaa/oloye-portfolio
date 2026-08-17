"use client";

import { useState } from "react";

/**
 * The prompt, with a copy button.
 *
 * This is how somebody actually gets the freebie: they press copy and paste it
 * into whatever AI they already have open. No download, no email wall, no
 * account. The prompt is also rendered as real text on the page, so it is
 * indexable and works with JavaScript switched off.
 */
export default function CopyPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard can be blocked. The text is on the page, so selecting it
      // manually still works. Say so rather than failing silently.
      setCopied(false);
      alert("Your browser blocked the copy. Select the text below instead.");
    }
  }

  return (
    <div className="rounded-lg border border-accent/60 overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          The prompt
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md bg-foreground px-3 py-1.5 text-sm font-semibold text-background transition hover:opacity-90"
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed whitespace-pre-wrap font-mono">
        {prompt}
      </pre>
    </div>
  );
}
