/**
 * CAT-11 — "GREAT SUCCESS" overlay. Original artwork and homage wording only;
 * no copyrighted stills, no third-party requests. Loaded on demand.
 */
const MUSTACHE = `<svg viewBox="0 0 200 70" role="img" aria-label="A very large moustache" focusable="false">
  <path d="M100 18c14-14 38-18 58-8 22 11 32 34 26 50-5 13-22 16-33 8-9-7-12-19-21-24-10-6-21-5-30 2-9-7-20-8-30-2-9 5-12 17-21 24-11 8-28 5-33-8-6-16 4-39 26-50 20-10 44-6 58 8z" fill="#161616"/>
</svg>`;

export function greatSuccess(): void {
  if (document.getElementById("borat-egg")) return;

  const style = document.createElement("style");
  style.textContent = `
#borat-egg { position: fixed; inset: 0; z-index: 999; display: grid; place-items: center;
  background: color-mix(in srgb, var(--blue-60) 82%, transparent); padding: 1.5rem; }
#borat-egg .panel { background: var(--paper); border: 3px solid var(--ink); box-shadow: 12px 12px 0 var(--ink);
  padding: clamp(1.5rem, 5vw, 3rem); max-width: 34rem; text-align: center; transform: rotate(-1.5deg); }
#borat-egg h2 { font-size: clamp(2.2rem, 9vw, 4rem); letter-spacing: -.04em; margin: 0 0 .5rem; }
#borat-egg p { margin: 0 auto 1.25rem; max-width: 30ch; }
#borat-egg svg { width: clamp(9rem, 30vw, 14rem); height: auto; display: block; margin: 0 auto 1rem; }
#borat-egg .btn { border: 3px solid var(--ink); }
@media (prefers-reduced-motion: no-preference) {
  #borat-egg .panel { animation: borat-in .22s cubic-bezier(.2,1.4,.5,1) both; }
  #borat-stache { animation: borat-drop .45s cubic-bezier(.2,1.4,.5,1) both; }
  @keyframes borat-in { from { transform: translateY(14px) rotate(-1.5deg); opacity: 0 } to { transform: rotate(-1.5deg); opacity: 1 } }
  @keyframes borat-drop { from { transform: translate(-50%, -260%) } to { transform: translate(-50%, -50%) } }
}
#borat-stache { position: absolute; left: 50%; top: 62%; transform: translate(-50%, -50%);
  width: 62%; pointer-events: none; filter: drop-shadow(3px 3px 0 rgba(255,255,255,.65)); }`;
  document.head.append(style);

  // Moustache snaps onto the hero portrait.
  const portrait = document.getElementById("portrait");
  if (portrait) {
    const stache = document.createElement("div");
    stache.id = "borat-stache";
    stache.setAttribute("aria-hidden", "true");
    stache.innerHTML = MUSTACHE;
    portrait.append(stache);
  }

  const overlay = document.createElement("div");
  overlay.id = "borat-egg";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Easter egg");
  overlay.innerHTML = `<div class="panel">
    ${MUSTACHE}
    <h2>GREAT SUCCESS!</h2>
    <p>The deploy is green, the cluster is calm. High five.</p>
    <button class="btn" type="button" id="borat-close">Niiice — close</button>
  </div>`;
  document.body.append(overlay);

  const close = (): void => {
    overlay.remove();
    document.removeEventListener("keydown", onKey);
  };
  const onKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape") close();
  };
  overlay.querySelector<HTMLButtonElement>("#borat-close")?.focus();
  overlay.querySelector("#borat-close")?.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", onKey);
}
