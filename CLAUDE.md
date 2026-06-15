# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

React 19 · TypeScript (strict) · Vite · Ant Design v5/v6 · Tailwind CSS · React Query (`@tanstack/react-query`) · React Hook Form · React Router · Storybook · Vitest + React Testing Library · Playwright

Data layer is driven by the JSONPlaceholder Users API (`https://jsonplaceholder.typicode.com/users`).

Two MCP servers are active:
- **Figma MCP** — fetch design tokens, variables, and Auto Layout via `get_file` / `get_nodes`. Write extracted tokens directly to `src/core/brand/tokens.ts`.
- **Playwright MCP** — execute E2E suites, run browser automation, capture screenshots, and verify user flows against the local dev server.

## Commands

```bash
npm run dev          # Vite dev server with HMR
npm run build        # tsc -b && vite build
npm run lint         # ESLint (flat config)
npm run preview      # serve production build locally
npm run test         # Vitest (unit/integration)
npm run storybook    # Storybook dev server
npm run build-storybook
npx playwright test  # E2E suite
```

## Brand Carpet Principle

The entire application — Tailwind config and Ant Design `ConfigProvider` — must read from a single centralized brand folder. Dropping a new `brand/` folder reconfigures everything instantly. No theme values live outside this structure.

```
src/core/brand/
├── palette.ts         # All raw color/variable definitions (hex values, scales, primitives)
├── tokens.ts          # Semantic tokens derived from palette → CSS variables + Tailwind theme extension
├── components/
│   ├── buttons.ts     # Ant Design Button component token overrides
│   ├── cards.ts       # Ant Design Card component token overrides
│   └── index.ts       # Barrel: groups all component overrides
└── index.ts           # Unified export → single Ant Design ConfigProvider `theme` object
```

**`palette.ts`** is the single source of all raw values: hex codes, color scales, and any primitive design variables extracted from Figma. Nothing outside this file should define a raw color literal.

**`tokens.ts`** imports from `palette.ts` and maps raw values to semantic roles (e.g., `colorPrimary`, `colorBgContainer`, `colorText`). It emits both a CSS custom-property block (injected at `:root`) and a `tailwind.config.ts` `theme.extend` object so Tailwind and Ant Design share one source of truth.

**`index.ts`** (brand root) combines `tokens.ts` + `components/index.ts` into the object passed to `<ConfigProvider theme={brandTheme}>`.

When Figma MCP returns variables, parse them and write `tokens.ts` directly — do not intermediate through a manual step.

## Component Architecture

- Separate presentation from state: container hooks own data fetching and form state; presentational components receive typed props only.
- Prefer Compound Components and Control Props patterns for complex, shared UI (e.g., filterable tables, multi-step forms).
- Use `theme.useToken()` from Ant Design to access resolved brand tokens inside components that need programmatic access to color/spacing values — never hardcode hex values or spacing literals.
- Combine Ant Design component slots with Tailwind utility classes for layout and spacing. Do not fight Ant Design's internal token cascade; override at the `ConfigProvider` level via `src/core/brand/`.

## Data & State

- All server state via React Query. Define query keys as typed constants. Mutations use `useMutation` with `onSuccess` cache invalidation.
- All form state via React Hook Form. Wire Ant Design inputs through `<Controller>` — do not use uncontrolled `ref` patterns with Ant inputs.

### Routing

Use `createBrowserRouter` (data router API) — not the legacy `<BrowserRouter>` + `<Routes>` JSX approach. Define the full route tree in a single `src/router/index.tsx` file and pass it to `<RouterProvider>` in `main.tsx`.

Route structure convention:
```
src/router/
├── index.tsx        # createBrowserRouter — full route tree
└── guards/          # loader-based auth/permission guards
```

- Nest child routes under a shared layout route that renders `<Outlet />`.
- Use `loader` functions for data pre-fetching; pair with `useLoaderData<T>()` for type-safe access.
- Typed params: declare a `RouteParams` interface per route and pass it to `useParams<RouteParams>()`.
- Navigate programmatically via `useNavigate`; use `<Link>` for declarative anchors — never raw `<a>` tags inside the app shell.
- Lazy-load heavy route modules with `lazy: () => import('./pages/...')` to keep the initial bundle small.

## Storybook

Every generated component gets a `.stories.tsx` file alongside it. All stories must be wrapped in the unified brand `ConfigProvider`. Use `args` + `argTypes` to expose token-driven prop variants (e.g., color, size). Stories are the primary design-review surface.

## Testing

- **Unit/integration**: Vitest + React Testing Library. Test behavior, not implementation. Mock React Query with `QueryClientProvider` wrapping a fresh `QueryClient` per test.
- **E2E**: Playwright. Use the Playwright MCP server to execute suites and verify flows against the running dev server. Selectors must use `data-testid` attributes or accessible roles — no CSS class selectors.

## TypeScript Standards

- `strict: true` is non-negotiable.
- `any` is forbidden at every layer — use `unknown` and narrow explicitly, or derive types from Zod schemas / API response shapes. Casting with `as any` to silence the compiler is treated as a bug.
- Prefer discriminated unions over optional chains for state modeling (loading / error / success).
- Extract shared API types to `src/core/types/`. Do not co-locate API response types inside component files.
- Prefer `type` over `interface` for object shapes; reserve `interface` for declaration merging.

## ESLint

Flat config (`eslint.config.js`). Required plugins:

| Plugin | Purpose |
|---|---|
| `typescript-eslint` (`tseslint.configs.recommendedTypeChecked`) | Type-aware TS rules; requires `parserOptions.project` pointing to `tsconfig.app.json` |
| `eslint-plugin-react-hooks` | Enforces hooks rules |
| `eslint-plugin-react-refresh` | Guards HMR exports |

Rules that must be enabled (add to the flat config object):

```ts
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/no-unsafe-assignment': 'error',
'@typescript-eslint/no-unsafe-member-access': 'error',
'@typescript-eslint/no-unsafe-return': 'error',
'@typescript-eslint/no-unsafe-argument': 'error',
'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
```

Run `npm run lint` before every commit. CI must fail on any ESLint error — warnings are not acceptable for the `no-explicit-any` family.
