import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

// Privacy policy (2 Nov 2026). Every line is checked against the code: the
// forms go to Make, then Airtable, MailerLite and Gmail; Google Analytics is in
// the layout; the leak check sends Claude only our own answer labels.

const TITLE = "Privacy";
const DESCRIPTION = "What we collect when you use oloye.co.uk or our forms, why, who helps us handle it, and how to see or delete it.";
const EMAIL = "info@oloyeaa.com";

export const metadata: Metadata = {
  title: { absolute: "Privacy policy | Oloye" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        This site is run by Oloye Adeosun, in Kent, UK. If you have a question about your data, email{" "}
        <a href={`mailto:${EMAIL}`} className="font-semibold text-foreground underline underline-offset-4">{EMAIL}</a>.
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <>
        <p>Only what you type or tap into our forms:</p>
        <ul>
          <li>Your first name and email address.</li>
          <li>Your answers, like your type of business, a message you send us, or the answers you pick in a free tool such as the lead leak check.</li>
          <li>If you use our lead form on TikTok, the answers you give there, like what best describes you.</li>
          <li>Whether you ticked the box to get our occasional emails.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Why we use it",
    body: (
      <ul>
        <li>To send you the free thing or result you asked for.</li>
        <li>To reply to you.</li>
        <li>If you said yes, to send you our occasional emails. You can stop these any time.</li>
      </ul>
    ),
  },
  {
    title: "Who helps us handle it",
    body: (
      <>
        <p>We use a few trusted services to run this. They handle your data for us, not for themselves:</p>
        <ul>
          <li><strong>Vercel</strong> hosts this website.</li>
          <li><strong>Make</strong> moves what you send in a form to the right place.</li>
          <li><strong>Airtable</strong> keeps our list of the people who contact us.</li>
          <li><strong>MailerLite</strong> sends our emails, if you said yes to them.</li>
          <li><strong>Google</strong> sends some of our emails (Gmail) and counts visits to the site (Google Analytics).</li>
          <li><strong>TikTok</strong> runs its own lead form, if you use it there.</li>
          <li>
            <strong>Anthropic (Claude)</strong> rewrites the wording of your lead leak check result. It only gets the
            answers you picked and your type of business. It never gets your name or email.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "We never sell it",
    body: <p>We don&apos;t sell, rent or share your data with anyone else.</p>,
  },
  {
    title: "How long we keep it",
    body: <p>Until you unsubscribe or ask us to delete it.</p>,
  },
  {
    title: "Your rights",
    body: (
      <>
        <p>Under UK data law (UK GDPR), you can:</p>
        <ul>
          <li>Ask to see the data we hold about you.</li>
          <li>Ask us to correct it.</li>
          <li>Ask us to delete it.</li>
          <li>Unsubscribe from our emails any time, with the link at the bottom of any email, or by replying &quot;stop&quot;.</li>
        </ul>
        <p>
          To ask, email <a href={`mailto:${EMAIL}`} className="font-semibold text-foreground underline underline-offset-4">{EMAIL}</a>.
          If you&apos;re not happy with how we handle your data, you can also contact the UK Information Commissioner&apos;s Office at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline underline-offset-4">ico.org.uk</a>.
        </p>
      </>
    ),
  },
  {
    title: "Cookies",
    body: (
      <p>
        This site uses Google Analytics, which sets cookies to count visits and see which pages are read. It doesn&apos;t
        tell us who you are. We don&apos;t use any other cookies, and no advertising cookies.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/privacy",
          title: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: TITLE, path: "/privacy" },
          ],
        })}
      />

      <div className="bg-surface">
        <section className="px-4 pb-10 pt-20 sm:px-6 sm:pt-28">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">Privacy policy</p>
            <h1 className="display mt-6 text-5xl text-foreground sm:text-6xl">
              Your data, <span className="lime-mark">in plain words.</span>
            </h1>
            <p className="mt-7 text-lg text-muted">Last updated: 2 November 2026</p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {SECTIONS.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl border border-border bg-background p-6 text-foreground sm:p-8 [&_li]:mt-2 [&_p+p]:mt-4 [&_p+ul]:mt-3 [&_ul+p]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
              >
                <h2 className="text-xl font-bold text-foreground">{s.title}</h2>
                <div className="mt-3 leading-relaxed text-muted">{s.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
