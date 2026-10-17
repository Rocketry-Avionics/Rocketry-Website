"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import { site } from "@/content/site";

type FormState = "idle" | "sending" | "success" | "error";

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    setState("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          subject: `Website contact — ${data.get("name")}`,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (!accessKey) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
        <p className="text-sm leading-relaxed text-muted">
          The contact form is not wired up yet — the site team still needs to add its
          form-service key. Until then, the fastest way to reach us is LinkedIn.
        </p>
        <a
          href={site.socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
        >
          <LinkedInIcon className="h-4 w-4" />
          Message us on LinkedIn
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted">
            Name
          </span>
          <input
            required
            type="text"
            name="name"
            placeholder="Your name"
            className="rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-muted/50 focus:border-flame focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted">
            Email
          </span>
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className="rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-muted/50 focus:border-flame focus:outline-none"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="What do you want to tell us?"
          className="resize-y rounded-lg border border-line bg-ink px-3.5 py-2.5 text-sm text-paper placeholder:text-muted/50 focus:border-flame focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-flame px-6 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
      {state === "success" && (
        <p className="text-sm text-sky" role="status">
          Message sent — we will get back to you soon.
        </p>
      )}
      {state === "error" && (
        <p className="text-sm text-flame" role="alert">
          Something went wrong. Try again, or reach us on LinkedIn.
        </p>
      )}
    </form>
  );
}
