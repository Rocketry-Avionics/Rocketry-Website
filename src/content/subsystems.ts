import type { Subsystem } from "./types";

export const subsystems: Subsystem[] = [
  {
    id: "avionics",
    name: "Avionics",
    tagline: "The brain of the rocket",
    description:
      "Flight stabilization and trajectory correction, data acquisition and onboard sensing, communication systems and telemetry, and the electronics at the base station.",
    highlights: [
      "Custom flight computer and 4-layer PCB",
      "Flight software: filters, real-time control, post-flight analysis",
      "Two-way telemetry link with the base station",
    ],
    href: "/avionics",
    statusNote: null,
  },
  {
    id: "structural",
    name: "Structural",
    tagline: "The body of the rocket",
    description:
      "The rocket's body and overall structural design, landing mechanisms and recovery structures, aerodynamic design and stability.",
    highlights: [
      "Airframe and structural design",
      "Landing and recovery mechanisms",
      "Aerodynamics and stability",
    ],
    href: null,
    statusNote: "Page coming soon: official details pending",
  },
  {
    id: "propulsion",
    name: "Propulsion",
    tagline: "The muscle of the rocket",
    description:
      "Development of the rocket motor: a dual-restart capable hybrid rocket engine, and research and testing related to hybrid propulsion.",
    highlights: [
      "Dual-restart capable hybrid engine",
      "Hybrid propulsion research",
      "Static fire testing",
    ],
    href: null,
    statusNote: "Page coming soon: official details pending",
  },
];
