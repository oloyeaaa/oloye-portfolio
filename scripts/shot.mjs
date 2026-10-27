// Sharp (2x) screenshots of pages or parts of pages, via Chrome DevTools.
// Usage: node scripts/shot.mjs jobs.json   (see the job fields below)
// Each job: { url, out, width, height, scale, fill: [{sel, value}], click: sel, clipSel, pad, wait }
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const jobs = JSON.parse(readFileSync(process.argv[2], "utf8"));
const port = 9333;
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, "--hide-scrollbars", "--user-data-dir=" + process.env.TEMP + "/shot-profile", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWs() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error("chrome did not start");
}

const ws = new WebSocket(await getWs());
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
};
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send("Page.enable");
for (const j of jobs) {
  await send("Emulation.setDeviceMetricsOverride", { width: j.width || 1200, height: j.height || 900, deviceScaleFactor: j.scale || 2, mobile: false });
  await send("Page.navigate", { url: j.url });
  await sleep(j.wait || 4000);
  if (j.click) { await evalJs(`(()=>{const e=[...document.querySelectorAll(${JSON.stringify(j.click.sel || "*")})].find(x=>x.textContent.includes(${JSON.stringify(j.click.text || "")}));e&&e.click();})()`); await sleep(1200); }
  for (const f of j.fill || []) {
    await evalJs(`(()=>{const el=document.querySelector(${JSON.stringify(f.sel)});if(!el)return;const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,${JSON.stringify(f.value)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  }
  if (j.css) await evalJs(`(()=>{const st=document.createElement('style');st.textContent=${JSON.stringify(j.css)};document.head.appendChild(st);})()`);
  await sleep(500);
  const rect = await evalJs(`(()=>{const e=document.querySelector(${JSON.stringify(j.clipSel)});e.scrollIntoView({block:'start'});const r=e.getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};})()`);
  await sleep(600);
  const pad = j.pad ?? 16;
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: Math.max(0, rect.x - pad), y: Math.max(0, rect.y - pad), width: rect.width + pad * 2, height: rect.height + pad * 2, scale: 1 } });
  writeFileSync(j.out, Buffer.from(shot.result.data, "base64"));
  console.log("saved", j.out, Math.round(rect.width), "x", Math.round(rect.height));
}
ws.close();
chrome.kill();
process.exit(0);
