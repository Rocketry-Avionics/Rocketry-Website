import type { Metadata } from "next";
import { team } from "@/content/team";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamDirectory from "./TeamDirectory";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind Project Rocketry BITS Goa: subsystem leads, core members and crew across avionics, structural and propulsion.",
};

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
      <TeamDirectory />
    </>
  );
}
