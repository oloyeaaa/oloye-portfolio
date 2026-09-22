"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Free Blueprint", href: "/free/lean-owned-pipeline-blueprint" },
  { name: "Blog & Tutorials", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-border transition group-hover:ring-accent">
            <Image
              src="/images/oloye-avatar.png"
              alt="Oloye Adeosun"
              fill
              className="object-cover"
              sizes="36px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-accent transition">
              Oloye Adeosun
            </span>
            <span className="text-[11px] font-medium text-muted">
              Pipeline Architecture & AI
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs font-semibold transition ${
                  active ? "text-accent" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            href="/free/lean-owned-pipeline-blueprint"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-accent-dark"
          >
            <span>Get Blueprint</span>
            <span>→</span>
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-b border-border bg-surface px-4 py-4 md:hidden space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-foreground py-1"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/free/lean-owned-pipeline-blueprint"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center rounded-lg bg-accent py-2.5 text-xs font-semibold text-white"
          >
            Get Free Blueprint →
          </Link>
        </div>
      )}
    </header>
  );
}
