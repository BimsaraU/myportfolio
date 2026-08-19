# Adding a project

One folder per project. Drop it in `src/projects/` and it appears on the site
on the next build. Nothing else to edit: no imports, no arrays, no registry.

```
src/projects/
  10-my-new-thing/
    project.json      <- optional, but this is where the header and text go
    cover.jpg         <- the card image (a file named cover.* always wins)
    01-detail.jpg     <- extra photos, shown in the project panel
    02-detail.png
```

## The minimum

A folder with photos in it. The folder name becomes the project name:
`10-my-new-thing` renders as **My New Thing**. The number prefix only controls
the order and is stripped from the name.

## project.json

Every field is optional.

```json
{
  "name": "My New Thing",
  "header": "Course Project / 2026",
  "blurb": "One or two sentences for the project card.",
  "detail": "Longer text shown when the card is opened.",
  "tech": ["Python", "PyTorch"],
  "links": [
    { "label": "Repository", "href": "https://github.com/BimsaraU/thing" },
    { "label": "Live", "href": "https://thing.vercel.app" }
  ],
  "year": "2026",
  "role": "Solo",
  "featured": true,
  "order": 10
}
```

| Field      | What it does                                                       |
| ---------- | ------------------------------------------------------------------ |
| `name`     | Project title. Defaults to the folder name, title-cased.           |
| `header`   | Small red overline above the title, the context line.              |
| `blurb`    | Card copy. Keep it to two sentences.                               |
| `detail`   | Long copy in the opened panel. Blank line separates paragraphs.    |
| `tech`     | Tag list under the copy.                                           |
| `links`    | Buttons in the panel. First link also makes the card title a link. |
| `year`     | Shown in the card meta row.                                        |
| `role`     | Shown in the card meta row.                                        |
| `featured` | Makes the card span the full grid width.                           |
| `order`    | Overrides the numeric folder prefix.                               |

## Photos

- Supported: `.png .jpg .jpeg .webp .avif .gif .svg`
- Sorted by filename, so prefix them `01-`, `02-` to control the sequence.
- `cover.*` is used for the card; if absent, the first image is.
- No photos is fine: the card falls back to a generated geometric plate.
- Keep them under ~500 KB each; they are bundled, not fetched.
