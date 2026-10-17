import type { ProjectStatus } from "@/content/types";

const styles: Record<ProjectStatus, string> = {
  Active: "border-sky/40 bg-sky/10 text-sky",
  "In Progress": "border-amber/40 bg-amber/10 text-amber",
  Planned: "border-line bg-raised text-muted",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
