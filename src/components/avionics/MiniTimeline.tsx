import type { TimelineEntry, TimelineStatus } from "@/content/types";

const dotStyle: Record<TimelineStatus, string> = {
  Done: "bg-sky",
  "In Progress": "bg-amber",
  Planned: "border border-line bg-raised",
};

const textStyle: Record<TimelineStatus, string> = {
  Done: "text-sky",
  "In Progress": "text-amber",
  Planned: "text-muted",
};

export default function MiniTimeline({ entries }: { entries: TimelineEntry[] }) {
  const currentIndex = entries.findIndex((entry) => entry.status !== "Done");

  return (
    <ol className="ml-1 flex flex-col gap-3.5 border-l border-line pl-4 text-left">
      {entries.map((entry, i) => {
        const isCurrent = i === currentIndex;
        return (
          <li key={entry.label} className="relative">
            <span
              className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ${dotStyle[entry.status]} ${
                isCurrent ? "ring-2 ring-flame/50 ring-offset-2 ring-offset-surface" : ""
              }`}
              aria-hidden="true"
            />
            <p
              className={`text-xs font-medium leading-snug ${
                isCurrent ? "text-paper" : "text-muted"
              }`}
            >
              {entry.label}
            </p>
            <p className={`text-[10px] uppercase tracking-[0.2em] ${textStyle[entry.status]}`}>
              {entry.status}
              {isCurrent ? " · now" : ""}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
