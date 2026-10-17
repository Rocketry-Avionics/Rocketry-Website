export type ProjectStatus = "Active" | "In Progress" | "Planned";

export type SocialIcon = "linkedin" | "globe" | "instagram" | "github" | "youtube";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface Subsystem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  href: string | null;
  statusNote: string | null;
}

export interface AvionicsProject {
  id: string;
  index: string;
  title: string;
  status: ProjectStatus;
  summary: string;
  points: string[];
  tags: string[];
  icon: "cpu" | "code" | "radio" | "globe" | "brain" | "megaphone";
  mediaNote: string | null;
}

export type SubsystemKey = "lead" | "avionics" | "structural" | "propulsion";

export interface Dossier {
  gmail: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface TeamMember {
  name: string | null;
  role: string;
  subsystem: SubsystemKey;
  photo?: string | null;
  dossier?: Dossier;
}

export interface LeadGroup {
  id: Exclude<SubsystemKey, "lead">;
  title: string;
  members: TeamMember[];
}

export interface StatItem {
  value: string;
  label: string;
}
