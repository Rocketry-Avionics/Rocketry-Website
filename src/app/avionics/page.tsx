import type { Metadata } from "next";
import Link from "next/link";
import {
  BrainCircuit,
  Code2,
  Cpu,
  Globe,
  Megaphone,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { avionicsProjects } from "@/content/projects";
import StatusBadge from "@/components/ui/StatusBadge";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Avionics",
  description:
    "The brain of the rocket: flight computer hardware, flight software, communication systems, simulation and outreach at Project Rocketry BITS Goa.",
};

const iconFor: Record<string, LucideIcon> = {
  cpu: Cpu,
  code: Code2,
  radio: Radio,
  globe: Globe,
  brain: BrainCircuit,
  megaphone: Megaphone,
};

export default function AvionicsPage() {
  return (
    <>
      <section className="border-b border-line/60 bg-[radial-gradient(ellipse_at_top,rgba(224,82,82,0.12),transparent_55%)]">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
          <SectionHeading
            eyebrow="Subsystem"
            title="Avionics"
            description="The brain of the rocket along with its logic and data processing unit. Avionics manages flight stabilization and trajectory correction, data acquisition and onboard sensing, communication systems and telemetry, and maintains the electronics at the base station."
          />
          <nav aria-label="Projects" className="mt-8 flex flex-wrap gap-2">
            {avionicsProjects.map((project) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-flame/60 hover:text-flame"
              >
                <span className="font-display font-semibold text-flame">{project.index}</span>{" "}
                {project.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6">
          {avionicsProjects.map((project) => {
            const Icon = iconFor[project.icon] ?? Cpu;
            return (
              <article
                key={project.id}
                id={project.id}
                className="scroll-mt-24 rounded-2xl border border-line bg-surface p-6 sm:p-8"
              >
                <div className="grid gap-8 md:grid-cols-[1fr_260px]">
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

                  <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-line bg-[radial-gradient(ellipse_at_center,rgba(61,111,158,0.12),transparent_70%)] p-6 text-center">
                    <Icon className="h-10 w-10 text-sky" aria-hidden="true" />
                    <p className="text-xs leading-relaxed text-muted">
                      {project.mediaNote ?? "Project media coming soon."}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line/60 bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-display text-lg font-semibold text-paper">
            Curious who builds all this?
          </p>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-flame/60 hover:text-flame"
          >
            Meet the team
          </Link>
        </div>
      </section>
    </>
  );
}
