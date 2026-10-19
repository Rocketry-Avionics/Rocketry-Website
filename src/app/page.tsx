import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import NodeNetwork from "@/components/ui/NodeNetwork";
import SubsystemGrid from "./SubsystemGrid";
import { site } from "@/content/site";
import { stats } from "@/content/stats";
import LaunchZone from "@/components/launch-zone/LaunchZone";
import FreeFlight from "@/components/launch-zone/FreeFlight";
import SectionHeading from "@/components/ui/SectionHeading";
import { emphasize } from "@/lib/emphasis";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60">
        <NodeNetwork />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-16 text-center sm:px-6 lg:pt-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur">
            {site.org} · BITS Goa
          </p>
          <h1 className="mt-6 font-display text-6xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
            Project{" "}
            <span className="animate-shimmer bg-gradient-to-r from-flame via-amber to-flame bg-[length:200%_100%] bg-clip-text text-transparent">
              Rocketry
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {emphasize(site.mission)}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/avionics"
              className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              Explore Avionics
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <FreeFlight />
            <a
              href={site.socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-6 py-3 font-display text-sm font-semibold text-paper backdrop-blur transition-colors hover:border-flame/60 hover:text-flame"
            >
              <LinkedInIcon className="h-4 w-4" />
              Follow
            </a>
          </div>
          <p className="mt-5 text-xs text-muted">{site.institution}</p>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="h-[380px] sm:h-[460px] lg:h-[540px]">
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
          <div className="flex flex-col gap-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Rockets are never a one-person job.{" "}
              <b className="font-semibold text-paper">Project Rocketry</b> exists for
              the students who stare at the sky and wonder how physics escapes the
              textbook and leaves the planet.
            </p>
            <p>
              This is where the{" "}
              <b className="font-semibold text-paper">electronics</b> tinkerers, the
              aerodynamics dreamers and the mechanics builders on campus find each
              other and become one crew.
            </p>
            <p>
              One vehicle, many crafts. Bring your curiosity, and we will hand you a{" "}
              <b className="font-semibold text-paper">launchpad</b>: the physics, the
              electronics, the mechanics and the aerodynamics, all explored together
              in collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line/60 bg-charcoal">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-surface/60 p-6 text-center"
            >
              <p className="font-display text-4xl font-bold text-flame">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
          <a
            href="#subsystems"
            className="group flex flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-surface/60 p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-sky/50 hover:shadow-[0_0_36px_-14px_rgba(61,111,158,0.5)]"
          >
            <p className="font-display text-2xl font-bold text-paper transition-colors group-hover:text-sky">
              Explore
            </p>
            <p className="inline-flex items-center gap-1 text-sm text-muted">
              the subsystems
              <ArrowRight
                className="h-3.5 w-3.5 rotate-90 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </p>
          </a>
        </div>
      </section>

      <section id="subsystems" className="scroll-mt-20 border-b border-line/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Subsystems"
            title="Three teams, one vehicle"
            description="Open a card to see what each crew owns, or jump straight in."
          />
          <SubsystemGrid />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_at_bottom_left,rgba(224,82,82,0.16),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(61,111,158,0.16),transparent_55%)] p-8 sm:p-12">
          <div className="flex max-w-2xl flex-col gap-5">
            <h2 className="font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
              Build with us. <span className="text-flame">Back us.</span> Or just say
              hi.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Join the <b className="font-semibold text-paper">crew</b> that designs,
              breaks and flies. Put your <b className="font-semibold text-paper">name on the pad</b> as a
              sponsor and watch it leave the ground with our thanks. Either way, it
              all starts with a hello.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Join the crew
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-amber/60 bg-amber/10 px-6 py-3 font-display text-sm font-semibold text-amber shadow-[0_0_28px_-10px_rgba(240,168,64,0.55)] transition-colors hover:bg-amber/20"
              >
                Sponsor us
              </Link>
              <a
                href={site.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-flame/60 hover:text-flame"
              >
                <LinkedInIcon className="h-4 w-4" />
                Follow
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
