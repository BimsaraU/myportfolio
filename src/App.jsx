import { useEffect, useState } from "react";
import Backdrop from "./components/Backdrop";
import {
  NAME,
  TAGLINE,
  SUBHEAD,
  STACK,
  NAV,
  EMAIL,
  GITHUB,
} from "./content";

function Header() {
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

    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
        <a className="badge" href="#work">
          <span className="badge-dot" aria-hidden="true" />
          Open to internships — 2026
        </a>

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

export default function App() {

  return (
    <>
      <Backdrop />

      <div className="page">
        <Header />

        <main>
          <Hero />
        </main>

      </div>
    </>
  );
}
