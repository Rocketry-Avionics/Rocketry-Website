"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { DeviceTier } from "@/content/launchZone";
import type { EngineState, LaunchEngine } from "./engine";

interface RocketCanvasProps {
  mode: "follow" | "free";
  tier: DeviceTier;
  engineRef?: RefObject<LaunchEngine | null>;
  onState?: (state: EngineState) => void;
}

export default function RocketCanvas({ mode, tier, engineRef, onState }: RocketCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onStateRef = useRef(onState);
  const [failed, setFailed] = useState(false);
  onStateRef.current = onState;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let cleanup: (() => void) | null = null;

    import("./engine")
      .then(({ LaunchEngine }) => {
        if (cancelled) return;
        const engine = new LaunchEngine(canvas, mode, tier, (state) =>
          onStateRef.current?.(state)
        );
        if (engineRef) engineRef.current = engine;

        const io = new IntersectionObserver(
          (entries) =>
            engine.setRunning((entries[0]?.isIntersecting ?? false) && !document.hidden),
          { threshold: 0.05 }
        );
        io.observe(canvas);
        const onVisibility = () => engine.setRunning(!document.hidden);
        document.addEventListener("visibilitychange", onVisibility);

        cleanup = () => {
          io.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          engine.dispose();
          if (engineRef) engineRef.current = null;
        };
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [mode, tier, engineRef]);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted">Interactive mode unavailable on this device.</p>
      </div>
    );
  }

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
