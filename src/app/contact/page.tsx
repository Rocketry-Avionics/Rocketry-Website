import type { Metadata } from "next";
import { Globe, MapPin } from "lucide-react";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import { site } from "@/content/site";
import ContactForm from "./ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Project Rocketry BITS Goa: for recruits, collaborators and sponsors.",
};

export default function ContactPage() {
  return (
    <section className="border-b border-line/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Contact"
            title="Say hello"
            description="Recruits, collaborators, sponsors: we read everything. Reach us through the form or directly on LinkedIn."
          />
          <ContactForm />
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={site.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-flame/60"
          >
            <span className="rounded-full border border-line bg-raised p-3 text-flame">
              <LinkedInIcon className="h-5 w-5" />
            </span>
            <span>
              <p className="font-display text-sm font-semibold text-paper">LinkedIn</p>
              <p className="text-sm text-muted">Project Rocketry BITS Goa</p>
            </span>
          </a>
          <a
            href={site.socials[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-sky/60"
          >
            <span className="rounded-full border border-line bg-raised p-3 text-sky">
              <Globe className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <p className="font-display text-sm font-semibold text-paper">SEDS Celestia</p>
              <p className="text-sm text-muted">Our parent organisation at BITS Goa</p>
            </span>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
            <span className="rounded-full border border-line bg-raised p-3 text-amber">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <p className="font-display text-sm font-semibold text-paper">{site.institution}</p>
              <p className="text-sm text-muted">{site.location}</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
