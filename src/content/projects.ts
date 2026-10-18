import type { AvionicsProject, MiniProjectRef } from "./types";

export const structuralProjects: MiniProjectRef[] = [];

export const propulsionProjects: MiniProjectRef[] = [];

export const avionicsProjects: AvionicsProject[] = [
  {
    id: "hardware-core",
    index: "01",
    title: "Hardware Core",
    status: "Active",
    summary:
      "A sophisticated, custom 4-layer PCB designed in Altium to carry a highly efficient and powerful microcontroller plus the sensor suite for flight data collection.",
    points: [
      "4-layer board design in Altium",
      "Microcontroller + IMU/barometer sensor suite for flight data acquisition",
      "Power management for the whole avionics stack",
      "Evolving from our working Teensy 4.1 flight computer prototypes",
    ],
    tags: ["Altium", "PCB Design", "Embedded", "Sensors"],
    icon: "cpu",
    timeline: [
      {
        label: "v0 flight computer working",
        detail:
          "Fully working 2-layer PCB: Teensy 4.1 + BMP280 + MPU6050, with voltage regulator circuits. No communications on this board.",
        status: "Done",
      },
      {
        label: "v1 flight computer in design",
        detail:
          "4-layer PCB in Altium around the Portenta H7 with a wider, more sophisticated sensor suite (sensors to be announced).",
        status: "In Progress",
      },
    ],
    media: [
      {
        kind: "pcb",
        caption:
          "Stylized board view: Teensy 4.1 + BMP280 + MPU6050 with regulator circuits",
      },
      {
        kind: "image",
        src: "/media/avionics/flight-computer-v0.jpg",
        alt: "v0 flight computer: Teensy 4.1 on the custom carrier board",
        caption: "v0 flight computer: Teensy 4.1 on the custom carrier board",
      },
      {
        kind: "image",
        src: "/media/avionics/flight-computer-v0-field.jpg",
        alt: "v0 flight computer stack with a separate radio protoboard and antenna during outdoor testing",
        caption:
          "v0 stack during outdoor testing, with a separate radio protoboard and antenna",
      },
    ],
  },
  {
    id: "software-core",
    index: "02",
    title: "Software Core",
    status: "Active",
    summary:
      "The logic that drives the custom flight controller: collect data, preprocess it with filters, run real-time flight decisions, and record everything for post-flight analysis.",
    points: [
      "Data acquisition from the onboard sensor suite",
      "Preprocessing: filtering and sensor fusion",
      "Real-time processing: TVC control, parachute deployment events",
      "Post-processing: SD card logging, metrics, flight plots",
    ],
    tags: ["C/C++", "Filtering", "Real-time", "SD Logging"],
    icon: "code",
    timeline: [
      {
        label: "v0 data collection firmware working",
        detail:
          "Fully working code collecting MPU6050 and BMP280 data over Teensy 4.1 on the v0 board.",
        status: "Done",
      },
      {
        label: "Flight pipeline growing",
        detail:
          "Filtering, real-time control (TVC, deployment events) and post-processing, moving toward the v1 Portenta H7 board.",
        status: "In Progress",
      },
    ],
    media: [
      {
        kind: "code",
        caption:
          "Representative of the v0 data collection loop: MPU6050 + BMP280 over Teensy 4.1",
      },
    ],
  },
  {
    id: "communication-systems",
    index: "03",
    title: "Communication Systems",
    status: "Active",
    summary:
      "A two-way link between the rocket and the base station: not just downlinking data, but sending commands up. Separate hardware and software tracks working with Hardware Core on integration.",
    points: [
      "Hardware track: comm modules, integrated into the main processing PCB",
      "Software track: custom test logic to stress modules and find edge cases",
      "Data collection and transfer in both directions",
      "Base station side of the link",
    ],
    tags: ["RF", "Telemetry", "Integration", "Test Rigs"],
    icon: "radio",
    media: [
      {
        kind: "placeholder",
        note: "Photos of the v0 radio protoboard and antenna rig will be added here.",
      },
    ],
  },
  {
    id: "website",
    index: "04",
    title: "Website & Digital Presence",
    status: "Active",
    summary:
      "This website: designed and maintained in-house by avionics members. The public face of the project for outreach, recruiting and sponsors.",
    points: [
      "Next.js + TypeScript + Tailwind CSS",
      "Interactive Three.js launch zone built in-house",
      "Performance-budgeted to run on cheap mobile devices",
      "Content fully data-driven so updates never touch UI code",
    ],
    tags: ["Next.js", "Three.js", "Tailwind", "TypeScript"],
    icon: "globe",
    media: [
      {
        kind: "placeholder",
        note: "This very website. Media and milestones here will be refreshed once we deploy.",
      },
    ],
  },
  {
    id: "rl-landing-sim",
    index: "05",
    title: "Self-Landing RL Simulation",
    status: "In Progress",
    summary:
      "A Unity-based earth environment where the rocket is modeled as close as possible to what the structural team provides, and a custom RL agent learns propulsive landing. Policy weights would be exported via ONNX or TFLite for eventual deployment on the microcontroller.",
    points: [
      "Unity environment: rocket model, spawn point, landing pad",
      "Custom reinforcement learning agent for propulsive landing",
      "ONNX / TFLite export of trained weights: planned",
      "Onboard deployment once the vehicle can support it: planned",
    ],
    tags: ["Unity", "Reinforcement Learning", "ONNX", "TFLite"],
    icon: "brain",
    timeline: [
      {
        label: "Unity environment scaffolded",
        detail: "Rocket model, spawn point and landing pad set up in Unity 6.",
        status: "Done",
      },
      {
        label: "RL agent training",
        detail: "Custom reinforcement learning agent learning propulsive landing.",
        status: "Planned",
      },
      {
        label: "ONNX / TFLite export and onboard deployment",
        detail:
          "Policy weights exported and deployed on the flight MCU once the vehicle can support it.",
        status: "Planned",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/media/avionics/unity-landing-env.jpg",
        alt: "Unity 6 scene with the rocket model, spawn point and landing pad",
        caption: "Unity 6 environment: rocket, spawn point and landing pad",
      },
      {
        kind: "placeholder",
        note: "Training runs and agent clips will be added as the RL work progresses.",
      },
    ],
  },
  {
    id: "outreach",
    index: "06",
    title: "Outreach",
    status: "Active",
    summary:
      "Run by the leads and core members: public build logs, updates and event presence. Crew members contribute technically and help by reposting what we publish.",
    points: [
      "Public updates on LinkedIn",
      "Build logs and milestones",
      "Recruiting and campus presence",
    ],
    tags: ["LinkedIn", "Community"],
    icon: "megaphone",
    media: [
      {
        kind: "placeholder",
        note: "Photos from worksessions and events will be added here.",
      },
    ],
  },
];
