import { useEffect, useRef } from "react";

/**
 * Generated dark backdrop, replaces the original CloudFront video entirely.
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
    let grain = null;

    function makeGrain() {
      const off = document.createElement("canvas");
      off.width = 128;
      off.height = 128;
      const octx = off.getContext("2d");
      const img = octx.createImageData(128, 128);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      octx.putImageData(img, 0, 0);
      return off;
    }

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
      if (!grain) grain = makeGrain();
      if (reduced) draw(0);
    }

    // One ridge: a summed-sine silhouette filled with a flat dark tone.
    function ridge(yBase, amp, freq, phase, fill, drift) {
      ctx.beginPath();
      ctx.moveTo(0, h);
      const step = 6;
      for (let x = 0; x <= w + step; x += step) {
        const n =
          Math.sin(x * freq + phase) * amp +
          Math.sin(x * freq * 2.3 + phase * 1.7) * amp * 0.4 +
          Math.sin(x * freq * 0.6 + phase * 0.5) * amp * 0.6;
        ctx.lineTo(x + drift, yBase + n);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    }

    function draw(t) {
      px += (tx - px) * 0.06;

      // 1. Sky gradient, near-black overhead, faint ember at the horizon.
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

      // 3. Horizon glow, sitting just under the ridge line.
      const glow = ctx.createRadialGradient(
        w * 0.5 + px * 40,
        h * 0.82,
        0,
        w * 0.5 + px * 40,
        h * 0.82,
        Math.max(w * 0.55, 420)
      );
      glow.addColorStop(0, "rgba(196, 118, 96, 0.20)");
      glow.addColorStop(0.5, "rgba(120, 74, 90, 0.09)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // 4. Ridges, far to near. Nearer ridges are darker and parallax more.
      const drift = reduced ? 0 : t / 60000;
      ridge(h * 0.74, h * 0.045, 0.0042, 1.2 + drift, "#191320", px * 10);
      ridge(h * 0.83, h * 0.055, 0.0031, 3.7 + drift * 1.4, "#100c15", px * 20);
      ridge(h * 0.94, h * 0.05, 0.0024, 5.1 + drift * 1.9, "#08060b", px * 34);

      // 5. Settle the very bottom into the page background colour. The
      //    nearest ridge is already #08060b, so this only closes the last
      //    few percent. Without it the fixed backdrop meets the scrolling
      //    content on a visible seam.
      const fade = ctx.createLinearGradient(0, h * 0.93, 0, h);
      fade.addColorStop(0, "rgba(5, 6, 10, 0)");
      fade.addColorStop(1, "rgba(5, 6, 10, 1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, h * 0.93, w, h * 0.07);

      // 6. Grain, tying the layers together and hiding gradient banding.
      if (grain) {
        const pattern = ctx.createPattern(grain, "repeat");
        if (pattern) {
          ctx.globalAlpha = 0.035;
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, w, h);
          ctx.globalAlpha = 1;
        }
      }
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
