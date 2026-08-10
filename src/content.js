/**
 * Every string and number here is taken from CVv3.tex. Nothing is invented.
 * Counts were derived by enumerating the CV sections:
 *   Projects section  -> 6 entries, 6 distinct GitHub repos
 *   Experience        -> 15 entries, of which 7 are lead/head/founder titles
 *   Academic          -> GPA 3.75, O/L 9A passes
 */

export const NAME = "Bimsara Udurawana";

export const TAGLINE = "Silicon to Screen";

export const SUBHEAD =
  "Computer Science & Engineering undergraduate at the University of " +
  "Moratuwa. I build edge AI systems, FPGA hardware and full stack " +
  "platforms — models, pipelines, and the metal underneath.";

export const STACK = ["Python", "C++", "VHDL"];

export const EMAIL = "bimsaraudurawana@gmail.com";
export const GITHUB = "https://github.com/BimsaraU";

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Four headline metrics. `decimals` and `suffix` drive the count-up format.
 */
export const STATS = [
  { value: 3.75, decimals: 2, suffix: "", label: "Current GPA" },
  { value: 6, decimals: 0, suffix: "", label: "Projects Shipped" },
  { value: 7, decimals: 0, suffix: "", label: "Leadership Roles" },
  { value: 9, decimals: 0, suffix: "A", label: "O/L Passes" },
];

/**
 * The three projects worth leading with — an edge-AI/FPGA piece, a systems
 * piece, and a low-level hardware piece. The rest live on GitHub.
 */
export const PROJECTS = [
  {
    name: "Sitting Ducks",
    context: "DVCon Design Verification Competition",
    blurb:
      "Zero-shot object detection for edge devices. YOLOE paired with " +
      "SentenceTransformers for natural-language guided detection, deployed " +
      "on FPGA for efficient edge inference.",
    tech: ["YOLOE", "SentenceTransformers", "Python", "FPGA"],
    href: "https://github.com/BimsaraU/DVCon-SittingDucks",
  },
  {
    name: "Smart Campus Digital Twin",
    context: "University of Moratuwa",
    blurb:
      "IoT-integrated 3D digital twin for campus monitoring. Real-time " +
      "sensor visualisation over an MQTT and Kafka pipeline, with ML models " +
      "for energy and occupancy analytics.",
    tech: ["Python", "TypeScript", "MQTT", "Kafka"],
    href: "https://github.com/Smart-Campus-Digital-Twin",
  },
  {
    name: "Nano Processor",
    context: "Computer Architecture",
    blurb:
      "Progressive FPGA processor design in VHDL — 4-bit and 8-bit " +
      "iterations with Xilinx primitive optimisation and an extended " +
      "arithmetic and bitwise instruction set.",
    tech: ["VHDL", "Vivado", "Basys 3"],
    href: "https://github.com/BimsaraU/Nanoprocessor-Design-Project",
  },
];
