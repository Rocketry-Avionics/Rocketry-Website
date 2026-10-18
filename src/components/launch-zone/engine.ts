import * as THREE from "three";
import { launchZone } from "@/content/launchZone";
import type { DeviceTier } from "@/content/launchZone";

export interface EngineState {
  altitude: number;
  velocity: number;
  apogee: number;
  throttle: number;
  landed: boolean;
  crashed: boolean;
  xNorm: number;
}

export interface EngineInput {
  rotate: -1 | 0 | 1;
  throttle: 0 | 1;
}

const FOV = 42;
const CAMERA_Z = 9;
const MARGIN = 0.92;

function wrapRange(value: number, min: number, max: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export class LaunchEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private rocket: THREE.Group;
  private flame: THREE.Mesh;
  private particles: THREE.Points;
  private particleData: {
    positions: Float32Array;
    velocities: Float32Array;
    life: Float32Array;
    maxLife: Float32Array;
    cursor: number;
  };
  private disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];
  private raf = 0;
  private running = false;
  private mode: "follow" | "free";
  private tier: DeviceTier;
  private cfg: (typeof launchZone)["tiers"][DeviceTier];
  private timer = new THREE.Timer();
  private observer: ResizeObserver | null = null;
  private onState?: (state: EngineState) => void;
  private stateTimer = 0;
  private lastEmit = 0;

  private target = new THREE.Vector2(0, 0);
  private hasTarget = false;
  private springVel = new THREE.Vector2(0, 0);
  private input: EngineInput = { rotate: 0, throttle: 0 };
  private vel = new THREE.Vector2(0, 0);
  private apogee = 0;
  private landed = false;
  private crashed = false;
  private hasFlown = false;
  private groundY = 0;
  private halfW = 0;
  private halfH = 0;
  private stars: THREE.Points;
  private parallax: THREE.Group;
  private moonLayer: THREE.Group;
  private speedStars: THREE.Points;
  private speedBase: Float32Array;
  private speedOff = new THREE.Vector2();
  private speedMat: THREE.PointsMaterial;
  private shootLine: THREE.Line | null = null;
  private shootActive = false;
  private shootT = 0;
  private shootNext = 4;
  private shootOrigin = new THREE.Vector3();
  private shootVec = new THREE.Vector3();

  private onKeyDown = (e: KeyboardEvent) => {
    if (this.mode !== "free") return;
    if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") {
      this.input.throttle = 1;
      e.preventDefault();
    }
    if (e.code === "ArrowLeft" || e.code === "KeyA") this.input.rotate = -1;
    if (e.code === "ArrowRight" || e.code === "KeyD") this.input.rotate = 1;
  };

  private onKeyUp = (e: KeyboardEvent) => {
    if (this.mode !== "free") return;
    if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") {
      if (!this.touchThrust) this.input.throttle = 0;
    }
    if (
      (e.code === "ArrowLeft" || e.code === "KeyA") &&
      this.input.rotate === -1 &&
      !this.touchLeft
    )
      this.input.rotate = 0;
    if (
      (e.code === "ArrowRight" || e.code === "KeyD") &&
      this.input.rotate === 1 &&
      !this.touchRight
    )
      this.input.rotate = 0;
  };

  private onPointerMove = (e: PointerEvent) => {
    if (this.mode !== "follow") return;
    const rect = this.canvas.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.target.set(
      nx * this.halfW * MARGIN,
      ny * this.halfH * MARGIN
    );
    this.hasTarget = true;
  };

  private onPointerLeave = () => {
    this.hasTarget = false;
  };

  private onPointerSteer = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.buttons === 0) return;
    const rect = this.canvas.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointerTilt = nx;
  };

  private onPointerEnd = () => {
    this.pointerTilt = null;
  };

  private touchThrust = false;
  private touchLeft = false;
  private touchRight = false;
  private pointerTilt: number | null = null;
  private canvas: HTMLCanvasElement;

  constructor(
    canvas: HTMLCanvasElement,
    mode: "follow" | "free",
    tier: DeviceTier,
    onState?: (state: EngineState) => void
  ) {
    this.canvas = canvas;
    this.mode = mode;
    this.tier = tier;
    this.cfg = launchZone.tiers[tier];
    this.onState = onState;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: this.cfg.antialias,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, this.cfg.dprCap)
    );

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      FOV,
      1,
      0.1,
      100
    );
    this.camera.position.set(0, 0, CAMERA_Z);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(3, 5, 6);
    this.scene.add(sun);
    const warm = new THREE.DirectionalLight(launchZone.exhaustColor, 0.5);
    warm.position.set(-4, -2, 3);
    this.scene.add(warm);

    this.rocket = this.buildRocket();
    this.rocket.scale.setScalar(launchZone.rocketScale);
    this.scene.add(this.rocket);

    if (mode === "free") {
      this.groundY = -2.55;
      this.rocket.position.set(0, this.groundY + 0.85, 0);
      this.scene.add(this.buildPad());
    } else {
      this.rocket.position.set(0, 0, 0);
    }

    this.flame = this.buildFlame();
    this.flame.position.set(0, -1.1, 0);
    this.rocket.add(this.flame);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 90;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 16;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      starPos[i * 3 + 2] = -5;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf4f1ec,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    this.disposables.push(starGeo, starMat);
    this.stars = new THREE.Points(starGeo, starMat);

    const farGeo = new THREE.BufferGeometry();
    const farCount = 60;
    const farPos = new Float32Array(farCount * 3);
    for (let i = 0; i < farCount; i++) {
      farPos[i * 3] = (Math.random() - 0.5) * 22;
      farPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      farPos[i * 3 + 2] = -8;
    }
    farGeo.setAttribute("position", new THREE.BufferAttribute(farPos, 3));
    const farMat = new THREE.PointsMaterial({
      color: 0xf4f1ec,
      size: 0.025,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });
    this.disposables.push(farGeo, farMat);
    const farStars = new THREE.Points(farGeo, farMat);

    const moonCanvas = document.createElement("canvas");
    moonCanvas.width = 256;
    moonCanvas.height = 256;
    const mctx = moonCanvas.getContext("2d");
    if (mctx) {
      const grad = mctx.createRadialGradient(96, 88, 20, 128, 128, 128);
      grad.addColorStop(0, "#f5f2ea");
      grad.addColorStop(0.55, "#cfc8bc");
      grad.addColorStop(0.85, "#9a9284");
      grad.addColorStop(1, "#6e675c");
      mctx.fillStyle = grad;
      mctx.fillRect(0, 0, 256, 256);
      const craters: [number, number, number][] = [
        [70, 60, 14],
        [150, 90, 10],
        [110, 150, 18],
        [190, 170, 8],
        [60, 180, 9],
        [170, 40, 7],
        [40, 120, 7],
        [135, 205, 6],
      ];
      for (const [cx, cy, r] of craters) {
        mctx.fillStyle = "rgba(90, 84, 74, 0.45)";
        mctx.beginPath();
        mctx.arc(cx, cy, r, 0, Math.PI * 2);
        mctx.fill();
        mctx.fillStyle = "rgba(245, 242, 234, 0.25)";
        mctx.beginPath();
        mctx.arc(cx - r * 0.25, cy - r * 0.25, r * 0.75, 0, Math.PI * 2);
        mctx.fill();
        mctx.fillStyle = "rgba(90, 84, 74, 0.5)";
        mctx.beginPath();
        mctx.arc(cx + r * 0.12, cy + r * 0.12, r * 0.62, 0, Math.PI * 2);
        mctx.fill();
      }
    }
    const moonTex = new THREE.CanvasTexture(moonCanvas);

    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 256;
    glowCanvas.height = 256;
    const gctx = glowCanvas.getContext("2d");
    if (gctx) {
      const ggrad = gctx.createRadialGradient(128, 128, 60, 128, 128, 128);
      ggrad.addColorStop(0, "rgba(230, 226, 216, 0.35)");
      ggrad.addColorStop(1, "rgba(230, 226, 216, 0)");
      gctx.fillStyle = ggrad;
      gctx.fillRect(0, 0, 256, 256);
    }
    const glowTex = new THREE.CanvasTexture(glowCanvas);

    const glowGeo = new THREE.PlaneGeometry(4.6, 4.6);
    const glowMat = new THREE.MeshBasicMaterial({
      map: glowTex,
      transparent: true,
      depthWrite: false,
    });
    const moonGeo = new THREE.CircleGeometry(1.25, 48);
    const moonMat = new THREE.MeshBasicMaterial({ map: moonTex });
    this.disposables.push(glowGeo, glowMat, moonGeo, moonMat, moonTex, glowTex);
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(3.6, 2.6, -9.05);
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(3.6, 2.6, -9);

    this.parallax = new THREE.Group();
    this.parallax.add(this.stars, farStars);
    this.scene.add(this.parallax);

    this.moonLayer = new THREE.Group();
    this.moonLayer.add(glow, moon);
    this.scene.add(this.moonLayer);

    const spdCount = 80;
    this.speedBase = new Float32Array(spdCount * 3);
    for (let i = 0; i < spdCount; i++) {
      this.speedBase[i * 3] = (Math.random() - 0.5) * 20;
      this.speedBase[i * 3 + 1] = (Math.random() - 0.5) * 14;
      this.speedBase[i * 3 + 2] = -4.5 - Math.random() * 2;
    }
    const spdGeo = new THREE.BufferGeometry();
    spdGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(spdCount * 3), 3));
    this.speedMat = new THREE.PointsMaterial({
      color: 0xf4f1ec,
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    this.disposables.push(spdGeo, this.speedMat);
    this.speedStars = new THREE.Points(spdGeo, this.speedMat);
    this.speedStars.frustumCulled = false;
    this.scene.add(this.speedStars);

    if (mode === "follow") {
      const shootGeo = new THREE.BufferGeometry();
      shootGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      const shootMat = new THREE.LineBasicMaterial({
        color: 0xf4f1ec,
        transparent: true,
        opacity: 0,
      });
      this.disposables.push(shootGeo, shootMat);
      this.shootLine = new THREE.Line(shootGeo, shootMat);
      this.shootLine.visible = false;
      this.shootLine.frustumCulled = false;
      this.scene.add(this.shootLine);
    }

    const count = this.cfg.particleCount;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    positions.fill(9999);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: launchZone.exhaustColor,
      size: 0.09,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.disposables.push(geo, mat);
    this.particles = new THREE.Points(geo, mat);
    this.particles.frustumCulled = false;
    this.scene.add(this.particles);
    this.particleData = {
      positions,
      velocities: new Float32Array(count * 2),
      life: new Float32Array(count),
      maxLife: new Float32Array(count),
      cursor: 0,
    };

    if (mode === "follow") {
      canvas.addEventListener("pointermove", this.onPointerMove);
      canvas.addEventListener("pointerleave", this.onPointerLeave);
    } else {
      window.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("keyup", this.onKeyUp);
      canvas.addEventListener("pointerdown", this.onPointerSteer);
      canvas.addEventListener("pointermove", this.onPointerSteer);
      canvas.addEventListener("pointerup", this.onPointerEnd);
      canvas.addEventListener("pointerleave", this.onPointerEnd);
      canvas.addEventListener("pointercancel", this.onPointerEnd);
    }

    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas.parentElement ?? canvas);
    this.resize();
    this.setRunning(true);
  }

  private buildRocket(): THREE.Group {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf4f1ec,
      roughness: 0.35,
      metalness: 0.1,
    });
    const flameMat = new THREE.MeshStandardMaterial({
      color: launchZone.flameColor,
      roughness: 0.4,
      metalness: 0.05,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x262524,
      roughness: 0.6,
    });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x3d6f9e,
      roughness: 0.15,
      metalness: 0.4,
    });
    this.disposables.push(bodyMat, flameMat, darkMat, glassMat);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.1, 24), bodyMat);
    group.add(body);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.55, 24), flameMat);
    nose.position.y = 0.82;
    group.add(nose);

    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.18, 0.18, 16), darkMat);
    nozzle.position.y = -0.64;
    group.add(nozzle);

    const window = new THREE.Mesh(new THREE.CircleGeometry(0.09, 20), glassMat);
    window.position.set(0, 0.18, 0.241);
    group.add(window);

    const finGeo = new THREE.BoxGeometry(0.05, 0.42, 0.26);
    this.disposables.push(finGeo);
    for (let i = 0; i < 3; i++) {
      const fin = new THREE.Mesh(finGeo, flameMat);
      const angle = (i / 3) * Math.PI * 2;
      fin.position.set(Math.cos(angle) * 0.27, -0.42, Math.sin(angle) * 0.27);
      fin.rotation.y = -angle;
      group.add(fin);
    }
    return group;
  }

  private buildFlame(): THREE.Mesh {
    const geo = new THREE.ConeGeometry(0.13, 0.7, 12, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color: launchZone.exhaustColor,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.disposables.push(geo, mat);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.PI;
    mesh.visible = false;
    return mesh;
  }

  private buildPad(): THREE.Group {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: 0x3a3734,
      roughness: 0.8,
    });
    const legMat = new THREE.MeshStandardMaterial({
      color: launchZone.flameColor,
      roughness: 0.5,
    });
    this.disposables.push(mat, legMat);
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.7, 0.12, 32), mat);
    pad.position.set(0, this.groundY - 0.06, 0);
    group.add(pad);
    for (let i = 0; i < 4; i++) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.1), legMat);
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      leg.position.set(Math.cos(angle) * 1.55, this.groundY - 0.4, Math.sin(angle) * 1.55);
      group.add(leg);
    }
    return group;
  }

  private resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const visH = 2 * Math.tan((FOV * Math.PI) / 360) * CAMERA_Z;
    const visW = visH * this.camera.aspect;
    this.halfH = (visH / 2) * MARGIN;
    this.halfW = (visW / 2) * MARGIN;
    if (this.mode === "follow") {
      this.target.clamp(
        new THREE.Vector2(-this.halfW, -this.halfH),
        new THREE.Vector2(this.halfW, this.halfH)
      );
    }
  }

  setRunning(running: boolean) {
    if (running === this.running) return;
    this.running = running;
    if (running) {
      this.timer.update();
      this.loop();
    } else {
      cancelAnimationFrame(this.raf);
    }
  }

  setInput(partial: Partial<EngineInput>) {
    if (partial.rotate !== undefined) {
      this.input.rotate = partial.rotate;
      this.touchLeft = partial.rotate === -1;
      this.touchRight = partial.rotate === 1;
    }
    if (partial.throttle !== undefined) {
      this.input.throttle = partial.throttle;
      this.touchThrust = partial.throttle === 1;
    }
  }

  setPointerTilt(tilt: number | null) {
    this.pointerTilt = tilt;
  }

  reset() {
    this.rocket.position.set(0, this.groundY + 0.85, 0);
    this.rocket.rotation.z = 0;
    this.vel.set(0, 0);
    this.springVel.set(0, 0);
    this.apogee = 0;
    this.landed = false;
    this.crashed = false;
    this.hasFlown = false;
    this.camera.position.y = 0;
    this.input = { rotate: 0, throttle: 0 };
    this.emitState();
  }

  private emitState() {
    if (!this.onState) return;
    this.onState({
      altitude: Math.max(0, this.rocket.position.y - this.groundY),
      velocity: this.vel.y,
      apogee: this.apogee,
      throttle: this.input.throttle,
      landed: this.landed,
      crashed: this.crashed,
      xNorm:
        this.halfW === 0
          ? 0
          : THREE.MathUtils.clamp(this.rocket.position.x / this.halfW, -1, 1),
    });
  }

  private updateSpeedStars(dt: number) {
    const vx = this.mode === "free" ? this.vel.x : this.springVel.x;
    const vy = this.mode === "free" ? this.vel.y : this.springVel.y;
    this.speedOff.x -= vx * 0.55 * dt;
    this.speedOff.y -= vy * 0.55 * dt;
    const cx = 0;
    const cy = this.mode === "free" ? this.camera.position.y : 0;
    const bx = this.halfW + 2;
    const by = this.halfH + 2;
    if (bx <= 0 || by <= 0) return;
    const speed = Math.hypot(vx, vy);
    this.speedMat.opacity = Math.min(0.85, 0.3 + speed * 0.03);
    this.speedMat.size = 0.045 + Math.min(0.05, speed * 0.004);
    const attr = this.speedStars.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const count = arr.length / 3;
    for (let i = 0; i < count; i++) {
      arr[i * 3] = wrapRange(this.speedBase[i * 3] + this.speedOff.x, cx - bx, cx + bx);
      arr[i * 3 + 1] = wrapRange(this.speedBase[i * 3 + 1] + this.speedOff.y, cy - by, cy + by);
      arr[i * 3 + 2] = this.speedBase[i * 3 + 2];
    }
    attr.needsUpdate = true;
  }

  private updateShootingStar(dt: number) {
    if (!this.shootLine) return;
    const mat = this.shootLine.material as THREE.LineBasicMaterial;
    if (this.shootActive) {
      this.shootT += dt / 0.9;
      if (this.shootT >= 1) {
        this.shootActive = false;
        this.shootLine.visible = false;
        this.shootNext = 3.5 + Math.random() * 4.5;
        return;
      }
      const headX = this.shootOrigin.x + this.shootVec.x * this.shootT;
      const headY = this.shootOrigin.y + this.shootVec.y * this.shootT;
      const attr = this.shootLine.geometry.getAttribute("position") as THREE.BufferAttribute;
      attr.setXYZ(0, headX, headY, -3);
      attr.setXYZ(1, headX - this.shootVec.x * 0.1, headY - this.shootVec.y * 0.1, -3);
      attr.needsUpdate = true;
      mat.opacity = Math.sin(this.shootT * Math.PI) * 0.8;
    } else {
      this.shootNext -= dt;
      if (this.shootNext <= 0) {
        this.shootActive = true;
        this.shootT = 0;
        const fromLeft = Math.random() > 0.5;
        this.shootOrigin.set(
          fromLeft ? -this.halfW - 1 : this.halfW + 1,
          this.halfH * (0.3 + Math.random() * 0.6),
          -3
        );
        this.shootVec.set(
          (fromLeft ? 1 : -1) * (this.halfW * 2 + 2),
          -(1.5 + Math.random() * 2),
          0
        );
        this.shootLine.visible = true;
      }
    }
  }

  private emitParticle(speed: number) {
    const { positions, velocities, life, maxLife } = this.particleData;
    const count = life.length;
    const theta = this.rocket.rotation.z;
    const nozzleX = this.rocket.position.x + Math.sin(theta) * 0.72;
    const nozzleY = this.rocket.position.y - Math.cos(theta) * 0.72;
    const exX = Math.sin(theta);
    const exY = -Math.cos(theta);
    const inheritX =
      this.mode === "free"
        ? this.vel.x * 0.85
        : THREE.MathUtils.clamp(this.springVel.x, -6, 6) * 0.3;
    const inheritY =
      this.mode === "free"
        ? this.vel.y * 0.85
        : THREE.MathUtils.clamp(this.springVel.y, -6, 6) * 0.3;
    const i = this.particleData.cursor;
    this.particleData.cursor = (i + 1) % count;
    positions[i * 3] = nozzleX + (Math.random() - 0.5) * 0.08;
    positions[i * 3 + 1] = nozzleY;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    velocities[i * 2] = exX * speed + inheritX + (Math.random() - 0.5) * 0.3;
    velocities[i * 2 + 1] = exY * speed + inheritY + (Math.random() - 0.5) * 0.3;
    life[i] = 1;
    maxLife[i] = 0.5 + Math.random() * 0.4;
  }

  private updateParticles(dt: number) {
    const { positions, velocities, life, maxLife } = this.particleData;
    const count = life.length;
    for (let i = 0; i < count; i++) {
      if (life[i] <= 0) continue;
      life[i] -= dt / maxLife[i];
      if (life[i] <= 0) {
        positions[i * 3 + 1] = 9999;
        continue;
      }
      positions[i * 3] += velocities[i * 2] * dt;
      positions[i * 3 + 1] += velocities[i * 2 + 1] * dt;
    }
    const attr = this.particles.geometry.getAttribute("position") as THREE.BufferAttribute;
    attr.needsUpdate = true;
  }

  private loop = () => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.loop);
    this.timer.update();
    const dt = Math.min(this.timer.getDelta(), 0.033);
    const time = this.timer.getElapsed();

    if (this.mode === "follow") {
      if (!this.hasTarget) {
        this.target.set(0, Math.sin(time * 0.8) * 0.3);
      }
      const ax =
        (this.target.x - this.rocket.position.x) * launchZone.stiffness -
        this.springVel.x * launchZone.damping;
      const ay =
        (this.target.y - this.rocket.position.y) * launchZone.stiffness -
        this.springVel.y * launchZone.damping;
      this.springVel.x += ax * dt;
      this.springVel.y += ay * dt;
      const speed = this.springVel.length();
      if (speed > launchZone.maxSpeed) {
        this.springVel.multiplyScalar(launchZone.maxSpeed / speed);
      }
      this.rocket.position.x += this.springVel.x * dt;
      this.rocket.position.y += this.springVel.y * dt;
      const limitX = this.halfW * 0.98;
      const limitY = this.halfH * 0.98;
      if (this.rocket.position.x > limitX) {
        this.rocket.position.x = limitX;
        if (this.springVel.x > 0) this.springVel.x = 0;
      } else if (this.rocket.position.x < -limitX) {
        this.rocket.position.x = -limitX;
        if (this.springVel.x < 0) this.springVel.x = 0;
      }
      if (this.rocket.position.y > limitY) {
        this.rocket.position.y = limitY;
        if (this.springVel.y > 0) this.springVel.y = 0;
      } else       if (this.rocket.position.y < -limitY) {
        this.rocket.position.y = -limitY;
        if (this.springVel.y < 0) this.springVel.y = 0;
      }
      this.parallax.position.set(
        -this.rocket.position.x * 0.35,
        -this.rocket.position.y * 0.35,
        0
      );
      this.moonLayer.position.set(
        -this.rocket.position.x * 0.05,
        -this.rocket.position.y * 0.05,
        0
      );
      this.updateSpeedStars(dt);

      const tilt = THREE.MathUtils.clamp(
        -this.springVel.x * launchZone.tiltFactor,
        -launchZone.maxTilt,
        launchZone.maxTilt
      );
      this.rocket.rotation.z += (tilt - this.rocket.rotation.z) * Math.min(1, 10 * dt);
      const intensity = Math.min(1, 0.25 + this.springVel.length() * 0.12);
      this.flame.visible = true;
      this.flame.scale.setScalar(0.7 + intensity * 0.6);
      const now = time;
      const rate = this.cfg.exhaustRate * 0.024 * (0.6 + intensity);
      if (now - this.lastEmit > rate) {
        this.lastEmit = now;
        this.emitParticle(0.9 + intensity * 0.6);
      }
      this.updateShootingStar(dt);
    } else {
      if (!this.landed && !this.crashed) {
        if (this.pointerTilt !== null) {
          this.rocket.rotation.z = THREE.MathUtils.clamp(
            -this.pointerTilt * launchZone.maxTilt,
            -0.6,
            0.6
          );
        } else {
          this.rocket.rotation.z = THREE.MathUtils.clamp(
            this.rocket.rotation.z - this.input.rotate * launchZone.rotateSpeed * dt,
            -0.6,
            0.6
          );
        }
        const theta = this.rocket.rotation.z;
        this.vel.x += -Math.sin(theta) * launchZone.thrust * this.input.throttle * dt;
        this.vel.y +=
          (Math.cos(theta) * launchZone.thrust * this.input.throttle - launchZone.gravity) * dt;
        const dragFactor = 1 / (1 + launchZone.airDrag * dt);
        this.vel.x *= dragFactor;
        this.vel.y *= dragFactor;
        this.rocket.position.x = THREE.MathUtils.clamp(
          this.rocket.position.x + this.vel.x * dt,
          -this.halfW,
          this.halfW
        );
        if (
          (this.rocket.position.x >= this.halfW && this.vel.x > 0) ||
          (this.rocket.position.x <= -this.halfW && this.vel.x < 0)
        ) {
          this.vel.x = 0;
        }
        this.rocket.position.y += this.vel.y * dt;
        if (this.rocket.position.y - this.groundY > 0.6) this.hasFlown = true;

        const floor = this.groundY + 0.85;
        if (this.vel.y < 0 && this.rocket.position.y <= floor) {
          this.rocket.position.y = floor;
          if (this.hasFlown) {
            const onPad = Math.abs(this.rocket.position.x) <= launchZone.padRadius;
            if (
              onPad &&
              Math.abs(this.vel.y) <= launchZone.softLandingSpeed &&
              Math.abs(this.rocket.rotation.z) < 0.25
            ) {
              this.landed = true;
            } else {
              this.crashed = true;
            }
          }
          this.vel.set(0, 0);
          this.emitState();
        }
        this.apogee = Math.max(this.apogee, this.rocket.position.y - this.groundY);
      } else if (this.landed && this.input.throttle === 1) {
        this.landed = false;
      }

      const camTarget = Math.max(
        0,
        this.rocket.position.y - launchZone.cameraFollowOffset
      );
      this.camera.position.y += (camTarget - this.camera.position.y) * Math.min(1, 5 * dt);
      this.parallax.position.set(
        -this.rocket.position.x * 0.35,
        this.camera.position.y * 0.5,
        0
      );
      this.moonLayer.position.set(
        -this.rocket.position.x * 0.05,
        Math.max(this.camera.position.y * 0.92, this.camera.position.y - 5.5),
        0
      );
      this.updateSpeedStars(dt);

      this.flame.visible = this.input.throttle === 1 && !this.landed && !this.crashed;
      this.flame.scale.setScalar(0.8 + Math.random() * 0.4);
      if (this.input.throttle === 1 && !this.landed && !this.crashed) {
        const rate = this.cfg.exhaustRate * 0.016;
        if (time - this.lastEmit > rate) {
          this.lastEmit = time;
          this.emitParticle(2.2);
          this.emitParticle(1.8);
        }
      }
      this.stateTimer += dt;
      if (this.stateTimer > 0.1) {
        this.stateTimer = 0;
        this.emitState();
      }
    }

    this.updateParticles(dt);
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    this.setRunning(false);
    this.observer?.disconnect();
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerleave", this.onPointerLeave);
    this.canvas.removeEventListener("pointerdown", this.onPointerSteer);
    this.canvas.removeEventListener("pointermove", this.onPointerSteer);
    this.canvas.removeEventListener("pointerup", this.onPointerEnd);
    this.canvas.removeEventListener("pointerleave", this.onPointerEnd);
    this.canvas.removeEventListener("pointercancel", this.onPointerEnd);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose();
      }
    });
    for (const d of this.disposables) d.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
