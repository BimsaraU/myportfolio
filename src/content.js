/**
 * Every string and number here comes from CVv3. Nothing is invented.
 *
 * Counts derived by enumerating the CV sections:
 *   Projects   -> 6 entries, 6 distinct GitHub repos
 *   Experience -> 15 entries, of which 7 are lead / head / founder titles
 *   Academic   -> GPA 3.73, O/L 9A passes
 */

export const NAME = "Bimsara Udurawana";

export const TAGLINE = "Silicon to Screen";

export const SUBHEAD =
  "Computer Science and Engineering undergraduate at the University of " +
  "Moratuwa. I build edge AI systems, FPGA hardware and full stack " +
  "platforms, from the models down to the metal underneath.";

export const STACK = ["Python", "C++", "VHDL", "JavaScript"];

export const EMAIL = "bimsaraudurawana@gmail.com";
export const EMAIL_UNI = "bimsarau.23@cse.mrt.ac.lk";
export const PHONE = "0703371001";
export const GITHUB = "https://github.com/BimsaraU";

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: 3.73, decimals: 2, suffix: "", label: "Current GPA" },
  { value: 6, decimals: 0, suffix: "", label: "Projects" },
  { value: 7, decimals: 0, suffix: "", label: "Lead Roles" },
  { value: 9, decimals: 0, suffix: "A", label: "O/L Passes" },
];

/** All six projects from the CV, each with its repository. */
export const PROJECTS = [
  {
    name: "Sitting Ducks",
    context: "DVCon Design Verification Competition",
    blurb:
      "Zero-shot object detection system for edge devices using YOLOE with " +
      "SentenceTransformers for natural language guided detection. FPGA " +
      "accelerated deployment for efficient edge inference.",
    tech: ["YOLOE", "SentenceTransformers", "Python", "FPGA"],
    href: "https://github.com/BimsaraU/DVCon-SittingDucks",
  },
  {
    name: "Smart Campus Digital Twin",
    context: "University of Moratuwa",
    blurb:
      "Scalable IoT integrated 3D digital twin platform for campus " +
      "monitoring. Real time sensor data visualization with interactive 3D " +
      "models, an MQTT and Kafka pipeline, and ML models for energy and " +
      "occupancy analytics.",
    tech: ["Python", "TypeScript", "MQTT", "Kafka"],
    href: "https://github.com/Smart-Campus-Digital-Twin",
  },
  {
    name: "Tourism Arrivals Prediction",
    context: "Data Science Research",
    blurb:
      "Machine learning research predicting weekly international tourist " +
      "arrivals using search intent signals. Correlation analysis between " +
      "search behavior and tourism metrics for demand forecasting.",
    tech: ["Python", "Machine Learning"],
    href: "https://github.com/rathishTharusha/DS-research-Tourism",
  },
  {
    name: "PhotoTag",
    context: "Batch Image Processing Application",
    blurb:
      "Windows desktop application for batch image watermarking and " +
      "tagging. Adaptive orientation detection, grid alignment and " +
      "customizable controls, with DirectX 11 GPU accelerated rendering.",
    tech: ["C++", "DirectX 11", "GDI+", "Dear ImGui"],
    href: "https://github.com/BimsaraU/PhotoTag",
  },
  {
    name: "SkyNest",
    context: "Hotel Management System",
    blurb:
      "Full stack web application for hotel management with a database " +
      "module. Next.js and TypeScript frontend with a PostgreSQL backend " +
      "and Docker deployment.",
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Docker"],
    href: "https://github.com/BimsaraU/SkyNest",
  },
  {
    name: "Nano Processor",
    context: "Computer Architecture",
    blurb:
      "Progressive FPGA processor design in VHDL featuring 4 bit and 8 bit " +
      "iterations with Xilinx primitive optimization. Extended instruction " +
      "set including arithmetic and bitwise operations.",
    tech: ["VHDL", "Xilinx Vivado", "Basys 3"],
    href: "https://github.com/BimsaraU/Nanoprocessor-Design-Project",
  },
];

/** Lead and head titles from the Experience section. */
export const ROLES = [
  {
    title: "Assistant Director, Digital Media",
    org: "CSESS",
    when: "Aug 2025 to Present",
  },
  {
    title: "Organizing Committee Lead",
    org: "Cybercon 2026",
    when: "Mar 2026 to Present",
  },
  {
    title: "Assistant Pillar Head, Creative Design",
    org: "MoraSpirit",
    when: "Mar 2025 to Mar 2026",
  },
  {
    title: "OC Co-Lead, Design Team",
    org: "IESL Robogames 2026",
    when: "Dec 2025 to Apr 2026",
  },
  {
    title: "OC Co-Lead, Design Committee",
    org: "Hit The Grounds 2025",
    when: "",
  },
  {
    title: "Co-Founder and Head of Design",
    org: "ZerotoHero",
    when: "",
  },
  {
    title: "President, Astronomical Society",
    org: "St. Anthony's College",
    when: "2022 to 2023",
  },
];

export const SKILLS = [
  {
    group: "Programming",
    items: [
      "Python",
      "C++",
      "JavaScript",
      "React",
      "Next.js",
      "ExpressJS",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
    ],
  },
  {
    group: "Hardware",
    items: ["VHDL", "Xilinx Vivado", "Basys 3 FPGA"],
  },
  {
    group: "Design",
    items: [
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Figma",
      "After Effects",
      "Premiere Pro",
      "Lightroom",
    ],
  },
];
