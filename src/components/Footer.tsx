import Link from "next/link";
import { BOOKING_URL, CHECKLIST_URL, LINKEDIN_URL, SOCIAL } from "@/lib/site";

// The "junk drawer": everything else people might look for.
const columns = [
  {
    title: "Work with us",
    links: [
      { name: "Book a free call", href: BOOKING_URL },
      { name: "How it works", href: "/#how-it-works" },
      { name: "Proof", href: "/#proof" },
      { name: "Case studies", href: "/case-studies" },
      { name: "About the founder", href: "/about" },
    ],
  },
  {
    title: "Free",
    links: [
      { name: "10 jobs to automate first", href: CHECKLIST_URL },
      { name: "Free tools", href: "/free" },
      { name: "Skills", href: "/skills" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Follow",
    links: [
      { name: "Instagram", href: SOCIAL.instagram },
      { name: "TikTok", href: SOCIAL.tiktok },
      { name: "YouTube", href: SOCIAL.youtube },
      { name: "LinkedIn", href: LINKEDIN_URL },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface pb-12 pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-2xl font-black tracking-tight text-foreground">
              Oloye<span className="text-accent-dark">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Simple automations that save your business time and money.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.name}>
                      {external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-foreground">
                          {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className="transition hover:text-foreground">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Oloye Adeosun. Kent, UK.</p>
          <p>Stop doing the same job twice.</p>
        </div>
      </div>
    </footer>
  );
}
