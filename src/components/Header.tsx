"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Rebuilt 2026-08-17. The old nav pointed at the agency-era pages
// (/agentic-ai-systems, /about, /test-drive), all now archived.
// The logo is Oloye's real photograph, the same avatar as YouTube and TikTok,
// so the face is recognisable across every platform.
const navigation = [
  { name: "Free tools", href: "/free" },
  { name: "Skills", href: "/skills" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/85 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/oloye-avatar.png"
            alt="Oloye Adeosun"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
          <span className="font-display font-bold tracking-tight leading-none">
            <span className="text-primary">Oloye</span>
            <span className="mx-1.5 text-muted font-normal">|</span>
            <span className="text-primary">Practical AI Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/free"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
          >
            Get the free tools
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="md:hidden text-sm font-medium"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4"
        >
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
            href="/free"
            onClick={() => setMobileOpen(false)}
            className="rounded-md bg-foreground px-4 py-2 text-center text-sm font-semibold text-background"
          >
            Get the free tools
          </Link>
        </nav>
      )}
    </header>
  );
}
