"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Agentic AI", href: "/agentic-ai-systems" },
  { name: "Skills", href: "/skills" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/85 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-primary font-display tracking-tight"
        >
          Oloye<span className="text-accent">.</span>
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
            href="/test-drive"
            className="bg-accent hover:bg-accent-light text-background px-4 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            Book a test
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4 bg-background">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium ${
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-accent"
                  : "text-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/test-drive"
            onClick={() => setMobileOpen(false)}
            className="bg-accent hover:bg-accent-light text-background px-4 py-2 rounded-md text-sm font-semibold text-center transition-colors"
          >
            Book a test
          </Link>
        </nav>
      )}
    </header>
  );
}
