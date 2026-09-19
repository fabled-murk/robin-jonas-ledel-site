// Generates index.html and styleguide.html from content/site.mjs.
// Run via `npm run render` (build and dev do it for you).
import { writeFileSync } from "node:fs";
import { site } from "../content/site.mjs";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ORIGIN = site.origin.replace(/\/$/, "");
const OG = `${ORIGIN}/og.png`;

const head = (title, description, page) => `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="author" content="${esc(site.name)}" />
<meta name="theme-color" content="#0f62fe" />
<link rel="icon" href="favicon.svg" type="image/svg+xml" />
<link rel="canonical" href="${ORIGIN}/${page === "index.html" ? "" : page}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${ORIGIN}/${page === "index.html" ? "" : page}" />
<meta property="og:image" content="${OG}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${OG}" />
<script type="module" src="/src/main.ts"></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
  <div class="wrap">
    <a class="brand" href="./"><b>JL</b> Jonas Ledel</a>
    <nav class="nav" aria-label="Primary">
      <a href="${page === "index.html" ? "#about" : "./#about"}">About</a>
      <a href="${page === "index.html" ? "#work" : "./#work"}">What I do</a>
      <a href="${page === "index.html" ? "#fabled" : "./#fabled"}">Fabled</a>
      <a href="${page === "index.html" ? "#contact" : "./#contact"}">Contact</a>
    </nav>
  </div>
</header>
<main id="main">`;

const foot = () => `</main>
<footer>
  <div class="wrap">
    <p class="colophon">${esc(site.colophon)}</p>
    <p class="colophon">© ${new Date().getFullYear()} ${esc(site.name)} · <a href="styleguide.html">Styleguide</a></p>
  </div>
</footer>
</body>
</html>
`;

const marquee = (text, times = 6) =>
  `<div class="marquee" aria-hidden="true">${`<span>${esc(text)}</span>`.repeat(times)}</div>`;

const index = () => `${head(`${site.name} — ${site.role}`, site.description, "index.html")}
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">${esc(site.hero.kicker)}</p>
      <h1>${esc(site.hero.title)}</h1>
      <p class="lead">${esc(site.hero.lead)}</p>
      <div class="actions">
        ${site.hero.actions
          .map(
            (a) =>
              `<a class="btn${a.variant === "ghost" ? " btn--ghost" : ""}" href="${esc(a.href)}">${esc(a.label)}</a>`
          )
          .join("\n        ")}
      </div>
    </div>
    <figure class="portrait" id="portrait" style="margin:0">
      <span class="initials" aria-hidden="true">JL</span>
      <figcaption class="tag">${esc(site.location)}</figcaption>
    </figure>
  </div>
</section>

${marquee("Kubernetes · Cilium · CI/CD · vClusters · cloud-native · Göteborg")}

<section id="about">
  <div class="wrap">
    <h2 class="eyebrow">${esc(site.about.title)}</h2>
    <div class="grid">
      <div>${site.about.body.map((p) => `<p>${esc(p)}</p>`).join("\n      ")}</div>
      <div class="card card--blue">
        <ul class="facts">
          <li><span class="k">Role</span><span class="v">${esc(site.role)}</span></li>
          <li><span class="k">Based in</span><span class="v">${esc(site.location)}</span></li>
          <li><span class="k">Company</span><span class="v"><a href="https://fabled.se">Fabled AB</a></span></li>
          <li><span class="k">Focus</span><span class="v">Platform engineering</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section id="work">
  <div class="wrap">
    <h2 class="eyebrow">${esc(site.services.title)}</h2>
    <div class="grid">
      ${site.services.items
        .map(
          (s) =>
            `<article class="card"><span class="num">${esc(s.n)}</span><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></article>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section id="approach">
  <div class="wrap">
    <h2 class="eyebrow">${esc(site.approach.title)}</h2>
    <div class="grid">
      ${site.approach.items
        .map((s) => `<article class="card card--blue"><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></article>`)
        .join("\n      ")}
    </div>
  </div>
</section>

<section id="fabled">
  <div class="wrap">
    <h2 class="eyebrow">${esc(site.fabled.title)}</h2>
    <div class="grid">
      <div>
        <p>${esc(site.fabled.body)}</p>
        <p><a class="btn btn--ghost" href="${esc(site.fabled.link.href)}">${esc(site.fabled.link.label)}</a></p>
      </div>
      <div class="card card--ink">
        <h3>Visit</h3>
        <p>${esc(site.fabled.address)}</p>
      </div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="wrap">
    <h2 class="eyebrow">${esc(site.contact.title)}</h2>
    <h2>Say hello.</h2>
    <p class="lead">${esc(site.contact.lead)}</p>
    <div class="grid" style="margin-top:2rem">
      ${site.contact.items
        .map(
          (c) =>
            `<article class="card"><span class="num">${esc(c.label)}</span><h3><a href="${esc(c.href)}">${esc(c.value)}</a></h3></article>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>
${foot()}`;

const swatch = (name, varName) =>
  `<div class="card" style="padding:0;overflow:hidden"><div style="height:5rem;background:var(${varName});border-bottom:var(--border)"></div><div style="padding:.7rem"><strong>${esc(name)}</strong><br /><code style="font-family:var(--mono);font-size:.75rem">var(${varName})</code></div></div>`;

const styleguide = () => `${head(`Styleguide — ${site.name}`, "Design tokens and components: IBM blue x neobrutalism.", "styleguide.html")}
<section>
  <div class="wrap">
    <p class="eyebrow">Styleguide</p>
    <h1>IBM blue ×<br />neobrutalism</h1>
    <p class="lead">Every token and component the site is built from. 3px borders, 6px hard shadows, no radius, no gradients.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="eyebrow">Colour</h2>
    <div class="grid">
      ${swatch("Blue 60 — action", "--blue-60")}
      ${swatch("Blue 70 — hover", "--blue-70")}
      ${swatch("Blue 20 — blocks", "--blue-20")}
      ${swatch("Ink", "--ink")}
      ${swatch("Paper", "--paper")}
      ${swatch("Acid yellow", "--yellow")}
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="eyebrow">Type</h2>
    <p class="h1-demo" style="font-size:clamp(2.5rem,7.5vw,5.25rem);font-weight:700;letter-spacing:-.03em;line-height:1.02;margin:0 0 .5rem">Heading one</p>
    <p style="font-size:clamp(1.9rem,4.5vw,3rem);font-weight:700;letter-spacing:-.03em;line-height:1.02;margin:0 0 .5rem">Heading two</p>
    <p style="font-size:clamp(1.15rem,2vw,1.4rem);font-weight:700;letter-spacing:-.02em;margin:0 0 1rem">Heading three</p>
    <p>Body copy in IBM Plex Sans. <a href="https://fabled.se">An inline link</a> highlights on hover.</p>
    <p style="font-family:var(--mono)">IBM Plex Mono — labels, numerals, eyebrows.</p>
  </div>
</section>

<section id="buttons">
  <div class="wrap">
    <h2 class="eyebrow">Buttons</h2>
    <div class="actions">
      <a class="btn" href="#buttons">Primary</a>
      <a class="btn btn--ghost" href="#buttons">Ghost</a>
      <button class="btn" type="button">Button element</button>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="eyebrow">Cards</h2>
    <div class="grid">
      <article class="card"><span class="num">01</span><h3>Default card</h3><p>Paper, 3px border, 6px shadow.</p></article>
      <article class="card card--blue"><h3>Accent card</h3><p>Blue 20 block for rhythm.</p></article>
      <article class="card card--ink"><h3>Inverted card</h3><p>Blue 60 with white text.</p></article>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="eyebrow">Form fields</h2>
    <form class="grid" onsubmit="event.preventDefault()">
      <label>Name<br /><input class="card" style="width:100%;padding:.7rem;font:inherit;margin-top:.4rem" type="text" placeholder="Jonas Ledel" /></label>
      <label>Email<br /><input class="card" style="width:100%;padding:.7rem;font:inherit;margin-top:.4rem" type="email" placeholder="jonas@fabled.se" /></label>
      <label>Message<br /><textarea class="card" style="width:100%;padding:.7rem;font:inherit;margin-top:.4rem" rows="3" placeholder="Hello"></textarea></label>
    </form>
  </div>
</section>
${foot()}`;

writeFileSync(new URL("../index.html", import.meta.url), index());
writeFileSync(new URL("../styleguide.html", import.meta.url), styleguide());
console.log("rendered index.html + styleguide.html");

// Sitemap + robots, generated from the same origin.
const today = new Date().toISOString().slice(0, 10);
const urls = ["", "styleguide.html"];
writeFileSync(
  new URL("../public/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${ORIGIN}/${u}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`
);
writeFileSync(
  new URL("../public/robots.txt", import.meta.url),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`
);
console.log("rendered sitemap.xml + robots.txt");
