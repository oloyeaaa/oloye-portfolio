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
    <footer className="border-t border-border bg-surface pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-foreground">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border bg-surface">
                <Image
                  src="/branding/avatar/photo-master.png"
                  alt="Oloye Adeosun"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-black">
                Oloye<span className="text-accent text-xl font-black">.</span>
              </span>
            </Link>
            <p className="mt-3.5 max-w-md text-sm text-muted">
              Helping content creators and non-tech founders turn social views and engagement into an automated, owned pipeline using simple AI—without expensive software, coding, or tech overwhelm.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Resources</h4>
            <ul className="mt-3.5 space-y-2.5 text-sm text-muted">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Connect</h4>
            <ul className="mt-3.5 space-y-2.5 text-sm text-muted">
              {channels.map((ch) => (
                <li key={ch.name}>
                  <a
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-foreground"
                  >
                    {ch.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Oloye Adeosun. Kent, UK.</p>
          <p className="mt-2 sm:mt-0">Simple AI Pipelines for Creators & Founders</p>
        </div>
      </div>
    </footer>
  );
}
