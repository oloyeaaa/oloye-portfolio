// Standalone filming shot-list for the "Two Steps Back" reel series.
// Served raw (bypasses the site layout) at /two-steps-back. noindex — personal working page.
// Each reel: on-screen overlay + the ~10s spoken line + the post caption (built on The Pull).
export const dynamic = "force-static";

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0E0F12">
<title>Two Steps Back — Filming Shot List</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='88'>🎬</text></svg>">
<style>
  :root{
    --bg:#0E0F12; --surface:#14161A; --surface2:#1A1D22;
    --text:#EDEDED; --dim:#B4B7BE; --muted:#8A8F98;
    --border:#2A2D35; --lime:#C6F23C; --alert:#F0655E;
    --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;background:var(--bg);color:var(--text);font-family:var(--sans);-webkit-font-smoothing:antialiased;}
  .wrap{max-width:840px;margin:0 auto;padding:44px 20px 120px;}
  a{color:var(--lime);}
  .kicker{font-family:var(--mono);font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--lime);display:flex;align-items:center;gap:10px;}
  .kicker::before{content:"";width:22px;height:2px;background:var(--lime);}
  h1{font-size:clamp(38px,8vw,64px);line-height:.98;letter-spacing:-.03em;font-weight:800;margin:14px 0 6px;}
  .sub{color:var(--dim);font-size:17px;max-width:56ch;margin:0 0 22px;}
  .tips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:26px;}
  .tip{font-size:13px;color:var(--dim);background:var(--surface2);border:1px solid var(--border);border-radius:999px;padding:7px 14px;}
  .tip b{color:var(--lime);font-weight:600;}
  .bar{position:sticky;top:0;z-index:20;background:rgba(14,15,18,.86);backdrop-filter:blur(8px);border-bottom:1px solid var(--border);
    margin:0 -20px 22px;padding:14px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
  .count{font-family:var(--mono);font-size:14px;color:var(--text);white-space:nowrap;}
  .count b{color:var(--lime);font-size:18px;}
  .track{flex:1;min-width:120px;height:8px;background:var(--border);border-radius:99px;overflow:hidden;}
  .fill{height:100%;width:0;background:var(--lime);transition:width .25s ease;}
  .btn{font-family:var(--sans);font-weight:700;font-size:14px;border:none;border-radius:10px;padding:11px 16px;cursor:pointer;}
  .btn.primary{background:var(--lime);color:#0E0F12;}
  .btn.ghost{background:transparent;color:var(--muted);border:1px solid var(--border);}
  .btn:focus-visible{outline:2px solid var(--lime);outline-offset:2px;}
  .card{display:grid;grid-template-columns:56px 1fr;gap:16px;background:var(--surface);border:1px solid var(--border);
    border-radius:16px;padding:20px 20px 20px 16px;margin-bottom:12px;transition:opacity .2s,border-color .2s;}
  .card.done{opacity:.5;}
  .idxcol{display:flex;flex-direction:column;align-items:center;gap:12px;}
  .num{font-family:var(--mono);font-size:20px;color:var(--muted);font-variant-numeric:tabular-nums;}
  .chk{appearance:none;width:26px;height:26px;border:2px solid var(--border);border-radius:8px;cursor:pointer;position:relative;flex:none;background:var(--surface2);}
  .chk:checked{background:var(--lime);border-color:var(--lime);}
  .chk:checked::after{content:"";position:absolute;left:8px;top:3px;width:6px;height:12px;border:solid #0E0F12;border-width:0 3px 3px 0;transform:rotate(45deg);}
  .chk:focus-visible{outline:2px solid var(--lime);outline-offset:2px;}
  .overlay-lbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);}
  .overlay-txt{color:var(--lime);font-weight:700;font-size:15px;margin:3px 0 12px;letter-spacing:-.01em;}
  .say{font-size:clamp(19px,2.6vw,23px);line-height:1.36;color:var(--text);font-weight:500;letter-spacing:-.01em;}
  .lbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:5px;}
  .capwrap{margin-top:16px;border-top:1px solid var(--border);padding-top:14px;}
  .cap{font-size:15px;line-height:1.5;color:var(--dim);white-space:pre-line;}
  .copy{margin-top:10px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;}
  .copy:hover{border-color:var(--lime);color:var(--lime);}
  .read{margin-top:14px;background:transparent;border:1px solid var(--border);color:var(--dim);border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;}
  .read:hover{border-color:var(--lime);color:var(--lime);}
  .tp{position:fixed;inset:0;z-index:100;background:#080909;display:none;flex-direction:column;padding:28px;}
  .tp.open{display:flex;}
  .tp-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;}
  .tp-meta{font-family:var(--mono);font-size:13px;color:var(--muted);}
  .tp-over{color:var(--lime);font-weight:700;font-size:clamp(16px,2.4vw,22px);margin-top:6px;max-width:22ch;line-height:1.15;}
  .tp-x{background:none;border:none;color:var(--muted);font-size:30px;line-height:1;cursor:pointer;padding:0 6px;}
  .tp-mid{flex:1;display:flex;align-items:center;justify-content:center;}
  .tp-say{font-size:clamp(30px,6.2vw,68px);line-height:1.16;font-weight:700;letter-spacing:-.02em;text-align:center;max-width:20ch;color:#fff;}
  .tp-bot{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;}
  .tp-bot .btn{padding:14px 22px;font-size:16px;}
  .tp-nav{background:var(--surface2);color:var(--text);border:1px solid var(--border);}
  .hint{text-align:center;color:var(--muted);font-family:var(--mono);font-size:12px;margin-top:10px;}
  @media(max-width:560px){ .card{grid-template-columns:44px 1fr;gap:12px;padding-left:12px;} }
</style>
</head>
<body>
<div class="wrap">
  <div class="kicker">Practical AI · @practicalaihub4</div>
  <h1>Two Steps Back</h1>
  <p class="sub">50 ten-second reels to your past self. Read the big line to camera. The lime line is the text that goes <em>on screen</em>. The caption is ready to paste when you post.</p>
  <div class="tips">
    <span class="tip"><b>One take.</b> Don't re-record it three times.</span>
    <span class="tip"><b>Phone on a stack of books.</b> That's the setup.</span>
    <span class="tip"><b>No editing spiral.</b> Rough beats unposted.</span>
    <span class="tip"><b>Batch it.</b> All 50 in one sitting.</span>
  </div>
  <div class="bar">
    <div class="count"><b id="doneN">0</b> / 50 filmed</div>
    <div class="track"><div class="fill" id="fill"></div></div>
    <button class="btn primary" id="startBtn">Teleprompter ▶</button>
    <button class="btn ghost" id="resetBtn">Reset</button>
  </div>
  <div id="list"></div>
</div>
<div class="tp" id="tp" role="dialog" aria-modal="true" aria-label="Teleprompter">
  <div class="tp-top">
    <div>
      <div class="tp-meta" id="tpMeta">01 / 50</div>
      <div class="tp-over" id="tpOver"></div>
    </div>
    <button class="tp-x" id="tpX" aria-label="Close">✕</button>
  </div>
  <div class="tp-mid"><div class="tp-say" id="tpSay"></div></div>
  <div>
    <div class="tp-bot">
      <button class="btn tp-nav" id="tpPrev">◀ Prev</button>
      <button class="btn primary" id="tpMark">Mark filmed ✓</button>
      <button class="btn tp-nav" id="tpNext">Next ▶</button>
    </div>
    <div class="hint">← → to move · F or Space to mark filmed · Esc to close</div>
  </div>
</div>
<script>
const DATA = [
["You're not private. You're hiding.","You keep saying you're a private person. You're not private, you're scared. Private is a choice. You just hid, and called it a personality.","\"I'm just a private person.\"\nI said it for years. It was the most comfortable lie I owned.\nPrivate is a choice you make out loud. I wasn't choosing, I was hiding and calling it a personality. And the whole time, the people who needed what I knew couldn't find a man on mute.\nIf it stung, it's because it's true. Save this for the day you decide to be seen. Follow for more."],
["You thought your opinion didn't count.","Six years in digital marketing. Four years in AI. And you still thought nobody wanted your take. Somebody out there is six years behind you. Talk to them.","Six years in marketing. Four years in AI. And you still whisper.\nYou told yourself no one wants your take. Someone does, they're just six years behind you.\nKnowing a lot and saying nothing helps no one, least of all you.\nTalk to the person you used to be. Save this. Follow for more."],
["You avoided the only thing that mattered.","You'll build the site, buy the domain, redo the logo again. All of it to dodge the one thing that actually moves you. Putting your face out there.","You'll redo the logo, buy another domain, rebuild the site. Again.\nIt feels like work. It's avoidance in a nicer outfit.\nAll of it is easier than the one thing that actually moves you: putting your face out there.\nThe build was never the bottleneck. You were. Save this. Follow for more."],
["Failing quietly kept you nowhere.","You'd rather fail where nobody sees. But quiet failure teaches you nothing and moves you nowhere. Go fail in public. That's the shortcut you kept skipping.","You'd rather fail quietly, where no one can watch.\nBut quiet failure teaches you nothing and moves you nowhere. It just feels safer.\nPublic failure is the shortcut you keep walking past.\nGo be bad in front of people. That's where it starts. Save this. Follow for more."],
["You were never going to feel ready.","You were waiting to feel ready. You won't. Ready comes after you start, never before. The ready version of you is on the other side of the first ten videos.","You're waiting to feel ready.\nYou won't. Ready doesn't come before, it's the reward for starting.\nThe version of you that feels ready is on the other side of the first ten videos.\nMake one badly today. Save this. Follow for more."],
["The gear was never the problem.","New mic. New camera. New light. Still nothing posted. The gear was never what stopped you. You did. Film it on the phone in your hand.","New mic. New camera. New light. Still nothing posted.\nYou kept buying the setup because the setup wasn't the fear. Being seen was.\nThe gear never stopped you. You did.\nFilm it on the phone in your hand. Save this. Follow for more."],
["You called it thinking. It was fear.","You thought about this video a hundred times and filmed it zero. That's not thinking, that's fear in a smart coat. The plan was never the problem.","You've planned this video a hundred times. Filmed it zero.\nThat's not thinking. That's fear that learned to sound smart.\nThe plan was never the problem. Pressing record was.\nStop rehearsing. Start rolling. Save this. Follow for more."],
["You kept starting over. That was the trap.","You started again, and again, and again. Felt like progress. It was a circle. Pick one thing, put it out, let people react. That's the way out.","You started again. And again. And again.\nIt felt like momentum. It was a circle with better lighting.\nPick one thing, put it out, let people react. That's the only door out.\nStop restarting. Ship one. Save this. Follow for more."],
["You asked AI questions so you didn't have to film.","You'd ask AI one more question you already knew the answer to. Anything to feel busy. Anything so you didn't have to turn the camera on. Press record.","You open the AI and ask it another question you already know the answer to.\nIt feels productive. It's a hiding place with a search bar.\nEvery \"one more prompt\" is one more hour you don't have to turn the camera on.\nThe answer was never another prompt. It was record. Save this. Follow for more."],
["You kept visiting a past that owes you nothing.","You kept replaying what happened to you as a kid, like it explained why you hadn't started. It doesn't. That story is over. Point the camera forward.","You keep replaying what happened to you, like it explains why you haven't started.\nIt doesn't. It just gives the fear a story to hide behind.\nThat chapter is closed. You're allowed to point the camera forward.\nLet it go and begin. Save this. Follow for more."],
["You studied everyone else instead of becoming someone.","You watched a thousand of their videos and made none of your own. Consuming feels productive. It isn't. Close the app. Make one.","You watched a thousand of their videos and made none of your own.\nConsuming feels like progress. It's just hiding with a study timer on.\nEvery video you save is one you were meant to make.\nClose the app. Make one. Save this. Follow for more."],
["Who told you to stay at the back?","Someone told you talking about yourself is bragging. Sit at the back, stay small. You believed it. You're good at this. Say it out loud.","Someone taught you that talking about yourself is bragging. Sit at the back. Stay small.\nYou believed a rule that was never yours to carry.\nYou're good at this. Saying so isn't arrogance, it's how the right people find you.\nStep forward. Say it out loud. Save this. Follow for more."],
["Someone needs what you know. You're on mute.","Right now someone needs exactly what you know. But you're on mute. Every day you don't post, they stay stuck, and so do you. Turn the camera on.","Right now, someone needs exactly what you know.\nBut you're on mute, so they stay stuck. And so do you.\nYour silence isn't humble. It's expensive, for both of you.\nTurn the camera on for them. Save this. Follow for more."],
["You chased the money, not the person.","You kept chasing quick money and built things nobody asked for. Flip it. Find one person with a problem, talk to them out loud. The money follows the help.","You kept chasing quick money and building things nobody asked for.\nMoney was the goal, so the person got skipped. That's why it never landed.\nFlip it. Find one person with a problem and help them out loud.\nThe money follows the help. Save this. Follow for more."],
["You measured yourself against the wrong finish line.","You watched your friends climb the 9-to-5 and felt behind. Different race. They were building someone else's thing. You were scared to build yours. Start building it.","You watched your friends climb the 9-to-5 and felt behind.\nDifferent race. They were building someone else's thing. You were scared to build yours.\nBehind is only real when you're running the same track. You're not.\nStart building yours. Save this. Follow for more."],
["You thought the money you spent learning was wasted.","All those courses you thought were a waste. They weren't. You were being prepared. The only waste is knowing all of it and still saying nothing.","All those courses you think you wasted money on.\nYou didn't. You were being prepared, you just couldn't see it yet.\nThe only real waste is knowing all of it and still saying nothing.\nUse what you already paid for. Save this. Follow for more."],
["Nobody's waiting for your perfect one.","You wanted the first one perfect. Nobody's waiting for perfect, they're scrolling. Give them one honest ten seconds. Perfect was just another place to hide.","You want the first one to be perfect.\nNobody's waiting for perfect. They're scrolling.\nPerfect was never a standard. It was the nicest place you found to hide.\nGive them one honest ten seconds instead. Save this. Follow for more."],
["You went quiet so nobody could say you talk too much.","You stayed silent so no one could call you the guy who talks too much. So what if they do. The people who need you can't find a mute man. Speak.","You went quiet so no one could call you the one who talks too much.\nSo you dodged one insult, and missed everyone you could have helped.\nThe people who need you can't hear a man on mute.\nSay the thing. Let them find you. Save this. Follow for more."],
["You made room for everyone but yourself.","You stepped back so others could step up, every time. Admirable, and a great excuse. Take the space this time. Your turn to be seen.","You stepped back so others could step up. Every time.\nIt looked like humility. It was a very polite excuse.\nMaking yourself small was never kindness. It was cover.\nTake the space this time. Save this. Follow for more."],
["You wanted the perfect strategy before the first post.","You read every thread on the algorithm and posted nothing to feed it. Strategy without reps is just more hiding. The first hundred videos are the strategy.","You read every thread on the algorithm and fed it nothing.\nStrategy with no reps is just hiding with a spreadsheet.\nThe first hundred videos ARE the strategy. There's no clever way around the doing.\nPost one and start the count. Save this. Follow for more."],
["Somewhere there's a you who just started.","Picture the version of you that started two years ago. Where is he now. That gap is the cost of hiding. Close it. Film the first one tonight.","Picture the version of you that started two years ago.\nWhere is he now. That distance is the price of hiding.\nEvery day you wait, the gap between you and him grows.\nClose it. Film the first one tonight. Save this. Follow for more."],
["You renamed the brand again instead of posting.","New name. New handle. New bio. Again. All of it to avoid the thing that actually grows it. You don't need a rebrand. You need a video.","New name. New handle. New bio. Again.\nIt feels like a fresh start. It's a fresh way to avoid posting.\nYou don't need a rebrand. The brand grows when you show up, not when you rename the hiding place.\nPost before you polish. Save this. Follow for more."],
["The crowd you feared was never watching.","You imagined everyone watching, waiting to laugh. They weren't. They were busy hiding too. Nobody's looking as hard as you feared. Post it.","You pictured everyone watching, waiting to laugh.\nThey weren't. They were busy hiding too.\nNobody is looking as hard as your fear told you they were.\nThe crowd you feared was never there. Post it. Save this. Follow for more."],
["You told yourself it was too late.","You looked at your age and thought you'd missed it. You didn't. The best time was years ago. The second best is the next ten seconds. Go.","You looked at your age and decided you'd missed it.\nYou didn't. Too late is just fear checking its watch.\nThe best time was years ago. The second best is the next ten seconds.\nStart now, older and ready. Save this. Follow for more."],
["You'd rather be invisible than cringe.","You chose invisible over cringe. But invisible got you nothing, and cringe is just the tax on going first. Pay it once. It gets easier.","You chose invisible over cringe.\nBut invisible got you nothing, and cringe is just the tax on going first.\nEveryone good at this paid it once, then it stopped hurting.\nPay it. It gets easier fast. Save this. Follow for more."],
["People with half your knowledge are eating.","People who know half of what you know are out there posting and getting paid. Not because they know more. Because they showed up. Now you show up.","People who know half of what you know are out there getting paid.\nNot because they know more. Because they showed up and you didn't.\nThe gap was never knowledge. It was nerve.\nNow you show up. Save this. Follow for more."],
["Your best ideas are dying in a notes app.","You've got a phone full of ideas nobody will ever see. An idea in your head helps no one. Take the smallest one and post it today.","Your phone is full of ideas nobody will ever see.\nAn idea in your head helps no one, least of all the person who needed it.\nThe notes app is where your best work goes to be safe and useless.\nTake the smallest one and post it today. Save this. Follow for more."],
["The ones criticising you are comfortable being average.","You worried what your friends would say. Truth is, most don't care what you did. And the few who criticise? They're the ones comfortable in mediocrity. Post anyway.","You worried what your friends would say.\nThe truth is most of them won't even notice. And the few who criticise are usually the ones most comfortable being average.\nTheir comfort isn't your instruction.\nPost anyway. Let it filter your room. Save this. Follow for more."],
["You thought content was beneath you.","You thought content was beneath you. Like the thing you built would just magically find the people who needed it. It won't. Nobody finds what nobody sees. Post it.","You thought content was beneath you.\nLike the thing you built would just find the people who needed it on its own.\nIt won't. Nobody finds what nobody sees. That's not unfair, it's just true.\nPost it, or it stays a secret. Save this. Follow for more."],
["You had the whole video. Then you killed it.","You had the whole thing in your head, clear, good. Then you talked yourself out of it before you pressed record. That voice isn't wisdom. It's fear. Record.","You had the whole thing in your head. Clear. Good.\nThen a voice talked you out of it before you hit record.\nThat voice isn't wisdom. It's fear doing an impression of caution.\nDon't negotiate with it. Record. Save this. Follow for more."],
["You built a brand with no face on purpose.","You built a brand with no face so you'd never have to show yours. But people follow people, not logos. The face you're hiding is the whole asset. Show it.","You built a brand with no face so you'd never have to show yours.\nThe logo was a mask, and it was working.\nBut people follow people, not logos. The face you're hiding is the whole asset.\nShow it. That's the brand. Save this. Follow for more."],
["You filmed it. Then you deleted it.","You filmed it, watched it back, cringed, deleted it. You didn't need a better take. You needed to post the one you already had. Undo delete. Post it.","You filmed it, watched it back, cringed, deleted it.\nYou didn't need a better take. You needed to keep the one you had.\nThe delete button is the quietest way to stay invisible.\nUndo it. Post the one you already made. Save this. Follow for more."],
["You wanted to wait until you'd made it.","You wanted to wait until you'd made it to start talking about it. The talking is how you make it. Document the climb. Don't wait for the summit.","You wanted to wait until you'd made it to start talking about it.\nBut the talking is how you make it. That's the part you had backwards.\nPeople follow the climb, not the summit photo.\nDocument it from here. Save this. Follow for more."],
["You compared your first to their thousandth.","You held your first ever video next to someone's thousandth and felt small. Of course you did. They started. Post your number one and start closing the gap.","You held your first ever video next to someone's thousandth and felt small.\nOf course you did. They started. That's the whole difference.\nComparing your take one to their take one thousand is a fight you rigged to lose.\nPost your one. Save this. Follow for more."],
["You wouldn't post until the niche was perfect.","You wouldn't post until you'd nailed the perfect niche. You don't find the niche and then post. You post, and the niche finds you. Start messy.","You wouldn't post until the niche was perfect.\nBut you don't find the niche and then post. You post, and the niche finds you.\nFiguring it all out first was just a smarter-sounding way to wait.\nStart messy. It sharpens as you go. Save this. Follow for more."],
["You hid so your old life wouldn't see.","You didn't post because someone from your old life might see it. Let them. You're not building this for who you used to sit next to. Post for who needs you now.","You didn't post because someone from your old life might see it.\nLet them. You're not building this for who you used to sit next to.\nTheir opinion is rent on a room you already left.\nPost for who needs you now. Save this. Follow for more."],
["You were waiting for permission.","You kept waiting for someone to give you permission to start. Nobody's coming to hand it to you. There is no gatekeeper. Take it yourself. Post.","You kept waiting for someone to hand you permission to start.\nNobody's coming. There's no gate, no gatekeeper, no letter in the post.\nThe wait was never about permission. It was fear wearing patience.\nGive it to yourself. Post. Save this. Follow for more."],
["You thought you'd run out of things to say.","You were scared you'd run out of things to say. You've got years of it backed up. The problem was never running out. It was starting. Open your mouth.","You were scared you'd run out of things to say.\nYou've got years of it backed up. That was never the risk.\nThe problem was never running out. It was starting.\nOpen your mouth. It'll come. Save this. Follow for more."],
["You thought you needed followers first.","You thought you needed followers before you could post properly. You get followers by posting. You had it backwards the whole time. Post to zero. Proudly.","You thought you needed followers before you could post properly.\nYou had it backwards. You get the followers by posting.\nWaiting for an audience to arrive before you speak is how the room stays empty.\nPost to zero. Proudly. Save this. Follow for more."],
["You let one comment keep you invisible.","You were scared of one nasty comment. One. You let a stranger who forgets you by lunch keep you hidden for years. That's a bad trade. Post.","You were scared of one nasty comment. One.\nYou let a stranger who'll forget you by lunch keep you hidden for years.\nThat's a brutal trade, and you made it every day without noticing.\nTake it back. Post. Save this. Follow for more."],
["You thought you had to be the expert.","You thought you had to be the expert before you could teach. You don't. You just have to be a few steps ahead of someone. You are. Reach back and pull them up.","You thought you had to be the expert before you could teach.\nYou don't. You just have to be a few steps ahead of someone. And you are.\nNot expert enough yet was fear borrowing a respectable excuse.\nReach back and pull one person up. Save this. Follow for more."],
["Three hours to edit ten seconds.","You spent three hours editing ten seconds of video. That's not craft, that's fear dressed up as polish. Post the rough cut. Done beats pretty.","You spent three hours editing ten seconds.\nThat's not craft. That's fear dressed up as polish.\nThe extra hours weren't making it better. They were keeping it unposted.\nPost the rough cut. Done beats pretty. Save this. Follow for more."],
["You thought it was all already said.","You thought everything's already been said, so why bother. It hasn't been said by you, in your words, from your scars. Someone needs your version. Say it.","You thought it's all been said, so why bother.\nIt hasn't been said by you, in your words, from your scars.\nThe idea isn't new. Your version of it is the whole point.\nSay it your way. Save this. Follow for more."],
["You said you'd start Monday.","You said you'd start Monday. Then the next Monday. Then the next. Mondays don't start anything. You do. Not Monday. Today. Right now.","You said you'd start Monday. Then the next one. Then the next.\nMondays don't start things. You do, or you don't.\nMonday was never a plan. It was a polite way to say not yet.\nNot Monday. Today. Save this. Follow for more."],
["You journaled in private what others needed.","Every lesson you wrote just for yourself, someone out there needed the exact same one. Stop keeping it in a private note. Say it out loud where it can help.","Every lesson you wrote just for yourself, someone else needed the same one.\nYou kept it in a private note where it could help exactly no one.\nYour journal is full of the posts you were too scared to make.\nSay one out loud. Save this. Follow for more."],
["You told yourself you needed a proper setup.","You told yourself you needed the right lighting, the right background, the right setup. Your phone leaned on a stack of books is a setup. Stop waiting. Film.","You told yourself you needed the right light, the right background, the right setup.\nYour phone leaned against a stack of books is a setup.\nWhen I have the proper gear was just not yet in a nicer coat.\nStop waiting. Film. Save this. Follow for more."],
["Busy all day. Posted nothing.","You were busy all day and posted nothing. Busy is easy, busy is safe. Being seen is the hard thing. Do the hard thing. It's the only one that counts.","You were busy all day and posted nothing.\nBusy is easy. Busy is safe. Busy is where hiding goes to look productive.\nBeing seen is the hard thing, which is exactly why it's the one that counts.\nDo the hard thing. Save this. Follow for more."],
["Every video you skip keeps you exactly who you are.","Every video you don't make keeps you exactly who you are today. The one you're scared to post is the one that changes it. So make that one. Start there.","Every video you don't make keeps you exactly who you are today.\nThe one you're scared to post is the one that changes it. That's not a coincidence.\nComfort and growth are never the same video.\nMake the scary one. Start there. Save this. Follow for more."],
["You didn't think you looked like a creator.","You didn't think you looked or sounded like a creator. There is no look. There is no sound. There's just the ones who post and the ones who don't. Be the first kind.","You didn't think you looked or sounded like a creator.\nThere's no look. There's no voice. That gatekeeper doesn't exist.\nThere are only the ones who post and the ones who don't.\nBe one who posts. Save this. Follow for more."],
["You wanted a guarantee before you tried.","You wanted proof it would work before you'd try. There's no guarantee. There never is. There's just the ones who tried and the ones who wondered. Try.","You wanted proof it would work before you'd try.\nThere's no guarantee. There never is. That's not the catch, that's the deal.\nThere are only the ones who tried and the ones who wondered.\nBe the first kind. Save this. Follow for more."]
];
const KEY = "twoStepsBackFilmed_v1";
let filmed = new Set();
try { filmed = new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch(e){}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...filmed])); } catch(e){} };
const pad = n => String(n).padStart(2,"0");
const list = document.getElementById("list");
const fill = document.getElementById("fill");
const doneN = document.getElementById("doneN");
function updateProgress(){ const n = filmed.size; doneN.textContent = n; fill.style.width = (n/DATA.length*100) + "%"; }
function makeCard(i){
  const d = DATA[i];
  const card = document.createElement("div");
  card.className = "card" + (filmed.has(i) ? " done" : "");
  card.dataset.i = i;
  const col = document.createElement("div"); col.className = "idxcol";
  const num = document.createElement("div"); num.className = "num"; num.textContent = pad(i+1);
  const chk = document.createElement("input"); chk.type = "checkbox"; chk.className = "chk"; chk.checked = filmed.has(i);
  chk.setAttribute("aria-label","Mark reel "+pad(i+1)+" filmed");
  chk.addEventListener("change", () => { toggle(i, chk.checked); });
  col.appendChild(num); col.appendChild(chk);
  const body = document.createElement("div");
  const ol = document.createElement("div"); ol.className="overlay-lbl"; ol.textContent="On screen";
  const ot = document.createElement("div"); ot.className="overlay-txt"; ot.textContent=d[0];
  const sl = document.createElement("span"); sl.className="lbl"; sl.textContent="Say to camera";
  const sy = document.createElement("div"); sy.className="say"; sy.textContent=d[1];
  const cw = document.createElement("div"); cw.className="capwrap";
  const cl = document.createElement("span"); cl.className="lbl"; cl.textContent="Caption";
  const cp = document.createElement("div"); cp.className="cap"; cp.textContent=d[2];
  const cb = document.createElement("button"); cb.className="copy"; cb.textContent="Copy caption";
  cb.addEventListener("click", () => { navigator.clipboard.writeText(d[2]).then(()=>{ cb.textContent="Copied ✓"; setTimeout(()=>cb.textContent="Copy caption",1400); }).catch(()=>{}); });
  cw.appendChild(cl); cw.appendChild(cp); cw.appendChild(cb);
  const rd = document.createElement("button"); rd.className="read"; rd.textContent="Teleprompter ▶";
  rd.addEventListener("click", () => openTP(i));
  body.appendChild(ol); body.appendChild(ot); body.appendChild(sl); body.appendChild(sy); body.appendChild(cw); body.appendChild(rd);
  card.appendChild(col); card.appendChild(body);
  return card;
}
function toggle(i, on){
  if(on) filmed.add(i); else filmed.delete(i);
  save(); updateProgress();
  const card = list.querySelector('.card[data-i="'+i+'"]');
  if(card){ card.classList.toggle("done", on); const c = card.querySelector(".chk"); if(c) c.checked = on; }
}
DATA.forEach((_,i) => list.appendChild(makeCard(i)));
updateProgress();
const tp = document.getElementById("tp");
const tpMeta = document.getElementById("tpMeta");
const tpOver = document.getElementById("tpOver");
const tpSay = document.getElementById("tpSay");
const tpMark = document.getElementById("tpMark");
let cur = 0;
function renderTP(){
  const d = DATA[cur];
  tpMeta.textContent = pad(cur+1) + " / " + DATA.length;
  tpOver.textContent = "On screen: " + d[0];
  tpSay.textContent = d[1];
  const done = filmed.has(cur);
  tpMark.textContent = done ? "Filmed ✓" : "Mark filmed ✓";
  tpMark.style.background = done ? "var(--surface2)" : "var(--lime)";
  tpMark.style.color = done ? "var(--lime)" : "#0E0F12";
}
function openTP(i){ cur = i; tp.classList.add("open"); renderTP(); }
function closeTP(){ tp.classList.remove("open"); }
function move(dir){ cur = (cur + dir + DATA.length) % DATA.length; renderTP(); }
function markCur(){ toggle(cur, !filmed.has(cur)); renderTP(); }
document.getElementById("tpPrev").addEventListener("click", () => move(-1));
document.getElementById("tpNext").addEventListener("click", () => move(1));
document.getElementById("tpX").addEventListener("click", closeTP);
tpMark.addEventListener("click", markCur);
document.getElementById("startBtn").addEventListener("click", () => {
  let first = DATA.findIndex((_,i) => !filmed.has(i));
  openTP(first < 0 ? 0 : first);
});
document.getElementById("resetBtn").addEventListener("click", () => {
  if(confirm("Clear all filmed ticks?")){ filmed.clear(); save(); updateProgress();
    list.querySelectorAll(".card").forEach(c => { c.classList.remove("done"); const k=c.querySelector(".chk"); if(k) k.checked=false; }); }
});
document.addEventListener("keydown", (e) => {
  if(!tp.classList.contains("open")) return;
  if(e.key === "ArrowRight") { move(1); e.preventDefault(); }
  else if(e.key === "ArrowLeft") { move(-1); e.preventDefault(); }
  else if(e.key === "Escape") { closeTP(); }
  else if(e.key === "f" || e.key === "F" || e.key === " ") { markCur(); e.preventDefault(); }
});
</script>
</body>
</html>`;

export function GET() {
  return new Response(HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
}
