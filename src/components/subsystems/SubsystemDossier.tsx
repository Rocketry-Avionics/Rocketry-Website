"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { Subsystem } from "@/content/types";
import { emphasize } from "@/lib/emphasis";

interface SubsystemDossierProps {
  subsystem: Subsystem | null;
  onClose: () => void;
}

export default function SubsystemDossier({ subsystem, onClose }: SubsystemDossierProps) {
  useEffect(() => {
    if (!subsystem) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [subsystem, onClose]);

  if (!subsystem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier: ${subsystem.name}`}
    >
      <button
        type="button"
        aria-label="Close dossier"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/85 backdrop-blur-sm"
      />

      <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dossier"
            className="rounded-full border border-line bg-ink/70 p-2 text-muted transition-colors hover:text-paper"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Subsystem dossier
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold text-paper">
          {subsystem.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-flame">{subsystem.tagline}</p>

        <p className="mt-5 text-sm leading-relaxed text-muted">
          {emphasize(subsystem.description)}
        </p>

        <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
          {subsystem.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2.5 text-sm text-muted">
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky"
                aria-hidden="true"
              />
              <span>{emphasize(highlight)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
          {subsystem.href ? (
            <Link
              href={subsystem.href}
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-2.5 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              Enter {subsystem.name}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className="inline-flex rounded-full border border-line bg-raised px-4 py-1.5 text-xs text-muted">
              {subsystem.statusNote}
            </span>
          )}
          <span className="text-xs text-muted">Click anywhere to close</span>
        </div>
      </div>
    </div>
  );
}
