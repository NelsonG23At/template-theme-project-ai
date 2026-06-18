# Template Theme Project

A React + TypeScript boilerplate pre-wired with **Ant Design** and **Tailwind CSS**, built around a single centralized brand/theme folder (`src/core/brand/`) that drives both libraries from one source of truth.

The theme isn't meant to be hand-edited token by token — it's designed to be **synced directly from Figma** using Claude Code skills, so design changes in Figma can be pulled straight into the codebase as typed Ant Design `ConfigProvider` overrides and Tailwind theme extensions.

## Stack

React 19 · TypeScript (strict) · Vite · Ant Design v5/v6 · Tailwind CSS · React Query · React Hook Form · React Router · Storybook · Vitest + React Testing Library · Playwright

## Syncing the theme from Figma

Two Claude Code skills keep `src/core/brand/` in sync with Figma:

- **`figma-sync-theme`** — syncs from a local `theme/` folder of markdown token specs (palette, semantic tokens, per-component overrides) into `src/core/brand/`. Use this when you already have token specs checked into the repo.
- **`figma-translate-theme-url`** — syncs directly from a live Figma file/frame URL, no local `theme/` folder needed. Paste a Figma link (optionally scoped to one component, e.g. `--component Button`) and it maps the closest Ant Design component tokens, validates them, and writes them straight into `palette.ts`, `tokens.ts`, and `components/*.ts`.

Both skills only write high-confidence values and report anything ambiguous or unsupported instead of guessing — see the fidelity report each one prints after a sync.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run storybook` | Start Storybook at `http://localhost:6006` |
| `npm run build-storybook` | Build a static Storybook site |
| `npx playwright test` | Run the Playwright E2E suite (requires the dev server running) |

## Project structure

```
src/
├── core/brand/        # Single source of truth for theming — see below
├── features/          # Feature modules (data fetching, forms, pages)
├── shared/components/ # Reusable presentational components
└── router/            # Centralized route tree (createBrowserRouter)
```

### Brand folder (`src/core/brand/`)

```
src/core/brand/
├── palette.ts          # Raw color primitives (hex values) — single source of truth for color
├── tokens.ts            # Semantic tokens derived from palette → CSS vars + Tailwind theme extension
├── components/          # One file per Ant Design component's token overrides
│   └── index.ts          # Barrel export of all component overrides
└── index.ts              # Unified `brandTheme` passed to <ConfigProvider theme={brandTheme}>
```

Nothing outside `palette.ts` should define a raw color literal — both Tailwind and Ant Design read from this same folder, so dropping in new values here reconfigures the whole app's look at once.
