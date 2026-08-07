import { useEffect, useRef } from "react";

/**
 * The DOM-in-Canvas element.
 *
 * `ctx.placeElement()` (Chrome's experimental Canvas 2D DOM-in-Canvas API)
 * rasterises live DOM into a canvas while leaving it interactive — the badge
 * below stays clickable, focusable and readable by screen readers even though
 * what you see is painted by canvas.
 *
 * We place a small status badge rather than the whole headline, because:
 *   - the headline must be legible in every browser, and the API only ships
 *     behind Chrome's Experimental Web Platform Features flag
 *   - a compact element keeps the per-frame rasterisation cheap
 *
 * Around the placed badge the canvas draws a scanning ring and a pulse that
 * plain DOM could not composite behind it. Where the API is unavailable the
 * canvas is removed and the badge renders as ordinary DOM — visually near
 * identical, minus the ring.
 */
export default function PlacedBadge({ reduced, children }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const probe = document.createElement("canvas").getContext("2d");
    const supported = typeof (probe && probe.placeElement) === "function";

    // Baseline path: no canvas at all, the badge is just DOM.
    if (!supported) {
      canvas.remove();
      return;
    }

    const ctx = canvas.getContext("2d");
    let raf = 0;
    let w = 0;
    let h = 0;
    let bx = 0;
    let by = 0;
    let dead = false;

    host.dataset.placed = "true";

    // Padding around the badge so the ring has room to draw.
    const PAD = 26;

    function measure() {
      const badge = host.firstElementChild;
      if (!badge) return;

      const rect = badge.getBoundingClientRect();
      w = rect.width + PAD * 2;
      h = rect.height + PAD * 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Badge origin inside the canvas box. Recomputed on resize only.
      bx = PAD;
      by = PAD;
    }

    function draw(t) {
      if (dead) return;

      ctx.clearRect(0, 0, w, h);

        const badge = host.firstElementChild;
        if (!badge) return;

        const bw = w - PAD * 2;
        const bh = h - PAD * 2;
        const cx = w / 2;
        const cy = h / 2;

        if (!reduced) {
          // Pulse behind the badge.
          const pulse = (Math.sin(t / 1400) + 1) / 2;
          const glow = ctx.createRadialGradient(
            cx,
            cy,
            bh * 0.3,
            cx,
            cy,
            Math.max(bw, bh) * 0.85
          );
          glow.addColorStop(0, "rgba(120, 190, 255, " + (0.1 + pulse * 0.08) + ")");
          glow.addColorStop(1, "rgba(120, 190, 255, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(0, 0, w, h);

          // A dashed ring that rotates around the badge. Drawn behind it —
          // this is the compositing plain DOM could not do.
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(t / 5200);
          ctx.strokeStyle = "rgba(150, 200, 255, 0.30)";
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 9]);
          ctx.beginPath();
          ctx.ellipse(0, 0, bw / 2 + 12, bh / 2 + 12, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // The live DOM. Translate only — rotating or non-uniformly scaling a
        // placed element breaks its native hit-testing.
        ctx.save();
        ctx.translate(bx, by);
        ctx.placeElement(badge, 0, 0);
        ctx.restore();

      if (!reduced) raf = requestAnimationFrame(draw);
    }

    // placeElement rasterises live DOM, so wait for fonts or the first frame
    // shows a fallback face.
    const ready =
      document.fonts && document.fonts.ready
        ? document.fonts.ready
        : Promise.resolve();

    ready.then(() => {
      if (dead) return;
      measure();
      if (reduced) draw(0);
      else raf = requestAnimationFrame(draw);
    });

    const ro = new ResizeObserver(() => {
      measure();
      if (reduced) draw(0);
    });
    ro.observe(host);

    function onVisibility() {
      if (reduced || dead) return;
      if (document.visibilityState === "hidden") {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(draw);
      }
    }

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      delete host.dataset.placed;
    };
  }, [reduced]);

  return (
    <div className="placed-host" ref={hostRef}>
      {children}
      <canvas className="placed-canvas" ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
