"use client";

import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import type { TeamMember } from "@/content/types";
import { subsystemStyle } from "@/lib/subsystemStyle";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import XIcon from "@/components/ui/XIcon";
import InstagramIcon from "@/components/ui/InstagramIcon";
import MemberPhoto from "./MemberPhoto";

interface DossierModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function DossierModal({ member, onClose }: DossierModalProps) {
  const [enlarged, setEnlarged] = useState(false);

  useEffect(() => {
    setEnlarged(false);
  }, [member]);

  useEffect(() => {
    if (!member) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  if (!member) return null;

  const style = subsystemStyle[member.subsystem];
  const dossier = member.dossier;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={member.name ? `Dossier: ${member.name}` : "Dossier"}
    >
      <button
        type="button"
        aria-label="Close dossier"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/85 backdrop-blur-sm"
      />

      <div className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dossier"
            className="rounded-full border border-line bg-ink/70 p-2 text-muted transition-colors hover:text-paper"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setEnlarged(true)}
          aria-label="Enlarge photo"
          className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-xl border border-line"
        >
          <MemberPhoto member={member} sizes="(max-width: 448px) 90vw, 384px" />
          <span className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted backdrop-blur">
            click to enlarge
          </span>
        </button>

        <div className="mt-4 flex flex-col gap-1">
          <p className="font-display text-xl font-bold text-paper">
            {member.name ?? "To be announced"}
          </p>
          <p className={`text-sm font-medium ${style.label}`}>{member.role}</p>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Contact
          </p>

          {dossier?.gmail ? (
            <a
              href={`mailto:${dossier.gmail}`}
              className="inline-flex items-center gap-2.5 text-sm text-paper transition-colors hover:text-flame"
            >
              <Mail className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              {dossier.gmail}
            </a>
          ) : (
            <p className="inline-flex items-center gap-2.5 text-sm text-muted">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              Gmail: to be added
            </p>
          )}

          {dossier?.linkedin && (
            <a
              href={dossier.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-paper transition-colors hover:text-flame"
            >
              <LinkedInIcon className="h-4 w-4 shrink-0 text-muted" />
              LinkedIn profile
            </a>
          )}

          {dossier?.twitter && (
            <a
              href={dossier.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-paper transition-colors hover:text-flame"
            >
              <XIcon className="h-4 w-4 shrink-0 text-muted" />
              X (Twitter)
            </a>
          )}

          {dossier?.instagram && (
            <a
              href={dossier.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-paper transition-colors hover:text-flame"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-muted" />
              Instagram
            </a>
          )}

          {!dossier && (
            <p className="text-xs leading-relaxed text-muted">
              Contact details will be added soon.
            </p>
          )}
        </div>
      </div>

      {enlarged && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3 bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          onClick={() => setEnlarged(false)}
        >
          <div className="relative aspect-[4/5] w-[min(85vw,56vh)] overflow-hidden rounded-2xl border border-line">
            <MemberPhoto member={member} sizes="90vw" />
          </div>
          <p className="pb-2 text-xs text-muted">Click anywhere to close</p>
        </div>
      )}
    </div>
  );
}
