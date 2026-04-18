import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Oloye Adeosun. Connect on LinkedIn or reach out via email.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Get in Touch</h1>
      <p className="text-muted leading-relaxed mb-12">
        Whether you want to discuss enterprise marketing, automation, AI, or anything else — I&apos;d love to hear from you. The best way to reach me is through LinkedIn.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <a
          href="https://www.linkedin.com/in/oloyeadeosun/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow bg-white group"
        >
          <div className="text-2xl mb-3">in</div>
          <h3 className="font-semibold text-primary group-hover:text-accent transition-colors mb-1">
            LinkedIn
          </h3>
          <p className="text-sm text-muted">Connect and message me directly.</p>
        </a>

        <a
          href="mailto:oloyedeadeosun2.0@gmail.com"
          className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow bg-white group"
        >
          <div className="text-2xl mb-3">@</div>
          <h3 className="font-semibold text-primary group-hover:text-accent transition-colors mb-1">
            Email
          </h3>
          <p className="text-sm text-muted">Drop me an email anytime.</p>
        </a>

        <a
          href="https://newsletter.gtmsignalstudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow bg-white group"
        >
          <div className="text-2xl mb-3">&#9993;</div>
          <h3 className="font-semibold text-primary group-hover:text-accent transition-colors mb-1">
            Newsletter
          </h3>
          <p className="text-sm text-muted">Weekly insights on enterprise marketing and AI.</p>
        </a>

        <a
          href="https://calendly.com/oloye-getclarioiq/audit"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow bg-white group"
        >
          <div className="text-2xl mb-3">&#128197;</div>
          <h3 className="font-semibold text-primary group-hover:text-accent transition-colors mb-1">
            Book a Call
          </h3>
          <p className="text-sm text-muted">Schedule a conversation on Calendly.</p>
        </a>
      </div>

      <div className="bg-surface rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-primary mb-3">Based in Kent, UK</h2>
        <p className="text-muted text-sm">
          Available for conversations about enterprise marketing roles, speaking opportunities, and collaborations.
        </p>
      </div>
    </div>
  );
}
