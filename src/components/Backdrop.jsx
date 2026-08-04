import { useEffect, useRef } from "react";

/**
 * Generated dark backdrop — replaces the original CloudFront video entirely.
 *
 * Three layers, all drawn in canvas so there is no external asset to load:
 *   1. a deep vertical gradient (near-black at the top, faint ember at the
 *      horizon), matching the mood of the dune footage but far darker
 *   2. layered ridge silhouettes built from summed sine waves, parallaxing
 *      very slightly with the pointer
 *   3. a sparse starfield above the horizon, plus a static grain tile
 *
 * Everything is deterministic apart from the grain, so it renders identically
 * on every load.
 */
export default function Backdrop({ reduced }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    // Lerped pointer, in -1..1 on each axis, for the ridge parallax.
    let tx = 0;
    let px = 0;

    let stars = [];

    // Deterministic pseudo-random so the starfield is stable across reloads.
    function rand(seed) {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    }

    function seedStars() {
      stars = [];
      const count = Math.round((w * h) / 26000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: rand(i + 1) * w,
          y: rand(i + 99) * h * 0.62,
          r: 0.4 + rand(i + 7) * 0.9,
          a: 0.12 + rand(i + 33) * 0.35,
          tw: 0.6 + rand(i + 51) * 1.8,
        });
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
      if (reduced) draw(0);
    }

    function draw(t) {
      px += (tx - px) * 0.06;

      // 1. Sky gradient — near-black overhead, faint ember at the horizon.
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#05060a");
      sky.addColorStop(0.45, "#0a0b12");
      sky.addColorStop(0.72, "#141019");
      sky.addColorStop(0.88, "#241826");
      sky.addColorStop(1, "#2c1c24");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // 2. Starfield.
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = reduced ? 1 : 0.75 + Math.sin(t / 900 + s.tw * 6) * 0.25;
        ctx.globalAlpha = s.a * tw;
        ctx.fillStyle = "#cdd6f4";
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }
      ctx.globalAlpha = 1;

    }

    function frame(t) {
      draw(t);
      raf = requestAnimationFrame(frame);
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || document.body);

    function onPointer(e) {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
    }

    if (!reduced) {
      window.addEventListener("pointermove", onPointer);
      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      if (reduced) return;
      if (document.visibilityState === "hidden") {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(frame);
      }
    }

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas className="backdrop" ref={ref} aria-hidden="true" />;
}
