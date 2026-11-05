import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircuitBoard,
  Cpu,
  Flag,
  Flame,
  Gauge,
  Mail,
  Rocket,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { sponsor } from "@/content/sponsor";
import type { SponsorIcon } from "@/content/types";
import { emphasize } from "@/lib/emphasis";
import SponsorForm from "./SponsorForm";

export const metadata: Metadata = {
  title: "Sponsor Us",
  description:
    "Back Project Rocketry BITS Goa: a student team building a hybrid-engine, retro-propulsive rocket. See what your support funds and how to get involved.",
};

const iconFor: Record<SponsorIcon, LucideIcon> = {
  cpu: Cpu,
  flame: Flame,
  rocket: Rocket,
  users: Users,
  circuit: CircuitBoard,
  gauge: Gauge,
  wrench: Wrench,
  shield: ShieldCheck,
  flag: Flag,
};

const mailHref = `mailto:${site.sponsorEmail}?subject=${encodeURIComponent(
  "Sponsorship enquiry"
)}`;

export default function SponsorPage() {
  return (
    <>
      <section className="border-b border-line/60 bg-[radial-gradient(ellipse_at_top,rgba(240,168,64,0.14),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(224,82,82,0.12),transparent_55%)]">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:py-28">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            {sponsor.hero.eyebrow}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            {sponsor.hero.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {emphasize(sponsor.hero.body)}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={mailHref}
              className="inline-flex items-center gap-2 rounded-full border border-amber/60 bg-amber/15 px-6 py-3 font-display text-sm font-semibold text-amber shadow-[0_0_32px_-8px_rgba(240,168,64,0.6)] transition-colors hover:bg-amber/25"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email {site.sponsorEmail}
            </a>
            <a
              href="#tiers"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-6 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-flame/60 hover:text-flame"
            >
              See the packages
              <ArrowRight className="h-4 w-4 rotate-90" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow={sponsor.impact.eyebrow}
            title={sponsor.impact.title}
            description={sponsor.impact.description}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {sponsor.impact.points.map((point) => {
              const Icon = iconFor[point.icon];
              return (
                <article
                  key={point.title}
                  className="flex gap-4 rounded-2xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-flame/30"
                >
                  <span className="h-fit rounded-full border border-line bg-raised p-3 text-flame">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-lg font-bold text-paper">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{emphasize(point.body)}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <Link
            href="/avionics"
            className="inline-flex w-fit items-center gap-1.5 font-display text-sm font-semibold text-sky transition-colors hover:text-paper"
          >
            See the live project status
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="allocation" className="scroll-mt-20 border-b border-line/60 bg-charcoal">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow={sponsor.allocation.eyebrow}
            title={sponsor.allocation.title}
            description={sponsor.allocation.description}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsor.allocation.points.map((point) => {
              const Icon = iconFor[point.icon];
              return (
                <article
                  key={point.title}
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-surface/70 p-5"
                >
                  <span className="w-fit rounded-full border border-line bg-raised p-2.5 text-sky">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-bold text-paper">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{point.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tiers" className="scroll-mt-20 border-b border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow={sponsor.tiers.eyebrow}
            title={sponsor.tiers.title}
            description={sponsor.tiers.description}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {sponsor.tiers.list.map((tier) => (
              <article
                key={tier.name}
                className={`flex flex-col gap-5 rounded-2xl border p-6 ${
                  tier.featured
                    ? "border-amber/60 bg-surface shadow-[0_0_44px_-16px_rgba(240,168,64,0.6)]"
                    : "border-line bg-surface"
                }`}
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-paper">{tier.name}</h3>
                  <p className={`text-sm ${tier.featured ? "text-amber" : "text-flame"}`}>
                    {tier.tagline}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reach-out" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={sponsor.cta.eyebrow}
              title={sponsor.cta.title}
              description={sponsor.cta.body}
            />
            <a
              href={mailHref}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-amber/60 bg-amber/15 px-6 py-3 font-display text-sm font-semibold text-amber shadow-[0_0_32px_-8px_rgba(240,168,64,0.6)] transition-colors hover:bg-amber/25"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {site.sponsorEmail}
            </a>
            <p className="text-sm text-muted">
              Questions that are not about sponsorship? Head to our{" "}
              <Link href="/contact" className="font-semibold text-paper hover:text-flame">
                contact page
              </Link>
              .
            </p>
          </div>
          <SponsorForm />
        </div>
      </section>
    </>
  );
}
