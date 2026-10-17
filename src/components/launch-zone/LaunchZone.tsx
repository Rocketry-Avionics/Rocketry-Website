"use client";

import dynamic from "next/dynamic";
import { useDeviceTier } from "@/lib/hooks/useDeviceTier";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import RocketMark from "@/components/ui/RocketMark";

const RocketCanvas = dynamic(() => import("./RocketCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-2.5 w-24 animate-pulse rounded-full bg-raised" />
    </div>
  ),
});

export default function LaunchZone() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-charcoal via-ink to-ink">
      {reduced ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <RocketMark className="h-20 w-20" />
          <p className="max-w-56 text-sm text-muted">
            Interactive launch zone is disabled by your reduced-motion preference.
          </p>
        </div>
      ) : (
        <RocketCanvas mode="follow" tier={tier} />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3">
        <p className="rounded-full border border-line bg-ink/70 px-3 py-1 text-xs text-muted backdrop-blur">
          Move your cursor or drag inside the zone
        </p>
      </div>
    </div>
  );
}
