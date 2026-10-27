# What we need from Oloye (website, 27 Oct 2026)

Do them in this order. Each one is small. Tick it when it's done.

## Must do before the site goes live

- [ ] **1. Make the booking page.** In Google Calendar: Create > Appointment schedule. Call it "Free call", 30 minutes is a good start. Copy its link and send it to Claude. Every "Book a free call" button then points there (it's one line: `BOOKING_URL` in `src/lib/site.ts`).

- [ ] **2. Make the email groups in MailerLite.** Right now every form adds people to your "free-tools" group, and the page shows them the link straight away. To also email them the right free thing, make one group per free thing:
  - `post-checklist` (10 jobs to automate first)
  - `post-TABLE` (The leads table)
  - `post-TOOLS` (7 tools, one job each)
  - `post-PIECES` (The 3-piece starter checklist)
  - `post-LOOP` (The daily loop on one page)

  Send Claude each group's ID (MailerLite shows it in the group's web address). Claude adds them to the site.

- [ ] **3. Make one welcome email per group in MailerLite.** Automations > New > "When subscriber joins a group" > pick the group > one email: "Here's your free [thing]" with its link. The links are in `src/lib/postFreebies.ts`. Claude can write the five emails for you.

- [ ] **4. Check the MailerLite key is on the live site.** On your PC the key is set. Wherever the site is hosted (Vercel), the setting `MAILERLITE_API_KEY` must be there too, or the forms will fail on the live site.

- [ ] **4b. Switch on the contact form.** Its messages go into your Airtable **Leads** table (Content Engine base) as Platform "Website", Stage "New". Make an Airtable personal access token that can write to that base (airtable.com/create/tokens: scopes `data.records:read` and `data.records:write`, access to the Content Engine base). Put it in `website/.env.local` as `AIRTABLE_LEADS_TOKEN=...` and add the same setting on the live host. Until then the form politely tells people to book a call or DM instead. Then send one test message and check the row lands.

- [ ] **5. Check two FAQ answers on the home page** (they're promises): the price one ("you know the price before anything starts") and "you don't have to learn how it works inside". Say yes or change them.

- [ ] **6. Say "push it live".** Nothing goes live until you do.

## Nice to do

- [ ] Tell Rita her review and her X post are on the site. They're both public, but it's kind to tell her.
- [ ] Decide what happens to the old pages: Portfolio, Ventures, Practical AI Hub, the Marketing career tier list (that one is 9-to-5 lane material). They still have the old look.

## Coming soon (Claude builds, later)

- Case studies: the page is up as "Coming soon" and hidden from Google. The single case study page gets built with the first build.
- Infographics for the diagrams we cut from the posts (fal, price first).
