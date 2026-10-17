import type { Metadata } from "next";
import { site } from "@/content/site";
import { team } from "@/content/team";
import type { LeadGroup, SubsystemKey, TeamMember } from "@/content/types";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind Project Rocketry BITS Goa: subsystem leads, core members and crew across avionics, structural and propulsion.",
};

const accent: Record<SubsystemKey, { bg: string; label: string }> = {
  lead: { bg: "bg-paper text-ink", label: "text-paper" },
  avionics: { bg: "bg-flame text-ink", label: "text-flame" },
  structural: { bg: "bg-sky text-paper", label: "text-sky" },
  propulsion: { bg: "bg-amber text-ink", label: "text-amber" },
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

function Avatar({ member, subsystem }: { member: TeamMember; subsystem: SubsystemKey }) {
  const style = accent[subsystem];
  return (
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${style.bg}`}
      aria-hidden="true"
    >
      {member.name ? initials(member.name) : "TBA"}
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const style = accent[member.subsystem];
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 text-center">
      <Avatar member={member} subsystem={member.subsystem} />
      <div>
        <p className="font-display text-sm font-semibold text-paper">
          {member.name ?? "To be announced"}
        </p>
        <p className={`text-xs font-medium ${style.label}`}>{member.role}</p>
      </div>
    </div>
  );
}

function LeadGroupCard({ group }: { group: LeadGroup }) {
  const style = accent[group.id];
  return (
    <div className="flex h-full flex-col items-center gap-5 rounded-2xl border border-line bg-surface p-6 text-center">
      <p className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${style.label}`}>
        {group.title}
      </p>
      <div className="flex flex-1 flex-col items-center justify-around gap-5">
        {group.members.map((member) => (
          <div key={member.name ?? member.role} className="flex flex-col items-center gap-2">
            <Avatar member={member} subsystem={group.id} />
            <div>
              <p className="font-display text-sm font-semibold text-paper">
                {member.name ?? "To be announced"}
              </p>
              <p className="text-xs text-muted">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <section className="border-b border-line/60 bg-[radial-gradient(ellipse_at_top,rgba(240,168,64,0.1),transparent_55%)]">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
          <SectionHeading
            eyebrow="People"
            title="The team"
            description={team.note}
          />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-1">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-flame">
                Subsystem leads
              </p>
              <h3 className="font-display text-2xl font-bold text-paper">
                One project, three leads
              </h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {team.leads.map((group) => (
                <LeadGroupCard key={group.id} group={group} />
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
                <MemberCard key={member.name ?? member.role} member={member} />
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
                <MemberCard key={member.name ?? member.role} member={member} />
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
        </div>
      </section>
    </>
  );
}
