"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { subsystems } from "@/content/subsystems";
import type { Subsystem } from "@/content/types";
import { emphasize } from "@/lib/emphasis";
import SubsystemDossier from "@/components/subsystems/SubsystemDossier";

export default function SubsystemGrid() {
  const [selected, setSelected] = useState<Subsystem | null>(null);

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {subsystems.map((subsystem) => (
          <article
            key={subsystem.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelected(subsystem)}
            onKeyDown={(event) => {
              if (event.key === "Enter") setSelected(subsystem);
            }}
            className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-flame/40 hover:shadow-[0_0_40px_-14px_rgba(224,82,82,0.4)] focus:outline-none focus-visible:border-flame/60"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-paper">
                {subsystem.name}
              </h3>
              <p className="text-sm text-flame">{subsystem.tagline}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {emphasize(subsystem.description)}
            </p>
            <ul className="flex flex-col gap-2">
              {subsystem.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                  <span>{emphasize(highlight)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              {subsystem.href ? (
                <Link
                  href={subsystem.href}
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-flame/50 bg-flame/10 px-4 py-1.5 font-display text-sm font-semibold text-flame shadow-[0_0_24px_-8px_rgba(224,82,82,0.55)] transition-colors hover:bg-flame/20"
                >
                  Enter {subsystem.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : (
                <span className="inline-flex rounded-full border border-line bg-raised px-3 py-1 text-xs text-muted">
                  {subsystem.statusNote}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
      <SubsystemDossier subsystem={selected} onClose={() => setSelected(null)} />
    </>
  );
}
