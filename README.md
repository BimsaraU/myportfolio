# Portfolio — Bimsara Udurawana

React + Vite. Dark, fully generated backdrop — no video, no image assets, no
external media of any kind. Deploys to Vercel as a static build.

## Run

```
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the built output
```

## Deploy to Vercel

Push the repo and import it, or:

```
npx vercel
```

`vercel.json` pins the framework preset, build command and output directory,
and sets immutable caching on hashed assets. Nothing else is required.

## Structure

```
index.html                     shell + placeElement capability probe
src/main.jsx                   entry
src/App.jsx                    header, hero, work, contact
src/content.js                 all copy and numbers, single source of truth
src/styles.css                 tokens + layout
src/components/Backdrop.jsx    generated dark backdrop (canvas)
src/components/PlacedBadge.jsx DOM-in-Canvas hero element
src/components/Stats.jsx       count-up metrics
```

## The backdrop

`Backdrop.jsx` draws everything at runtime: a deep vertical gradient, a
deterministic starfield, three parallaxing summed-sine ridge silhouettes, a
horizon glow, and a grain tile to hide banding. It replaces the CloudFront
video the first version used — same mood, far darker, zero bytes of media to
download.

The starfield is seeded from a deterministic hash, so it looks identical on
every load. The ridges drift with the pointer and with time; both stop under
`prefers-reduced-motion: reduce`, which renders a single static frame.

## DOM-in-Canvas

`PlacedBadge.jsx` uses Chrome's experimental Canvas 2D `placeElement()` API.
The "Open to internships" badge is real DOM — clickable, focusable, readable
by screen readers — rasterised into a canvas each frame so the canvas can
paint a rotating dashed ring and a pulse *behind* it, which stacked DOM alone
could not composite.

Enable it at `chrome://flags/#enable-experimental-web-platform-features`.

Constraints the implementation respects:

- one `placeElement` call per element per frame
- translate only — rotating or non-uniformly scaling a placed element breaks
  its native hit-testing
- the badge stays laid out and in the document (`opacity: 0`, never
  `display: none`) because the API requires it
- any throw inside the loop removes the canvas and restores the plain badge
- the loop pauses when the tab is hidden

Without the flag the canvas is removed at mount and the badge is ordinary DOM.
The page is complete and correct in every browser; the ring is the only thing
you lose.

## Content

Every string and number in `src/content.js` comes from `CVv3.tex`:

| Metric | Value | Source |
|---|---|---|
| Current GPA | 3.75 | stated verbatim in the CV |
| Projects Shipped | 6 | 6 entries in Projects, 6 distinct GitHub repos |
| Leadership Roles | 7 | Asst. Director · OC Lead · Asst. Pillar Head · OC Co-Lead ×2 · Co-Founder & Head of Design · President |
| O/L Passes | 9A | stated verbatim in the CV |

The Experience section lists 15 roles in total; 7 of them are lead, head,
founder or president titles, which is what the "Leadership Roles" figure
counts.
