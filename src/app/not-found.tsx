import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <Image
        src="/brand/logo.png"
        alt="Project Rocketry logo"
        width={64}
        height={64}
        className="h-16 w-16"
      />
      <h1 className="font-display text-4xl font-bold text-paper">404: lost in flight</h1>
      <p className="max-w-md text-muted">
        This page drifted off course. Head back to mission control.
      </p>
      <Link
        href="/"
        className="rounded-full bg-flame px-6 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        Back to base
      </Link>
    </section>
  );
}
