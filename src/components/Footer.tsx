import Link from "next/link";
import Image from "next/image";
import { AUTHOR, LINKEDIN_URL, SOCIAL } from "@/lib/site";

const quickLinks = [
  { name: "Prompt Lab", href: "/free" },
  { name: "Case Studies", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "RSS Feed", href: "/feed.xml" },
];

const channels = [
  { name: "LinkedIn", href: LINKEDIN_URL },
  { name: "YouTube", href: SOCIAL.youtube },
  { name: "TikTok", href: SOCIAL.tiktok },
  { name: "Instagram", href: SOCIAL.instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 text-sm text-muted">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-border">
                <Image
                  src="/images/oloye-avatar.png"
                  alt="Oloye Adeosun"
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
              <span className="font-semibold text-foreground">{AUTHOR.name}</span>
            </div>
            <p className="text-xs leading-relaxed text-muted max-w-sm">
              Marketing Automation Specialist & AI Systems Operator. Showing 9-to-5 operators how to build real assets and buy back their time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Systems & Content</p>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs text-muted transition hover:text-accent">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Channels */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Connect</p>
            <ul className="mt-3 space-y-2">
              {channels.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted transition hover:text-accent"
                  >
                    {item.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} {AUTHOR.name}. All rights reserved.</p>
          <p className="text-[11px]">Powered by Google AI Studio, Gemini & Next.js</p>
        </div>
      </div>
    </footer>
  );
}
