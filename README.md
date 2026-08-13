# Portfolio, Bimsara Udurawana

React and Vite. Dark, fully generated backdrop: no video, no image assets, no
external media of any kind. Deploys to Vercel as a static build.

## Run

```
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the built output
```

If port 5173 fails with `EACCES` on Windows, pass another one:

```
npm run dev -- --port 5273 --host 127.0.0.1
```

## Deploy

Push and import the repo on Vercel, or:

```
npx vercel
```

`vercel.json` pins the framework preset, build command and output directory,
and sets immutable caching on hashed assets.

## Structure

```
index.html                     shell, font links, capability probe
src/main.jsx                   entry
src/App.jsx                    header, hero, work, about, contact
src/content.js                 all copy and numbers, single source of truth
src/styles.css                 tokens and layout
src/components/Backdrop.jsx    generated dark backdrop (canvas)
src/components/PlacedBadge.jsx DOM in canvas hero element
src/components/Stats.jsx       count up metrics
```

## Typography

Three faces, each with one job:

- **BubbledotICG-FinePos**, the retro dot matrix display face, used only for
  the hero headline, the section titles and the brand mark. It is wide and
  geometric, so it gets tighter tracking and a lower size ceiling than a sans
  would need.
- **Inter** for all body copy, cards and navigation.
- **JetBrains Mono** for figures, tech tags and repository paths.

Body text never uses the pixel face. An earlier draft set the stat glyphs in
it and they were unreadable at small sizes.

## The backdrop

`Backdrop.jsx` draws everything at runtime: a deep vertical gradient, a
deterministic starfield, three parallaxing summed sine ridges, a horizon glow,
a bottom fade and a grain tile to hide banding.

The starfield is seeded from a sine hash, so it looks identical on every load.
Ridges drift with the pointer and with time. Both stop under
`prefers-reduced-motion: reduce`, which renders a single static frame.

## DOM in canvas

`PlacedBadge.jsx` uses Chrome's experimental Canvas 2D `placeElement()` API.
The status badge is real DOM, clickable and readable by screen readers, and it
is rasterised into a canvas each frame so the canvas can paint a ring behind
it that stacked DOM could not composite.

Enable it at `chrome://flags/#enable-experimental-web-platform-features`.

Constraints the implementation respects:

- one `placeElement` call per element per frame
- translate only, because rotating or non-uniformly scaling a placed element
  breaks its native hit testing
- the badge stays laid out and in the document (`opacity: 0`, never
  `display: none`) because the API requires it
- any throw inside the loop removes the canvas and restores the plain badge
- the loop pauses when the tab is hidden

The API is not yet in stable Chrome, so almost every visitor gets the fallback
path. A CSS ring stands in for the canvas one, which is why the effect is
visible at all today.

## Content

Every string and number in `src/content.js` comes from CVv3.

| Metric | Value | Source |
|---|---|---|
| Current GPA | 3.75 | stated in the CV |
| Projects | 6 | 6 entries in Projects, 6 distinct repositories |
| Lead Roles | 7 | Asst. Director, OC Lead, Asst. Pillar Head, OC Co-Lead x2, Co-Founder and Head of Design, President |
| O/L Passes | 9A | stated in the CV |

All six projects are listed with their repositories:

- [DVCon Sitting Ducks](https://github.com/BimsaraU/DVCon-SittingDucks)
- [Smart Campus Digital Twin](https://github.com/Smart-Campus-Digital-Twin)
- [DS Research Tourism](https://github.com/rathishTharusha/DS-research-Tourism)
- [PhotoTag](https://github.com/BimsaraU/PhotoTag)
- [SkyNest](https://github.com/BimsaraU/SkyNest)
- [Nano Processor](https://github.com/BimsaraU/Nanoprocessor-Design-Project)

The Experience section lists 15 roles in total. Seven of them are lead, head,
founder or president titles, which is what the Lead Roles figure counts.
