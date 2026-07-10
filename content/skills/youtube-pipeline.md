---
title: youtube-pipeline
slug: youtube-pipeline
type: skill
category: Content
tagline: Turn a YouTube video that performs into your own long-form version, narrated in your voice.
requirements:
  - Claude Code
  - Python
  - ffmpeg
  - reel-pipeline installed
tags:
  - youtube
  - long-form
  - narration
  - scripts
version: "2026-07-10"
updated: "2026-07-10"
size: 4 KB
fileCount: 2
download: /downloads/youtube-pipeline.zip
price: null
featured: false
order: 0
---

## What it does

The same move as the reel engine, on long-form. Paste a YouTube video that already performs and get back your own version: a narration script ready to paste into your voice tool, a screen-recording plan synced to it, chapters, three title options, and a description. Zero talking head required.

## How it works

It transcribes the video, reverse-engineers it into structure to keep and content slots to swap, and asks you to fill the slots with your own content. Then it writes the voiceover script and the synced screen plan. It shares the reel engine, so that one needs to be installed alongside it.

## When to reach for it

"Turn this YouTube video into my own." "Reverse-engineer this tutorial." "Give me a long-form script from this video."

## The honest bit

Needs reel-pipeline installed (same engine), plus Python and ffmpeg. The narration script is capped at 5000 characters so it drops straight into most voice tools. It never writes an opinion you did not give it.
