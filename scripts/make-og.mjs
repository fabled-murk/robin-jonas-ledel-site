// Generates public/og.png (1200x630) from the same tokens as the site.
// Run `npm run og` after changing the name or strapline. Output is committed.
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";
import { site } from "../content/site.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <g stroke="#16161612" stroke-width="2">
    ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="630"/>`).join("")}
    ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 48}" x2="1200" y2="${i * 48}"/>`).join("")}
  </g>
  <rect x="64" y="64" width="1072" height="502" fill="#ffffff" stroke="#161616" stroke-width="6"/>
  <rect x="88" y="88" width="1072" height="502" fill="none" stroke="#0f62fe" stroke-width="6"/>
  <rect x="112" y="128" width="150" height="150" fill="#0f62fe" stroke="#161616" stroke-width="6"/>
  <text x="187" y="235" font-family="DejaVu Sans, sans-serif" font-size="74" font-weight="bold" fill="#ffffff" text-anchor="middle">JL</text>
  <text x="300" y="196" font-family="DejaVu Sans, sans-serif" font-size="68" font-weight="bold" fill="#161616" letter-spacing="-2">${esc(site.name)}</text>
  <text x="300" y="252" font-family="DejaVu Sans Mono, monospace" font-size="27" fill="#0043ce" letter-spacing="2">${esc(site.role.toUpperCase())}</text>
  <rect x="112" y="330" width="1000" height="6" fill="#161616"/>
  <text x="112" y="410" font-family="DejaVu Sans, sans-serif" font-size="42" font-weight="bold" fill="#161616">Platform engineering, Kubernetes and</text>
  <text x="112" y="462" font-family="DejaVu Sans, sans-serif" font-size="42" font-weight="bold" fill="#161616">the pipelines that get you to production.</text>
  <rect x="112" y="496" width="320" height="56" fill="#d0e2ff" stroke="#161616" stroke-width="6"/>
  <text x="272" y="533" font-family="DejaVu Sans Mono, monospace" font-size="24" fill="#161616" text-anchor="middle">${esc(site.origin.replace(/^https?:\/\//, ""))}</text>
</svg>`;

const out = new URL("../public/og.png", import.meta.url);
await sharp(Buffer.from(svg)).png().toFile(out.pathname);
writeFileSync(new URL("../public/og.svg", import.meta.url), svg);
console.log("wrote public/og.png", readFileSync(out).length, "bytes");
