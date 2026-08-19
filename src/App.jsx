import { useEffect, useState } from "react";
import Plate from "./components/Plate";
import Stats from "./components/Stats";
import ProjectCard from "./components/ProjectCard";
import ProjectPanel from "./components/ProjectPanel";
import PROJECTS from "./projects";
import {
  NAME,
  FULL_NAME,
  INITIALS,
  ROLE_LINE,
  TAGLINE,
  SUBHEAD,
  PROFILE,
  NAV,
  GITHUB,
  GITHUB_HANDLE,
  LOCATION,
  ADDRESS,
  CITIZENSHIP,
  EMAILS,
  PHONES,
  EDUCATION,
  SKILLS,
  ROLES,
  ADDITIONAL_ROLES,
  AFFILIATIONS,
  REFERENCES,
} from "./content";

const CV_FILE = "/Bimsara-Udurawana-CV.pdf";

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

/** Numbered rule + title. Every major section wears one. */
function SectionHead({ num, title, note }) {
  return (
    <div className="sec-head swiss-dots">
      <p className="overline">
        <span className="overline-num">{num}.</span> {title}
      </p>
      {note ? <p className="sec-note">{note}</p> : null}
    </div>
  );
}

function Header({ open, setOpen }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label={`${NAME}, home`}>
        <span className="brand-mark">{INITIALS}</span>
        <span className="brand-name">{NAME}</span>
      </a>

      <nav className="nav" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.href} className="nav-link" href={item.href}>
            <span className="nav-link-in">{item.label}</span>
            <span className="nav-link-out" aria-hidden="true">
              {item.label}
            </span>
          </a>
        ))}
        <a className="btn btn--sm" href={CV_FILE} download>
          CV / PDF
        </a>
      </nav>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div className="menu" id="menu">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={CV_FILE} download onClick={() => setOpen(false)}>
            CV / PDF
          </a>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-main">
        <p className="overline">
          <span className="overline-num">00.</span> {ROLE_LINE}
        </p>

        <h1 className="hero-name">
          Bimsara
          <br />
          Udurawana
        </h1>

        <p className="hero-tagline">{TAGLINE}</p>
        <p className="hero-sub">{SUBHEAD}</p>

        <div className="hero-actions">
          <a className="btn" href="#work">
            See the work
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>

      <aside className="hero-side swiss-grid-pattern">
        <Plate seed="hero-01" className="hero-plate" />
        <dl className="hero-facts">
          <dt>Based</dt>
          <dd>{LOCATION}</dd>
          <dt>Field</dt>
          <dd>Edge AI / RTL / Full Stack</dd>
          <dt>Code</dt>
          <dd>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              github.com/{GITHUB_HANDLE}
            </a>
          </dd>
        </dl>
      </aside>
    </section>
  );
}

function Work({ onOpen }) {
  return (
    <section className="section" id="work">
      <SectionHead
        num="01"
        title="Work"
        note={`${PROJECTS.length} projects on file`}
      />
      <div className="grid-work">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            onOpen={onOpen}
          />
        ))}

        {/* Closes the last grid row rather than leaving it ragged. */}
        <a className="card card--cta" href="#contact">
          <span className="cta-plus" aria-hidden="true">
            +
          </span>
          <span className="cta-text">
            The next one
            <br />
            could be yours
          </span>
          <span className="card-open">Get in touch</span>
        </a>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHead num="02" title="Skills" note="Tools, methods, languages" />
      <div className="grid-skills">
        {SKILLS.map((group) => (
          <div key={group.group} className="skill-block">
            <h3 className="skill-title">{group.group}</h3>
            <ul className="tags">
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Record() {
  return (
    <section className="section" id="record">
      <SectionHead num="03" title="Record" note="Education and leadership" />

      <div className="record-grid">
        <div className="record-col">
          <h3 className="col-title">Education</h3>
          {EDUCATION.map((entry) => (
            <article key={entry.title} className="entry">
              <p className="entry-when">{entry.when}</p>
              <h4 className="entry-title">{entry.title}</h4>
              <p className="entry-org">{entry.org}</p>
              {entry.note ? <p className="entry-note">{entry.note}</p> : null}
              <ul className="entry-lines">
                {entry.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}

          <h3 className="col-title">Profile</h3>
          <p className="prose">{PROFILE}</p>
        </div>

        <div className="record-col record-col--roles swiss-diagonal">
          <h3 className="col-title">Leadership</h3>
          <ul className="roles">
            {ROLES.map((role) => (
              <li key={`${role.title}-${role.org}`} className="role">
                <span className="role-when">{role.when}</span>
                <span className="role-title">{role.title}</span>
                <span className="role-org">{role.org}</span>
              </li>
            ))}
          </ul>

          <h3 className="col-title">Also</h3>
          <p className="prose prose--sm">{ADDITIONAL_ROLES}</p>

          <h3 className="col-title">Affiliations</h3>
          <ul className="tags">
            {AFFILIATIONS.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section section--contact" id="contact">
      <SectionHead num="04" title="Contact" note="All lines are live" />

      <div className="contact-grid">
        <div className="contact-lead">
          <h2 className="contact-shout">
            Let&rsquo;s
            <br />
            build it.
          </h2>
          <a className="btn btn--accent" href={`mailto:${EMAILS[0].value}`}>
            Email me
          </a>
        </div>

        <div className="contact-block">
          <h3 className="col-title">Email</h3>
          <ul className="lines">
            {EMAILS.map((item) => (
              <li key={item.value} className="line">
                <span className="line-label">{item.label}</span>
                <a className="line-value" href={`mailto:${item.value}`}>
                  {item.value}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="col-title">Phone</h3>
          <ul className="lines">
            {PHONES.map((item) => (
              <li key={item.tel} className="line">
                <span className="line-label">{item.label}</span>
                <a className="line-value" href={`tel:${item.tel}`}>
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-block">
          <h3 className="col-title">Elsewhere</h3>
          <ul className="lines">
            <li className="line">
              <span className="line-label">GitHub</span>
              <a
                className="line-value"
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/{GITHUB_HANDLE}
              </a>
            </li>
            <li className="line">
              <span className="line-label">Address</span>
              <span className="line-value">{ADDRESS}</span>
            </li>
            <li className="line">
              <span className="line-label">Citizenship</span>
              <span className="line-value">{CITIZENSHIP}</span>
            </li>
          </ul>

          <h3 className="col-title">Reference</h3>
          <ul className="lines">
            {REFERENCES.map((ref) => (
              <li key={ref.email} className="line">
                <span className="line-label">{ref.name}</span>
                <span className="line-value">{ref.org}</span>
                <a className="line-value" href={`mailto:${ref.email}`}>
                  {ref.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-name">{FULL_NAME}</p>
      <p className="footer-meta">
        <span>{LOCATION}</span>
        <span>{PHONES[0].value}</span>
        <span>{EMAILS[0].value}</span>
      </p>
      <p className="footer-note">
        Set in Inter. Built with React and Vite. No trackers.
      </p>
    </footer>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>

      <Header open={open} setOpen={setOpen} />

      <main>
        <Hero />
        <Stats reduced={reduced} />
        <Work onOpen={setActive} />
        <Skills />
        <Record />
        <Contact />
      </main>

      <Footer />

      {active ? (
        <ProjectPanel project={active} onClose={() => setActive(null)} />
      ) : null}
    </>
  );
}
