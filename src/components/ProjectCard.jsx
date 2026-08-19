import Plate from "./Plate";

/** Two-digit index, so the grid reads like a catalogue. */
function num(index) {
  return String(index + 1).padStart(2, "0");
}

export default function ProjectCard({ project, index, onOpen }) {
  const { name, header, blurb, tech, year, role, cover, featured, slug } =
    project;

  return (
    <article className={`card${featured ? " card--wide" : ""}`}>
      <button
        type="button"
        className="card-hit"
        onClick={() => onOpen(project)}
        aria-label={`Open ${name}`}
      />

      <div className="card-media">
        {cover ? (
          <img src={cover.src} alt={cover.alt || name} loading="lazy" />
        ) : (
          <Plate seed={slug} />
        )}
      </div>

      <div className="card-body">
        <div className="card-top">
          <span className="card-num">{num(index)}</span>
          {header ? <span className="card-header">{header}</span> : null}
        </div>

        <h3 className="card-name">{name}</h3>
        {blurb ? <p className="card-blurb">{blurb}</p> : null}

        {tech.length ? (
          <ul className="tags">
            {tech.slice(0, 6).map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
            {tech.length > 6 ? (
              <li className="tag tag--more">+{tech.length - 6}</li>
            ) : null}
          </ul>
        ) : null}

        <div className="card-foot">
          <span className="card-meta">
            {[year, role].filter(Boolean).join(" / ")}
          </span>
          <span className="card-open" aria-hidden="true">
            Open
          </span>
        </div>
      </div>
    </article>
  );
}
