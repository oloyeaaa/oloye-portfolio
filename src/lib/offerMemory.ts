/**
 * Remembers, in this visitor's browser only, whether to stop showing the post
 * pop-up. Closed: 14 days. Filled in a form or reached the tool from a post: for
 * good. If the browser blocks storage it still stops for this page visit.
 */
const CLOSED = "oloye-offer-closed";
const DONE = "oloye-offer-done";
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

let stoppedThisVisit = false;

export function canShowOffer(): boolean {
  if (stoppedThisVisit) return false;
  try {
    if (localStorage.getItem(DONE)) return false;
    const closed = Number(localStorage.getItem(CLOSED));
    return !closed || Date.now() - closed >= FOURTEEN_DAYS;
  } catch {
    return true;
  }
}

export function rememberOfferClosed(): void {
  stoppedThisVisit = true;
  try {
    localStorage.setItem(CLOSED, String(Date.now()));
  } catch {}
}

export function rememberOfferDone(): void {
  stoppedThisVisit = true;
  try {
    localStorage.setItem(DONE, "1");
  } catch {}
}
