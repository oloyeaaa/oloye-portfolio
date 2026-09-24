"use client";

import React, { useState, useMemo } from "react";

interface AuditState {
  leadCaptureMethod: number;
  slaResponseTime: number;
  dataValidation: number;
  crmPlatform: number;
  utmTaxonomy: number;
  analyticsDashboards: number;
  cookieConsent: number;
  marketingOptIn: number;
  dataRetentionJurisdiction: number;
  nurtureFlows: number;
  errorMonitoring: number;
  aiAugmentation: number;
}

const DEFAULT_STATE: AuditState = {
  leadCaptureMethod: 30,
  slaResponseTime: 30,
  dataValidation: 40,
  crmPlatform: 35,
  utmTaxonomy: 35,
  analyticsDashboards: 30,
  cookieConsent: 35,
  marketingOptIn: 35,
  dataRetentionJurisdiction: 30,
  nurtureFlows: 35,
  errorMonitoring: 35,
  aiAugmentation: 30,
};

const PRESETS: Record<string, AuditState> = {
  leaky_b2b: {
    leadCaptureMethod: 0,
    slaResponseTime: 0,
    dataValidation: 0,
    crmPlatform: 0,
    utmTaxonomy: 0,
    analyticsDashboards: 0,
    cookieConsent: 0,
    marketingOptIn: 0,
    dataRetentionJurisdiction: 0,
    nurtureFlows: 0,
    errorMonitoring: 0,
    aiAugmentation: 0,
  },
  growth_agency: {
    leadCaptureMethod: 20,
    slaResponseTime: 10,
    dataValidation: 10,
    crmPlatform: 25,
    utmTaxonomy: 20,
    analyticsDashboards: 10,
    cookieConsent: 20,
    marketingOptIn: 15,
    dataRetentionJurisdiction: 15,
    nurtureFlows: 20,
    errorMonitoring: 10,
    aiAugmentation: 15,
  },
  enterprise_gold: {
    leadCaptureMethod: 30,
    slaResponseTime: 30,
    dataValidation: 40,
    crmPlatform: 35,
    utmTaxonomy: 35,
    analyticsDashboards: 30,
    cookieConsent: 35,
    marketingOptIn: 35,
    dataRetentionJurisdiction: 30,
    nurtureFlows: 35,
    errorMonitoring: 35,
    aiAugmentation: 30,
  },
};

export default function FunnelAuditorClient() {
  const [state, setState] = useState<AuditState>(DEFAULT_STATE);
  const [activeTab, setActiveTab] = useState<"overview" | "p1" | "p2" | "p3" | "p4" | "roadmap">("overview");
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("enterprise_gold");

  // Scoring
  const p1Total = state.leadCaptureMethod + state.slaResponseTime + state.dataValidation;
  const p2Total = state.crmPlatform + state.utmTaxonomy + state.analyticsDashboards;
  const p3Total = state.cookieConsent + state.marketingOptIn + state.dataRetentionJurisdiction;
  const p4Total = state.nurtureFlows + state.errorMonitoring + state.aiAugmentation;

  const compositeScore = Math.round((p1Total + p2Total + p3Total + p4Total) / 4);

  // Status & Risk Badges
  const riskInfo = useMemo(() => {
    if (compositeScore < 50 || p3Total === 0) {
      return {
        label: "Critical Friction",
        badgeClass: "bg-red-50 text-red-700 border-red-200",
        gaugeColor: "#DC2626",
        leakage: "35% - 50%",
        gdpr: "Non-Compliant (High Risk)",
        slaStatus: "> 24h Delay",
      };
    }
    if (compositeScore < 80) {
      return {
        label: "Moderate Leakage",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        gaugeColor: "#D97706",
        leakage: "15% - 25%",
        gdpr: "Partial Consent Gap",
        slaStatus: "4-12h Routing",
      };
    }
    if (compositeScore < 95) {
      return {
        label: "Optimized & Compliant",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        gaugeColor: "#059669",
        leakage: "< 5%",
        gdpr: "UK GDPR / PECR Verified",
        slaStatus: "< 1h SLA",
      };
    }
    return {
      label: "Enterprise Standard",
      badgeClass: "bg-foreground text-accent border-foreground font-semibold",
      gaugeColor: "#0E0F12",
      leakage: "< 1%",
      gdpr: "100% PECR Compliant",
      slaStatus: "< 30s Instant",
    };
  }, [compositeScore, p3Total]);

  // Findings & Action Plan Generation
  const { findings, roadmap } = useMemo(() => {
    const list: { title: string; desc: string; severity: "HIGH" | "MEDIUM" | "OPTIMIZED"; area: string }[] = [];
    const steps: { phase: string; title: string; desc: string }[] = [];

    if (state.leadCaptureMethod === 0 || state.slaResponseTime === 0) {
      list.push({
        title: "Ingestion Latency & Manual CSV Bottleneck",
        desc: "Manual CSV exports or >24h lead routing delays cause immediate drop-off in sales conversion.",
        severity: "HIGH",
        area: "Lead Ingestion",
      });
      steps.push({
        phase: "Phase 1 (Immediate)",
        title: "Zero-Latency Webhook Ingestion",
        desc: "Deploy webhook listeners connecting lead forms directly to CRM with instant <5 min notification alerts.",
      });
    }

    if (state.marketingOptIn === 0) {
      list.push({
        title: "PECR Marketing Consent Non-Compliance",
        desc: "Pre-ticked opt-in checkboxes or bundled consent in T&Cs violate UK PECR regulations.",
        severity: "HIGH",
        area: "UK GDPR Governance",
      });
      steps.push({
        phase: "Phase 1 (Regulatory)",
        title: "Unbundled Consent Architecture",
        desc: "Reconfigure intake forms with explicit, unticked, unbundled marketing consent and transparent privacy notices.",
      });
    } else if (state.cookieConsent === 0) {
      list.push({
        title: "Unconsented Analytics & Tracking Pixels",
        desc: "Firing tracking pixels before explicit user consent breaches UK privacy standards.",
        severity: "MEDIUM",
        area: "Privacy Compliance",
      });
      steps.push({
        phase: "Phase 1 (Privacy)",
        title: "CMP & Consent Mode v2 Deployment",
        desc: "Integrate a Consent Management Platform via GTM with Consent Mode v2.",
      });
    }

    if (state.utmTaxonomy <= 10) {
      list.push({
        title: "Missing Corporate UTM Attribution Taxonomy",
        desc: "Ad-hoc or absent UTM tagging prevents closed-loop attribution, obscuring ad ROI.",
        severity: "MEDIUM",
        area: "Attribution",
      });
      steps.push({
        phase: "Phase 2 (Data Governance)",
        title: "Standardized UTM Generator & CRM Mapping",
        desc: "Deploy a corporate UTM taxonomy tool and capture UTM parameters into custom CRM fields.",
      });
    }

    if (state.crmPlatform <= 10) {
      list.push({
        title: "Unstructured Spreadsheets / Database Risk",
        desc: "Relying on spreadsheets for client pipelines creates version collisions and zero stage visibility.",
        severity: "HIGH",
        area: "CRM Infrastructure",
      });
      steps.push({
        phase: "Phase 2 (Database Architecture)",
        title: "Relational CRM Migration",
        desc: "Migrate pipeline data into a structured relational CRM (Salesforce / HubSpot / Airtable OS).",
      });
    }

    if (state.nurtureFlows <= 10) {
      list.push({
        title: "Absence of Automated Lifecycle Nurture",
        desc: "Leads receive only static confirmations or sit cold, losing momentum before sales calls.",
        severity: "MEDIUM",
        area: "Automation",
      });
      steps.push({
        phase: "Phase 3 (Lifecycle Nurture)",
        title: "Behavioral Email Welcome Sequence",
        desc: "Build an automated 3-to-5 day welcome sequence with dynamic personalization based on intake answers.",
      });
    }

    if (state.errorMonitoring === 0) {
      list.push({
        title: "Silent Webhook & Integration Failure Risk",
        desc: "No automated alerting means broken forms or expired API tokens stay undetected for days.",
        severity: "MEDIUM",
        area: "Operational Resilience",
      });
      steps.push({
        phase: "Phase 3 (Resilience)",
        title: "Automated Error Monitoring & Retries",
        desc: "Implement automated webhook dead-letter monitoring with real-time Slack/email failure notifications.",
      });
    }

    if (list.length === 0) {
      list.push({
        title: "All Core Governance & Funnel Nodes Operating Optimally",
        desc: "Zero-latency lead routing, closed-loop UTM attribution, 100% UK GDPR compliance, and automated nurture active.",
        severity: "OPTIMIZED",
        area: "Full Stack",
      });
      steps.push({
        phase: "Ongoing Governance",
        title: "Quarterly Audit Cadence",
        desc: "Maintain quarterly UTM taxonomy audits and review data retention schedules annually.",
      });
    }

    return { findings: list, roadmap: steps };
  }, [state]);

  const applyPreset = (key: string) => {
    setActivePreset(key);
    if (PRESETS[key]) {
      setState(PRESETS[key]);
    }
  };

  const copyMarkdownSummary = () => {
    const summary = `# 🛡️ Marketing Funnel & UK GDPR Diagnostic Report
**Evaluator:** Oloye Adeosun (Marketing Automation & Governance Specialist)
**Overall Pipeline Health:** ${compositeScore}/100 [${riskInfo.label}]

### 📊 Performance Telemetry:
* **Estimated Lead Drop-Off:** ${riskInfo.leakage}
* **UK GDPR / PECR Compliance:** ${riskInfo.gdpr}
* **Ingestion Score:** ${p1Total}/100
* **CRM & Taxonomy Score:** ${p2Total}/100
* **Governance Score:** ${p3Total}/100
* **Nurture & Resilience Score:** ${p4Total}/100

### 🔍 Diagnostic Findings:
${findings.map((f) => `- [${f.severity}] ${f.area}: ${f.title} - ${f.desc}`).join("\n")}

### 🚀 Recommended 3-Phase Execution Roadmap:
${roadmap.map((s, idx) => `${idx + 1}. [${s.phase}] ${s.title}: ${s.desc}`).join("\n")}

---
*Report generated via oloye.co.uk/portfolio/funnel-auditor*`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface shadow-xl overflow-hidden">
      {/* 1. SAAS APPLICATION TOP BAR */}
      <div className="border-b border-border bg-surface px-5 py-4 sm:px-8 flex flex-wrap items-center justify-between gap-4">
        {/* Left: App Logo & Workspace Selector */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-accent font-black text-sm shadow-xs">
            FG
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground tracking-tight">FunnelGuard Pro</span>
              <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground">
                v2.4 Enterprise
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Pipeline Telemetry: Active</span>
            </div>
          </div>
        </div>

        {/* Center/Right: Presets & Primary Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-border bg-background p-1 text-xs">
            <button
              onClick={() => applyPreset("leaky_b2b")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                activePreset === "leaky_b2b" ? "bg-surface font-semibold text-foreground shadow-xs" : "text-muted hover:text-foreground"
              }`}
            >
              🚨 Leaky Funnel
            </button>
            <button
              onClick={() => applyPreset("growth_agency")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                activePreset === "growth_agency" ? "bg-surface font-semibold text-foreground shadow-xs" : "text-muted hover:text-foreground"
              }`}
            >
              📈 Growth Tier
            </button>
            <button
              onClick={() => applyPreset("enterprise_gold")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                activePreset === "enterprise_gold" ? "bg-surface font-semibold text-foreground shadow-xs" : "text-muted hover:text-foreground"
              }`}
            >
              🏛️ Enterprise Gold
            </button>
          </div>

          <button
            onClick={copyMarkdownSummary}
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-accent transition hover:bg-foreground/90 shadow-sm"
          >
            <span>{copied ? "✓ Copied to Clipboard!" : "Export Diagnostic Report"}</span>
          </button>
        </div>
      </div>

      {/* 2. SAAS NAVIGATION TABS */}
      <div className="border-b border-border bg-surface-alt px-5 sm:px-8 flex items-center gap-2 overflow-x-auto text-xs font-medium py-1.5">
        <button
          onClick={() => setActiveTab("overview")}
          className={`rounded-lg px-3.5 py-1.5 transition whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-foreground font-semibold text-accent"
              : "text-muted hover:text-foreground hover:bg-surface"
          }`}
        >
          📊 Overview &amp; Matrix
        </button>
        <button
          onClick={() => setActiveTab("p1")}
          className={`rounded-lg px-3.5 py-1.5 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "p1"
              ? "bg-foreground font-semibold text-accent"
              : "text-muted hover:text-foreground hover:bg-surface"
          }`}
        >
          <span>01. Ingestion</span>
          <span className="rounded bg-surface px-1.5 py-0.2 text-[10px] font-mono text-foreground">{p1Total}%</span>
        </button>
        <button
          onClick={() => setActiveTab("p2")}
          className={`rounded-lg px-3.5 py-1.5 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "p2"
              ? "bg-foreground font-semibold text-accent"
              : "text-muted hover:text-foreground hover:bg-surface"
          }`}
        >
          <span>02. CRM Taxonomy</span>
          <span className="rounded bg-surface px-1.5 py-0.2 text-[10px] font-mono text-foreground">{p2Total}%</span>
        </button>
        <button
          onClick={() => setActiveTab("p3")}
          className={`rounded-lg px-3.5 py-1.5 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "p3"
              ? "bg-foreground font-semibold text-accent"
              : "text-muted hover:text-foreground hover:bg-surface"
          }`}
        >
          <span>03. UK GDPR</span>
          <span className="rounded bg-surface px-1.5 py-0.2 text-[10px] font-mono text-foreground">{p3Total}%</span>
        </button>
        <button
          onClick={() => setActiveTab("p4")}
          className={`rounded-lg px-3.5 py-1.5 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "p4"
              ? "bg-foreground font-semibold text-accent"
              : "text-muted hover:text-foreground hover:bg-surface"
          }`}
        >
          <span>04. Nurture Flows</span>
          <span className="rounded bg-surface px-1.5 py-0.2 text-[10px] font-mono text-foreground">{p4Total}%</span>
        </button>
        <button
          onClick={() => setActiveTab("roadmap")}
          className={`rounded-lg px-3.5 py-1.5 transition whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "roadmap"
              ? "bg-foreground font-semibold text-accent"
              : "text-muted hover:text-foreground hover:bg-surface"
          }`}
        >
          <span>🚀 14-Day Sprint</span>
          <span className="rounded bg-surface px-1.5 py-0.2 text-[10px] font-mono text-foreground">{roadmap.length}</span>
        </button>
      </div>

      {/* 3. SAAS METRIC RIBBON (4 Key KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border bg-surface">
        <div className="border-r border-b lg:border-b-0 border-border p-5 sm:p-6">
          <div className="text-[11px] font-mono text-muted uppercase tracking-wider font-semibold">Overall Pipeline Health</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-mono text-foreground">{compositeScore}</span>
            <span className="text-xs text-muted font-mono">/ 100</span>
          </div>
          <div className={`mt-2 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${riskInfo.badgeClass}`}>
            {riskInfo.label}
          </div>
        </div>

        <div className="border-b lg:border-b-0 lg:border-r border-border p-5 sm:p-6">
          <div className="text-[11px] font-mono text-muted uppercase tracking-wider font-semibold">Est. Lead Drop-Off</div>
          <div className="mt-1 text-3xl sm:text-4xl font-black font-mono text-foreground">
            {riskInfo.leakage}
          </div>
          <div className="mt-2 text-xs text-muted font-medium">
            {compositeScore > 85 ? "Zero Ingestion Leakage" : "High Drop-Off SLA"}
          </div>
        </div>

        <div className="border-r border-border p-5 sm:p-6">
          <div className="text-[11px] font-mono text-muted uppercase tracking-wider font-semibold">UK GDPR / PECR Status</div>
          <div className="mt-1 text-base sm:text-lg font-bold text-foreground line-clamp-1">
            {riskInfo.gdpr}
          </div>
          <div className="mt-2 text-xs text-muted font-medium">
            {p3Total === 100 ? "ICO Audit Ready" : "Requires Consent Review"}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="text-[11px] font-mono text-muted uppercase tracking-wider font-semibold">Routing Speed SLA</div>
          <div className="mt-1 text-3xl sm:text-4xl font-black font-mono text-foreground">
            {riskInfo.slaStatus}
          </div>
          <div className="mt-2 text-xs text-muted font-medium">Lead-to-Sales Webhook</div>
        </div>
      </div>

      {/* 4. MAIN CANVAS CONTENT AREA */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* TAB 1: OVERVIEW & HEALTH MATRIX */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 4 Pillar Matrix Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Governance &amp; Funnel Sub-Systems</h3>
                <span className="text-xs text-muted font-mono">4 Modules Configured</span>
              </div>

              {/* Module 1 */}
              <div
                onClick={() => setActiveTab("p1")}
                className="cursor-pointer rounded-xl border border-border bg-background p-4 sm:p-5 transition hover:border-foreground/40 hover:shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-xs font-mono font-bold text-accent">
                      01
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Inbound Ingestion &amp; Latency</h4>
                      <p className="text-[11px] text-muted">Routing: {state.slaResponseTime === 30 ? "< 5 min SLA (Instant)" : "> 4h Delay"}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-bold text-foreground">{p1Total}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${p1Total}%` }} />
                </div>
              </div>

              {/* Module 2 */}
              <div
                onClick={() => setActiveTab("p2")}
                className="cursor-pointer rounded-xl border border-border bg-background p-4 sm:p-5 transition hover:border-foreground/40 hover:shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-xs font-mono font-bold text-accent">
                      02
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">CRM Architecture &amp; Attribution</h4>
                      <p className="text-[11px] text-muted">UTM Standard: {state.utmTaxonomy === 35 ? "Closed-Loop Attribution" : "Ad-hoc / Missing"}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-bold text-foreground">{p2Total}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${p2Total}%` }} />
                </div>
              </div>

              {/* Module 3 */}
              <div
                onClick={() => setActiveTab("p3")}
                className="cursor-pointer rounded-xl border border-border bg-background p-4 sm:p-5 transition hover:border-foreground/40 hover:shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-xs font-mono font-bold text-accent">
                      03
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">UK GDPR &amp; PECR Governance</h4>
                      <p className="text-[11px] text-muted">Marketing Opt-in: {state.marketingOptIn === 35 ? "Unbundled & Explicit" : "Regulatory Risk"}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-bold text-foreground">{p3Total}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${p3Total}%` }} />
                </div>
              </div>

              {/* Module 4 */}
              <div
                onClick={() => setActiveTab("p4")}
                className="cursor-pointer rounded-xl border border-border bg-background p-4 sm:p-5 transition hover:border-foreground/40 hover:shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-xs font-mono font-bold text-accent">
                      04
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Automated Nurture &amp; Resilience</h4>
                      <p className="text-[11px] text-muted">Error Monitoring: {state.errorMonitoring === 35 ? "Slack / Dead-Letter Queue" : "Silent Failures"}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-bold text-foreground">{p4Total}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${p4Total}%` }} />
                </div>
              </div>
            </div>

            {/* Right: Real-time Findings Log (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Diagnostic Findings Log</h3>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">
                  {findings.length} Flagged
                </span>
              </div>

              <div className="rounded-xl border border-border bg-background p-4 sm:p-5 space-y-3.5">
                {findings.map((f, idx) => (
                  <div key={idx} className="border-b border-border/80 pb-3 last:border-b-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider">{f.area}</span>
                      <span
                        className={`rounded px-1.5 py-0.2 text-[9px] font-mono font-bold ${
                          f.severity === "HIGH"
                            ? "bg-red-100 text-red-800"
                            : f.severity === "MEDIUM"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {f.severity}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-foreground">{f.title}</div>
                    <div className="text-[11px] text-muted leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab("roadmap")}
                className="w-full rounded-lg bg-foreground py-2.5 text-xs font-semibold text-accent transition hover:bg-foreground/90 shadow-sm text-center"
              >
                View 14-Day Remediation Sprint Roadmap →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PILLAR 01 CONFIGURATION */}
        {activeTab === "p1" && (
          <div className="rounded-xl border border-border bg-background p-6 space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-mono font-bold text-accent-dark uppercase">Module 01</span>
              <h3 className="text-lg font-bold text-foreground">Inbound Ingestion &amp; Routing Latency</h3>
              <p className="text-xs text-muted">Configure how web form payloads move into sales routing and CRM distribution.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Lead Ingestion Mechanism</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "Manual CSV export / sporadic batch", pts: "0 pts (High Leak)" },
                    { val: 10, label: "Email notifications with manual entry", pts: "10 pts" },
                    { val: 20, label: "Standard form plugin (daily sync)", pts: "20 pts" },
                    { val: 30, label: "Zero-Latency Webhook / Direct API", pts: "30 pts (Instant)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, leadCaptureMethod: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.leadCaptureMethod === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Initial Lead Routing SLA</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "> 24h Response Delay", pts: "0 pts (High Drop-off)" },
                    { val: 10, label: "Within 4 to 12 Hours", pts: "10 pts (Manual)" },
                    { val: 20, label: "Within 1 Hour", pts: "20 pts (Semi-auto)" },
                    { val: 30, label: "< 5 Minutes (Instant Routing)", pts: "30 pts (Optimal)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, slaResponseTime: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.slaResponseTime === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Input Validation &amp; Sanitization</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "No validation (Junk in CRM)", pts: "0 pts" },
                    { val: 10, label: "Basic HTML required fields only", pts: "10 pts" },
                    { val: 20, label: "Corporate email validation", pts: "20 pts" },
                    { val: 40, label: "E.164 phone + auto-deduplication", pts: "40 pts (Enterprise)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, dataValidation: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.dataValidation === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PILLAR 02 CONFIGURATION */}
        {activeTab === "p2" && (
          <div className="rounded-xl border border-border bg-background p-6 space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-mono font-bold text-accent-dark uppercase">Module 02</span>
              <h3 className="text-lg font-bold text-foreground">CRM Architecture &amp; Attribution Taxonomy</h3>
              <p className="text-xs text-muted">Configure database structure, lifecycle stages, and campaign attribution.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Database &amp; CRM Architecture</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "Chaotic spreadsheets / email threads", pts: "0 pts" },
                    { val: 10, label: "Basic spreadsheet with manual stages", pts: "10 pts" },
                    { val: 25, label: "Standard CRM with basic stages", pts: "25 pts" },
                    { val: 35, label: "Relational CRM with strict lifecycle", pts: "35 pts (Enterprise)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, crmPlatform: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.crmPlatform === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">UTM &amp; Attribution Governance</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "No UTMs (Direct/Unknown traffic)", pts: "0 pts" },
                    { val: 10, label: "Ad-hoc UTMs with no taxonomy", pts: "10 pts" },
                    { val: 20, label: "Standard UTM spreadsheet builder", pts: "20 pts" },
                    { val: 35, label: "Enforced Corporate Taxonomy + CRM Map", pts: "35 pts (Closed-Loop)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, utmTaxonomy: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.utmTaxonomy === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Executive Reporting &amp; Dashboards</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "No reporting / manual guessing", pts: "0 pts" },
                    { val: 10, label: "Native GA4 reports only", pts: "10 pts" },
                    { val: 20, label: "Weekly manual spreadsheet compilation", pts: "20 pts" },
                    { val: 30, label: "Live Looker Studio (GA4 + CRM)", pts: "30 pts (Automated)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, analyticsDashboards: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.analyticsDashboards === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PILLAR 03 CONFIGURATION */}
        {activeTab === "p3" && (
          <div className="rounded-xl border border-border bg-background p-6 space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-mono font-bold text-accent-dark uppercase">Module 03</span>
              <h3 className="text-lg font-bold text-foreground">UK GDPR &amp; PECR Regulatory Governance</h3>
              <p className="text-xs text-muted">Audit consent mechanisms, privacy notices, and data sovereignty compliance.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Cookie &amp; Pixel Consent (PECR Rules)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "No banner / scripts fire prior to consent", pts: "0 pts (PECR Breach)" },
                    { val: 10, label: "Simple 'OK' disclaimer without opt-out", pts: "10 pts" },
                    { val: 20, label: "Standard CMP banner (cookies blocked)", pts: "20 pts" },
                    { val: 35, label: "Enterprise CMP + GTM Consent Mode v2", pts: "35 pts (Compliant)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, cookieConsent: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.cookieConsent === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Marketing Opt-In Checkboxes</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "Pre-ticked box or bundled in T&Cs", pts: "0 pts (Illegal)" },
                    { val: 15, label: "Unticked box with generic text", pts: "15 pts" },
                    { val: 35, label: "Unbundled, granular opt-in + privacy link", pts: "35 pts (Compliant)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, marketingOptIn: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.marketingOptIn === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Data Retention &amp; Sovereignty</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "Indefinite storage in plain spreadsheets", pts: "0 pts" },
                    { val: 15, label: "Cloud CRM without retention schedule", pts: "15 pts" },
                    { val: 30, label: "Documented schedule + UK/EEA adequacy", pts: "30 pts (Enterprise)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, dataRetentionJurisdiction: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.dataRetentionJurisdiction === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PILLAR 04 CONFIGURATION */}
        {activeTab === "p4" && (
          <div className="rounded-xl border border-border bg-background p-6 space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-mono font-bold text-accent-dark uppercase">Module 04</span>
              <h3 className="text-lg font-bold text-foreground">Automated Nurture &amp; Resilience</h3>
              <p className="text-xs text-muted">Configure multi-channel nurture flows, AI categorization, and error handling.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Lead Nurture Sequences</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "No automated follow-up (Leads sit cold)", pts: "0 pts" },
                    { val: 10, label: "Single static confirmation email", pts: "10 pts" },
                    { val: 20, label: "Basic 3-part email sequence", pts: "20 pts" },
                    { val: 35, label: "Behavioral multi-touch (Email + SMS/CRM)", pts: "35 pts (Dynamic)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, nurtureFlows: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.nurtureFlows === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Webhook Monitoring &amp; Dead-Letter Queue</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "Silent failures (Nobody knows when broken)", pts: "0 pts" },
                    { val: 10, label: "Manual log checking once a week", pts: "10 pts" },
                    { val: 20, label: "Automated email alerts on failure", pts: "20 pts" },
                    { val: 35, label: "Slack alerts + automatic retry queue", pts: "35 pts (Zero-Loss)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, errorMonitoring: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.errorMonitoring === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">AI Process Augmentation</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 0, label: "100% manual review & classification", pts: "0 pts" },
                    { val: 15, label: "Occasional manual AI prompting", pts: "15 pts" },
                    { val: 30, label: "Embedded LLM auto-tagging & summary", pts: "30 pts (Automated)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setState({ ...state, aiAugmentation: opt.val })}
                      className={`p-3 rounded-lg border text-left transition ${
                        state.aiAugmentation === opt.val
                          ? "border-foreground bg-surface font-semibold text-foreground shadow-xs"
                          : "border-border bg-surface-alt/50 text-muted hover:border-foreground/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{opt.pts}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ROADMAP & REMEDIATION */}
        {activeTab === "roadmap" && (
          <div className="rounded-xl border border-border bg-background p-6 space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-mono font-bold text-accent-dark uppercase">Execution Plan</span>
              <h3 className="text-lg font-bold text-foreground">14-Day Technical Remediation Sprint</h3>
              <p className="text-xs text-muted">Prioritized step-by-step engineering roadmap generated from current telemetry.</p>
            </div>

            <div className="space-y-4">
              {roadmap.map((s, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl border border-border bg-surface">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-foreground text-xs font-mono font-bold text-accent">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-wide">{s.phase}</span>
                    <h4 className="text-sm font-bold text-foreground">{s.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={copyMarkdownSummary}
                className="w-full rounded-lg bg-foreground py-2.5 text-xs font-semibold text-accent transition hover:bg-foreground/90 shadow-sm"
              >
                {copied ? "✓ Copied to Clipboard!" : "Copy Full Executive Proposal"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. SAAS APP FOOTER STATUS */}
      <div className="border-t border-border bg-surface-alt px-5 py-3 sm:px-8 flex flex-wrap items-center justify-between text-[11px] font-mono text-muted gap-2">
        <div>
          <span>Engine: React 19 • Tailwind CSS • UK GDPR / PECR Diagnostic Logic</span>
        </div>
        <div>
          <span>Architected by Oloye Adeosun (Marketing Automation &amp; Governance Specialist)</span>
        </div>
      </div>
    </div>
  );
}
