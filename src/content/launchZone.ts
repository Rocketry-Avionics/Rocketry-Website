export type DeviceTier = "low" | "mid" | "high";

export interface TierConfig {
  particleCount: number;
  dprCap: number;
  exhaustRate: number;
  antialias: boolean;
}

export interface LaunchZoneConfig {
  rocketScale: number;
  tiltFactor: number;
  maxTilt: number;
  maxSpeed: number;
  stiffness: number;
  damping: number;
  gravity: number;
  thrust: number;
  rotateSpeed: number;
  softLandingSpeed: number;
  cameraFollowOffset: number;
  exhaustColor: number;
  flameColor: number;
  tiers: Record<DeviceTier, TierConfig>;
}

export const launchZone: LaunchZoneConfig = {
  rocketScale: 1,
  tiltFactor: 0.22,
  maxTilt: 0.45,
  maxSpeed: 7,
  stiffness: 30,
  damping: 7,
  gravity: 2.6,
  thrust: 7.2,
  rotateSpeed: 2.6,
  softLandingSpeed: 1.3,
  cameraFollowOffset: 1.4,
  exhaustColor: 0xf0a840,
  flameColor: 0xe05252,
  tiers: {
    low: {
      particleCount: 48,
      dprCap: 1.25,
      exhaustRate: 0.45,
      antialias: false,
    },
    mid: {
      particleCount: 120,
      dprCap: 1.5,
      exhaustRate: 0.75,
      antialias: true,
    },
    high: {
      particleCount: 220,
      dprCap: 2,
      exhaustRate: 1,
      antialias: true,
    },
  },
};
