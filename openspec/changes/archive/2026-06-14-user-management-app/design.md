## Context

Greenfield React 19 + TypeScript + Vite application. No existing feature code — only the scaffold, CLAUDE.md, and the architectural constitution at `openspec/specs/architecture-rules/spec.md` exist. The application will consume the static JSONPlaceholder Users API (10 records, read-only). All mutations are optimistic cache updates; JSONPlaceholder returns 200 but does not persist.

## Goals / Non-Goals

**Goals:**
- Deliver all four user management flows (list, detail, edit, role assign) as self-contained feature modules under `src/features/users/`
- Establish `src/core/brand/` as the single theming source for both Tailwind and Ant Design
- Wire a permission system that gates UI and routes via a single `can()` primitive
- Every component ships with a `.stories.tsx` file for Storybook review

**Non-Goals:**
- Real authentication or JWT — session is a mock Zustand store with an active role selector
- Server-side pagination — JSONPlaceholder does not support it; pagination is client-side slice
- Persisted writes — all mutations return to the React Query cache only
- i18n, dark mode toggle, or accessibility beyond Ant Design defaults

## Decisions

### 1. Tailwind + Ant Design coexistence via CSS variable bridge
**Decision**: `palette.ts` defines raw hex values. `tokens.ts` maps them to CSS custom properties on `:root` AND to `tailwind.config.ts` `theme.extend`. Ant Design's `ConfigProvider` receives the same values via `src/core/brand/index.ts`.  
**Why**: Avoids two separate token systems drifting apart. One change to `palette.ts` propagates everywhere.  
**Alternative considered**: Tailwind-only with Ant Design `theme` object hardcoded — rejected because brand swaps would require changes in two places.

### 2. `createBrowserRouter` with loader guards
**Decision**: Full data-router API. Route protection via `loader` functions in `src/router/guards/requirePermission.ts` that read the Zustand session store and redirect if `can(permission)` is false.  
**Why**: Loaders run before render, preventing flash of unauthorized content. Typed `useLoaderData<T>()` keeps route data type-safe.  
**Alternative considered**: Wrapper `<PrivateRoute>` components — rejected because they render then redirect, causing flicker.

### 3. React Query as the only server-state layer
**Decision**: All fetch logic in `src/core/api/users.ts`. Query keys in `src/core/api/keys.ts`. Components never import fetch functions directly.  
**Why**: Centralizes cache invalidation, deduplication, and error boundaries. Aligns with `openspec/specs/architecture-rules/spec.md` guardrail: "NEVER do raw inline fetches inside a UI component."

### 4. Zod schema as the single validation source for forms
**Decision**: `src/features/users/schemas/userEdit.schema.ts` defines the Zod schema. `zodResolver` wires it to React Hook Form. TypeScript types are inferred from the schema via `z.infer<>`.  
**Why**: One definition produces both runtime validation and compile-time types. No duplicated interface + yup/joi schema pattern.

### 5. Zustand for session store (not React Context)
**Decision**: `src/core/session/index.ts` is a Zustand store exposing `activeRole`, `setActiveRole`, and `can()`.  
**Why**: `can()` must be callable outside React components (in route loaders). React Context cannot be read outside the component tree.  
**Alternative considered**: `sessionStorage` + Context — rejected because loaders can't read Context.

## Risks / Trade-offs

- **JSONPlaceholder is static (10 records)** → Client-side pagination works fine at this scale but would not survive a real dataset without server pagination. Mitigated by isolating pagination logic in `useUserList` hook so it's swappable.
- **Optimistic mutations diverge from server** → On page refresh, React Query re-fetches and overwrites optimistic state. Acceptable for a demo; note it in Storybook stories.
- **Zustand store resets on hard refresh** → Active role reverts to default (`'viewer'`). A real app would read from a JWT claim. The role-switcher in the header makes this visible and controllable.
- **No real E2E backend** → Playwright tests must stub network via `page.route()` to simulate mutation responses consistently.
