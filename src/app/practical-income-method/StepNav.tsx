"use client";

import { useEffect, useState } from "react";

const STEPS = ["step1", "step2", "step3", "step4", "step5"] as const;

export default function StepNav() {
  const [active, setActive] = useState<string>("step1");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = STEPS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="flex flex-row flex-wrap gap-x-6 gap-y-3 pt-6 md:sticky md:top-24 md:h-fit md:flex-col md:gap-6 md:pt-2">
      {STEPS.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "true" : undefined}
          className={`font-mono text-xs font-semibold tracking-[0.06em] transition-colors ${
            active === id ? "text-accent" : "text-border-strong hover:text-accent"
          }`}
        >
          {String(i + 1).padStart(2, "0")}
        </a>
      ))}
    </nav>
  );
}
