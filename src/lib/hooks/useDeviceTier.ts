"use client";

import { useEffect, useState } from "react";
import type { DeviceTier } from "@/content/launchZone";

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid");

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 4;
    const memory = nav.deviceMemory ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let next: DeviceTier = "mid";
    if (cores >= 8 && memory >= 8) next = "high";
    if (cores <= 4 || memory <= 2) next = "low";
    if (coarse && next === "high") next = "mid";
    setTier(next);
  }, []);

  return tier;
}
