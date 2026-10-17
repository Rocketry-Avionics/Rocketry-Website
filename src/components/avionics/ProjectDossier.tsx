"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { AvionicsProject, TimelineStatus } from "@/content/types";
import StatusBadge from "@/components/ui/StatusBadge";
import MediaCarousel from "./MediaCarousel";

interface ProjectDossierProps {
  project: AvionicsProject | null;
  onClose: () => void;
}

const timelineDot: Record<TimelineStatus, string> = {
  Done: "bg-sky",
  "In Progress": "bg-amber",
  Planned: "bg-line",
};

const timelineText: Record<TimelineStatus, string> = {
  Done: "text-sky",
  "In Progress": "text-amber",
  Planned: "text-muted",
};

export default function ProjectDossier({ project, onClose }: ProjectDossierProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier: ${project.title}`}
    >
      <button
        type="button"
        aria-label="Close dossier"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/85 backdrop-blur-sm"
      />

      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <span className="font-display text-sm font-bold text-flame">
              {project.index}
            </span>
            <h3 className="truncate font-display text-xl font-bold text-paper">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dossier"
            className="shrink-0 rounded-full border border-line bg-ink/70 p-2 text-muted transition-colors hover:text-paper"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {project.media && project.media.length > 0 && (
          <MediaCarousel slides={project.media} />
        )}

        <p className="mt-5 text-sm leading-relaxed text-muted">{project.summary}</p>

        {project.timeline && project.timeline.length > 0 && (
          <div className="mt-6">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Timeline
            </p>
            <ol className="ml-1 mt-4 flex flex-col gap-5 border-l border-line pl-5">
              {project.timeline.map((entry) => (
                <li key={entry.label} className="relative">
                  <span
                    className={`absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full ${timelineDot[entry.status]}`}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-paper">{entry.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{entry.detail}</p>
                  <p className={`mt-1 text-[10px] font-medium uppercase tracking-widest ${timelineText[entry.status]}`}>
                    {entry.status}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2">
          {project.points.map((point) => (
            <p key={point} className="flex items-start gap-2.5 text-sm text-muted">
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky"
                aria-hidden="true"
              />
              {point}
            </p>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
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
    </div>
  );
}
