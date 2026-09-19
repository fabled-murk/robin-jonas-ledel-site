import "./styles.css";

/**
 * CAT-11 — the egg. Three ways in, all cheap:
 *   1. type `borat` anywhere
 *   2. the Konami code
 *   3. ?veryniiice=1
 * The payload is a dynamic import, so it costs nothing on first paint.
 */
let fired = false;
async function fire(): Promise<void> {
  if (fired) return;
  fired = true;
  const { greatSuccess } = await import("./borat");
  greatSuccess();
}

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

let typed = "";
let konami = 0;

window.addEventListener("keydown", (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null;
  if (target && /^(INPUT|TEXTAREA)$/.test(target.tagName)) return;

  konami = event.key === KONAMI[konami] || event.key.toLowerCase() === KONAMI[konami] ? konami + 1 : 0;
  if (konami === KONAMI.length) {
    konami = 0;
    void fire();
  }

  if (event.key.length === 1) {
    typed = (typed + event.key.toLowerCase()).slice(-8);
    if (typed.endsWith("borat")) void fire();
  }
});

if (new URLSearchParams(window.location.search).get("veryniiice") === "1") {
  void fire();
}
