import type { SocialLink } from "./types";

export const site = {
  name: "Project Rocketry",
  fullName: "Project Rocketry BITS Goa",
  org: "SEDS Celestia",
  orgUrl: "https://sedscelestia.org",
  institution: "BITS Pilani, K.K. Birla Goa Campus",
  location: "Zuarinagar, Goa, India",
  tagline: "A hybrid-engine, retro-propulsive rocket: designed by students.",
  mission:
    "*Project Rocketry* is a student-run team under SEDS Celestia at BITS Pilani, K.K. Birla Goa Campus. We are researching and designing a *hybrid engine-powered, retro-propulsive rocket* with telemetry-based control and thrust vector control (TVC).",
  missionDetail:
    "The project is divided into three subsystems: Propulsion, Avionics, and Structural: each researching, building and testing their part of the vehicle. We document what we build, what breaks, and what we learn from it.",
  description:
    "A student-run rocketry project under SEDS Celestia at BITS Goa, designing avionics, structures and propulsion for a hybrid-engine, retro-propulsive rocket capable of thrust vector control.",
  email: null as string | null,
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/project-rocketry/",
      icon: "linkedin",
    },
    {
      label: "SEDS Celestia",
      href: "https://sedscelestia.org",
      icon: "globe",
    },
  ] as SocialLink[],
} as const;
