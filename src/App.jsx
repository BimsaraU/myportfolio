import { useEffect, useState } from "react";
import Backdrop from "./components/Backdrop";
import PlacedBadge from "./components/PlacedBadge";
import Stats from "./components/Stats";
import {
  NAME,
  TAGLINE,
  SUBHEAD,
  STACK,
  NAV,
  EMAIL,
  GITHUB,
  PROJECTS,
} from "./content";

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return reduced;
}

function Header({ open, setOpen }) {
  return (
    <header className="header">
      <a className="brand" href="#top" aria-label={`${NAME} — home`}>
        <span className="brand-mark">BU</span>
        <span className="brand-name">{NAME}</span>
      </a>

      <nav className="nav" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.href} className="nav-link" href={item.href}>
            {item.label}
          </a>
        ))}
        <a
          className="nav-cta"
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>

      <button
        className="burger"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function Hero({ reduced }) {
  return (
    <section className="hero" id="top">
      <PlacedBadge reduced={reduced}>
        <a className="badge" href="#work">
          <span className="badge-dot" aria-hidden="true" />
          Open to internships — 2026
        </a>
      </PlacedBadge>

      <h1 className="headline">
        <span className="hl-line">{NAME}</span>
        <span className="hl-line hl-accent">{TAGLINE}</span>
      </h1>

      <p className="subhead">{SUBHEAD}</p>

      <div className="stack" aria-label="Core stack">
        {STACK.map((s) => (
          <span className="chip" key={s}>
            {s}
          </span>
        ))}
      </div>

      <div className="hero-actions">
        <a className="btn btn-primary" href="#work">
          View Work
        </a>
        <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>
          Get in touch
        </a>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="work" id="work">
      <h2 className="section-title">Selected Work</h2>

      <div className="cards">
        {PROJECTS.map((p) => (
          <a
            className="card"
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="card-context">{p.context}</span>
            <h3 className="card-name">{p.name}</h3>
            <p className="card-blurb">{p.blurb}</p>
            <ul className="card-tech">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </a>
        ))}
      </div>

      <a
        className="work-more"
        href={GITHUB}
        target="_blank"
        rel="noopener noreferrer"
      >
        All repositories on GitHub →
      </a>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Contact</h2>
      <p className="contact-line">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
      <p className="contact-line muted">
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">
          github.com/BimsaraU
        </a>
      </p>
    </section>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Backdrop reduced={reduced} />

      <div className="page">
        <Header open={open} setOpen={setOpen} />

        {open && (
          <div className="sheet" onClick={() => setOpen(false)}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        )}

        <main>
          <Hero reduced={reduced} />
          <Stats reduced={reduced} />
          <Work />
          <Contact />
        </main>

        <footer className="foot">
          <span>© {new Date().getFullYear()} {NAME}</span>
          <span className="muted">University of Moratuwa</span>
        </footer>
      </div>
    </>
  );
}
