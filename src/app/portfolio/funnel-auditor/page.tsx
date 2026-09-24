import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import FunnelAuditorClient from "./FunnelAuditorClient";

const TITLE = "Marketing Funnel & UK GDPR Compliance Auditor • Oloye Adeosun";
const DESCRIPTION =
  "Interactive enterprise SaaS diagnostic engine to audit marketing pipelines for lead leakage, CRM taxonomy gaps, and UK GDPR/PECR compliance risks.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/portfolio/funnel-auditor` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/portfolio/funnel-auditor`,
    type: "website",
  },
};

export default function FunnelAuditorPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/portfolio/funnel-auditor",
          title: TITLE,
          description: DESCRIPTION,
          type: "WebPage",
        })}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Clean Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted font-medium">
            <Link href="/portfolio" className="hover:text-foreground transition flex items-center gap-1">
              <span>←</span>
              <span>All Systems</span>
            </Link>
            <span className="text-border-strong">/</span>
            <span className="text-foreground font-semibold">Funnel &amp; UK GDPR Diagnostic Engine</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px]">System Status: Operational</span>
          </div>
        </div>

        {/* The SaaS Application Canvas */}
        <FunnelAuditorClient />
      </div>
    </>
  );
}
