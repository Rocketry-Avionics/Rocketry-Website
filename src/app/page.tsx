import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import { site } from "@/content/site";
import { stats } from "@/content/stats";
import { subsystems } from "@/content/subsystems";
import LaunchZone from "@/components/launch-zone/LaunchZone";
import FreeFlight from "@/components/launch-zone/FreeFlight";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60 bg-[radial-gradient(ellipse_at_top,rgba(61,111,158,0.14),transparent_55%)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:pt-20">
          <div className="flex flex-col items-start gap-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {site.org} · BITS Goa
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Project
              <br />
              <span className="text-flame">Rocketry</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {site.mission}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/avionics"
                className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Explore Avionics
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <FreeFlight />
            </div>
            <p className="text-xs text-muted">
              {site.institution}
            </p>
          </div>

          <div className="h-[380px] sm:h-[440px] lg:h-[520px]">
            <LaunchZone />
          </div>
        </div>
      </section>

      <section className="border-b border-line/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.4fr] md:gap-14">
          <SectionHeading
            eyebrow="Mission"
            title="Why we build"
          />
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted">
            <p>{site.missionDetail}</p>
            <p>
              Everything on this site reflects real work: built, tested and flown by
              students. What is not done yet is labelled as such, because honest
              engineering is the whole point.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line/60 bg-charcoal">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 p-6 text-center">
              <p className="font-display text-4xl font-bold text-flame">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Subsystems"
            title="Three teams, one vehicle"
            description="The project is divided into Propulsion, Avionics and Structural: each researching, building and testing their part of the rocket."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {subsystems.map((subsystem) => (
              <article
                key={subsystem.id}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-paper">
                    {subsystem.name}
                  </h3>
                  <p className="text-sm text-flame">{subsystem.tagline}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted">{subsystem.description}</p>
                <ul className="flex flex-col gap-2">
                  {subsystem.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  {subsystem.href ? (
                    <Link
                      href={subsystem.href}
                      className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-flame transition-opacity hover:opacity-80"
                    >
                      Explore {subsystem.name}
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
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_at_bottom_left,rgba(224,82,82,0.16),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(61,111,158,0.16),transparent_55%)] p-8 sm:p-12">
            <div className="flex max-w-2xl flex-col gap-5">
              <h2 className="font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
                Want to build rockets with us?
              </h2>
              <p className="text-base leading-relaxed text-muted">
                We recruit from all batches and all branches: if you want to work on
                flight hardware, embedded software, radio links or simulation, reach out.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
                >
                  Contact us
                </Link>
                <a
                  href={site.socials[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-flame/60 hover:text-flame"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  Follow on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
