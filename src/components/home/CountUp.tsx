"use client";

import { useEffect, useState } from "react";
import { useInView } from "./Reveal";

// Counts up to a real number once, when it scrolls into view.
export default function CountUp({ to, duration = 1600 }: { to: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const length = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : duration;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = length === 0 ? 1 : Math.min((now - start) / length, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return <span ref={ref}>{value}</span>;
}
