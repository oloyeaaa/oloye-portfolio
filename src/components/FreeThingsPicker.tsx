"use client";

import { useRef, useState } from "react";
import type { PostFreebie } from "@/lib/postFreebies";
import FreebieForm from "@/components/post/FreebieForm";

// The Free things page: pick one card, the form for that one opens below it.
export default function FreeThingsPicker({ items }: { items: PostFreebie[] }) {
  const [picked, setPicked] = useState<PostFreebie | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function pick(item: PostFreebie) {
    setPicked(item);
    requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const on = picked?.key === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => pick(item)}
              aria-pressed={on}
              className={`flex h-full flex-col rounded-3xl border p-7 text-left transition hover:-translate-y-1 ${
                on ? "border-foreground bg-foreground" : "border-border bg-background hover:border-foreground"
              }`}
            >
              <span className={`eyebrow ${on ? "!text-accent" : ""}`}>Free {item.kind}</span>
              <span className={`mt-4 text-xl font-bold leading-snug ${on ? "text-white" : "text-foreground"}`}>{item.title}</span>
              <span className={`mt-3 ${on ? "text-white/60" : "text-muted"}`}>{item.line}</span>
              <span className={`mt-auto pt-6 text-sm font-semibold ${on ? "text-accent" : "text-foreground"}`}>
                {on ? "Picked ✓" : <><span className="lime-mark">Get it free</span> →</>}
              </span>
            </button>
          );
        })}
      </div>
      <div ref={formRef}>
        {picked && <FreebieForm key={picked.key} freebie={picked} source="free-page" />}
      </div>
    </>
  );
}
