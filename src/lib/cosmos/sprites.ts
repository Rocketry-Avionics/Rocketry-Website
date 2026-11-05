import type { CosmosConfig } from "@/content/cosmos";

function rgba(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function buildSprite(color: string, focal: CosmosConfig["focal"]): HTMLCanvasElement {
  const size = focal.spriteSize;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const g = sprite.getContext("2d");
  if (!g) return sprite;

  const mid = size / 2;

  const halo = g.createRadialGradient(mid, mid, 0, mid, mid, mid * 0.6);
  halo.addColorStop(0, rgba(color, focal.haloAlpha));
  halo.addColorStop(0.35, rgba(color, focal.haloAlpha * 0.3));
  halo.addColorStop(1, rgba(color, 0));
  g.fillStyle = halo;
  g.fillRect(0, 0, size, size);

  const spikeThickness = Math.max(1, size * focal.spikeWidth);

  const vertical = g.createLinearGradient(0, 0, 0, size);
  vertical.addColorStop(0, rgba(color, 0));
  vertical.addColorStop(0.5, rgba(color, focal.spikeAlpha));
  vertical.addColorStop(1, rgba(color, 0));
  g.fillStyle = vertical;
  g.fillRect(mid - spikeThickness / 2, 0, spikeThickness, size);

  const horizontal = g.createLinearGradient(0, 0, size, 0);
  horizontal.addColorStop(0, rgba(color, 0));
  horizontal.addColorStop(0.5, rgba(color, focal.spikeAlpha));
  horizontal.addColorStop(1, rgba(color, 0));
  g.fillStyle = horizontal;
  g.fillRect(0, mid - spikeThickness / 2, size, spikeThickness);

  g.fillStyle = rgba(color, 1);
  g.beginPath();
  g.arc(mid, mid, size * focal.coreRatio, 0, Math.PI * 2);
  g.fill();

  return sprite;
}

/** One prerendered glow plus four point diffraction sprite per tint. */
export function createFocalSprites(cfg: CosmosConfig): HTMLCanvasElement[] {
  return cfg.tints.map((tint) => buildSprite(tint.color, cfg.focal));
}
