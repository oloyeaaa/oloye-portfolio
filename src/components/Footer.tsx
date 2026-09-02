import Link from "next/link";
import Image from "next/image";
import { AUTHOR, LINKEDIN_URL, SOCIAL } from "@/lib/site";

const navigation = [
  { name: "Expertise", href: "/#expertise" },
  { name: "Ventures (GSS & Practical AI)", href: "/ventures" },
  { name: "Blog & Teardowns", href: "/blog" },
  { name: "About Oloye", href: "/about" },
];

const ventures = [
  { name: "GTM Signal Studio (GSS)", href: "/ventures#gss" },
  { name: "Practical AI Hub", href: "/practical-ai-hub" },
];

const channels = [
  { name: "YouTube (@oloyeadeosun)", href: SOCIAL.youtube },
  { name: "LinkedIn", href: LINKEDIN_URL },
  { name: "TikTok (@practicalaihub1)", href: SOCIAL.tiktok },
  { name: "Instagram (@practicalaihub1)", href: SOCIAL.instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/oloye-avatar.png"
                alt="Oloye Adeosun"
                width={42}
                height={42}
                className="rounded-full ring-1 ring-border"
              />
              <div>
                <p className="font-display font-bold text-base text-primary">
                  Oloye Adeosun
                </p>
                <p className="text-xs text-muted font-mono">
                  GTM & Marketing Operations
                </p>
              </div>
            </Link>
            <p className="mt-4 text-sm text-primary-dim leading-relaxed">
              Bridging narrative product positioning with scalable revenue operations and intelligent automation.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-dim transition-colors hover:text-accent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent">
              Ventures Owned
            </h2>
            <ul className="mt-4 space-y-2.5">
              {ventures.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-dim transition-colors hover:text-accent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent">
              Connect & Media
            </h2>
            <ul className="mt-4 space-y-2.5">
              {channels.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-dim transition-colors hover:text-accent"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} Oloye Adeosun. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-accent">
            Buyer Psychology • AI Workflows • 0-Dollar Distribution
          </p>
        </div>
      </div>
    </footer>
  );
}
