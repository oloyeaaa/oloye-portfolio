"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Prompt Lab", href: "/free" },
  { name: "Case Studies", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-border transition group-hover:ring-accent">
            <Image
              src="/images/oloye-avatar.png"
              alt="Oloye Adeosun"
              fill
              className="object-cover"
              sizes="32px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground transition group-hover:text-accent">
              Oloye Adeosun
            </span>
            <span className="text-[11px] font-medium text-muted">
              Systems Operator
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs font-medium transition ${
                  active
                    ? "text-accent font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/free"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-background transition hover:bg-accent/90 shadow-sm"
          >
            <span>Get Free Prompts</span>
            <span>⚡</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted hover:bg-surface hover:text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-b border-border bg-surface px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-background"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/free"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-background"
            >
              <span>Get Free Prompts ⚡</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
