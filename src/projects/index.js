/**
 * Zero-config project loader.
 *
 * Drop a folder in src/projects/ with photos in it and the site picks it up
 * at build time. A project.json next to the photos fills in the details.
 * Nothing here needs editing when a project is added. See README.md.
 */

// project.json is optional — a folder of photos alone is a valid project.
const metaFiles = import.meta.glob("./*/project.json", { eager: true });

// Every image in every project folder, resolved to a hashed build URL.
const imageFiles = import.meta.glob("./*/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

/** "./04-photo-tag/project.json" -> "04-photo-tag" */
function folderOf(path) {
  return path.split("/")[1];
}

/** "04-photo-tag" -> { order: 4, slug: "photo-tag" } */
function parseFolder(folder) {
  const match = /^(\d+)[-_.\s]+(.*)$/.exec(folder);
  return match
    ? { order: Number(match[1]), slug: match[2] }
    : { order: Number.POSITIVE_INFINITY, slug: folder };
}

/** "photo-tag" -> "Photo Tag" — the fallback when project.json has no name. */
function titleCase(slug) {
  return slug
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Filename without folder or extension, used as the image caption fallback. */
function baseName(path) {
  const file = path.split("/").pop();
  return file.replace(/\.[^.]+$/, "");
}

/** Group image URLs by folder, ordered by filename so 01-, 02- ... sort. */
const imagesByFolder = {};
for (const path of Object.keys(imageFiles).sort()) {
  const folder = folderOf(path);
  (imagesByFolder[folder] ||= []).push({
    src: imageFiles[path],
    name: baseName(path),
    alt: titleCase(baseName(path).replace(/^\d+[-_.\s]*/, "")),
  });
}

/** Every folder that has either a project.json or at least one image. */
const folders = Array.from(
  new Set([
    ...Object.keys(metaFiles).map(folderOf),
    ...Object.keys(imagesByFolder),
  ])
);

export const PROJECTS = folders
  .map((folder) => {
    const meta = metaFiles[`./${folder}/project.json`]?.default ?? {};
    const { order, slug } = parseFolder(folder);
    const images = imagesByFolder[folder] ?? [];

    // A file literally named cover.* wins; otherwise the first image leads.
    const coverIndex = images.findIndex((img) => /^cover$/i.test(img.name));
    const cover = images[coverIndex >= 0 ? coverIndex : 0] ?? null;

    return {
      slug,
      folder,
      order: meta.order ?? order,
      name: meta.name ?? titleCase(slug),
      // "header" is the small overline above the title — the context line.
      header: meta.header ?? "",
      blurb: meta.blurb ?? "",
      detail: meta.detail ?? "",
      tech: meta.tech ?? [],
      links: meta.links ?? [],
      year: meta.year ?? "",
      role: meta.role ?? "",
      featured: meta.featured ?? false,
      cover,
      images,
    };
  })
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

export default PROJECTS;
