"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";

// "On this page": sits in the left sidebar on big screens and as a fold-out
// at the top on phones. The section you're reading is marked in lime.
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => !!e);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ol className="space-y-1 border-l border-border">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors ${
              active === h.id ? "border-accent-dark font-semibold text-foreground" : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="mb-10 rounded-xl border border-border bg-background p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">On this page</summary>
        <div className="mt-4">{list}</div>
      </details>
      <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
        <p className="eyebrow mb-4">On this page</p>
        {list}
      </nav>
    </>
  );
}
