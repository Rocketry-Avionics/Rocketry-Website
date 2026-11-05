import type { SponsorPoint, SponsorTier } from "./types";

export const sponsor = {
  hero: {
    eyebrow: "Sponsor us",
    title: "Put your name on the pad",
    body: "Back a student team designing a *hybrid-engine, retro-propulsive rocket* from the ground up. Your support goes into boards, sensors, test stands and launch days, and your name goes where the whole campus can see it.",
  },
  impact: {
    eyebrow: "Why back us",
    title: "Real engineering, not a demo",
    description:
      "Everything below is work this team is doing now. The status of every project is public on our Avionics page.",
    points: [
      {
        icon: "cpu",
        title: "Custom 4-layer flight computers",
        body: "We design our own flight computer in Altium. The v0 board works today and the v1 *4-layer PCB* is in design.",
      },
      {
        icon: "flame",
        title: "Hybrid propulsion",
        body: "We are developing a *dual-restart capable hybrid engine*, along with the research and static fire testing that comes with it.",
      },
      {
        icon: "rocket",
        title: "TVC retro-propulsive landing",
        body: "The vehicle is being designed around *thrust vector control* and propulsive landing, with a Unity simulation environment already scaffolded.",
      },
      {
        icon: "users",
        title: "A talent pipeline",
        body: "Sponsors meet the students behind the work: electronics, mechanics, aerodynamics and software people who learn by *shipping hardware*.",
      },
    ] as SponsorPoint[],
  },
  allocation: {
    eyebrow: "The money trail",
    title: "Where your support goes",
    description:
      "We do not publish fixed percentages here. Sponsors who ask get a clear breakdown of how their contribution is used.",
    points: [
      {
        icon: "circuit",
        title: "PCB fabrication",
        body: "Board fabrication and assembly for every flight computer revision.",
      },
      {
        icon: "gauge",
        title: "Sensor suites",
        body: "The IMUs, barometers and wider sensor set the v1 flight computer needs.",
      },
      {
        icon: "wrench",
        title: "Test stands",
        body: "Rigs to test the engine, the electronics and the radio link on the ground before anything flies.",
      },
      {
        icon: "shield",
        title: "Safety",
        body: "Protective gear, safe handling and the checks that keep every test and launch safe.",
      },
      {
        icon: "flag",
        title: "Launch operations",
        body: "Travel, permissions, field equipment and recovery for launch days.",
      },
    ] as SponsorPoint[],
  },
  tiers: {
    eyebrow: "Ways to back the mission",
    title: "Be part of the vehicle",
    description:
      "These packages are indicative and carry no fixed prices. We shape the final package with each sponsor over email.",
    list: [
      {
        name: "Supporter",
        tagline: "Be seen by the community",
        benefits: [
          "Logo in the website sponsor spotlight",
          "Thank-you in our public build updates on LinkedIn",
        ],
      },
      {
        name: "Partner",
        tagline: "Be on the pad",
        benefits: [
          "Everything in Supporter",
          "Banner at our launch stand",
          "Recruitment access: introductions to our crew for internships and hiring",
        ],
      },
      {
        name: "Title Partner",
        tagline: "Fly with us",
        featured: true,
        benefits: [
          "Everything in Partner",
          "Your branding on the rocket airframe",
          "Top billing in the website sponsor spotlight",
        ],
      },
    ] as SponsorTier[],
  },
  cta: {
    eyebrow: "Get in touch",
    title: "Let's talk",
    body: "Write to us directly, or use the quick form and your email app will open with the message ready. Tell us who you are and what you would like to support.",
  },
} as const;
