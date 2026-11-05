"use client";

import { useEffect, useRef } from "react";
import { cosmos } from "@/content/cosmos";
import { useDeviceTier } from "@/lib/hooks/useDeviceTier";
import { generateStars } from "@/lib/cosmos/stars";
import { createFocalSprites } from "@/lib/cosmos/sprites";
import { drawStars } from "@/lib/cosmos/render";
import { ScrollSpring } from "@/lib/cosmos/scrollSpring";

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

    const { physics } = cosmos;
    const spring = new ScrollSpring(physics);

    let width = 0;
    let height = 0;
    let offset = 0;
    let drift = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let raf = 0;
    let timer = 0;

    const render = (timeSec: number) => {
      drawStars(ctx, stars, sprites, cosmos, { width, height, offset, drift, time: timeSec });
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
      render(performance.now() / 1000);
    };

    const frame = (now: number) => {
      raf = 0;
      timer = 0;
      const dt = Math.min(Math.max((now - lastTime) / 1000, 1 / 240), 0.05);
      lastTime = now;

      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      const teleported = Math.abs(dy) > height * physics.teleportViewports;
      spring.step(teleported ? 0 : dy / dt, dt);

      drift = spring.value * physics.scrollGain;
      offset += drift * dt;
      render(now / 1000);

      if (!spring.resting || dy !== 0) {
        raf = requestAnimationFrame(frame);
      } else {
        timer = window.setTimeout(() => frame(performance.now()), tierCfg.idleIntervalMs);
      }
    };

    const wake = () => {
      if (raf !== 0) return;
      if (timer !== 0) {
        window.clearTimeout(timer);
        timer = 0;
      }
      lastTime = performance.now() - 16;
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        window.clearTimeout(timer);
        raf = 0;
        timer = 0;
      } else {
        lastY = window.scrollY;
        wake();
      }
    };

    const onResize = () => resize();
    resize(true);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", wake, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    wake();

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", wake);
      document.removeEventListener("visibilitychange", onVisibility);
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
