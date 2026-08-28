"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Expertise", href: "/#expertise" },
  { name: "Ventures", href: "/ventures" },
  { name: "Teardowns & Insights", href: "/#teardowns" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/85 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/oloye-avatar.png"
            alt="Oloye Adeosun"
            width={38}
            height={38}
            className="rounded-full ring-1 ring-border group-hover:ring-accent transition"
            priority
          />
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-base text-primary">
              Oloye Adeosun
            </span>
            <span className="text-[11px] font-mono text-muted tracking-wide uppercase">
              Product Marketing & MOPs
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ||
                (item.href !== "/" && item.href !== "/#expertise" && item.href !== "/#teardowns" && pathname.startsWith(item.href))
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-accent-light shadow-sm"
          >
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="md:hidden text-sm font-medium px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-surface"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-border px-6 py-5 flex flex-col gap-4 bg-surface"
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
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="rounded-md bg-accent px-4 py-2.5 text-center text-sm font-semibold text-background shadow-sm"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      )}
    </header>
  );
}
