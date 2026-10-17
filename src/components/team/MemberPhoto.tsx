import Image from "next/image";
import type { TeamMember } from "@/content/types";
import { initials } from "@/lib/initials";

interface MemberPhotoProps {
  member: TeamMember;
  sizes?: string;
}

export default function MemberPhoto({ member, sizes = "320px" }: MemberPhotoProps) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={member.name ?? member.role}
        fill
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[radial-gradient(ellipse_at_center,#3a3734,#1e1d1c)]">
      <span className="font-display text-3xl font-bold text-paper/90">
        {member.name ? initials(member.name) : "TBA"}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
        photo coming soon
      </span>
    </div>
  );
}
