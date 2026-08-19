/**
 * Single source of truth for every string on the site.
 * Sourced from CV-new.tex (the long-form CV) — nothing invented.
 *
 * Projects are NOT here: they live as folders under src/projects/.
 * See src/projects/README.md for how to add one.
 */

export const NAME = "Bimsara Udurawana";
export const FULL_NAME =
  "Kulasekara Mudiyanselage Hanthanapitiye Bimsara Madhawa Udurawana";
export const INITIALS = "BU";

export const ROLE_LINE =
  "Computer Science & Engineering Undergraduate / Data Science & Engineering";

export const TAGLINE = "Silicon to Screen";

export const SUBHEAD =
  "I build edge AI systems, FPGA accelerators and full-stack platforms — " +
  "from the models down to the metal underneath. Computer vision, " +
  "time-series forecasting and RTL design verification, shipped and " +
  "measured on real hardware.";

export const PROFILE =
  "Computer Science & Engineering undergraduate at the University of " +
  "Moratuwa (CGPA 3.73/4.00), specialising in Data Science & Engineering " +
  "with a focus on computer vision and time-series analysis. Experienced " +
  "in open-vocabulary and zero-shot object detection, embedding-based " +
  "semantic retrieval, forecasting from noisy real-world signals, and " +
  "end-to-end MLOps pipelines spanning experiment tracking, automated " +
  "retraining and edge deployment. Complements this with FPGA hardware " +
  "acceleration and RTL design verification, delivering INT8 quantised " +
  "CNN inference accelerators verified bit-exact on real silicon.";

/* ---------------------------------------------------------------- contact */

export const GITHUB = "https://github.com/BimsaraU";
export const GITHUB_HANDLE = "BimsaraU";
export const LOCATION = "Katugastota, Kandy, Sri Lanka";
export const ADDRESS = "22/2, Pallethalawinna, Katugastota, Sri Lanka";
export const CITIZENSHIP = "Sri Lankan";

export const EMAILS = [
  { label: "Personal", value: "bimsaraudurawana@gmail.com" },
  { label: "University", value: "bimsarau.23@cse.mrt.ac.lk" },
];

/** First entry is primary; the rest are backup / emergency lines. */
export const PHONES = [
  { label: "Primary", value: "+94 70 337 1001", tel: "+94703371001" },
  { label: "Backup", value: "+94 72 337 1001", tel: "+94723371001" },
  { label: "Emergency", value: "+94 71 847 1001", tel: "+94718471001" },
];

export const EMAIL = EMAILS[0].value;
export const PHONE = PHONES[0].value;

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Record", href: "#record" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ stats */

export const STATS = [
  { value: 3.73, decimals: 2, suffix: "", label: "CGPA / 4.00" },
  { value: 9, decimals: 0, suffix: "", label: "Shipped Projects" },
  { value: 8, decimals: 0, suffix: "", label: "Lead Roles" },
  { value: 409, decimals: 0, suffix: " GOPS", label: "Accelerator Peak" },
];

/* -------------------------------------------------------------- education */

export const EDUCATION = [
  {
    title: "B.Sc. (Hons) in Engineering — Computer Science & Engineering",
    org: "University of Moratuwa, Sri Lanka",
    when: "2024 — Present",
    note: "Specialisation: Data Science & Engineering",
    lines: [
      "Current CGPA 3.73 / 4.00",
      "Semester GPAs — S1 4.00, S2 3.59, S3 3.71, S4 3.70",
      "Coursework: Computer Architecture, Digital System Design, Data Structures & Algorithms, Machine Learning, Database Systems, Operating Systems, Data Science",
    ],
  },
  {
    title: "G.C.E. Advanced Level — Physical Science Stream",
    org: "St. Anthony's College, Kandy",
    when: "2023",
    note: "3 A passes",
    lines: [
      "Combined Mathematics A, Physics A, Chemistry A",
      "General English — A pass",
      "G.C.E. Ordinary Level — 9 A passes",
    ],
  },
];

/* ----------------------------------------------------------------- skills */

export const SKILLS = [
  {
    group: "Computer Vision",
    items: [
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "Ultralytics YOLO",
      "Object Detection & Segmentation",
      "Open-Vocabulary & Zero-Shot Detection",
      "Image Preprocessing & Augmentation",
      "Embedding Models & Semantic Search",
      "Knowledge Distillation",
      "Transfer Learning",
      "Model Evaluation & Benchmarking",
    ],
  },
  {
    group: "Time-Series & Data Science",
    items: [
      "Time-Series Forecasting",
      "Cross-Correlation & Lag Analysis",
      "Feature Engineering",
      "Seasonality & Trend Decomposition",
      "Anomaly Detection",
      "Regression Modelling",
      "Statistical Analysis",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Apache Spark",
      "SQL",
    ],
  },
  {
    group: "MLOps & Model Optimisation",
    items: [
      "MLflow",
      "Weights & Biases",
      "DVC",
      "ONNX Runtime",
      "Quantisation & Pruning",
      "Experiment Tracking & Model Registry",
      "Automated Retraining Pipelines",
      "Kafka",
      "MQTT",
      "Edge Deployment",
    ],
  },
  {
    group: "DevOps & Cloud",
    items: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitOps (ArgoCD)",
      "GitHub Actions",
      "Grafana",
      "Prometheus",
      "Observability & Monitoring",
      "API Gateways",
      "Git",
      "Linux",
    ],
  },
  {
    group: "Hardware Design & RTL",
    items: [
      "SystemVerilog",
      "VHDL",
      "Verilog",
      "RTL Micro-architecture",
      "Systolic Arrays",
      "Pipelining",
      "FSM Design",
      "AXI4 Interconnect",
      "DMA Engines",
      "Network-on-Chip",
      "BRAM & DSP Mapping",
      "Timing Closure",
      "RISC-V",
      "SoC Integration",
    ],
  },
  {
    group: "Design Verification",
    items: [
      "Self-checking Testbenches",
      "Directed & Constrained-Random Verification",
      "UVM",
      "Assertion-Based Verification (SVA)",
      "Functional Coverage",
      "Golden-Model Co-Simulation",
      "Regression Automation",
      "cocotb",
      "Hardware-in-the-Loop Bring-up",
    ],
  },
  {
    group: "EDA & Toolchains",
    items: [
      "AMD/Xilinx Vivado",
      "QuestaSim",
      "Vitis",
      "Vivado HLS",
      "Synthesis & Implementation Flows",
      "TCL Scripting",
      "Artix-7 / Kintex-7 / UltraScale+",
    ],
  },
  {
    group: "Programming & Software",
    items: [
      "Python",
      "C++",
      "C",
      "Java",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Bash",
      "React",
      "Next.js",
      "Three.js",
      "Vite",
      "Spring Boot",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "PostgreSQL",
      "InfluxDB",
      "Redis",
      "MongoDB",
      "REST APIs",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    group: "Digital Media Design",
    items: [
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Lightroom",
      "After Effects",
      "Premiere Pro",
      "Figma",
      "Canva",
      "Meta Business Suite",
    ],
  },
  {
    group: "Languages",
    items: ["English — Fluent", "Sinhala — Native"],
  },
];

/* ------------------------------------------------------------- experience */

export const ROLES = [
  {
    title: "Director, Digital Media",
    org: "CSESS, University of Moratuwa",
    when: "Mar 2026 — Present",
  },
  {
    title: "Assistant Director, Digital Media",
    org: "CSESS, University of Moratuwa",
    when: "Aug 2025 — Mar 2026",
  },
  {
    title: "Organizing Committee Lead",
    org: "Cybercon 2026",
    when: "Mar 2026 — Present",
  },
  {
    title: "Assistant Pillar Head, Creative Design",
    org: "MoraSpirit",
    when: "Mar 2025 — Mar 2026",
  },
  {
    title: "OC Co-Lead, Design Team",
    org: "IESL Robogames 2026",
    when: "Dec 2025 — Apr 2026",
  },
  {
    title: "OC Co-Lead, Design Committee",
    org: "Hit The Grounds 2025",
    when: "2025",
  },
  {
    title: "Co-Founder & Head of Design",
    org: "ZerotoHero",
    when: "2023 — Present",
  },
  {
    title: "President, Astronomical Society",
    org: "St. Anthony's College, Kandy",
    when: "2022 — 2023",
  },
];

export const ADDITIONAL_ROLES =
  "Team Member, CS40 Core Marketing — University of Moratuwa (Feb 2025 — " +
  "Present); Team Member, MarCom IGV & B2B Showcasing MST — AIESEC in " +
  "Colombo South (Feb 2025 — Aug 2025); Organizing Committee Member, " +
  "Design Team — MoraForesight, Sakura; Organizing Committee Member, " +
  "Marketing Team — SpiritX by MoraSpirit360, Woof Roof, Cricket Fiesta; " +
  "Pillar Member, Creative Design Pillar — MoraSpirit.";

export const AFFILIATIONS = [
  "IEEE Student Branch, University of Moratuwa",
  "CSESS",
  "MoraSpirit",
  "AIESEC in Colombo South",
  "Rotaract Club of University of Moratuwa",
];

export const REFERENCES = [
  {
    name: "Prof. Dulani Meedeniya",
    org: "Department of Computer Science and Engineering, University of Moratuwa",
    email: "dulanim@cse.mrt.ac.lk",
  },
];
