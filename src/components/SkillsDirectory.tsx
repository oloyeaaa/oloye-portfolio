"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SkillMeta } from "@/lib/skills";

export default function SkillsDirectory({ skills }: { skills: SkillMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [type, setType] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set(skills.map((s) => s.category));
    return ["All", ...Array.from(set).sort()];
  }, [skills]);

  const types = useMemo(() => {
    const set = new Set(skills.map((s) => s.type));
    return ["All", ...Array.from(set).sort()];
  }, [skills]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((s) => {
      if (category !== "All" && s.category !== category) return false;
      if (type !== "All" && s.type !== type) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q)
      );
    });
  }, [skills, query, category, type]);

  const chip = (active: boolean) =>
    `text-xs font-semibold font-display uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
      active
        ? "bg-accent text-background border-accent"
        : "text-muted border-border hover:border-accent hover:text-foreground"
    }`;

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills…"
          className="w-full md:max-w-sm bg-surface border border-border focus:border-accent rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors"
        />
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={chip(category === c)}>
              {c}
            </button>
          ))}
          {types.length > 2 && (
            <>
              <span className="mx-1 h-4 w-px bg-border" aria-hidden />
              {types.map((t) => (
                <button key={t} type="button" onClick={() => setType(t)} className={chip(type === t)}>
                  {t === "All" ? "All types" : t}
                </button>
              ))}
            </>
          )}
        </div>
        <p className="text-xs text-muted">
          {filtered.length} of {skills.length} {skills.length === 1 ? "tool" : "tools"}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-10 text-center">
          <p className="text-primary-dim">No tools match that. Clear the search or pick a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill) => (
            <Link
              key={skill.slug}
              href={`/skills/${skill.slug}`}
              className="group bg-surface border border-border hover:border-accent rounded-lg transition-colors flex flex-col p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded font-display uppercase tracking-widest">
                  {skill.category}
                </span>
                <span className="text-xs text-muted uppercase tracking-widest font-display">
                  {skill.type}
                </span>
                <span className="ml-auto text-xs font-semibold text-accent">
                  {skill.price ? `£${skill.price}` : "Free"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground font-display group-hover:text-accent transition-colors mb-2 leading-snug">
                {skill.title}
              </h3>
              {skill.tagline && (
                <p className="text-sm text-primary-dim leading-relaxed line-clamp-4">{skill.tagline}</p>
              )}
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-1.5">
                {skill.requirements.slice(0, 4).map((r) => (
                  <span
                    key={r}
                    className="text-[11px] text-primary-dim bg-surface-alt border border-border px-2 py-0.5 rounded"
                  >
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted">
                {skill.size} &middot; {skill.fileCount} files &middot;{" "}
                <span className="text-foreground group-hover:text-accent transition-colors">download &rarr;</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
