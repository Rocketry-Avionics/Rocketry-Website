import type { LeadGroup, TeamMember } from "./types";

export const team = {
  note: "Team photos coming soon. The avionics roster — leads, core and crew — reflects our public announcements. Structural and propulsion rosters will be added once confirmed.",
  leads: [
    {
      id: "avionics",
      title: "Avionics",
      members: [
        {
          name: "Vaiebhav Shreevarshan R",
          role: "Avionics Co-Lead",
          subsystem: "avionics",
        },
        {
          name: "Harshvardhan Jadhavrao",
          role: "Avionics Co-Lead",
          subsystem: "avionics",
        },
      ],
    },
    {
      id: "structural",
      title: "Structural",
      members: [{ name: null, role: "Structural Lead", subsystem: "structural" }],
    },
    {
      id: "propulsion",
      title: "Propulsion",
      members: [{ name: null, role: "Propulsion Lead", subsystem: "propulsion" }],
    },
  ] as LeadGroup[],
  avionicsCore: [
    { name: "Sushan Gopu", role: "Avionics Core", subsystem: "avionics" },
    { name: "Pradyumna Annaluru", role: "Avionics Core", subsystem: "avionics" },
    { name: "Shlok Katla", role: "Avionics Core", subsystem: "avionics" },
    { name: "Adhiraj Dogra", role: "Avionics Core", subsystem: "avionics" },
    { name: "Amritanshu Kar", role: "Avionics Core", subsystem: "avionics" },
  ] as TeamMember[],
  avionicsCrew: [
    { name: "Aaditya Kulkarni", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Aarush Salvi", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Aashika Patil", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Ariv Afonso", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Atulith", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Kanishk Ashok", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Kaustubh Mohapatra", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Raghav Mehta", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Shrish Sarkar", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Siddharth Rajalingam", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Sparsh Aggarwal", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Srihari T Kumar", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Srijan Mitra", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Vallabh Mungekar", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Vinayak Prabhu", role: "Avionics Crew", subsystem: "avionics" },
    { name: "Hritika Joshi", role: "Avionics Crew", subsystem: "avionics" },
  ] as TeamMember[],
};
