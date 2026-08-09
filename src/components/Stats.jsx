import { useEffect, useRef, useState } from "react";
import { STATS } from "../content";

function useCountUp(target, decimals, delay, duration, reduced) {
  const [value, setValue] = useState(reduced ? target : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let timer = 0;
    let done = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done) return;
          done = true;
          io.unobserve(entry.target);

          timer = window.setTimeout(() => {
            let start = 0;
            const step = (now) => {
              if (!start) start = now;
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
              setValue(target * eased);
              if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
          }, delay);
        });
      },
      { threshold: 0.25 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [target, delay, duration, reduced]);

  return [value.toFixed(decimals), ref];
}

function Stat({ stat, index, reduced }) {
  const [display, ref] = useCountUp(
    stat.value,
    stat.decimals,
    420 + index * 90,
    1400 + index * 80,
    reduced
  );

  return (
    <div className="stat" ref={ref} style={{ "--d": `${0.5 + index * 0.08}s` }}>
      <span className="stat-value">
        {display}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export default function Stats({ reduced }) {
  return (
    <div className="stats">
      {STATS.map((stat, i) => (
        <Stat key={stat.label} stat={stat} index={i} reduced={reduced} />
      ))}
    </div>
  );
}
