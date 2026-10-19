# Project Rocketry BITS Goa: Website

The official website of **Project Rocketry BITS Goa**, a student-run rocketry
project under **SEDS Celestia** at **BITS Pilani, K.K. Birla Goa Campus**. The team
designs avionics, structures and propulsion for a hybrid-engine, retro-propulsive
rocket capable of thrust vector control (TVC).

This site is our public face: it showcases real work, documents our subsystems and
mini-projects, introduces the crew and gives recruits and sponsors a way to reach
us. Nothing on the site is faked; anything not finished is labelled as such.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS 4 with CSS-variable design tokens |
| 3D / interactive | Three.js (lazy loaded, capability gated) |
| Icons | Lucide React |
| Fonts | Space Grotesk + Inter via `next/font` |
| Hosting | Vercel (custom domain later) |

## Repository Structure

```
├── docs/
│   └── SYSTEM_DESIGN.md        # architecture, rules and decisions
├── public/
│   ├── brand/                  # official logo
│   └── media/                  # project photos (per subsystem folders)
├── src/
│   ├── app/                    # routes: /, /avionics, /team, /contact
│   ├── components/
│   │   ├── avionics/           # project dossiers, carousel, panels
│   │   ├── launch-zone/        # Three.js interactive rocket
│   │   ├── layout/             # navbar, footer
│   │   ├── subsystems/         # subsystem dossier modal
│   │   ├── team/               # member photos, dossier modal
│   │   └── ui/                 # badges, icons, shared primitives
│   ├── content/                # ALL site text and data (edit here, not in UI code)
│   │   ├── site.ts             # name, mission, socials
│   │   ├── projects.ts         # avionics mini-projects (+ structural/propulsion slots)
│   │   ├── subsystems.ts       # subsystem cards
│   │   ├── team.ts             # leads, core, crew
│   │   ├── stats.ts            # dynamic counters
│   │   └── launchZone.ts       # flight physics config
│   └── lib/                    # hooks, helpers
└── package.json
```

Content lives in `src/content/`: to update text, projects, team members or flight
tuning, edit the data files and the UI picks it up. No component changes needed.

## Prerequisites

You need **Node.js 20 or newer** (npm ships with it). Check what you have:

```bash
node -v
npm -v
```

If `node -v` prints v20.0.0 or higher, skip to [Run Locally](#run-locally).

### Windows

1. Download the **LTS installer** from the official site:
   [https://nodejs.org/en/download](https://nodejs.org/en/download)
2. Run the `.msi` installer, keep the default options (this installs both `node`
   and `npm`).
3. Close and reopen your terminal (PowerShell or CMD), then verify:

```powershell
node -v
npm -v
```

Alternative (Windows Package Manager): `winget install OpenJS.NodeJS.LTS`

### macOS

1. Download the **LTS installer** from the official site:
   [https://nodejs.org/en/download](https://nodejs.org/en/download)
2. Run the `.pkg` installer with the default options.
3. Open a new Terminal window and verify with `node -v` and `npm -v`.

Alternative (Homebrew): `brew install node`

### Linux

Option A, official NodeSource setup (recommended, gets you a recent version):

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Option B, nvm (works on any distro):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install --lts
```

Verify with `node -v` and `npm -v`.

See [https://nodejs.org/en/download](https://nodejs.org/en/download) for all
platforms and package managers.

## Run Locally

1. **Clone the repository** (or download and extract the ZIP):

```bash
git clone https://github.com/Rocketry-Avionics/Website.git
cd Website
```

2. **Install dependencies** (one time, and after someone updates `package.json`):

```bash
npm install
```

3. **Start the dev server:**

```bash
npm run dev
```

4. Open **[http://localhost:3000](http://localhost:3000)** in your browser.
   The page auto-reloads when you edit files.

All three platforms (Windows, macOS, Linux) use the exact same commands above;
only the Node.js installation step differs.

## Other Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload at localhost:3000 |
| `npm run build` | Production build (type checks included) |
| `npm run start` | Serve the production build locally |
| `npm run typecheck` | TypeScript check without emitting files |

## Troubleshooting

- **`npm install` fails or throws engine errors**: your Node.js is older than 20.
  Install the current LTS from [https://nodejs.org/en/download](https://nodejs.org/en/download)
  and reopen your terminal.
- **Port 3000 already in use**: stop the other process, or run
  `npm run dev -- -p 3001` and open localhost:3001.
- **Three.js scene does not load**: it needs WebGL; on very old devices the site
  automatically falls back to a static version by design.

## Deployment

The site deploys on **Vercel**. Deploys are handled by the team leads; you do not
need Vercel to develop locally. A custom domain is planned later.

## Contributing

- Branch from `main` using `feat/<topic>` or `fix/<topic>`.
- Keep commits small and focused; one concern per commit.
- Never present unfinished work as done: status badges on the site must stay
  honest (`Active`, `In Progress`, `Planned`).
- No em dashes anywhere in UI copy, content files or docs.
