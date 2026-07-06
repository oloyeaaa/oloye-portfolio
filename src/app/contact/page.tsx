import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Oloye. — Book a Front Desk Test",
  description:
    "Book a Front Desk test, connect on LinkedIn, or send an email. We work with owner-operated businesses globally.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Oloye. — Book a Front Desk Test",
    description:
      "Fastest way is Calendly. If it's a fit for the Front Desk you'll see a report by Friday.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

const channels = [
  {
    label: "Book the test",
    detail: "15 minutes on Calendly. First Front Desk report ships that week.",
    href: "https://calendly.com/oloye-getclarioiq/audit",
    external: true,
    primary: true,
  },
  {
    label: "LinkedIn",
    detail: "Connect or DM directly.",
    href: "https://www.linkedin.com/in/oloyeadeosun/",
    external: true,
  },
  {
    label: "Email",
    detail: "Drop a line any time.",
    href: "mailto:oloyedeadeosun2.0@gmail.com",
    external: false,
  },
];

export default function Contact() {
  const contactPage = webPageSchema({
    path: "/contact",
    title: "Contact Oloye. — Book a Front Desk Test",
    description:
      "Book a Front Desk test, connect on LinkedIn, or send an email.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
    type: "ContactPage",
  });

  return (
    <>
      <JsonLd data={contactPage} />
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display leading-tight">
            Get in touch
          </h1>
          <p className="text-primary-dim leading-relaxed mb-12 text-lg max-w-2xl">
            Fastest way is Calendly. If it&apos;s a fit for the Front Desk you&apos;ll see a report by Friday. If it&apos;s not, we&apos;ll say so and point you at what we&apos;d actually use in your seat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className={`group border rounded-xl p-6 transition-colors ${
                  c.primary
                    ? "border-accent/60 bg-surface hover:border-accent"
                    : "border-border bg-surface hover:border-accent"
                }`}
              >
                <h3
                  className={`font-semibold mb-2 font-display transition-colors ${
                    c.primary
                      ? "text-accent"
                      : "text-foreground group-hover:text-accent"
                  }`}
                >
                  {c.label}
                </h3>
                <p className="text-sm text-primary-dim leading-relaxed">
                  {c.detail}
                </p>
              </a>
            ))}
          </div>

          <div className="bg-surface border border-border rounded-xl p-8">
            <h2 className="text-lg font-semibold text-foreground mb-2 font-display">
              We work with owner-operated businesses globally.
            </h2>
            <p className="text-primary-dim text-sm">
              Time-zone friendly, async by default. Plumbers, coaches, salons, ecom, real estate, restaurants. If you own the inbox, we can train the Front Desk on it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
