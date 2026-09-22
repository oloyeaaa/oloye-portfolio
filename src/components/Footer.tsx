import Link from "next/link";
import Image from "next/image";
import { AUTHOR, LINKEDIN_URL, SOCIAL } from "@/lib/site";

const quickLinks = [
  { name: "The Lean Blueprint", href: "/free/lean-owned-pipeline-blueprint" },
  { name: "Blog Tutorials", href: "/blog" },
  { name: "How It Works", href: "/#how-it-works" },
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
    <footer className="border-t border-border bg-surface text-sm text-muted">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
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
              <span className="font-bold text-foreground">{AUTHOR.name}</span>
            </div>
            <p className="text-xs leading-relaxed text-muted max-w-xs">
              Audience-to-Asset Pipeline Architect. Helping content creators and solo founders turn social engagement into an automated, owned pipeline using simple AI.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Resources & Systems
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-foreground transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <ul className="space-y-2 text-xs">
              {channels.map((channel) => (
                <li key={channel.name}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground transition"
                  >
                    {channel.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-3">
          <p>© {new Date().getFullYear()} Oloye Adeosun. All rights reserved.</p>
          <p className="text-[11px]">Built with lean tools. Zero software bloat.</p>
        </div>
      </div>
    </footer>
  );
}
