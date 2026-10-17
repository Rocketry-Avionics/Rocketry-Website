"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/nav";
import { site } from "@/content/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt="Project Rocketry logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold tracking-wide text-paper">
              {site.name}
            </span>
            <span className="text-[11px] text-muted">
              BITS Goa · {site.org}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 font-display text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-surface text-flame"
                  : "text-muted hover:text-paper"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full border border-line p-2 text-paper sm:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/60 bg-ink px-4 pb-4 pt-2 sm:hidden">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 font-display text-sm font-medium ${
                isActive(link.href) ? "bg-surface text-flame" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
