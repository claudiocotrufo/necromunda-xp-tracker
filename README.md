# N26 // XP Tracker

Campaign management tool for Necromunda: track gangs, fighters and battle XP. React + TypeScript + Vite, no backend — data persists in the browser's `localStorage`.

## Develop

```bash
npm install
npm run dev
```

Open `http://localhost:5173/necromunda-xp-tracker/` (note the sub-path — matches the GitHub Pages `base`).

## Build

```bash
npm run build
npm run preview
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages. Requires **Settings → Pages → Source → GitHub Actions** enabled once on the repo.
