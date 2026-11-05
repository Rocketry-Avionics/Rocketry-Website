"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/content/site";

const fieldClass =
  "rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-muted/50 focus:border-flame focus:outline-none";
const labelClass =
  "font-display text-xs font-semibold uppercase tracking-wider text-muted";

export default function SponsorForm() {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Sponsorship enquiry: ${organisation || name}`;
    const body = [
      `Name: ${name}`,
      `Organisation: ${organisation}`,
      `Reply to: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.sponsorEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Name</span>
          <input required type="text" name="name" placeholder="Your name" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Organisation</span>
          <input
            type="text"
            name="organisation"
            placeholder="Company or individual"
            className={fieldClass}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Email</span>
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>What would you like to support?</span>
        <textarea
          required
          name="message"
          rows={4}
          placeholder="A package, a component, a launch day, or just a hello."
          className={`resize-y ${fieldClass}`}
        />
      </label>
      <button
        type="submit"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Open in my email app
      </button>
      {opened && (
        <p className="text-sm text-muted" role="status">
          Your email app should open with the message ready to send. If nothing
          happened, write to{" "}
          <a
            href={`mailto:${site.sponsorEmail}`}
            className="font-semibold text-paper underline decoration-flame/60 underline-offset-2 hover:text-flame"
          >
            {site.sponsorEmail}
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}
