"use client";

import { useEffect, useRef } from "react";
import { useDeviceTier } from "@/lib/hooks/useDeviceTier";

const COLORS = ["#f4f1ec", "#3d6f9e", "#3d6f9e", "#e05252", "#f0a840"];
const NODE_COUNTS: Record<string, number> = { low: 22, mid: 38, high: 60 };

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
}

export default function NodeNetwork() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tier = useDeviceTier();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let inView = false;
    let last = 0;

    const seed = () => {
      const count = NODE_COUNTS[tier] ?? 38;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        r: 1 + Math.random() * 1.8,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      const link = 130;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < link * link) {
            const alpha = (1 - Math.sqrt(d2) / link) * 0.32;
            ctx.strokeStyle = `rgba(61, 111, 158, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const node of nodes) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = node.c;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (!reduced && running) {
          node.x += node.vx * dt;
          node.y += node.vy * dt;
          if (node.x < -12) node.x = width + 12;
          if (node.x > width + 12) node.x = -12;
          if (node.y < -12) node.y = height + 12;
          if (node.y > height + 12) node.y = -12;
        }
      }
    };

    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) seed();
      if (reduced) draw(0);
    };

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
    };

    const setRunning = (value: boolean) => {
      if (reduced || value === running) return;
      running = value;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    const update = () => setRunning(inView && !document.hidden);

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        update();
      },
      { threshold: 0.02 }
    );
    io.observe(wrap);
    const onVisibility = () => update();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      setRunning(false);
      observer.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [tier]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-70" />
    </div>
  );
}
