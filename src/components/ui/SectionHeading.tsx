interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-flame">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
        {title}
      </h2>
      {description && <p className="text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
