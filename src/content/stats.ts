import { avionicsProjects, propulsionProjects, structuralProjects } from "./projects";
import type { StatItem } from "./types";

const miniProjectCount =
  avionicsProjects.length + structuralProjects.length + propulsionProjects.length;

export const stats: StatItem[] = [
  { value: "3", label: "Subsystems" },
  { value: String(miniProjectCount), label: "Mini-projects" },
];
