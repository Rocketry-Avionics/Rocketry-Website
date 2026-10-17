"use client";

import { useState } from "react";
import { team } from "@/content/team";
import type { TeamMember } from "@/content/types";
import { subsystemStyle } from "@/lib/subsystemStyle";
import { site } from "@/content/site";
import DossierModal from "@/components/team/DossierModal";
import MemberPhoto from "@/components/team/MemberPhoto";

interface SelectableMember {
  onSelect: (member: TeamMember) => void;
}

function MemberCard({ member, onSelect }: SelectableMember & { member: TeamMember }) {
  const style = subsystemStyle[member.subsystem];
  return (
    <button
      type="button"
      onClick={() => onSelect(member)}
      className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-5 text-center transition-colors hover:border-flame/60"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line">
        <MemberPhoto member={member} sizes="(max-width: 640px) 45vw, 220px" />
      </div>
      <div>
        <p className="font-display text-sm font-semibold text-paper">
          {member.name ?? "To be announced"}
        </p>
        <p className={`text-xs font-medium ${style.label}`}>{member.role}</p>
      </div>
      <span className="mt-auto text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-flame">
        View dossier
      </span>
    </button>
  );
}

export default function TeamDirectory() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-1">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-flame">
            Subsystem leads
          </p>
          <h3 className="font-display text-2xl font-bold text-paper">
            One project, four leads
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {team.leads.map((member) => (
            <MemberCard key={member.name ?? member.role} member={member} onSelect={setSelected} />
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-1">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-flame">
            Avionics core
          </p>
          <h3 className="font-display text-2xl font-bold text-paper">
            Driving the projects
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {team.avionicsCore.map((member) => (
            <MemberCard key={member.name ?? member.role} member={member} onSelect={setSelected} />
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-1">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-flame">
            Avionics crew
          </p>
          <h3 className="font-display text-2xl font-bold text-paper">
            Learning and building
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {team.avionicsCrew.map((member) => (
            <MemberCard key={member.name ?? member.role} member={member} onSelect={setSelected} />
          ))}
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Structural and propulsion crew rosters will be added once confirmed.
          Meanwhile, see who we are on{" "}
          <a
            href={site.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-flame transition-opacity hover:opacity-80"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>

      <DossierModal member={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
