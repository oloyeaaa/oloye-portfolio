"use client";

import React, { useState, useEffect } from "react";

interface PipelineNode {
  id: string;
  title: string;
  category: string;
  tool: string;
  status: string;
  badgeColor: string;
  icon: string;
  description: string;
  telemetry: string;
}

const NODES: PipelineNode[] = [
  {
    id: "intake",
    title: "Zero-Latency Lead Intake",
    category: "01. Trigger & Capture",
    tool: "ManyChat + Webhook / TidyCal",
    status: "Active (200ms)",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    icon: "⚡",
    description: "Captures prospect DM keywords, form responses, or booked discovery calls with zero manual data entry.",
    telemetry: "Ingestion SLA: < 0.2s",
  },
  {
    id: "airtable",
    title: "Oloye Media OS Core",
    category: "02. Relational Database",
    tool: "Airtable Relational Engine",
    status: "7 Tables Linked",
    badgeColor: "bg-accent/20 text-foreground border-accent/40 font-semibold",
    icon: "🏛️",
    description: "Multi-stage pipeline connecting Deals, Companies, Contacts, Notes, Proposals, Tasks, and Projects.",
    telemetry: "Pipeline Value: £821,000",
  },
  {
    id: "gemini",
    title: "AI Enrichment Layer",
    category: "03. Intelligence",
    tool: "Google Gemini / AI Studio",
    status: "Auto-Enriching",
    badgeColor: "bg-blue-500/10 text-blue-700 border-blue-200",
    icon: "🧠",
    description: "Crawls prospect domain, extracts buying intent signals, and drafts structured 3-bullet briefing notes.",
    telemetry: "Tokens: ~420 / run",
  },
  {
    id: "proposals",
    title: "Dynamic Proposal Deck",
    category: "04. Deal Acceleration",
    tool: "Google Slides + Make.com",
    status: "Auto-Generated",
    badgeColor: "bg-purple-500/10 text-purple-700 border-purple-200",
    icon: "📊",
    description: "Converts Deal value & scope into a branded Google Slides presentation & client PDF in 60 seconds.",
    telemetry: "Format: PDF / Slides Link",
  },
  {
    id: "onboarding",
    title: "Deal Won & SOW Tasks",
    category: "05. Delivery Engine",
    tool: "Google Drive + Task Engine",
    status: "5 Tasks Provisioned",
    badgeColor: "bg-amber-500/10 text-amber-800 border-amber-200",
    icon: "🚀",
    description: "Instantly creates client Google Drive folder, generates 5 milestone SOW tasks, and kicks off delivery.",
    telemetry: "Handover SLA: Instant",
  },
];

export default function AutomationFlowVisualizer() {
  const [activeNode, setActiveNode] = useState<string>("airtable");
  const [pulseIndex, setPulseIndex] = useState<number>(0);

  // Auto-cycle through the nodes smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % NODES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const selected = NODES.find((n) => n.id === activeNode) || NODES[1];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xl">
      {/* Visualizer Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-alt/60 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono text-xs font-semibold text-muted">
            oloye-media-os // live-pipeline-telemetry.sys
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-dark" />
          </span>
          <span className="font-semibold text-foreground">Zero-Latency Flow Active</span>
        </div>
      </div>

      {/* Main Interactive Diagram */}
      <div className="p-4 sm:p-8 space-y-6">
        {/* Pipeline Nodes Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {NODES.map((node, idx) => {
            const isSelected = activeNode === node.id;
            const isPulsing = pulseIndex === idx;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`group relative flex flex-col items-start rounded-xl border p-3.5 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-foreground bg-foreground text-background shadow-lg scale-[1.02]"
                    : "border-border bg-surface hover:border-foreground/30 hover:bg-surface-alt/40 text-foreground"
                }`}
              >
                {/* Traveling Pulse Indicator */}
                {isPulsing && !isSelected && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-90" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                  </span>
                )}

                <div className="flex w-full items-center justify-between gap-1">
                  <span className="text-xl">{node.icon}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                      isSelected
                        ? "bg-white/10 text-accent border-white/20 font-bold"
                        : node.badgeColor
                    }`}
                  >
                    {node.status}
                  </span>
                </div>

                <p
                  className={`mt-2.5 text-xs font-bold leading-snug line-clamp-1 ${
                    isSelected ? "text-white" : "text-foreground"
                  }`}
                >
                  {node.title}
                </p>

                <p
                  className={`mt-0.5 font-mono text-[10px] ${
                    isSelected ? "text-gray-300" : "text-muted"
                  }`}
                >
                  {node.tool}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="rounded-xl border border-border bg-surface-alt/50 p-5 sm:p-6 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-xl text-accent shadow-sm">
                {selected.icon}
              </span>
              <div>
                <span className="font-mono text-[11px] font-bold text-muted uppercase tracking-wider">
                  {selected.category}
                </span>
                <h4 className="text-base font-extrabold text-foreground sm:text-lg">
                  {selected.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs font-semibold text-foreground shadow-xs">
                {selected.telemetry}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12 items-center">
            <p className="sm:col-span-8 text-xs sm:text-sm text-muted leading-relaxed">
              {selected.description}
            </p>

            <div className="sm:col-span-4 flex justify-start sm:justify-end">
              <div className="inline-flex items-center gap-2 rounded-lg bg-surface border border-border px-3 py-1.5 text-xs font-medium text-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Architecture: Lean &amp; Owned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-1 font-mono text-xs">
          <div className="rounded-lg border border-border/70 bg-surface p-3 text-center">
            <span className="text-[10px] text-muted block uppercase">Years in Automation</span>
            <span className="text-base font-black text-foreground">4+ Years</span>
          </div>
          <div className="rounded-lg border border-border/70 bg-surface p-3 text-center">
            <span className="text-[10px] text-muted block uppercase">Enterprise Ops</span>
            <span className="text-base font-black text-foreground">14+ Years</span>
          </div>
          <div className="rounded-lg border border-border/70 bg-surface p-3 text-center">
            <span className="text-[10px] text-muted block uppercase">Airtable OS Tables</span>
            <span className="text-base font-black text-foreground">7 Interlinked</span>
          </div>
          <div className="rounded-lg border border-border/70 bg-surface p-3 text-center">
            <span className="text-[10px] text-muted block uppercase">Turnkey Delivery</span>
            <span className="text-base font-black text-foreground">7-Day Sprint</span>
          </div>
        </div>
      </div>
    </div>
  );
}
