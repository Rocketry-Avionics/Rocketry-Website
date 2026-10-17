import type { Metadata } from "next";
import Link from "next/link";
import { avionicsProjects } from "@/content/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import GitHubIcon from "@/components/ui/GitHubIcon";
import AvionicsDirectory from "./AvionicsDirectory";

export const metadata: Metadata = {
  title: "Avionics",
  description:
    "The brain of the rocket: flight computer hardware, flight software, communication systems, simulation and outreach at Project Rocketry BITS Goa.",
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
          <div className="mt-6">
            <a
              href="https://github.com/Rocketry-Avionics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-display text-sm font-semibold text-paper transition-colors hover:border-flame/60 hover:text-flame"
            >
              <GitHubIcon className="h-4 w-4" />
              Rocketry-Avionics on GitHub
            </a>
          </div>
        </div>
      </section>

      <AvionicsDirectory />

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
