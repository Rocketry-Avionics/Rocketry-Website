"use client";

import { useEffect, useRef } from "react";
import { cosmos } from "@/content/cosmos";
import { useDeviceTier } from "@/lib/hooks/useDeviceTier";
import { generateStars } from "@/lib/cosmos/stars";
import { createFocalSprites } from "@/lib/cosmos/sprites";
import { drawStars } from "@/lib/cosmos/render";

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tier = useDeviceTier();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const tierCfg = cosmos.tiers[tier];
    const dpr = Math.min(window.devicePixelRatio || 1, tierCfg.dprCap);
    const stars = generateStars(tierCfg.starCount, cosmos);
    const sprites = createFocalSprites(cosmos);

    let width = 0;
    let height = 0;

    const render = () => {
      drawStars(ctx, stars, sprites, cosmos, { width, height, offset: 0, drift: 0, time: 0 });
    };

    const resize = (force = false) => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const heightShift = Math.abs(nextHeight - height);
      if (!force && nextWidth === width && heightShift < height * cosmos.resizeHeightTolerance) {
        return;
      }
      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    const onResize = () => resize();
    resize(true);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [tier]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
