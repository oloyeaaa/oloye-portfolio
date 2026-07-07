// Data layer for the Front Desk test reports. Reads the Front Desk Tests +
// Front Desk Messages tables from the Brain base at request time (ISR), the
// same pattern as the blog in ./airtable.ts. Reports are private client
// deliverables: shareable by link, noindex.

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID || "appSD2mpRbokvWzU6";
const TESTS_TABLE =
  process.env.AIRTABLE_FD_TESTS_TABLE || "tblhQ5fQJodqTb7LD";
const MESSAGES_TABLE =
  process.env.AIRTABLE_FD_MESSAGES_TABLE || "tblkLv05JzygyUEno";

const REVALIDATE = 60;

interface AirtableRecord<T> {
  id: string;
  fields: T;
  createdTime: string;
}

interface TestFields {
  Business?: string;
  Vertical?: string;
  "Run Date"?: string;
  "Message Count"?: number;
  "Handled End-to-End"?: number;
  Flagged?: number;
  "Report Slug"?: string;
  Status?: string;
  Notes?: string;
}

interface MessageFields {
  Order?: number;
  Inbound?: string;
  "Their Reply"?: string;
  "Their Response Time"?: string;
  "Draft Reply"?: string;
  "Proposed Action"?: string;
  "Threshold Decision"?: string;
  Escalated?: boolean;
  "Escalate Reason"?: string;
  Confidence?: string;
  Test?: string[];
}

export interface FrontDeskTest {
  id: string;
  business: string;
  vertical: string;
  runDate?: string;
  messageCount: number;
  handledEndToEnd: number;
  flagged: number;
  reportSlug: string;
  status: string;
}

export interface FrontDeskMessage {
  id: string;
  order: number;
  inbound: string;
  theirReply?: string;
  theirResponseTime?: string;
  draftReply: string;
  proposedAction: string;
  thresholdDecision: string;
  escalated: boolean;
  escalateReason?: string;
  confidence: string;
}

export interface FrontDeskReport {
  test: FrontDeskTest;
  messages: FrontDeskMessage[];
}

async function airtableGet<T>(
  tableId: string,
  query: string
): Promise<T | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${tableId}${query}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
        next: { revalidate: REVALIDATE },
      }
    );
    if (!res.ok) {
      console.warn(
        `[frontdesk] ${res.status} on ${tableId}: ${await res
          .text()
          .catch(() => "")}`
      );
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[frontdesk] fetch error on ${tableId}:`, err);
    return null;
  }
}

function mapTest(r: AirtableRecord<TestFields>): FrontDeskTest {
  return {
    id: r.id,
    business: r.fields.Business || "",
    vertical: r.fields.Vertical || "",
    runDate: r.fields["Run Date"],
    messageCount: r.fields["Message Count"] ?? 0,
    handledEndToEnd: r.fields["Handled End-to-End"] ?? 0,
    flagged: r.fields.Flagged ?? 0,
    reportSlug: r.fields["Report Slug"] || "",
    status: r.fields.Status || "Draft",
  };
}

function mapMessage(r: AirtableRecord<MessageFields>): FrontDeskMessage {
  return {
    id: r.id,
    order: r.fields.Order ?? 0,
    inbound: r.fields.Inbound || "",
    theirReply: r.fields["Their Reply"],
    theirResponseTime: r.fields["Their Response Time"],
    draftReply: r.fields["Draft Reply"] || "",
    proposedAction: r.fields["Proposed Action"] || "",
    thresholdDecision: r.fields["Threshold Decision"] || "",
    escalated: Boolean(r.fields.Escalated),
    escalateReason: r.fields["Escalate Reason"],
    confidence: r.fields.Confidence || "",
  };
}

export async function getFrontDeskReport(
  slug: string
): Promise<FrontDeskReport | null> {
  const safe = slug.replace(/'/g, "\\'");
  const params = new URLSearchParams({
    filterByFormula: `{Report Slug}='${safe}'`,
    maxRecords: "1",
  });
  const testData = await airtableGet<{
    records: AirtableRecord<TestFields>[];
  }>(TESTS_TABLE, `?${params.toString()}`);
  if (!testData || testData.records.length === 0) return null;
  const test = mapTest(testData.records[0]);

  // Fetch messages and keep those linked to this test. Volumes are small
  // (~10 per test); a single page is sufficient for v1.
  const msgParams = new URLSearchParams({ pageSize: "100" });
  const msgData = await airtableGet<{
    records: AirtableRecord<MessageFields>[];
  }>(MESSAGES_TABLE, `?${msgParams.toString()}`);
  const messages = (msgData?.records || [])
    .filter((r) => (r.fields.Test || []).includes(test.id))
    .map(mapMessage)
    .sort((a, b) => a.order - b.order);

  return { test, messages };
}

export function isFrontDeskConfigured(): boolean {
  return Boolean(API_KEY);
}
