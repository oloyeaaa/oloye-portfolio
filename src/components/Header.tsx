"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BOOKING_URL, CHECKLIST_URL } from "@/lib/site";

const navigation = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "Proof", href: "/#proof" },
  { name: "Free checklist", href: CHECKLIST_URL },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-2xl font-black tracking-tight text-foreground" onClick={() => setMobileOpen(false)}>
          Oloye<span className="text-accent-dark">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition ${
                pathname === item.href ? "font-semibold text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-foreground/90"
          >
            Book a free call
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border py-4 text-lg font-medium text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <a
              href={BOOKING_URL}
              onClick={() => setMobileOpen(false)}
              className="mt-6 rounded-full bg-accent py-4 text-center text-sm font-bold text-foreground"
            >
              Book a free call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
