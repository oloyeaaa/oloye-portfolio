# Portfolio Roadmap & Project Context

_Last updated: 2026-04-20_

## What this site is

Oloye Adeosun's personal portfolio + authority blog at (future) custom domain. Built with Next.js 16 + Tailwind 4 + markdown blog.

## Positioning

**Practitioner-authority site for MarTech, Salesforce, AI and Automation.**

Audience is layered:

1. **Peers / hiring managers / clients** — the "enterprise marketing manager who ships real systems" signal. Existing posts (AI visibility, lead scoring, MarTech stack, enterprise leadership, reporting) serve this lane.
2. **Career-switchers into MarTech / Salesforce** — people losing their jobs to AI or hitting a ceiling, looking for a credible, practitioner-led path in. The new "Playbooks" category serves this lane. Angle: *"I do this for a living — most people teaching it don't."*

No paid offer yet. Authority first, monetisation later (estimated several months out).

## What's shipped

- 10 blog posts live under `content/posts/`:
  - 5 original thought-leader posts (AI & Enterprise, MarTech, Marketing Ops, Leadership, Lead Scoring categories)
  - 5 **Playbooks** category posts, data-backed, career-switcher-facing
- Blog filter UI picks up new categories automatically from frontmatter (no code change needed to add one)
- Underlying job-demand research pipeline (see below)

## Research pipeline (external)

Located at `C:\Users\Oloye\OneDrive\GSS\research\martech-jobs-uk-2026\`.

- Pulls live UK job ads from Adzuna API
- Extracts skill / tool / cert mentions against an editable taxonomy (`config.yaml`)
- Outputs charts (`output/charts/`), a JSON summary, and a markdown report
- First run: 1,256 unique ads, April 2026. Re-run anytime.

Playbooks posts should be grounded in this data wherever possible.

## Key signals from the data (use in future posts)

- **Salesforce Admin** is the only cert with real UK recruiter demand (18 of 21 cert mentions)
- **HubSpot dominates Marketo** 9.5× in UK mentions (38 vs 4)
- **Stakeholder management** is the #1 skill mentioned across all 1,256 ads (41)
- **Marketing Cloud (SFMC)** carries the highest median advertised salary among Salesforce skills (~£60k)
- **Data Cloud** is a low-volume, high-pay niche (median ~£67k, n=5)
- **AI skills** (OpenAI, Claude) barely register in job ads yet — early positioning opportunity, not demand-led

Caveat: Adzuna returns description snippets, not full JDs. Use *ordering* as the signal, not raw counts. Always disclose the methodology caveat in data-driven posts.

## Post conventions

- Markdown in `content/posts/`, kebab-case filenames
- Required frontmatter: `title`, `date` (YYYY-MM-DD), `category`, `excerpt`, `tags` (array)
- Target length: 500–750 words
- Voice: practitioner, direct, no filler. First-person when it adds authority. No "in today's fast-paced world"-type openings.
- Structure: strong hook → data / claim → practical breakdown → honest caveat → concrete next step
- Categories in use: `AI & Enterprise`, `MarTech`, `Marketing Operations`, `Enterprise Leadership`, `Lead Scoring`, `Playbooks`

## Roadmap

### Now — keep shipping Playbooks content

- Publish one Playbooks post per week
- Candidate topics from the data:
  - "£67k for a skill nobody's teaching yet: Salesforce Data Cloud"
  - "Why AI certificates aren't on UK job ads (and what to do instead)"
  - "Apex without pain: what non-developers actually need to know"
  - "The Trailblazer profile mistake that filters out 70% of junior candidates"
  - "Flow vs Apex: the career-switcher's decision tree"
  - "Reading a Salesforce job description like a hiring manager"
- Refresh the research pipeline quarterly (next: July 2026) and re-check rankings

### Next — authority scaffolding

- Home page: sharpen hero to signal practitioner-authority (not a subtle tweak, a positioning tightening). Deferred — decide when Playbooks cadence is proven.
- About page: rewrite around the "I do this daily" story
- Add a lightweight /now page (what I'm working on, what I'm learning) — demonstrates active practice
- Case study section pulling from GSS portfolio notes (anonymised)

### Later — monetisation (not before ~Aug 2026)

- Define first offer (likely Salesforce Admin career-shift path, based on data)
- Email capture infrastructure (Beehiiv or similar; reuse GSS account if possible)
- Lead magnet: polished version of the job-demand report
- Waitlist → first paid cohort

### Explicitly deferred

- Paid offer / training product
- Email list and nurture sequence
- Testimonials / social proof section
- Custom domain migration (if not already done)

## Related context

- Global auto-memory: `C:\Users\Oloye\.claude\projects\C--Users-Oloye\memory\`
- GSS project: `C:\Users\Oloye\OneDrive\GSS\` (side business, separate site at gtmsignalstudio.com)
- Day job: Enterprise Marketing Manager + Marketing Automation Specialist at Sorenson
