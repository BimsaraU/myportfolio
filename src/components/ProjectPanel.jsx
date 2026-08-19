import { useEffect, useRef } from "react";
import Plate from "./Plate";

/**
 * Full-bleed detail panel for one project. Escape or the close button shuts
 * it; focus moves in on open and the page behind stops scrolling.
 */
export default function ProjectPanel({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.classList.add("is-locked");
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [onClose]);

  if (!project) return null;

  const { name, header, blurb, detail, tech, links, year, role, images, slug } =
    project;

  const paragraphs = (detail || blurb || "").split("\n\n").filter(Boolean);

  return (
    <div
      className="panel-scrim"
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="panel">
        <header className="panel-head">
          <div>
            {header ? <p className="overline">{header}</p> : null}
            <h2 className="panel-name">{name}</h2>
          </div>
          <button
            type="button"
            className="panel-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close project"
          >
            <span aria-hidden="true">+</span>
          </button>
        </header>

        <div className="panel-grid">
          <div className="panel-copy">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}

            {links.length ? (
              <div className="panel-links">
                {links.map((link) => (
                  <a
                    key={link.href}
                    className="btn"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="panel-side swiss-dots">
            <dl className="spec">
              {year ? (
                <>
                  <dt>Year</dt>
                  <dd>{year}</dd>
                </>
              ) : null}
              {role ? (
                <>
                  <dt>Role</dt>
                  <dd>{role}</dd>
                </>
              ) : null}
              {tech.length ? (
                <>
                  <dt>Stack</dt>
                  <dd>
                    <ul className="tags">
                      {tech.map((item) => (
                        <li key={item} className="tag">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </>
              ) : null}
            </dl>
          </aside>
        </div>

        <div className="panel-gallery">
          {images.length ? (
            images.map((image) => (
              <figure key={image.src} className="shot">
                <img src={image.src} alt={image.alt || name} loading="lazy" />
              </figure>
            ))
          ) : (
            <figure className="shot shot--empty">
              <Plate seed={slug} />
              <figcaption>No photographs filed for this project yet.</figcaption>
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}
