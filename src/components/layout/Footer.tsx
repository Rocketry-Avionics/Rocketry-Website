import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import { nav } from "@/content/nav";
import { site } from "@/content/site";

const iconFor: Record<string, typeof Globe | typeof LinkedInIcon> = {
  linkedin: LinkedInIcon,
  globe: Globe,
};

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-charcoal">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="Project Rocketry logo"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="font-display text-sm font-bold tracking-wide text-paper">
              {site.fullName}
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Navigate
          </p>
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit text-sm text-muted transition-colors hover:text-flame"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Follow
          </p>
          {site.socials.map((social) => {
            const Icon = iconFor[social.icon] ?? Globe;
            return (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-flame"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {social.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()}{" "}
            <b className="font-semibold text-flame">Project Rocketry</b> BITS Goa. All
            rights reserved.
          </p>
          <p>
            Part of <b className="font-semibold text-paper">SEDS Celestia</b> ·{" "}
            {site.institution}
          </p>
        </div>
      </div>
    </footer>
  );
}
