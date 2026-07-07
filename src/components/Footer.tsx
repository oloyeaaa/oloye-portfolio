import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link
              href="/"
              className="font-bold text-primary text-lg font-display tracking-tight"
            >
              Oloye<span className="text-accent">.</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mt-3 max-w-xs">
              Agentic AI systems that respond in under 60 seconds and do the next step for owner-operated businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-muted mb-3">
              Site
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm text-primary-dim hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                href="/oloye"
                className="text-sm text-primary-dim hover:text-accent transition-colors"
              >
                Oloye Adeosun
              </Link>
              <Link
                href="/blog"
                className="text-sm text-primary-dim hover:text-accent transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/test-drive"
                className="text-sm text-primary-dim hover:text-accent transition-colors"
              >
                Book a test
              </Link>
              <Link
                href="/contact"
                className="text-sm text-primary-dim hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-muted mb-3">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/oloyeadeosun/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-dim hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:oloyedeadeosun2.0@gmail.com"
                className="text-sm text-primary-dim hover:text-accent transition-colors"
              >
                Email
              </a>
              <a
                href="https://calendly.com/oloye-getclarioiq/audit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-dim hover:text-accent transition-colors"
              >
                Calendly
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>
            &copy; {new Date().getFullYear()} Oloye<span className="text-accent">.</span> All rights reserved.
          </p>
          <p>Owner-operated businesses, everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
