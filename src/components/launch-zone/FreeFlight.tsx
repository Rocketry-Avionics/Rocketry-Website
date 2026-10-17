"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUp, ChevronLeft, ChevronRight, RotateCcw, Rocket, X } from "lucide-react";
import { useDeviceTier } from "@/lib/hooks/useDeviceTier";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import type { LaunchEngine } from "./engine";

const RocketCanvas = dynamic(() => import("./RocketCanvas"), { ssr: false });

interface HudState {
  altitude: number;
  velocity: number;
  apogee: number;
  landed: boolean;
  crashed: boolean;
}

export default function FreeFlight({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const engineRef = useRef<LaunchEngine | null>(null);
  const [hud, setHud] = useState<HudState>({
    altitude: 0,
    velocity: 0,
    apogee: 0,
    landed: false,
    crashed: false,
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      engineRef.current = null;
      setHud({ altitude: 0, velocity: 0, apogee: 0, landed: false, crashed: false });
    }
  }, [open]);

  const holdProps = (input: { rotate?: -1 | 0 | 1; throttle?: 0 | 1 }) => {
    const release = () => {
      if (input.rotate !== undefined) engineRef.current?.setInput({ rotate: 0 });
      if (input.throttle !== undefined) engineRef.current?.setInput({ throttle: 0 });
    };
    return {
      onPointerDown: (event: React.PointerEvent) => {
        event.preventDefault();
        engineRef.current?.setInput(input);
      },
      onPointerUp: release,
      onPointerLeave: release,
      onPointerCancel: release,
    };
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-flame/60 hover:text-flame ${className}`}
      >
        <Rocket className="h-4 w-4" aria-hidden="true" />
        Free Flight
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Free flight mode"
        >
          <button
            type="button"
            aria-label="Close free flight"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/85 backdrop-blur-sm"
          />
          <div className="relative h-[75vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-charcoal">
            {!reduced ? (
              <RocketCanvas
                mode="free"
                tier={tier}
                engineRef={engineRef}
                onState={setHud}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted">
                Free flight is disabled by your reduced-motion preference.
              </div>
            )}

            <div className="pointer-events-none absolute left-4 top-4 flex gap-4 font-display text-xs">
              <div>
                <p className="text-muted">ALT</p>
                <p className="text-base font-semibold text-paper">{hud.altitude.toFixed(1)} m</p>
              </div>
              <div>
                <p className="text-muted">VEL</p>
                <p className="text-base font-semibold text-paper">{hud.velocity.toFixed(1)} m/s</p>
              </div>
              <div>
                <p className="text-muted">APOGEE</p>
                <p className="text-base font-semibold text-paper">{hud.apogee.toFixed(1)} m</p>
              </div>
            </div>

            {hud.landed && (
              <p className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-sky/50 bg-sky/15 px-4 py-1 font-display text-sm font-semibold text-sky">
                LANDED: nice flying
              </p>
            )}
            {hud.crashed && (
              <p className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-flame/50 bg-flame/15 px-4 py-1 font-display text-sm font-semibold text-flame">
                CRASHED: hit reset and try again
              </p>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close free flight"
              className="absolute right-4 top-4 rounded-full border border-line bg-ink/70 p-2 text-muted transition-colors hover:text-paper"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Rotate left"
                  {...holdProps({ rotate: -1 })}
                  className="rounded-full border border-line bg-ink/80 p-3 text-paper backdrop-blur transition-colors hover:border-flame/60 active:bg-raised"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Thrust"
                  {...holdProps({ throttle: 1 })}
                  className="rounded-full border border-flame/50 bg-flame/20 p-3 text-paper backdrop-blur transition-colors hover:bg-flame/30 active:bg-flame/50"
                >
                  <ArrowUp className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Rotate right"
                  {...holdProps({ rotate: 1 })}
                  className="rounded-full border border-line bg-ink/80 p-3 text-paper backdrop-blur transition-colors hover:border-flame/60 active:bg-raised"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden text-right text-xs text-muted sm:block">
                <p>W / ↑ / Space: thrust</p>
                <p>A / D: rotate</p>
              </div>
              <button
                type="button"
                onClick={() => engineRef.current?.reset()}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/80 px-4 py-2 font-display text-xs font-semibold text-paper backdrop-blur transition-colors hover:border-flame/60 hover:text-flame"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
