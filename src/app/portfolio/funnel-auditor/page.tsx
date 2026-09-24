import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import FunnelAuditorClient from "./FunnelAuditorClient";

const TITLE = "Marketing Funnel & UK GDPR Compliance Auditor • Oloye Adeosun";
const DESCRIPTION =
  "Interactive diagnostic engine to audit marketing pipelines for lead leakage, CRM taxonomy gaps, and UK GDPR/PECR compliance risks.";

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

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Breadcrumb / Back Link */}
        <div className="flex items-center gap-2 text-xs text-muted">
          <Link href="/portfolio" className="hover:text-foreground transition">
            ← Back to Portfolio
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Funnel &amp; Compliance Auditor</span>
        </div>

        {/* Live Client Component */}
        <FunnelAuditorClient />
      </div>
    </>
  );
}
