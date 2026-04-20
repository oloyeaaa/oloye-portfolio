---
title: >-
  What Marketing Cloud (SFMC) Actually Does — From Someone Who Ships It Every
  Day
date: '2026-03-27'
category: Playbooks
excerpt: >-
  SFMC isn't one tool. It's six, held together by ideas most job postings assume
  you already know. Here's the version I wish someone had given me before I
  started.
tags:
  - salesforce
  - marketing cloud
  - sfmc
  - how-to
coverImage: /images/blog/what-marketing-cloud-sfmc-actually-does.jpg
coverImageCredit: Photo by Negative Space on Pexels
coverImageCreditUrl: 'https://www.pexels.com/photo/blue-and-green-pie-chart-97080/'
---

Salesforce Marketing Cloud (SFMC) came up 21 times in my recent scan of 1,256 UK job ads — and commanded a median advertised salary of around £60,000, the highest of any Salesforce-branded skill in the dataset.

It's also the platform I use most weeks in my day job. So for anyone weighing up whether to learn it, here's what it actually is, once you strip away the marketing.

## SFMC is a stack, not a tool


![A digital 3D rendering showcasing a minimalist geometric structure made of white cubes arranged in a step-like formation](/images/blog/what-marketing-cloud-sfmc-actually-does-1.jpg)

*Photo by Steve A Johnson on Pexels*
When a job ad says "experience with Marketing Cloud," they usually mean some subset of these:

- **Email Studio** — where emails are built, sent, and measured. If you've used Mailchimp, this is the closest analogue, but more configurable.
- **Journey Builder** — orchestrates multi-step, multi-channel journeys. Entry event, decision splits, waits, send actions. Think visual automation workflow.
- **Automation Studio** — scheduled or triggered automations. SQL queries, file imports, data extract activities. The engine room.
- **Contact Builder** — the data model. Data Extensions, Attribute Groups, Population. If this is confusing at first, you're not alone.
- **Content Builder** — reusable content blocks, templates, images, AMPscript snippets.
- **Mobile Connect / MobilePush** — SMS and push, priced separately, usually only at enterprise scale.

There's also an engagement scoring tool, a preference centre framework, a consent framework, a journey analytics layer, and about six other modules that most mid-sized users never touch.

## What I actually use it for

On a typical week, I spend time in four of the six:

- **Contact Builder** to structure or fix the data model when something upstream changes.
- **Automation Studio** to schedule imports from the data warehouse and send refreshes to journeys.
- **Journey Builder** to adjust or test lifecycle journeys.
- **Email Studio** to review sends, deliverability issues, and engagement metrics.

The parts most beginners focus on — building a single email, previewing on mobile — are maybe 10% of the job.

## The two hardest ideas


![A detailed close-up of handwritten financial planning notes on paper, emphasizing savings and investments.](/images/blog/what-marketing-cloud-sfmc-actually-does-2.jpg)

*Photo by Jessica Lewis 🦋 thepaintedsquare on Pexels*
If you decide to learn SFMC, these two concepts throw everyone:

**1. Data Extensions vs Lists.** Lists are the old way. Data Extensions are the real way. Once you understand why sendable data extensions have to be linked to a subscriber key and a contact record, the rest of the platform makes sense. Before that point, nothing does.

**2. AMPscript.** SFMC's templating language. You don't need to master it, but the roles that pay most are the ones where someone on the team can write it, personalise it, and debug it. Pick up the basics early.

## How to learn without paying

- Trailhead has a *Marketing Cloud Email Specialist* trailmix — free and substantial.
- Salesforce offers a limited free *Marketing Cloud Developer Org*. Sign-up is clunky. Persist.
- Follow three practitioners, not ten. Pick people who publish real SFMC work, not recycled lists.

## The career angle

HubSpot teaches you marketing automation. SFMC pays you for understanding marketing data engineering. The UK market has fewer SFMC jobs than HubSpot jobs — but the ceiling is higher, and the competition thinner, because the learning curve weeds people out.

If you already have some Salesforce fluency, SFMC is the highest-leverage next step you can take. If you're starting from zero, get HubSpot basics down first, then come back here in twelve months. The tools overlap less than the marketing implies.
