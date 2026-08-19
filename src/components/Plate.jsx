/**
 * Deterministic Bauhaus-style geometric plate.
 *
 * Used for the hero composition and as the stand-in card image for projects
 * that have no photos in their folder yet. Same seed, same drawing — so a
 * project keeps its plate across builds.
 */

const RED = "#FF3000";
const BLACK = "#000000";
const GRAY = "#F2F2F2";

/** Cheap string hash so a project slug always maps to the same layout. */
function seedOf(seed) {
  let h = 0;
  for (let i = 0; i < String(seed).length; i++) {
    h = (h * 31 + String(seed).charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Five fixed compositions. Fixed, not random: the grid decides, not chance. */
const LAYOUTS = [
  (a) => (
    <>
      <rect x="0" y="0" width="100" height="100" fill={GRAY} />
      <circle cx="66" cy="34" r="26" fill={a} />
      <rect x="8" y="52" width="46" height="40" fill={BLACK} />
      <path d="M8 8 H54" stroke={BLACK} strokeWidth="4" />
      <path d="M8 20 H36" stroke={BLACK} strokeWidth="4" />
    </>
  ),
  (a) => (
    <>
      <rect x="0" y="0" width="100" height="100" fill={GRAY} />
      <rect x="0" y="0" width="52" height="100" fill={BLACK} />
      <circle cx="52" cy="50" r="24" fill={a} />
      <path d="M62 82 H96" stroke={BLACK} strokeWidth="4" />
      <path d="M74 92 H96" stroke={BLACK} strokeWidth="4" />
    </>
  ),
  (a) => (
    <>
      <rect x="0" y="0" width="100" height="100" fill={GRAY} />
      <path d="M0 100 L0 30 L70 100 Z" fill={BLACK} />
      <rect x="58" y="10" width="34" height="34" fill={a} />
      <circle cx="24" cy="22" r="12" fill="none" stroke={BLACK} strokeWidth="4" />
    </>
  ),
  (a) => (
    <>
      <rect x="0" y="0" width="100" height="100" fill={GRAY} />
      <circle cx="50" cy="50" r="34" fill={BLACK} />
      <path d="M50 16 A34 34 0 0 1 50 84 Z" fill={a} />
      <rect x="4" y="4" width="14" height="14" fill={BLACK} />
      <rect x="82" y="82" width="14" height="14" fill={a} />
    </>
  ),
  (a) => (
    <>
      <rect x="0" y="0" width="100" height="100" fill={GRAY} />
      <rect x="10" y="10" width="80" height="26" fill={BLACK} />
      <rect x="10" y="44" width="38" height="46" fill={a} />
      <path d="M58 44 V90" stroke={BLACK} strokeWidth="4" />
      <path d="M74 44 V90" stroke={BLACK} strokeWidth="4" />
      <path d="M90 44 V90" stroke={BLACK} strokeWidth="4" />
    </>
  ),
];

export default function Plate({ seed = 0, accent = RED, className = "" }) {
  const layout = LAYOUTS[seedOf(seed) % LAYOUTS.length];

  return (
    <svg
      className={`plate ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {layout(accent)}
    </svg>
  );
}
