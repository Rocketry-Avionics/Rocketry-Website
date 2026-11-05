import type { CosmosConfig } from "@/content/cosmos";

export interface Star {
  /** Normalized horizontal position, 0 to 1. */
  x: number;
  /** Normalized vertical position inside the padded field, 0 to 1. */
  y: number;
  size: number;
  alpha: number;
  depth: number;
  /** Index into the tint list. */
  tint: number;
  layer: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * t;
}

/**
 * Builds a deterministic star field. Positions are normalized so the same field
 * survives resizes without regenerating. Output is sorted by layer then tint so
 * the renderer can change fill styles as rarely as possible.
 */
export function generateStars(count: number, cfg: CosmosConfig): Star[] {
  const rand = mulberry32(cfg.seed);
  const totalWeight = cfg.tints.reduce((sum, tint) => sum + tint.weight, 0);

  const pickTint = (): number => {
    let roll = rand() * totalWeight;
    for (let i = 0; i < cfg.tints.length; i++) {
      roll -= cfg.tints[i].weight;
      if (roll <= 0) return i;
    }
    return cfg.tints.length - 1;
  };

  const stars: Star[] = [];
  cfg.layers.forEach((layer, layerIndex) => {
    const layerCount = Math.round(count * layer.share);
    for (let i = 0; i < layerCount; i++) {
      stars.push({
        x: rand(),
        y: rand(),
        size: lerp(layer.sizeMin, layer.sizeMax, rand()),
        alpha: lerp(layer.alphaMin, layer.alphaMax, rand()),
        depth: layer.depth * lerp(0.85, 1.15, rand()),
        tint: pickTint(),
        layer: layerIndex,
        twinklePhase: rand() * Math.PI * 2,
        twinkleSpeed: lerp(cfg.twinkle.speedMin, cfg.twinkle.speedMax, rand()),
      });
    }
  });

  stars.sort((a, b) => a.layer - b.layer || a.tint - b.tint);
  return stars;
}
