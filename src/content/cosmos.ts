import type { DeviceTier } from "./launchZone";

export interface StarLayerConfig {
  name: "dust" | "mid" | "focal";
  /** Fraction of the total star count that belongs to this layer. */
  share: number;
  /** Core diameter range in CSS px. */
  sizeMin: number;
  sizeMax: number;
  alphaMin: number;
  alphaMax: number;
  /** Parallax depth: 1 moves at full drift speed, smaller values move less. */
  depth: number;
  /** Relative brightness swing of the idle twinkle (0 disables it). */
  twinkleAmp: number;
}

export interface StarTint {
  /** Hex color. Derived from the club palette (paper, sky and amber tokens). */
  color: string;
  /** Relative chance of a star taking this tint. */
  weight: number;
}

export interface CosmosTierConfig {
  starCount: number;
  /** Hard cap on devicePixelRatio so low end phones keep a steady frame rate. */
  dprCap: number;
  /** Redraw interval while idle, used only for the slow twinkle. */
  idleIntervalMs: number;
}

export interface CosmosConfig {
  seed: number;
  tints: StarTint[];
  layers: StarLayerConfig[];
  focal: {
    /** Square size of the prerendered glow and spike sprite, in px. */
    spriteSize: number;
    /** Core radius as a fraction of the sprite size. */
    coreRatio: number;
    haloAlpha: number;
    spikeAlpha: number;
    /** Spike thickness as a fraction of the sprite size. */
    spikeWidth: number;
  };
  twinkle: {
    /** Angular speed range in radians per second (kept low on purpose). */
    speedMin: number;
    speedMax: number;
  };
  physics: {
    /** Spring stiffness. Damping is derived as critical damping. */
    stiffness: number;
    /** Cap on tracked scroll velocity, in px per second. */
    maxVelocity: number;
    /** Converts scroll velocity into star drift velocity. */
    scrollGain: number;
    /** Streak length in seconds of travel at the current drift speed. */
    streakSeconds: number;
    maxStreak: number;
    /** A one frame jump larger than this many viewports is ignored (route change). */
    teleportViewports: number;
    /** Scroll velocity below this counts as rest, in px per second. */
    restThreshold: number;
    /** Extra vertical margin where stars wrap, so they never pop in view. */
    edgePad: number;
  };
  /** Canvas is only reallocated when the viewport height shifts by this fraction. */
  resizeHeightTolerance: number;
  tiers: Record<DeviceTier, CosmosTierConfig>;
}

export const cosmos: CosmosConfig = {
  seed: 20261017,
  tints: [
    { color: "#f4f1ec", weight: 0.6 },
    { color: "#c3d6e8", weight: 0.25 },
    { color: "#f3c987", weight: 0.15 },
  ],
  layers: [
    {
      name: "dust",
      share: 0.7,
      sizeMin: 0.5,
      sizeMax: 1,
      alphaMin: 0.15,
      alphaMax: 0.35,
      depth: 0.35,
      twinkleAmp: 0.2,
    },
    {
      name: "mid",
      share: 0.25,
      sizeMin: 1.2,
      sizeMax: 2,
      alphaMin: 0.4,
      alphaMax: 0.7,
      depth: 0.65,
      twinkleAmp: 0.25,
    },
    {
      name: "focal",
      share: 0.05,
      sizeMin: 2.5,
      sizeMax: 3.5,
      alphaMin: 0.75,
      alphaMax: 1,
      depth: 1,
      twinkleAmp: 0.15,
    },
  ],
  focal: {
    spriteSize: 64,
    coreRatio: 0.06,
    haloAlpha: 0.5,
    spikeAlpha: 0.55,
    spikeWidth: 0.03,
  },
  twinkle: {
    speedMin: 0.35,
    speedMax: 1.1,
  },
  physics: {
    stiffness: 140,
    maxVelocity: 4000,
    scrollGain: 0.6,
    streakSeconds: 0.04,
    maxStreak: 90,
    teleportViewports: 3,
    restThreshold: 2,
    edgePad: 60,
  },
  resizeHeightTolerance: 0.25,
  tiers: {
    low: { starCount: 240, dprCap: 1, idleIntervalMs: 120 },
    mid: { starCount: 380, dprCap: 1, idleIntervalMs: 90 },
    high: { starCount: 520, dprCap: 1.25, idleIntervalMs: 70 },
  },
};
