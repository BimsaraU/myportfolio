# Curriculum Vitae, Bimsara Udurawana

React and Vite, deployed to Vercel as a static build. Designed in the
International Typographic Style: black, white, one red, a visible grid, no
shadows, no rounded corners, no gradients.

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

## Adding a project

Drop a folder into `src/projects/` with your photos and a `project.json`. It
appears on the site on the next build: no imports, no registry, no code
change. Full contract in [src/projects/README.md](src/projects/README.md).

```
src/projects/
  10-my-new-thing/
    project.json      name, header, blurb, tech, links
    cover.jpg         card image
    01-detail.jpg     extra photos for the detail panel
```

A folder with only photos in it also works: the folder name becomes the
project name and the first photo becomes the cover. A folder with no photos
falls back to a generated Bauhaus plate, keyed off the folder name so it stays
the same across builds.

## Structure

```
index.html                       shell, Inter, favicon, meta
public/Bimsara-Udurawana-CV.pdf  the downloadable CV
src/main.jsx                     entry
src/App.jsx                      topbar, hero, work, skills, record, contact
src/content.js                   all CV copy: contacts, skills, education, roles
src/projects/index.js            zero-config folder loader (import.meta.glob)
src/projects/<slug>/             one folder per project: photos + project.json
src/styles.css                   design tokens, patterns, every component
src/components/Plate.jsx         deterministic geometric plate
src/components/ProjectCard.jsx   work grid card
src/components/ProjectPanel.jsx  project detail dialog
```

## Design tokens

Defined once at the top of `src/styles.css`.

| Token       | Value     | Role                                 |
| ----------- | --------- | ------------------------------------ |
| `--bg`      | `#FFFFFF` | canvas                               |
| `--fg`      | `#000000` | text, borders, inverted surfaces     |
| `--muted`   | `#F2F2F2` | secondary surfaces, section headers  |
| `--accent`  | `#FF3000` | the only signal colour               |
| `--border`  | `4px`     | structural rules between sections    |
| `--snap`    | `150ms`   | colour changes, instant feedback     |

Textures are CSS-generated: a 24px grid (`.swiss-grid-pattern`), a 16px dot
matrix (`.swiss-dots`), 45° hatching (`.swiss-diagonal`), and a fractal-noise
paper grain on `body::before`. Never on black or red surfaces.

## Content

Every string in `src/content.js` comes from `CV-new.tex`, the long-form CV.
Projects live in their own folders instead, so the CV copy and the project
record stay separate.

Contact lines, all live:

| Line      | Value                       |
| --------- | --------------------------- |
| Primary   | +94 70 337 1001             |
| Backup    | +94 72 337 1001             |
| Emergency | +94 71 847 1001             |
| Personal  | bimsaraudurawana@gmail.com  |
| University| bimsarau.23@cse.mrt.ac.lk   |

References: Prof. Dulani Meedeniya (Professor) and Dr. Chathuranga
Hettiarachchi (Senior Lecturer), Dept. of Computer Science & Engineering,
University of Moratuwa.

## Projects on file

- [DVCon VEGA-FPGA Accelerator](https://github.com/TharakaUJ/DVcon-accelerator) · [detection side](https://github.com/BimsaraU/DVCon-SittingDucks)
- [Smart Campus Digital Twin](https://github.com/Smart-Campus-Digital-Twin/Smart-Campus-Digital-Twin-v4)
- [TourSL](https://github.com/BimsaraU/toursl-landing-page) · [live](https://toursl-landing-page.vercel.app/)
- [RPAL Interpreter](https://github.com/BimsaraU/RPAL-interpreter)
- [Wallow](https://github.com/BimsaraU/Wallow)
- [Nano Processor](https://github.com/BimsaraU/Nanoprocessor-Design-Project)
- [Tourism Arrivals Forecasting](https://github.com/rathishTharusha/DS-research-Tourism)
- [PhotoTag](https://github.com/BimsaraU/PhotoTag)
- [SkyNest](https://github.com/BimsaraU/SkyNest) · [live](https://sky-nest.vercel.app/)

## Accessibility

- Black on white is 21:1. Red is used for accents and large type, never for
  small body copy on white.
- Focus is a 2px red outline, offset, never removed.
- Touch targets are at least 44px.
- The project dialog closes on Escape, takes focus on open and locks the page
  behind it.
- All motion is CSS transition based and respects
  `prefers-reduced-motion: reduce`.
- A print stylesheet drops the chrome so the page prints as a document.
