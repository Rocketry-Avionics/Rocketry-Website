import type { CosmosConfig } from "@/content/cosmos";
import type { Star } from "./stars";

export interface RenderState {
  /** Viewport size in CSS px. */
  width: number;
  height: number;
  /** Accumulated drift distance in px. Positive moves stars upward. */
  offset: number;
  /** Current drift speed in px per second, same sign convention as offset. */
  drift: number;
  /** Seconds, drives the twinkle. */
  time: number;
}

/** Draws one frame. Expects the context transform to already include the dpr scale. */
export function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  sprites: HTMLCanvasElement[],
  cfg: CosmosConfig,
  state: RenderState
): void {
  const { width, height, offset, drift, time } = state;
  const { edgePad, streakSeconds, maxStreak } = cfg.physics;
  const span = height + edgePad * 2;
  const spriteDiameterPerSize = 1 / (2 * cfg.focal.coreRatio);

  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = "round";

  let lastTint = -1;

  for (const star of stars) {
    if (star.tint !== lastTint) {
      lastTint = star.tint;
      const color = cfg.tints[star.tint].color;
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
    }

    const layer = cfg.layers[star.layer];
    const raw = star.y * span - offset * star.depth;
    const y = (((raw % span) + span) % span) - edgePad;
    const x = star.x * width;

    const twinkle = 1 + layer.twinkleAmp * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
    const alpha = Math.min(1, Math.max(0, star.alpha * twinkle));

    const speed = drift * star.depth;
    const streak = Math.min(Math.abs(speed) * streakSeconds, maxStreak);
    const trail = speed >= 0 ? streak : -streak;

    ctx.globalAlpha = alpha;

    if (layer.name === "focal") {
      const diameter = star.size * spriteDiameterPerSize;
      ctx.drawImage(sprites[star.tint], x - diameter / 2, y - diameter / 2, diameter, diameter);
    } else if (streak < 0.8) {
      if (layer.name === "dust") {
        ctx.fillRect(x - star.size / 2, y - star.size / 2, star.size, star.size);
      } else {
        ctx.beginPath();
        ctx.arc(x, y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (streak >= 0.8) {
      ctx.lineWidth = star.size;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + trail);
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
}
