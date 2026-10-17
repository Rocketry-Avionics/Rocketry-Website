import type { SubsystemKey } from "@/content/types";

export const subsystemStyle: Record<SubsystemKey, { bg: string; label: string }> = {
  lead: { bg: "bg-paper text-ink", label: "text-paper" },
  avionics: { bg: "bg-flame text-ink", label: "text-flame" },
  structural: { bg: "bg-sky text-paper", label: "text-sky" },
  propulsion: { bg: "bg-amber text-ink", label: "text-amber" },
};
