import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-primary text-lg mb-3">
              Oloye<span className="text-accent">.</span>
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              Enterprise Marketing Manager specialising in automation, MarTech, and AI-powered marketing infrastructure.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted mb-3">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted hover:text-accent transition-colors">Home</Link>
              <Link href="/about" className="text-sm text-muted hover:text-accent transition-colors">About</Link>
              <Link href="/blog" className="text-sm text-muted hover:text-accent transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm text-muted hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted mb-3">Connect</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/oloyeadeosun/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://newsletter.gtmsignalstudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                Newsletter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} Oloye Adeosun. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
