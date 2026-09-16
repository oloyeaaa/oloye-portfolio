"use client";

import { useState } from "react";
import Link from "next/link";

interface TerminalPromptCardProps {
  slug: string;
  name: string;
  tag: string;
  model: string;
  promise: string;
  prompt: string;
}

export default function TerminalPromptCard({
  slug,
  name,
  tag,
  model,
  promise,
  prompt,
}: TerminalPromptCardProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      alert("Browser blocked direct copy. Please copy manually from the prompt viewer.");
    }
  }

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-4 sm:p-5 transition hover:border-accent/40 hover:shadow-lg">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-surface-raised px-2.5 py-0.5 text-[10px] font-semibold text-accent border border-border">
            {tag}
          </span>
          <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-mono text-muted border border-border">
            {model}
          </span>
        </div>

        {/* Title & 2-Line Subtitle */}
        <h3 className="mt-2.5 text-sm font-bold text-foreground group-hover:text-accent transition">
          {name}
        </h3>
        <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
          {promise}
        </p>

        {/* Terminal Preview Frame */}
        <div className="mt-3 rounded-lg border border-border/80 bg-background/90 p-2.5 font-mono text-[11px] text-muted">
          <div className="flex items-center justify-between border-b border-border/60 pb-1.5 mb-1.5 text-[10px] text-muted">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/80 inline-block" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-2 w-2 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-1 text-[10px] font-mono text-foreground/80">{slug}.prompt</span>
            </div>
            <span>AI Studio</span>
          </div>

          <p className="text-foreground/90 line-clamp-3 leading-relaxed whitespace-pre-line text-[10.5px]">
            {prompt.slice(0, 160)}...
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-border/60 pt-2.5">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1 text-xs font-semibold text-background transition hover:bg-accent hover:text-background"
        >
          <span>{copied ? "Copied! ✓" : "Copy Prompt 📋"}</span>
        </button>

        <Link
          href={`/free#${slug}`}
          className="text-xs font-medium text-muted hover:text-accent transition"
        >
          View Full Engine →
        </Link>
      </div>
    </div>
  );
}
