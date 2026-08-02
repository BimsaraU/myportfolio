import { useEffect, useState } from "react";
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

export default function App() {

  return (
    <>

      <div className="page">
        <Header />

        <main>
        </main>

      </div>
    </>
  );
}
