// Standalone filming shot-list for the "Two Steps Back" reel series.
// Served raw (bypasses the site layout) at /two-steps-back. noindex — personal working page.
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
  .say-lbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:5px;}
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
  <p class="sub">50 ten-second reels to your past self. Read the big line to camera. The lime line is the text that goes <em>on screen</em>.</p>
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
["You're not private. You're hiding.","You keep saying you're a private person. You're not private, you're scared. Private is a choice. You just hid, and called it a personality."],
["You thought your opinion didn't count.","Six years in digital marketing. Four years in AI. And you still thought nobody wanted your take. Somebody out there is six years behind you. Talk to them."],
["You avoided the only thing that mattered.","You'll build the site, buy the domain, redo the logo again. All of it to dodge the one thing that actually moves you. Putting your face out there."],
["Failing quietly kept you nowhere.","You'd rather fail where nobody sees. But quiet failure teaches you nothing and moves you nowhere. Go fail in public. That's the shortcut you kept skipping."],
["You were never going to feel ready.","You were waiting to feel ready. You won't. Ready comes after you start, never before. The ready version of you is on the other side of the first ten videos."],
["The gear was never the problem.","New mic. New camera. New light. Still nothing posted. The gear was never what stopped you. You did. Film it on the phone in your hand."],
["You called it thinking. It was fear.","You thought about this video a hundred times and filmed it zero. That's not thinking, that's fear in a smart coat. The plan was never the problem."],
["You kept starting over. That was the trap.","You started again, and again, and again. Felt like progress. It was a circle. Pick one thing, put it out, let people react. That's the way out."],
["You asked AI questions so you didn't have to film.","You'd ask AI one more question you already knew the answer to. Anything to feel busy. Anything so you didn't have to turn the camera on. Press record."],
["You kept visiting a past that owes you nothing.","You kept replaying what happened to you as a kid, like it explained why you hadn't started. It doesn't. That story is over. Point the camera forward."],
["You studied everyone else instead of becoming someone.","You watched a thousand of their videos and made none of your own. Consuming feels productive. It isn't. Close the app. Make one."],
["Who told you to stay at the back?","Someone told you talking about yourself is bragging. Sit at the back, stay small. You believed it. You're good at this. Say it out loud."],
["Someone needs what you know. You're on mute.","Right now someone needs exactly what you know. But you're on mute. Every day you don't post, they stay stuck, and so do you. Turn the camera on."],
["You chased the money, not the person.","You kept chasing quick money and built things nobody asked for. Flip it. Find one person with a problem, talk to them out loud. The money follows the help."],
["You measured yourself against the wrong finish line.","You watched your friends climb the 9-to-5 and felt behind. Different race. They were building someone else's thing. You were scared to build yours. Start building it."],
["You thought the money you spent learning was wasted.","All those courses you thought were a waste. They weren't. You were being prepared. The only waste is knowing all of it and still saying nothing."],
["Nobody's waiting for your perfect one.","You wanted the first one perfect. Nobody's waiting for perfect, they're scrolling. Give them one honest ten seconds. Perfect was just another place to hide."],
["You went quiet so nobody could say you talk too much.","You stayed silent so no one could call you the guy who talks too much. So what if they do. The people who need you can't find a mute man. Speak."],
["You made room for everyone but yourself.","You stepped back so others could step up, every time. Admirable, and a great excuse. Take the space this time. Your turn to be seen."],
["You wanted the perfect strategy before the first post.","You read every thread on the algorithm and posted nothing to feed it. Strategy without reps is just more hiding. The first hundred videos are the strategy."],
["Somewhere there's a you who just started.","Picture the version of you that started two years ago. Where is he now. That gap is the cost of hiding. Close it. Film the first one tonight."],
["You renamed the brand again instead of posting.","New name. New handle. New bio. Again. All of it to avoid the thing that actually grows it. You don't need a rebrand. You need a video."],
["The crowd you feared was never watching.","You imagined everyone watching, waiting to laugh. They weren't. They were busy hiding too. Nobody's looking as hard as you feared. Post it."],
["You told yourself it was too late.","You looked at your age and thought you'd missed it. You didn't. The best time was years ago. The second best is the next ten seconds. Go."],
["You'd rather be invisible than cringe.","You chose invisible over cringe. But invisible got you nothing, and cringe is just the tax on going first. Pay it once. It gets easier."],
["People with half your knowledge are eating.","People who know half of what you know are out there posting and getting paid. Not because they know more. Because they showed up. Now you show up."],
["Your best ideas are dying in a notes app.","You've got a phone full of ideas nobody will ever see. An idea in your head helps no one. Take the smallest one and post it today."],
["The ones criticising you are comfortable being average.","You worried what your friends would say. Truth is, most don't care what you did. And the few who criticise? They're the ones comfortable in mediocrity. Post anyway."],
["You thought content was beneath you.","You thought content was beneath you. Like the thing you built would just magically find the people who needed it. It won't. Nobody finds what nobody sees. Post it."],
["You had the whole video. Then you killed it.","You had the whole thing in your head, clear, good. Then you talked yourself out of it before you pressed record. That voice isn't wisdom. It's fear. Record."],
["You built a brand with no face on purpose.","You built a brand with no face so you'd never have to show yours. But people follow people, not logos. The face you're hiding is the whole asset. Show it."],
["You filmed it. Then you deleted it.","You filmed it, watched it back, cringed, deleted it. You didn't need a better take. You needed to post the one you already had. Undo delete. Post it."],
["You wanted to wait until you'd made it.","You wanted to wait until you'd made it to start talking about it. The talking is how you make it. Document the climb. Don't wait for the summit."],
["You compared your first to their thousandth.","You held your first ever video next to someone's thousandth and felt small. Of course you did. They started. Post your number one and start closing the gap."],
["You wouldn't post until the niche was perfect.","You wouldn't post until you'd nailed the perfect niche. You don't find the niche and then post. You post, and the niche finds you. Start messy."],
["You hid so your old life wouldn't see.","You didn't post because someone from your old life might see it. Let them. You're not building this for who you used to sit next to. Post for who needs you now."],
["You were waiting for permission.","You kept waiting for someone to give you permission to start. Nobody's coming to hand it to you. There is no gatekeeper. Take it yourself. Post."],
["You thought you'd run out of things to say.","You were scared you'd run out of things to say. You've got years of it backed up. The problem was never running out. It was starting. Open your mouth."],
["You thought you needed followers first.","You thought you needed followers before you could post properly. You get followers by posting. You had it backwards the whole time. Post to zero. Proudly."],
["You let one comment keep you invisible.","You were scared of one nasty comment. One. You let a stranger who forgets you by lunch keep you hidden for years. That's a bad trade. Post."],
["You thought you had to be the expert.","You thought you had to be the expert before you could teach. You don't. You just have to be a few steps ahead of someone. You are. Reach back and pull them up."],
["Three hours to edit ten seconds.","You spent three hours editing ten seconds of video. That's not craft, that's fear dressed up as polish. Post the rough cut. Done beats pretty."],
["You thought it was all already said.","You thought everything's already been said, so why bother. It hasn't been said by you, in your words, from your scars. Someone needs your version. Say it."],
["You said you'd start Monday.","You said you'd start Monday. Then the next Monday. Then the next. Mondays don't start anything. You do. Not Monday. Today. Right now."],
["You journaled in private what others needed.","Every lesson you wrote just for yourself, someone out there needed the exact same one. Stop keeping it in a private note. Say it out loud where it can help."],
["You told yourself you needed a proper setup.","You told yourself you needed the right lighting, the right background, the right setup. Your phone leaned on a stack of books is a setup. Stop waiting. Film."],
["Busy all day. Posted nothing.","You were busy all day and posted nothing. Busy is easy, busy is safe. Being seen is the hard thing. Do the hard thing. It's the only one that counts."],
["Every video you skip keeps you exactly who you are.","Every video you don't make keeps you exactly who you are today. The one you're scared to post is the one that changes it. So make that one. Start there."],
["You didn't think you looked like a creator.","You didn't think you looked or sounded like a creator. There is no look. There is no sound. There's just the ones who post and the ones who don't. Be the first kind."],
["You wanted a guarantee before you tried.","You wanted proof it would work before you'd try. There's no guarantee. There never is. There's just the ones who tried and the ones who wondered. Try."]
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
  const sl = document.createElement("span"); sl.className="say-lbl"; sl.textContent="Say to camera";
  const sy = document.createElement("div"); sy.className="say"; sy.textContent=d[1];
  const rd = document.createElement("button"); rd.className="read"; rd.textContent="Teleprompter ▶";
  rd.addEventListener("click", () => openTP(i));
  body.appendChild(ol); body.appendChild(ot); body.appendChild(sl); body.appendChild(sy); body.appendChild(rd);
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
