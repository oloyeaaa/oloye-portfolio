# What we need from Oloye (website, 27 Oct 2026)

Do them in this order. Each one is small. Tick it when it's done.

## Must do before the site goes live

- [x] **1. Make the booking page.** DONE 27 Oct: https://calendar.app.google/s8FjtoLAyYZnZ1u98 is behind every button. In Google Calendar: Create > Appointment schedule. Call it "Free call", 30 minutes is a good start. Copy its link and send it to Claude. Every "Book a free call" button then points there (it's one line: `BOOKING_URL` in `src/lib/site.ts`).

- [x] **2-4. Forms connected.** DONE 27 Oct: every form goes to Make ("oloye.co.uk website forms"), which saves the person in Airtable Leads and emails the free thing (or emails you about a contact message). No MailerLite groups or welcome emails needed. People who tick "yes to emails" are also added to MailerLite.

- [ ] **4a. Delete the test rows.** In Airtable Leads, the row for info@oloyeaa.com named "Test from Claude" is from the tests. Delete it (or keep it as an example).

- [ ] **4b. Add two settings on the live host (Vercel) before going live:** `MAKE_FORMS_WEBHOOK_URL` and `MAKE_FORMS_SECRET`. Their values are in `website/.env.local` on your PC (copy them across, don't share them). `MAILERLITE_API_KEY` must be there too.

- [ ] **5. Check two FAQ answers on the home page** (they're promises): the price one ("you know the price before anything starts") and "you don't have to learn how it works inside". Say yes or change them.

- [ ] **6. Say "push it live".** Nothing goes live until you do.

## Nice to do

- [ ] Tell Rita her review and her X post are on the site. They're both public, but it's kind to tell her.
- [ ] Decide what happens to the old pages: Portfolio, Ventures, Practical AI Hub, the Marketing career tier list (that one is 9-to-5 lane material). They still have the old look.

## Coming soon (Claude builds, later)

- Case studies: the page is up as "Coming soon" and hidden from Google. The single case study page gets built with the first build.
- Infographics for the diagrams we cut from the posts (fal, price first).
