import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Oloye Adeosun — Enterprise Marketing Manager specialising in automation, MarTech, and AI-powered marketing infrastructure.",
};

const timeline = [
  {
    year: "2026",
    title: "Marketing Manager, Enterprise & Automation",
    org: "Sorenson UK",
    description:
      "Leading enterprise campaign strategy, MarTech stack ownership, automation workflows, tracking/analytics, and web performance.",
    current: true,
  },
  {
    year: "2025",
    title: "Marketing Automation Specialist",
    org: "Sorenson UK",
    description:
      "Built and optimised marketing automation workflows, managed campaign execution, and improved lead scoring systems.",
  },
  {
    year: "2020–2024",
    title: "Self-Taught Marketing & Tech",
    org: "",
    description:
      "4+ years learning web development, copywriting, email marketing, AI, and automation. Built real projects, not just completed courses.",
  },
  {
    year: "2009–2020",
    title: "PMO Analyst & Corporate Career",
    org: "",
    description:
      "Project Management Office — developed discipline in process design, stakeholder management, and structured delivery.",
  },
];

const education = [
  {
    degree: "MSc International Business & Enterprise",
    institution: "UK University",
    year: "2009",
  },
  {
    degree: "BSc Business Administration",
    institution: "",
    year: "",
  },
];

const technicalSkills = [
  "HubSpot", "Marketo", "Pardot", "Salesforce",
  "Google Analytics 4", "Google Tag Manager", "Looker Studio",
  "HTML/CSS/JavaScript", "Python", "TypeScript",
  "Next.js", "Tailwind CSS", "Node.js",
  "Make.com", "Zapier", "n8n",
  "Claude AI", "OpenAI API", "Prompt Engineering",
  "A/B Testing", "CRO", "Technical SEO",
];

const domainSkills = [
  "Enterprise Campaign Strategy",
  "Marketing Automation Architecture",
  "MarTech Stack Selection & Integration",
  "Lead Scoring & Attribution Modelling",
  "Account-Based Marketing (ABM)",
  "Data Governance & Compliance",
  "Multi-Channel Orchestration",
  "AI-Powered Marketing Systems",
  "Stakeholder Communication",
  "Process Design & Documentation",
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Intro */}
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">About Me</h1>
        <div className="text-muted leading-relaxed space-y-4">
          <p>
            I&apos;m Oloye Adeosun, a Marketing Manager for Enterprise & Automation based in Kent, UK.
            I specialise in building the systems that make enterprise marketing actually work — automation
            workflows, MarTech integrations, tracking infrastructure, and increasingly, AI-powered tools
            that give marketing teams a genuine edge.
          </p>
          <p>
            My path here wasn&apos;t traditional. I spent 4+ years teaching myself web development, copywriting,
            email marketing, and AI alongside a corporate career in project management. That combination of
            PMO discipline and marketing creativity is what I bring to every project.
          </p>
          <p>
            I write about what I&apos;m building and learning — not textbook theory, but practical insights from
            the systems I work on every day. If you&apos;re an enterprise marketer trying to make sense of automation,
            AI, or your MarTech stack, you&apos;re in the right place.
          </p>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-primary mb-8">Career Timeline</h2>
        <div className="space-y-0">
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-8 pb-10 border-l-2 border-border last:pb-0">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-primary bg-white" />
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-semibold text-accent bg-red-50 px-2 py-0.5 rounded">
                  {item.year}
                </span>
                {item.current && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Current
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-primary">
                {item.title}
                {item.org && <span className="text-muted font-normal"> — {item.org}</span>}
              </h3>
              <p className="text-sm text-muted mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Education</h2>
        <div className="space-y-4">
          {education.map((item, index) => (
            <div key={index} className="border border-border rounded-lg p-5 bg-white">
              <h3 className="font-semibold text-primary">{item.degree}</h3>
              {(item.institution || item.year) && (
                <p className="text-sm text-muted mt-1">
                  {item.institution}
                  {item.institution && item.year && " · "}
                  {item.year}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {technicalSkills.map((skill) => (
            <span
              key={skill}
              className="text-sm px-3 py-1.5 rounded-full bg-surface-alt text-foreground border border-border"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Domain Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Domain Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {domainSkills.map((skill) => (
            <div key={skill} className="flex items-center gap-2 text-sm text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Want to connect?</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          I&apos;m always happy to talk about enterprise marketing, automation, or AI.
          Reach out on LinkedIn or check the blog for my latest thinking.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://www.linkedin.com/in/oloyeadeosun/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Connect on LinkedIn
          </a>
          <a
            href="/blog"
            className="border border-white/30 hover:border-white text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Read the Blog
          </a>
        </div>
      </section>
    </div>
  );
}
