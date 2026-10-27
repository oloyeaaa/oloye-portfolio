import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL, BOOKING_URL, SOCIAL, LINKEDIN_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";

// Contact: book a call (the main way), send a message (lands in the Airtable
// Leads table), or a DM. No email address on show; the form does that job.

const TITLE = "Contact";
const DESCRIPTION = "Book a free call or send a short message about the job that's eating your week. A real person reads every one.";

export const metadata: Metadata = {
  title: { absolute: "Contact | Oloye" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contact` },
};

const SOCIALS = [
  { name: "Instagram", href: SOCIAL.instagram, line: "Send a DM" },
  { name: "TikTok", href: SOCIAL.tiktok, line: "Comment or DM" },
  { name: "LinkedIn", href: LINKEDIN_URL, line: "Send a message" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/contact",
          title: TITLE,
          description: DESCRIPTION,
          type: "ContactPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: TITLE, path: "/contact" },
          ],
        })}
      />

      <div className="bg-surface">
        <section className="px-4 pb-10 pt-20 sm:px-6 sm:pt-28">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-foreground sm:text-7xl">
              Tell us what&apos;s <span className="lime-mark">eating your week.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
              Book a free call, or send a short message. A real person reads every one.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl bg-accent p-8">
                <p className="eyebrow !text-foreground/70">The quickest way</p>
                <p className="display mt-4 text-3xl text-foreground">Book a free call</p>
                <p className="mt-3 text-foreground/70">
                  We look at the job together and tell you what we&apos;d build first. No cost, no pressure.
                </p>
                <a
                  href={BOOKING_URL}
                  className="mt-7 inline-flex rounded-lg bg-foreground px-6 py-4 text-sm font-bold text-accent transition hover:bg-foreground/90"
                >
                  Pick a time →
                </a>
              </div>

              <div className="rounded-3xl border border-border p-8">
                <p className="eyebrow">Or find us here</p>
                <ul className="mt-4 divide-y divide-border">
                  {SOCIALS.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-4 text-foreground transition hover:text-accent-dark"
                      >
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-sm text-muted">{s.line} →</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="eyebrow mb-4">Send a message</p>
              <ContactForm />
            </div>
          </div>
        </section>

        <Faq items={FAQS.contact} />
      </div>
    </>
  );
}
