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
      "Sense: every loop reads the onboard IMU and barometer",
      "Filter: Kalman / complementary filtering to handle anomalous readings",
      "Decide: PID control, TVC logic and parachute deployment logic",
      "Log: flight data stored on SD card, then processed at the base station",
      "Planned: GPS integration, ground station code and the self-landing RL model running in real time",
    ],
    tags: ["Arduino C++", "Filtering", "PID", "Real-time", "SD Logging"],
    icon: "code",
    timeline: [
      {
        label: "Full pipeline flight-tested on Teensy 4.1",
        detail:
          "Data collection, filtering, PID, TVC and parachute deployment logic, flight-tested on the Teensy 4.1 with MPU6050 and BMP280.",
        status: "Done",
      },
      {
        label: "Moving to Portenta H7",
        detail:
          "Porting the code to the Portenta H7 with the MPU6500 and upgraded sensors, adapting the existing logic to the new components.",
        status: "In Progress",
      },
      {
        label: "GPS integration and ground station code",
        detail:
          "Adding GPS to the flight computer and building the ground station software.",
        status: "Planned",
      },
      {
        label: "Self-landing RL on the flight computer",
        detail:
          "Integrating the RL policy so it runs in real time alongside the existing control logic.",
        status: "Planned",
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
];
