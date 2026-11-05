import type { CosmosConfig } from "@/content/cosmos";

/**
 * Critically damped spring that follows raw scroll velocity. While the page
 * scrolls it tracks the scroll speed, and once scrolling stops it eases back to
 * zero so the stars settle without any bounce.
 */
export class ScrollSpring {
  value = 0;
  private rate = 0;
  private cfg: CosmosConfig["physics"];

  constructor(cfg: CosmosConfig["physics"]) {
    this.cfg = cfg;
  }

  step(target: number, dt: number): void {
    const { stiffness, maxVelocity, restThreshold } = this.cfg;
    const damping = 2 * Math.sqrt(stiffness);
    const clamped = Math.max(-maxVelocity, Math.min(maxVelocity, target));
    this.rate += (stiffness * (clamped - this.value) - damping * this.rate) * dt;
    this.value += this.rate * dt;
    if (clamped === 0 && Math.abs(this.value) < restThreshold && Math.abs(this.rate) < restThreshold * 4) {
      this.value = 0;
      this.rate = 0;
    }
  }

  get resting(): boolean {
    return this.value === 0 && this.rate === 0;
  }
}
