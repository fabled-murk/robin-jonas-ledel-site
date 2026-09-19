// Post-build sanity check: every local href/src in dist/ must resolve to a file,
// every in-page anchor must have a target, and the metadata we care about must exist.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";

const dist = resolve(process.cwd(), "dist");
const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".html")) pages.push(full);
  }
})(dist);

const errors = [];
if (pages.length === 0) errors.push("no HTML pages found in dist/");

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const rel = page.slice(dist.length + 1);

  for (const tag of ["canonical", "og:image", "og:title", "twitter:card", "description"]) {
    if (!html.includes(tag)) errors.push(`${rel}: missing ${tag}`);
  }
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${rel}: missing title`);
  if (!/<html lang="[a-z-]+"/.test(html)) errors.push(`${rel}: missing lang`);

  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link = match[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(link)) {
      if (link.startsWith("#") && link.length > 1 && !ids.has(link.slice(1))) {
        errors.push(`${rel}: anchor ${link} has no target`);
      }
      continue;
    }
    const [path, hash] = link.split("#");
    void hash;
    const clean = (path || "index.html").split("?")[0];
    const target = clean.startsWith("/")
      ? join(dist, clean.replace(/^\/[^/]*\//, "")) // strip the Pages base path
      : join(dirname(page), clean);
    if (!existsSync(target)) errors.push(`${rel}: broken link ${link}`);
  }
}

for (const asset of ["og.png", "favicon.svg", "sitemap.xml", "robots.txt"]) {
  if (!existsSync(join(dist, asset))) errors.push(`dist/${asset} missing`);
}

if (errors.length) {
  console.error("link check failed:\n  " + errors.join("\n  "));
  process.exit(1);
}
console.log(`link check passed — ${pages.length} pages`);
