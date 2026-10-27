# Forms automation plan (draft for Oloye's yes, 2026-10-27)

**Goal:** every form on the website lands in one place (Airtable Leads), gets sorted by which form it came from, and the right thing happens next, with nothing stored on the website.

## The flow

1. **A form on the website** (contact, a blog post's free thing, the checklist) is filled in.
2. **The website's server passes it to a Make webhook.** It's sent from the server, not the visitor's browser, so the webhook address never shows on the site. It carries a secret key Make checks before doing anything.
3. **Make finds or adds the person in Airtable Leads** (matched on email): Platform "Website", Keyword = the form label, and the message in "What They Said".
4. **Make sorts by the form label:**
   - `CONTACT`: Gmail (info@oloyeaa.com) emails Oloye "New message from [name]". Stage stays "New" until he replies in his own words.
   - `CHECKLIST`, `TABLE`, `TOOLS`, `PIECES`, `LOOP`: Gmail sends the person "Here's your [thing]" with its link. Stage becomes "Free thing sent".
   - **Ticked "email me now and then"**: also added to MailerLite, for newsletters later. Not ticked: they get only what they asked for.

## Keeping data safe

- **Nothing is kept on the website.** It has no database. The form details pass straight through to Make and are not written to any file or log on the site.
- **No passwords on the website for Airtable or Gmail.** Make holds those sign-ins. The website only knows the webhook address and its secret key, stored as hidden server settings, never in the page code.
- **The secret key** means that even if someone found the webhook address, Make ignores anything without the key.
- **The website already checks every form before passing it on** (built 27 Oct): only from our own site, a limit on repeat sends, strict email check, plain text only, size limits, a hidden trap for bots.
- **Everything travels over HTTPS** (encrypted) between the website, Make, Airtable and Gmail.
- **UK GDPR:** marketing emails only for people who ticked the box; everyone gets the "Consent to Email" field set honestly.

## What Oloye does (when he says go)

1. Says yes to this plan.
2. Signs in to Airtable and Gmail inside Make when asked (those sign-ins must be his).
3. Reads the five free-thing emails Claude writes, and says yes.
4. Sends one test of each form and checks the row and the email.

## What Claude does

- Builds the webhook and the scenario in Make (Make connector), with the router and the five email branches.
- Writes the five emails in plain words.
- Points the website's forms at the webhook (server side), with the secret key.
- Tests each route end to end.

## Cost

Make's free plan has a monthly limit on steps; each form send uses about 4 to 5. Claude checks the current limit before building.
