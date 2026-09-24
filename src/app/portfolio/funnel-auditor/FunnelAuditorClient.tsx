"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

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
  const [copied, setCopied] = useState(false);

  // Pillar 1: Inbound Capture (Max 100)
  const p1Total = state.leadCaptureMethod + state.slaResponseTime + state.dataValidation;
  // Pillar 2: CRM & Attribution (Max 100)
  const p2Total = state.crmPlatform + state.utmTaxonomy + state.analyticsDashboards;
  // Pillar 3: UK GDPR & Governance (Max 100)
  const p3Total = state.cookieConsent + state.marketingOptIn + state.dataRetentionJurisdiction;
  // Pillar 4: Nurture & Resilience (Max 100)
  const p4Total = state.nurtureFlows + state.errorMonitoring + state.aiAugmentation;

  const compositeScore = Math.round((p1Total + p2Total + p3Total + p4Total) / 4);

  // Status & Risk Badges
  const riskInfo = useMemo(() => {
    if (compositeScore < 50 || p3Total === 0) {
      return {
        label: "Critical Friction & Regulatory Risk",
        colorClass: "bg-red-500/10 text-red-700 border-red-200",
        gaugeColor: "#DC2626",
        leakage: "35% - 50% Lead Drop-off",
        gdpr: "High ICO Regulatory Exposure",
      };
    }
    if (compositeScore < 80) {
      return {
        label: "Moderate Operational Inefficiency",
        colorClass: "bg-amber-500/10 text-amber-800 border-amber-200",
        gaugeColor: "#D97706",
        leakage: "15% - 25% Lead Drop-off",
        gdpr: "Moderate (Missing Granular Consent)",
      };
    }
    if (compositeScore < 95) {
      return {
        label: "Optimized & Compliant",
        colorClass: "bg-emerald-500/10 text-emerald-800 border-emerald-200",
        gaugeColor: "#059669",
        leakage: "< 5% (Clean Ingestion)",
        gdpr: "Low Risk / UK GDPR & PECR Compliant",
      };
    }
    return {
      label: "Enterprise Gold Standard",
      colorClass: "bg-accent/20 text-accent-dark border-accent-dark/30 font-semibold",
      gaugeColor: "#446100",
      leakage: "< 1% (Zero-Latency Pipeline)",
      gdpr: "Fully Compliant & Documented",
    };
  }, [compositeScore, p3Total]);

  // Findings & Action Plan Generation
  const { findings, roadmap } = useMemo(() => {
    const list: { title: string; desc: string; type: "danger" | "warn" | "ok" }[] = [];
    const steps: string[] = [];

    if (state.leadCaptureMethod === 0 || state.slaResponseTime === 0) {
      list.push({
        title: "Ingestion Latency & Manual CSV Bottleneck",
        desc: "Manual CSV exports or >24h lead routing delays cause immediate drop-off in prospect intent and sales conversion.",
        type: "danger",
      });
      steps.push("Deploy zero-latency webhooks (Make/Zapier) connecting all lead forms directly to your CRM with <5 min team alerts.");
    }

    if (state.marketingOptIn === 0) {
      list.push({
        title: "PECR Marketing Consent Non-Compliance",
        desc: "Pre-ticked opt-in checkboxes or bundled consent in T&Cs violate UK PECR regulations, exposing the business to ICO enforcement.",
        type: "danger",
      });
      steps.push("Reconfigure intake forms with explicit, unticked, unbundled marketing consent and transparent privacy notices.");
    } else if (state.cookieConsent === 0) {
      list.push({
        title: "Unconsented Analytics & Pixel Tracking",
        desc: "Firing tracking pixels before explicit user consent breaches UK privacy standards. A compliant CMP is required.",
        type: "warn",
      });
      steps.push("Integrate a Consent Management Platform (e.g. Cookiebot/Meru) via GTM with Consent Mode v2.");
    }

    if (state.utmTaxonomy <= 10) {
      list.push({
        title: "Missing Corporate UTM Attribution Taxonomy",
        desc: "Ad-hoc or absent UTM tagging prevents closed-loop attribution, obscuring which campaigns drive actual revenue.",
        type: "warn",
      });
      steps.push("Standardize a corporate UTM generator and map attribution parameters into custom CRM fields.");
    }

    if (state.crmPlatform <= 10) {
      list.push({
        title: "Unstructured Spreadsheets / Database Risk",
        desc: "Relying on spreadsheets for client pipelines creates version collisions, data leakage, and zero stage visibility.",
        type: "danger",
      });
      steps.push("Migrate pipeline data into a structured relational CRM (Salesforce, HubSpot, or custom Airtable OS).");
    }

    if (state.nurtureFlows <= 10) {
      list.push({
        title: "Absence of Automated Lifecycle Nurture",
        desc: "Leads receive only static confirmations or sit cold, losing momentum before sales engagement.",
        type: "warn",
      });
      steps.push("Build an automated 3-to-5 day welcome sequence with dynamic personalization based on lead intake answers.");
    }

    if (state.errorMonitoring === 0) {
      list.push({
        title: "Silent Webhook & Integration Failure Risk",
        desc: "No automated alerting means broken forms or expired API tokens can stay undetected for days.",
        type: "warn",
      });
      steps.push("Implement automated webhook monitoring with real-time Slack/email failure notifications.");
    }

    if (list.length === 0) {
      list.push({
        title: "All Core Governance & Funnel Nodes Operating Optimally",
        desc: "Your pipeline combines instant ingestion, structured CRM taxonomy, full UK GDPR compliance, and automated nurture.",
        type: "ok",
      });
      steps.push("Maintain quarterly UTM audits and review data retention schedules annually.");
    }

    return { findings: list, roadmap: steps };
  }, [state]);

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

### 🔍 Key Diagnostic Findings:
${findings.map((f) => `- [${f.type.toUpperCase()}] ${f.title}: ${f.desc}`).join("\n")}

### 🚀 Recommended 3-Phase Execution Roadmap:
${roadmap.map((s, idx) => `${idx + 1}. ${s}`).join("\n")}

---
*Report generated via oloye.co.uk/portfolio/funnel-auditor*`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-10">
      {/* Header & Preset Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="inline-block rounded-md bg-accent/20 px-2.5 py-1 text-xs font-mono font-semibold text-foreground uppercase tracking-wide">
            Interactive Diagnostic Engine
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Marketing Funnel & Governance Auditor
          </h2>
          <p className="mt-1 text-sm text-muted">
            Configure your funnel parameters below to calculate real-time lead leakage, attribution gaps, and UK GDPR/PECR compliance risks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setState(PRESETS.leaky_b2b)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-alt transition"
          >
            🚨 Load Leaky B2B
          </button>
          <button
            onClick={() => setState(PRESETS.growth_agency)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-alt transition"
          >
            📈 Load Growth Funnel
          </button>
          <button
            onClick={() => setState(PRESETS.enterprise_gold)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-alt transition"
          >
            🏛️ Load Enterprise Gold
          </button>
        </div>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Interactive Form Controls (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Pillar 1 */}
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-xs font-mono font-bold text-accent">
                  01
                </span>
                <h3 className="text-base font-bold text-foreground">
                  Inbound Lead Ingestion & Latency
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-muted">{p1Total}/100 pts</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Lead Ingestion Mechanism
                </label>
                <select
                  value={state.leadCaptureMethod}
                  onChange={(e) => setState({ ...state, leadCaptureMethod: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>Manual CSV download / sporadic batch import (0 pts)</option>
                  <option value={10}>Email notification with manual copy-paste (10 pts)</option>
                  <option value={20}>Standard form plugin with daily scheduled sync (20 pts)</option>
                  <option value={30}>Zero-Latency Webhook / Direct API (Make / Zapier / Native) (30 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Initial Lead Routing SLA
                </label>
                <select
                  value={state.slaResponseTime}
                  onChange={(e) => setState({ ...state, slaResponseTime: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>&gt; 24 Hours or whenever someone checks inbox (0 pts)</option>
                  <option value={10}>Within 4 to 12 Hours (Manual sales assignment) (10 pts)</option>
                  <option value={20}>Within 1 Hour (Semi-automated notification) (20 pts)</option>
                  <option value={30}>&lt; 5 Minutes (Instant webhook routing &amp; rep alert) (30 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Input Sanitization &amp; Deduplication
                </label>
                <select
                  value={state.dataValidation}
                  onChange={(e) => setState({ ...state, dataValidation: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>No validation; duplicates and junk pollute CRM (0 pts)</option>
                  <option value={10}>Basic HTML form required fields only (10 pts)</option>
                  <option value={20}>Corporate email validation &amp; deduplication check (20 pts)</option>
                  <option value={40}>Full phone sanitization (E.164), domain lookup &amp; auto-merge (40 pts)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-xs font-mono font-bold text-accent">
                  02
                </span>
                <h3 className="text-base font-bold text-foreground">
                  CRM Architecture &amp; Attribution Taxonomy
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-muted">{p2Total}/100 pts</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Central Database Architecture
                </label>
                <select
                  value={state.crmPlatform}
                  onChange={(e) => setState({ ...state, crmPlatform: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>Chaotic spreadsheets / email inbox storage (0 pts)</option>
                  <option value={10}>Basic spreadsheet with manual stage updates (10 pts)</option>
                  <option value={25}>Standard CRM (HubSpot / Pipedrive / Airtable) with basic stages (25 pts)</option>
                  <option value={35}>Structured Relational CRM (Salesforce / Airtable OS) with strict lifecycle stages (35 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Campaign UTM &amp; Attribution Standards
                </label>
                <select
                  value={state.utmTaxonomy}
                  onChange={(e) => setState({ ...state, utmTaxonomy: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>No UTMs; all traffic shows as Direct/Unknown (0 pts)</option>
                  <option value={10}>Ad-hoc UTMs created manually with no convention (10 pts)</option>
                  <option value={20}>Standard UTM builder used by marketing team (20 pts)</option>
                  <option value={35}>Enforced Corporate UTM Taxonomy with closed-loop CRM attribution (35 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Executive Dashboards &amp; Reporting
                </label>
                <select
                  value={state.analyticsDashboards}
                  onChange={(e) => setState({ ...state, analyticsDashboards: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>No centralized reporting; guessing results (0 pts)</option>
                  <option value={10}>Native GA4 reports only (sporadic check) (10 pts)</option>
                  <option value={20}>Weekly manual spreadsheet compilation (20 pts)</option>
                  <option value={30}>Live automated Looker Studio dashboard connected to CRM + GA4 (30 pts)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-xs font-mono font-bold text-accent">
                  03
                </span>
                <h3 className="text-base font-bold text-foreground">
                  UK GDPR &amp; PECR Governance
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-muted">{p3Total}/100 pts</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Cookie &amp; Tracking Pixel Consent (PECR)
                </label>
                <select
                  value={state.cookieConsent}
                  onChange={(e) => setState({ ...state, cookieConsent: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>No cookie banner / scripts fire before consent (0 pts - HIGH RISK)</option>
                  <option value={10}>Simple &apos;OK&apos; disclaimer without opt-out controls (10 pts)</option>
                  <option value={20}>Standard CMP banner (cookies blocked prior to consent) (20 pts)</option>
                  <option value={35}>Enterprise CMP (Cookiebot/OneTrust/Meru) + GTM Consent Mode v2 (35 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Marketing Opt-In Checkboxes (PECR Rules)
                </label>
                <select
                  value={state.marketingOptIn}
                  onChange={(e) => setState({ ...state, marketingOptIn: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>Pre-ticked opt-in box or bundled in T&amp;Cs (0 pts - PECR VIOLATION)</option>
                  <option value={15}>Unticked checkbox with generic disclaimer (15 pts)</option>
                  <option value={35}>Granular, unbundled opt-in with explicit channels &amp; privacy link (35 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Data Retention &amp; Sovereignty
                </label>
                <select
                  value={state.dataRetentionJurisdiction}
                  onChange={(e) => setState({ ...state, dataRetentionJurisdiction: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>Indefinite customer data storage in unencrypted sheets (0 pts)</option>
                  <option value={15}>Standard cloud CRM without documented retention schedule (15 pts)</option>
                  <option value={30}>Documented retention schedule, encryption &amp; UK/EEA adequacy (30 pts)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-xs font-mono font-bold text-accent">
                  04
                </span>
                <h3 className="text-base font-bold text-foreground">
                  Automated Nurture &amp; Resilience
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-muted">{p4Total}/100 pts</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Automated Lead Nurture Sequences
                </label>
                <select
                  value={state.nurtureFlows}
                  onChange={(e) => setState({ ...state, nurtureFlows: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>No follow-up; leads sit cold until manual outreach (0 pts)</option>
                  <option value={10}>Single automated confirmation email only (10 pts)</option>
                  <option value={20}>Basic 3-part generic email sequence (20 pts)</option>
                  <option value={35}>Behavioral dynamic multi-touch sequence (Email + SMS/WhatsApp + CRM sync) (35 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Webhook Error Handling &amp; Alerting
                </label>
                <select
                  value={state.errorMonitoring}
                  onChange={(e) => setState({ ...state, errorMonitoring: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>Silent failures; nobody knows when integration breaks (0 pts)</option>
                  <option value={10}>Checking error logs manually once a week (10 pts)</option>
                  <option value={20}>Automated email notifications on failed runs (20 pts)</option>
                  <option value={35}>Dead-letter queue with instant Slack/Teams alerts &amp; auto-retries (35 pts)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  AI Process Augmentation
                </label>
                <select
                  value={state.aiAugmentation}
                  onChange={(e) => setState({ ...state, aiAugmentation: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-foreground focus:outline-none"
                >
                  <option value={0}>100% manual review and classification (0 pts)</option>
                  <option value={15}>Manual prompting in ChatGPT/Claude as needed (15 pts)</option>
                  <option value={30}>Embedded AI workflows (LLM auto-summarizing briefs, tagging intent &amp; urgency) (30 pts)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Executive Scorecard & Action Roadmap (5 cols) */}
        <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-24">
          {/* Main Scorecard */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-muted uppercase">
                Overall Pipeline Health
              </span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${riskInfo.colorClass}`}>
                {riskInfo.label}
              </span>
            </div>

            {/* Score Ring Display */}
            <div className="flex items-center gap-5 border-b border-border pb-5">
              <div className="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-border bg-surface-alt">
                <span className="text-3xl font-black font-mono text-foreground">{compositeScore}</span>
                <span className="text-[10px] font-mono text-muted">/ 100</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">Lead Drop-Off:</span>
                  <span className="font-semibold text-foreground">{riskInfo.leakage}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">UK GDPR Risk:</span>
                  <span className="font-semibold text-foreground">{riskInfo.gdpr}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted">Audited By:</span>
                  <span className="font-semibold text-foreground">Oloye Adeosun</span>
                </div>
              </div>
            </div>

            {/* Category Progress Bars */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] text-muted mb-1">
                  <span>01. Ingestion Latency</span>
                  <span className="font-semibold text-foreground">{p1Total}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${p1Total}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] text-muted mb-1">
                  <span>02. CRM &amp; UTM Taxonomy</span>
                  <span className="font-semibold text-foreground">{p2Total}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${p2Total}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] text-muted mb-1">
                  <span>03. UK GDPR Governance</span>
                  <span className="font-semibold text-foreground">{p3Total}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${p3Total}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] text-muted mb-1">
                  <span>04. Nurture &amp; Resilience</span>
                  <span className="font-semibold text-foreground">{p4Total}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-surface-alt overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${p4Total}%` }} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={copyMarkdownSummary}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-xs font-semibold text-accent transition hover:bg-foreground/90 shadow-sm"
              >
                <span>{copied ? "✓ Copied to Clipboard!" : "Copy Executive Diagnostic Summary"}</span>
              </button>
            </div>
          </div>

          {/* Diagnostic Findings Box */}
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
              Diagnostic Findings ({findings.length})
            </h4>

            <div className="space-y-2.5">
              {findings.map((f, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border p-3 text-xs leading-relaxed ${
                    f.type === "danger"
                      ? "border-red-200 bg-red-50 text-red-900"
                      : f.type === "warn"
                      ? "border-amber-200 bg-amber-50 text-amber-900"
                      : "border-emerald-200 bg-emerald-50 text-emerald-900"
                  }`}
                >
                  <p className="font-bold">{f.title}</p>
                  <p className="mt-0.5 text-[11px] opacity-90">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Roadmap */}
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
              Recommended 3-Phase Execution Sprint
            </h4>

            <ol className="list-decimal pl-4 space-y-2 text-xs text-muted leading-relaxed">
              {roadmap.map((step, idx) => (
                <li key={idx} className="text-foreground">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
