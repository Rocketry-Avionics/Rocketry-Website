"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Code2,
  Cpu,
  FolderOpen,
  Globe,
  Megaphone,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { avionicsProjects } from "@/content/projects";
import type { AvionicsProject } from "@/content/types";
import StatusBadge from "@/components/ui/StatusBadge";
import MiniTimeline from "@/components/avionics/MiniTimeline";
import ProjectDossier from "@/components/avionics/ProjectDossier";

const iconFor: Record<string, LucideIcon> = {
  cpu: Cpu,
  code: Code2,
  radio: Radio,
  globe: Globe,
  brain: BrainCircuit,
  megaphone: Megaphone,
};

export default function AvionicsDirectory() {
  const [selected, setSelected] = useState<AvionicsProject | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6">
      {avionicsProjects.map((project) => {
        const Icon = iconFor[project.icon] ?? Cpu;
        return (
          <article
            key={project.id}
            id={project.id}
            className="scroll-mt-24 rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-8 md:grid-cols-[1fr_240px]">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-sm font-bold text-flame">
                    {project.index}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-paper">
                    {project.title}
                  </h2>
                  <StatusBadge status={project.status} />
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-muted">
                  {project.summary}
                </p>
                <ul className="flex flex-col gap-2">
                  {project.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-muted">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-1 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-raised px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex min-h-40 flex-col justify-center gap-4 rounded-xl border border-line bg-[radial-gradient(ellipse_at_center,rgba(61,111,158,0.12),transparent_70%)] p-5">
                {project.timeline && project.timeline.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-center font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                      Where it stands
                    </p>
                    <MiniTimeline entries={project.timeline} />
                  </div>
                ) : (
                  <Icon className="mx-auto h-10 w-10 text-sky" aria-hidden="true" />
                )}
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="mx-auto inline-flex items-center gap-2 rounded-full border border-flame/50 bg-flame/10 px-4 py-2 font-display text-xs font-semibold text-flame transition-colors hover:bg-flame/20"
                >
                  <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Open project dossier
                </button>
              </div>
            </div>
          </article>
        );
      })}

      <ProjectDossier project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
