# Contributing to Project Rocketry BITS Goa Website

Thank you for your interest in contributing to **Project Rocketry BITS Goa**!
This website is our public face, built to showcase real work, document subsystems,
introduce our crew and connect with student recruits and sponsors.

Follow this step-by-step guide to get started and submit your work.

---

## Contribution Workflow

### 1. Star the Repository

Before you begin, star the official repository on GitHub:
👉 **[Rocketry-Avionics/Rocketry-Website](https://github.com/Rocketry-Avionics/Rocketry-Website)**

Starring helps keep the project visible to recruits, sponsors and the wider campus community.

---

### 2. Clone and Set Up Your Local Environment

Make sure you have Node.js (version 20 or newer) installed on your machine.

Follow our step-by-step setup instructions in the [README: Run Locally](README.md#run-locally):
1. Clone the repository:
   ```bash
   git clone https://github.com/Rocketry-Avionics/Rocketry-Website.git
   cd Rocketry-Website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Verify by opening [http://localhost:3000](http://localhost:3000) in your browser.

Once your local environment is running smoothly, return here to continue with your changes.

---

### 3. Create a New Branch

Always branch off the latest `main` branch. Never commit directly to `main`.

Use clean, descriptive branch names prefixed with your change type:
* `feat/<feature-name>` for new features or sections (e.g. `feat/team-roster-update`)
* `fix/<bug-name>` for bug fixes (e.g. `fix/mobile-touch-response`)
* `docs/<topic>` for documentation improvements (e.g. `docs/contributing-guide`)
* `refactor/<topic>` for code restructuring without changing behavior

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

---

### 4. Code Standards and Ground Rules

Please keep these project principles in mind while working:

1. **Honesty above all**: Never present unfinished work as complete. Status badges must strictly stay honest (`Active`, `In Progress`, `Planned`).
2. **Content lives in `src/content/`**: Text, projects, team rosters, stats and flight tuning are data-driven. Edit the files in `src/content/`, not the UI components.
3. **Design tokens**: Use the project's CSS variables (`--color-ink`, `--color-charcoal`, `--color-surface`, `--color-flame`, etc.) defined in `src/app/globals.css`. Do not introduce random hex codes.
4. **Hook words**: Wrap key terms in `*asterisks*` (e.g. `*hybrid engine*`) so they render with our bold highlight convention via `src/lib/emphasis.tsx`. Keep to at most one highlight per sentence.
5. **No em dashes**: Do not use em dashes anywhere in UI copy, content files or documentation. Use commas, colons or parentheses instead.
6. **Mobile performance first**: Keep bundle sizes small and avoid heavy un-memoized loops. The site must run smoothly on budget mobile phones.
7. **Type check**: Before committing, always run:
   ```bash
   npm run typecheck
   ```
   Ensure it passes with 0 errors.

---

### 5. Commit and Push Your Changes

Keep commits small, atomic and focused on a single concern. Write clear, descriptive commit messages:

```bash
git add <modified-files>
git commit -m "feat: add descriptive message"
git push -u origin feat/your-feature-name
```

---

### 6. Open a Pull Request (PR)

1. Navigate to the repository on GitHub:
   👉 **[Open a Pull Request](https://github.com/Rocketry-Avionics/Rocketry-Website/pulls)**
2. Click the green **New pull request** button.
3. Choose `main` as the base branch and select your feature branch as the compare branch.
4. Write a concise description:
   * What was changed or added
   * Why the change was made
   * How you tested it (include mobile or desktop screenshots for UI changes)
5. Submit the pull request.

---

### 7. Review and Merge

1. **Assign Reviewers**: Assign **`@BlazingFire27`** (or relevant subsystem leads) to review your PR.
2. **Vercel Preview**: Vercel will automatically generate a live preview URL for your branch. Check the preview to verify your changes live on both desktop and mobile.
3. **Address Feedback**: If changes are requested, commit and push to your branch; the PR and preview will automatically update.
4. **Merge**: Once approved, your pull request will be merged into `main` and deployed to the production site.
