---
title: "Every Website Form in One List, Sorted for You"
cardLine: "One form, one list, and the right email goes out on its own."
date: "2026-10-28"
author: "oloye"
category: "Leads"
tags: ["website forms", "make", "airtable", "gmail", "lead follow-up"]
excerpt: "How we send every form on a website to one Airtable list, then let Make send the right email on its own, with no data left sitting on the site."
summary:
  - "Why forms that land in an inbox get forgotten, and what to do instead."
  - "The four steps: form, Make, Airtable, the right email."
  - "How to keep it safe, so nobody can post junk into your list."
  - "What it looks like for the person filling in the form, and for you."
faq:
  - question: "Do I need to know how to code to set this up?"
    answer: "No. The Make part is built by joining boxes together. The only website change is pointing your form at the Make address, and most form tools let you do that in their settings."
  - question: "Which tools does it use?"
    answer: "Make to move and sort things, Airtable as the list, and Gmail to send the emails. All three have a free plan to start with."
  - question: "What stops someone sending rubbish into my Airtable?"
    answer: "Make checks a secret key on every form before it does anything. No key, nothing is saved and nothing is sent. The website also limits repeat sends and only accepts forms from its own pages."
  - question: "Can I add more forms later?"
    answer: "Yes. Each form carries a label, like CONTACT or the name of a free thing. A new label just needs its own branch in Make."
freebie: "TABLE"
coverImage: "/images/blog/website-forms/cover.jpg"
---

Someone fills in the form on your website. It lands in an inbox. You mean to reply, then the week happens. Three days later you find it, and they've already gone with someone else.

The form did its job. The bit after it didn't.

> **In plain words:** an automation here just means that when one thing happens (a form is filled in), the next things happen on their own (the person is saved, and the right email goes out).

## Where form messages go to die

Most websites send a form straight to an email inbox. That feels fine until you have a few a week. Then they sit between newsletters and receipts, nobody owns them, and there's no list of who asked for what.

What you want instead is simple. Every form lands in one list. Each person is one row. And the first reply goes out on its own, so nobody waits.

## The four steps

This is the exact setup we built for the forms on this site.

![The flow: form, Make, Airtable, the right email](/images/blog/website-forms/flow.png)

### Step 1: Someone fills in a form

There are two kinds on this site. One asks for a free thing, like a checklist or a guide.

![A free thing form on the website](/images/blog/website-forms/free-thing-form.jpg)

The other is a plain contact form.

![The contact form on the website](/images/blog/website-forms/contact-form.jpg)

Each one sends a small bundle: name, email, what they asked for or said, and a label for which form it was.

### Step 2: Make checks the key

The form doesn't go to an inbox. It goes to a private web address in Make, called a webhook. The website sends it from its own server, so the address never shows on the page.

Every bundle carries a secret key. The first thing Make does is check it. If the key is wrong or missing, it stops right there. Nothing is saved and nothing is sent.

> **Good to know:** this is what stops strangers stuffing junk into your list. Even if someone found the address, without the key Make ignores them.

### Step 3: Saved in Airtable

Next, Make looks for the person in an Airtable table by their email.

- **New person:** a new row, marked "New", with today's date and what they said.
- **Already there:** the same row is updated. Their stage stays as it was, and the new message is added under the old ones.

One person, one row. No duplicates.

![The scenario in Make, left to right](/images/blog/website-forms/make-scenario.jpg)

### Step 4: Sorted by form

Then Make looks at the label and picks a road.

**A free thing:** Gmail sends them an email with the link, straight away. Their row moves to "Free thing sent".

![The email someone gets after asking for a free thing](/images/blog/website-forms/email-free-thing.jpg)

**A contact message:** Gmail sends the message to you, with their email set as the reply address. Hit reply and you're talking to them.

![The email you get for a contact message](/images/blog/website-forms/email-contact.jpg)

## Keeping it safe

A few small things do most of the work:

- **The website keeps nothing.** It checks the form and passes it on. There's no database to break into.
- **No passwords on the website.** Make holds the Airtable and Gmail sign-ins. The site only knows the webhook address and its key, kept in hidden settings.
- **The link in the email comes from your own list,** not from the form, so nobody can trick it into sending a bad link.
- **Only people who say yes get other emails.** There's a tick box for that. No tick, they get what they asked for and nothing else.

> **Try this:** before you build anything, write down your forms and what should happen after each one. One line per form. That list is your whole automation.

## What it changes

Nobody waits for a reply to a free thing. Every enquiry is in one place, with a stage, so you can see who needs a reply today. And you stop digging through your inbox on a Friday night.

We built it with tools we already used. If you'd like this set up for your own forms, book a free call and we'll look at it together.
