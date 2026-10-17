# Project Rocketry BITS Goa: Website System Design

**Version:** 0.2: v1 implemented locally, not deployed
**Status:** Built; content pending official club info (mission text, media, rosters)
**Owner:** Avionics Lead, Project Rocketry BITS Goa (SEDS Celestia)

---

## 1. Purpose & Non-Negotiables

### Purpose
Official showcase + outreach site for **Project Rocketry BITS Goa**, part of **SEDS Celestia**.
Audiences: student recruits (freshers), sponsors, SEDS / fest visitors.

### Non-negotiables
1. **No fabricated work.** Only real, verified work is showcased. Anything not yet done is
   explicitly badged `Planned` / `In Progress`. The site's value is *credible* outreach.
2. **Everything variable.** No hardcoded magic numbers anywhere:
   - Design tokens (colors, spacing, type scale) as CSS variables.
   - Launch Zone physics/bounds/particle counts from a typed config, tiered by device.
   - Page content from typed data files: text/photo updates never touch UI code.
3. **Performance first.** Must run smoothly on cheap Androids / low-power devices.
4. **Responsive by construction.** Fluid layouts, no fixed-pixel assumptions.
5. **No em dashes.** Ever, in UI copy, content files or docs. Use commas, colons or
   parentheses and keep the sentence flowing.

---

## 2. Information Architecture (Pages)

| Route | Contents | Status |
|---|---|---|
| `/` | Hero + interactive **Launch Zone**, mission, stats, subsystem teasers, CTA | Build |
| `/avionics` | Single page, anchored sections for the 6 projects (below). Each card shows its status timeline inline (current entry highlighted) and opens a project dossier: media carousel with prev/next + fullscreen expand (arrow keys navigate, Escape closes), timeline detail, points, tags | Build |
| `/team` | Subsystem leads in a compact 2x2 grid (avionics has two co-leads, no single project lead), avionics core in a single five-column row, crew in a 4x4 grid. Every member card is clickable and opens a dossier modal: enlargeable photo (placeholder until real photos), Gmail (compulsory slot), LinkedIn/Twitter/Instagram shown only when filled. Close button lives in a header row so it never overlaps the photo | Build |
| `/contact` | Web3Forms/Formspree form + socials (LinkedIn) + email | Build |
| `/structural` | **Parked**: no page until official info is provided | Parked |
| `/propulsion` | **Parked**: no page until official info is provided | Parked |
| Legal/imprint | Added only if/when required | Parked |

### Avionics page: the 6 projects (single route, anchored sections)
1. **Hardware Core**: custom 4-layer PCB in Altium; efficient + powerful MCU & sensors
   for flight data collection. Status badge: from real project state.
2. **Software Core**: flight controller logic: data collection → preprocessing
   (filters) → real-time processing (TVC, parachute deployment) → post-processing
   (SD logging, metrics, plots).
3. **Communication Systems**: two tracks:
   - *Hardware*: comm modules, integration with Hardware Core PCB.
   - *Software*: custom test logic for modules, edge-case finding, data collection,
     two-way transfer (telemetry down, commands up).
4. **Website Team**: this site.
5. **Self-Landing RL Simulation**: Unity earth environment, rocket modeled per
   structural team's specs, custom RL agent, weights exported via ONNX / TFLite,
   eventual deployment on the flight MCU. **Badge: `In Progress`** (Unity 6 scene
   with rocket, spawn point and landing pad already scaffolded; ONNX/TFLite export
   and onboard deployment are `Planned` milestones inside the project).
6. **Outreach**: leads + core members only; crew may repost.

Each project section: status badge, one-paragraph summary, media placeholders,
tech tags, anchor id for in-page nav.

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js (App Router) + React + TypeScript** | Static-first, Vercel-native, file routing |
| Styling | **Tailwind CSS 4** + CSS-variable design tokens | Fast, consistent, theme via variables |
| Icons | **Lucide React** | Tree-shakeable, tiny |
| Fonts | `next/font` (self-hosted, subset) | No layout shift, no external requests |
| 3D | **Three.js** (lazy, capability-gated) | Decision: start sophisticated, optimize down |
| State | None (React built-ins) | Avoid heavy client state |
| Animation | CSS transitions + rAF + IntersectionObserver | No framer-motion: bundle stays small |
| Forms | **Web3Forms** (decided): key via `NEXT_PUBLIC_WEB3FORMS_KEY`; graceful fallback to LinkedIn if unset | No backend of our own for v1 |
| Deploy | **Vercel** | Free tier, preview deploys, Lighthouse CI |
| Domain | Vercel subdomain now; custom `.com`/`.in` later | Explicitly deferred |

---

## 3.1 Design Tokens (extracted from the official club logo)

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#1E1D1C` | Page background (logo charcoal family) |
| `--color-charcoal` | `#262524` | Raised sections |
| `--color-surface` | `#2F2D2B` | Cards |
| `--color-line` | `#45413D` | Borders |
| `--color-paper` | `#F4F1EC` | Primary text / rocket body white |
| `--color-flame` | `#E05252` | Logo red: primary accent |
| `--color-sky` | `#3D6F9E` | Logo blue: secondary accent |
| `--color-amber` | `#F0A840` | Logo orange: tertiary accent |

Fonts: Space Grotesk (display) + Inter (body) via `next/font`, self-hosted.
Note: lucide-react v1 removed brand icons; LinkedIn uses an in-house SVG
(`src/components/ui/LinkedInIcon.tsx`).

---

## 4. Content Layer: "Nothing Hardcoded"

```
src/content/
  site.ts        site name, tagline, socials, contact targets
  nav.ts         nav order, labels, anchors
  subsystems.ts  subsystem summaries + status badges
  projects.ts    avionics projects (id, title, blurb, tags, status, media)
  team.ts        subsystem leads (flat list, 2x2 order: avionics co-lead 1,
                 avionics co-lead 2, structural, propulsion), avionics core,
                 avionics crew. Each member: photo (null = placeholder) and
                 optional dossier { gmail required, socials only when filled }
  stats.ts       numbers for the home page (only real ones)
  launchZone.ts  physics/bounds/particles config, per device tier
```

- Typed interfaces exported from `src/content/types.ts`.
- Components read exclusively from content files.
- Later swap to MDX / headless CMS without redesign.

---

## 5. Launch Zone: Interactive Rocket (Three.js)

Our own concept (not qBITS' Bloch sphere): a rocket that flies.

### v1 Spec
- **Bounded zone** inside the hero (element-relative bounds, never viewport-hardcoded).
- Rocket follows the pointer with `lerp`-smoothed physics + particle exhaust.
- **"Free Flight" button** opens a modal: open controls (keyboard + touch), simple
  physics loop, HUD readouts (altitude, velocity, apogee). Fun-first, not a sim.
- Mobile: tap/drag instead of hover; reduced particle count.

### All parameters from `launchZone.ts`, tiered by device
```ts
{
  bounds: "parent",        // % of parent element, any screen size
  physics: { lerpAlpha, maxTilt, gravity, thrust },
  exhaust: { count, size, ttl },
  dprCap,                  // clamp devicePixelRatio to save GPU
}
// tiers: "low" | "mid" | "high": chosen at runtime
```

### Performance rules (enforced, not aspirational)
- Three.js is **dynamically imported**: never in the initial server bundle.
- Render loop **pauses** when: zone off-screen, tab hidden, modal closed.
- `prefers-reduced-motion` → static rocket illustration, no loop.
- On unmount / HMR: dispose geometries, materials, renderer context.
- `dprCap` clamps pixel ratio; particle count scales by device tier.
- Fallback: if WebGL unavailable / init fails → static SVG rocket + caption.

---

## 6. Performance Budget (hard gates, verified on every preview)

| Metric | Budget |
|---|---|
| Initial JS (gzip) | ≤ ~170 KB |
| 3D chunk | Lazy only, ≤ ~650 KB gzip, never blocking |
| LCP | ≤ 2.5 s on mid-tier Android / 4G |
| CLS | < 0.1 |
| INP | < 200 ms |
| Images | `next/image`, AVIF/WebP, explicit sizes |

Enforcement: Lighthouse CI on Vercel preview deployments; budget failures block merge
(once CI is set up after first deploy).

---

## 7. Repository Layout (proposed)

```
docs/SYSTEM_DESIGN.md
src/
  app/                # routes: /, /avionics, /team, /contact
  components/
    ui/               # primitives (button, badge, card…)
    sections/         # hero, stats, project-section, team-tree…
    launch-zone/      # three.js game (all lazy)
  content/            # typed data (section 4)
  lib/
    hooks/            # usePointerTarget, useVisibility, useReducedMotion, useDeviceTier
    three/            # scene setup, dispose helpers
  styles/
public/
  media/              # real photos only when provided; placeholders until then
```

---

## 8. Build Order

1. ~~Scaffold Next.js + TS + Tailwind 4, design tokens, content skeleton~~ ✅
2. ~~Static pages with placeholder media (`/avionics`, `/team`, `/contact`)~~ ✅
3. ~~Launch Zone v1 (bounded follow mode) behind dynamic import~~ ✅
4. ~~Free Flight modal~~ ✅
5. ~~Perf pass: three.js verified lazy (~538 KB chunk, absent from initial load)~~ ✅ Lighthouse CI pending first deploy
6. Deploy to Vercel: **blocked until you explicitly ask**; custom domain later.
7. Fill real content when official info arrives (mission wording, media, rosters).

---

## 9. Parked / Future (explicitly not promised)

- Structural & Propulsion pages: after official info (incl. possible 3D engine model
  viewer: click / zoom / rotate; Gaussian splatting investigated only then).
- Real team photos.
- Custom domain.
- Analytics/SEO beyond basics.

---

## 10. Git Rules

- Read-only git ops only (`status`, `log`, `diff`) unless explicitly instructed.
- No commits/pushes without explicit request.
