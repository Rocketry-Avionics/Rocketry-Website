import { site } from "./site";
import type { FaqGroup } from "./types";

export const faq = {
  eyebrow: "FAQ",
  title: "Questions sponsors ask",
  description:
    "Straight answers on who we are, how the money and paperwork work, and what you get in return. Anything missing? Email us and we will answer in writing.",
  groups: [
    {
      title: "About the team",
      items: [
        {
          question: "Who is Project Rocketry?",
          answer:
            "We are a student-run team under SEDS Celestia at BITS Pilani, K.K. Birla Goa Campus. We design avionics, structures and propulsion for a hybrid-engine, retro-propulsive rocket capable of thrust vector control.",
        },
        {
          question: "Is the team a registered company?",
          answer:
            "No. We are a student team that is part of SEDS Celestia at BITS Goa, not a company. That is why we confirm the receiving account and paperwork with every sponsor in writing before any money moves.",
        },
        {
          question: "Is this real work or just a concept?",
          answer:
            "It is real, and honestly labelled. Our v0 flight computer works today and the first 4-layer board is in design. Every project on the Avionics page carries a status of Active, In Progress or Planned, and we never present unfinished work as done.",
        },
        {
          question: "When will the rocket fly?",
          answer:
            "We do not promise a launch date we cannot keep. Milestones appear on the Avionics page and on our LinkedIn as they become real, and we share dates with sponsors once they are firm.",
        },
      ],
    },
    {
      title: "Money and paperwork",
      items: [
        {
          question: "Who receives the money?",
          answer: `We confirm the receiving account and the paperwork with you in writing before any money moves. Write to ${site.sponsorEmail} and we will walk you through it.`,
        },
        {
          question: "Will I get an invoice or receipt?",
          answer:
            "We agree the invoice or receipt details with you as part of the process, so your finance team has everything it needs.",
        },
        {
          question: "Is a sponsorship tax deductible?",
          answer:
            "That depends on the receiving entity and on your own jurisdiction, and we cannot give tax advice. We share the entity details so your accountant can decide.",
        },
        {
          question: "How is the money used?",
          answer:
            "It funds PCB fabrication, sensor suites, test stands, safety and launch operations. We do not publish fixed percentages, but any sponsor can ask for a clear breakdown of how their contribution is used.",
        },
        {
          question: "Do sponsors have a say in engineering decisions?",
          answer:
            "Sponsors are partners in the mission, but engineering and safety decisions stay with the team.",
        },
      ],
    },
    {
      title: "What you get",
      items: [
        {
          question: "What do sponsors receive?",
          answer:
            "Depending on the package: a logo in the website sponsor spotlight, thanks in our public build updates on LinkedIn, a banner at the launch stand, recruitment access and branding on the rocket airframe. The packages are indicative and the final deliverables are agreed in writing.",
        },
        {
          question: "Will I hear from you after I sponsor?",
          answer:
            "Yes. Every sponsor gets a short update after each milestone, so you can see what your support made possible.",
        },
        {
          question: "How is my logo placed and approved?",
          answer:
            "You send us your logo and we agree the placements together before anything is printed or published. Airframe space is limited and driven by flight and safety needs, so we confirm what fits.",
        },
        {
          question: "Can we sponsor a specific component?",
          answer:
            "Yes, just ask. We are putting together an itemised list so you can fund a specific board, sensor suite or test rig.",
        },
      ],
    },
    {
      title: "Other ways to help",
      items: [
        {
          question: "Can we give products or services instead of cash?",
          answer:
            "Absolutely. PCB fabrication and assembly credits, components and sensors, machining and 3D printing, software licences, tools and test equipment, and services such as printing, logistics and media all help. See the in-kind list above.",
        },
        {
          question: "Can an individual, alum or parent support the team?",
          answer: `Yes. We are setting up a small supporter option where your name goes on the pad: on a plate or sticker on the vehicle and on a public name wall. Write to ${site.sponsorEmail} and we will tell you as soon as it opens.`,
        },
        {
          question: "I am a student. Can I join instead?",
          answer:
            "Yes. Use the contact page to tell us what you want to build, and the crew will get back to you.",
        },
      ],
    },
  ] as FaqGroup[],
} as const;
