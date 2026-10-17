export type DeviceTier = "low" | "mid" | "high";

export interface TierConfig {
  particleCount: number;
  dprCap: number;
  lerpAlpha: number;
  exhaustRate: number;
  antialias: boolean;
}

export interface LaunchZoneConfig {
  rocketScale: number;
  tiltFactor: number;
  maxTilt: number;
  gravity: number;
  thrust: number;
  rotateSpeed: number;
  softLandingSpeed: number;
  exhaustColor: number;
  flameColor: number;
  tiers: Record<DeviceTier, TierConfig>;
}

export const launchZone: LaunchZoneConfig = {
  rocketScale: 1,
  tiltFactor: 0.4,
  maxTilt: 0.45,
  gravity: 2.2,
  thrust: 7.5,
  rotateSpeed: 2.4,
  softLandingSpeed: 1.1,
  exhaustColor: 0xf0a840,
  flameColor: 0xe05252,
  tiers: {
    low: {
      particleCount: 48,
      dprCap: 1.25,
      lerpAlpha: 0.07,
      exhaustRate: 0.45,
      antialias: false,
    },
    mid: {
      particleCount: 120,
      dprCap: 1.5,
      lerpAlpha: 0.09,
      exhaustRate: 0.75,
      antialias: true,
    },
    high: {
      particleCount: 220,
      dprCap: 2,
      lerpAlpha: 0.12,
      exhaustRate: 1,
      antialias: true,
    },
  },
};
