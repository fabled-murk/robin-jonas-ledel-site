# jonas ledel — personal site

Static personal site for Jonas Ledel (Fabled AB). IBM Blue 60 on paper, neobrutalist
furniture: 3px borders, 6px hard shadows, zero radius, no gradients.

## Run it

```bash
npm install
npm run dev        # renders HTML, then serves with Vite
npm run check      # build + type-check + link/metadata check — run before pushing
npm run og         # regenerate public/og.png after a copy change
```

## How it fits together

| Path | What it is |
| --- | --- |
| `content/site.mjs` | All copy and contact details. The only file to edit for wording. |
| `scripts/render.mjs` | Generates `index.html`, `styleguide.html`, `sitemap.xml`, `robots.txt`. |
| `src/tokens.css` | Design tokens — colour, type, borders, shadows. |
| `src/styles.css` | The design system itself. |
| `src/main.ts` | Entry point and the easter-egg triggers. |
| `src/borat.ts` | Lazy-loaded easter egg payload. Never in the first paint. |
| `scripts/check-links.mjs` | Post-build check: links resolve, anchors exist, metadata present. |

`index.html` and `styleguide.html` are generated but committed, so the repo is
buildable and greppable without running anything first.

## Styleguide

`/styleguide.html` renders every token and component. Check it after touching CSS.

## Deploying

Pushes to `main` build and publish to GitHub Pages. To move to a custom domain,
set `SITE_ORIGIN` (used for canonical, OG and sitemap URLs) and `BASE_PATH=/`
in the build, and add the `CNAME` file Pages expects.

## Easter egg

There is one. It is hidden, it is lazy-loaded, and it is not documented here.
