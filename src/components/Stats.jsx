import { useEffect, useRef, useState } from "react";
import { STATS } from "../content";

/**
 * Counts each figure up once, the first time the block scrolls into view.
 * Mechanical and short — 900ms linear-ish, no easing bounce.
 * Reduced motion gets the final number immediately.
 */
function useCountUp(target, run) {
  const [value, setValue] = useState(run ? 0 : target);

  useEffect(() => {
    if (!run) {
      setValue(target);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frame;

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // Fast start, hard stop. No overshoot.
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);

  return value;
}

function Stat({ stat, run }) {
  const value = useCountUp(stat.value, run);

  return (
    <li className="stat">
      <span className="stat-value">
        {value.toFixed(stat.decimals)}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
      <span className="stat-plus" aria-hidden="true">
        +
      </span>
    </li>
  );
}

export default function Stats({ reduced }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (reduced || seen || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduced, seen]);

  return (
    <ul className="stats" ref={ref}>
      {STATS.map((stat) => (
        <Stat key={stat.label} stat={stat} run={!reduced && seen} />
      ))}
    </ul>
  );
}
