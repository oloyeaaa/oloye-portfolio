"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Free Blueprint", href: "/free/lean-owned-pipeline-blueprint" },
  { name: "Blog & Tutorials", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition hover:opacity-80">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-border bg-surface">
            <Image
              src="/branding/avatar/photo-master.png"
              alt="Oloye Adeosun"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <span className="text-xl font-black">
            Oloye<span className="text-accent text-2xl font-black">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                pathname === item.href
                  ? "text-foreground font-semibold underline decoration-accent decoration-2 underline-offset-8"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/free/lean-owned-pipeline-blueprint"
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-accent transition hover:bg-foreground/90 hover:shadow-md"
          >
            Get Free Blueprint
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-muted hover:bg-surface md:hidden"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="border-b border-border bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/free/lean-owned-pipeline-blueprint"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg bg-foreground py-2.5 text-center text-sm font-semibold text-accent"
            >
              Get Free Blueprint
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
