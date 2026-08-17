import Link from "next/link";
import Image from "next/image";
import { AUTHOR, LINKEDIN_URL, SOCIAL } from "@/lib/site";

// Rebuilt 2026-08-17. The old footer carried the "Oloye." wordmark, a
// "Book a test" link and a Calendly link, all from the retired agency.
// Nothing is booked and nothing is sold here now.

const explore = [
  { name: "Free tools", href: "/free" },
  { name: "Blog", href: "/blog" },
  { name: "Skills", href: "/skills" },
  { name: "The Practical Income Method", href: "/practical-income-method" },
  { name: "About", href: "/about" },
];

const social = [
  { name: "YouTube", href: SOCIAL.youtube },
  { name: "TikTok", href: SOCIAL.tiktok },
  { name: "Instagram", href: SOCIAL.instagram },
  { name: "LinkedIn", href: LINKEDIN_URL },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/oloye-avatar.png"
                alt="Oloye Adeosun"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-display font-bold tracking-tight leading-none">
                Oloye
                <span className="mx-1.5 font-normal text-muted">|</span>
                Practical AI Hub
              </span>
            </Link>
            <p className="mt-4 max-w-[38ch] text-sm text-muted">
              Helping people with a full-time job use AI to build extra income.
              Free tools, plain steps, honest numbers.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {explore.map((item) => (
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
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Follow
            </h2>
            <ul className="mt-4 space-y-2.5">
              {social.map((item) => (
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
              <li>
                <a
                  href={`mailto:${AUTHOR.email}`}
                  className="text-sm text-primary-dim transition-colors hover:text-accent"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} Practical AI Hub. Built by{" "}
            {AUTHOR.name}. Everything here is free.
          </p>
        </div>
      </div>
    </footer>
  );
}
