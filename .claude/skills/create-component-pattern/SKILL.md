---
name: create-component-pattern
description: Generate a reusable, purely presentational UI component using the 3-agent orchestration pipeline (no form state). Use when the user calls create-component-pattern(...) or requests a table, card, modal, layout, or any UI component without form state.
license: MIT
compatibility: Requires Ant Design v5, Tailwind CSS, clsx, Storybook. clsx must be installed (npm install clsx).
metadata:
  author: atmosera
  version: "2.0"
---

Generate a production-ready presentational component through a structured 3-agent pipeline.

**Trigger format:**
```
create-component-pattern(
  name="ComponentName",
  antd=["Component1", "Component2"],
  requirement="Natural language description",
  design="<optional: Figma URL | screenshot path | visual description>"
)
```

- `design` is optional. When provided it is the authoritative source for spacing, visual weight, border radius, color usage, and layout decisions. When absent, fall back to brand tokens and Tailwind defaults.
- Use this skill for: tables, cards, modals, data displays, layouts, compound components, navigation — anything **without** form state. For form components use `create-form-pattern`.

---

## Phase 0 — Design Analysis (run only when `design` is provided)

Before any agent runs, extract visual specifications from the design source.

### If `design` is a Figma URL
Extract the `file_key` and optional `node-id` from the URL and call:
```
mcp__figma__get_figma_data(file_key: "...", nodeId: "...")
```
From the response extract:
- **Spacing values** — padding, gap, margin (in px) → map to nearest Tailwind scale (`4px=p-1`, `8px=p-2`, `12px=p-3`, `16px=p-4`, `24px=p-6`, `32px=p-8`, `40px=p-10`, `48px=p-12`)
- **Border radii** — map to `rounded-*` or use `token.borderRadius` if it matches the brand value
- **Font sizes / weights** — map to Tailwind typography (`text-sm`, `text-base`, `font-medium`, `font-semibold`)
- **Color roles** — map to brand palette keys where possible; flag any color not in `palette.ts`
- **Layout direction** — row / column / grid → `flex`, `flex-col`, `grid grid-cols-*`
- **Shadows** — map to `shadow-sm`, `shadow-md`, `shadow-lg`, or inline `style` if custom

### If `design` is a screenshot path
Use the Read tool to load the image, then derive the same properties visually.

### If `design` is a text description
Parse the description for spacing, layout, color, and typography cues and translate to Tailwind classes.

**Output of Phase 0 — Design Spec (pass to all agents):**
```
Layout:     flex / flex-col / grid
Gap:        gap-4 (16px)
Padding:    px-6 py-4 (24px / 16px)
Radius:     rounded-lg (token.borderRadius if matches)
Text sizes: text-sm (labels), text-base (body)
Weights:    font-medium (labels), font-semibold (headings)
Shadows:    shadow-sm
Color notes: [any non-palette color flags]
```

---

## Agent 1 — Design Pattern Strategist

Analyze the `requirement` (and Design Spec if available) and autonomously select the best pattern(s):

- **Container/Presenter** — data fetching, React Query, or URL/router state separated from UI
- **Compound Components** — cohesive UI elements sharing implicit state via React Context
- **Composition / Slot Pattern** — presentational wrappers with `toolbar` (ReactNode) or `renderToolbar` (function) injection points
- **Render Props / Custom Hooks** — shared stateful behavior across multiple visual representations
- **Partial Components** — locally scoped atomic sub-components inside the feature folder

**Output:** "Architectural Diagnosis" — selected pattern(s) + justification tied to the specific requirement + any design-driven structural decisions.

---

## Agent 2 — Ant Design Specialist (No RHF)

Map the `antd` array to aliased imports, plan token usage, and define the 3-layer styling model.

### Aliased imports — mandatory, no exceptions
```ts
import { Table as AntdTable, Select as AntdSelect, Button as AntdButton } from 'antd'
```
Every Antd component must be prefixed `Antd[ComponentName]` throughout all generated code.

### 3-Layer Styling Model

Apply in this order — each layer has a defined scope:

**Layer 1 — Tailwind utilities (structural layout and spacing)**
Static classes: flex direction, grid, gap, padding, margin, width, height, overflow, display.
These never change at runtime. Write them directly as className strings.

```tsx
<div className="flex flex-col gap-4 px-6 py-4 overflow-hidden">
```

If a `design` spec was provided, use the exact Tailwind classes derived from Phase 0 here.

**Layer 2 — `clsx()` (conditional / variant-driven classes)**
Use `clsx` when className depends on props, state, or boolean conditions.
Always import as: `import clsx from 'clsx'`

```tsx
import clsx from 'clsx'

// Prop-driven size variant
<div className={clsx(
  'flex items-center gap-2 rounded',
  size === 'sm' && 'px-3 py-1.5 text-sm',
  size === 'md' && 'px-4 py-2 text-base',
  size === 'lg' && 'px-6 py-3 text-lg',
  disabled && 'opacity-50 cursor-not-allowed',
  className,     // always last — caller override
)}>
```

Use `clsx` for:
- Size / density variants (`size?: 'sm' | 'md' | 'lg'`)
- Visual state variants (`variant?: 'default' | 'outlined' | 'filled'`)
- Boolean flags (`disabled`, `selected`, `highlighted`, `bordered`)
- Caller `className` pass-through (always last in the clsx call)

Do NOT use `clsx` for static classes that never change — plain string is cleaner.

**Layer 3 — `style={{ ... }}` with `token.*` (semantic brand values)**
Use inline style only for values that must come from the Ant Design token cascade.

```tsx
const { token } = theme.useToken()

<div style={{
  background: token.colorBgContainer,
  borderColor: token.colorBorderSecondary,
  borderRadius: token.borderRadius,
  color: token.colorText,
}}>
```

Rules:
- Never hardcode hex values or px spacing in `style` — that is Tailwind's job
- Only use `style` for semantic brand tokens (color, radius, shadow) from `theme.useToken()`
- Do not fight Antd's internal token cascade — override at `ConfigProvider` level only

### Design-to-Token mapping

When Phase 0 identified colors:
- Colors matching `palette.ts` → use the corresponding `token.*` key
- Custom accent colors not in palette → flag in the output, use `token.colorPrimary` as fallback, and note that the user should add the color to `palette.ts`

### Slot naming convention
- `toolbar` — for `ReactNode` injection points
- `renderToolbar` — for render function injection points
- Never use generic names like "slot" or "children-area"

**No RHF, no Zod, no form state of any kind.**

**Output:** Alias mapping table + 3-layer styling plan (with actual class names from Phase 0) + slot/composition strategy.

---

## Agent 3 — Screaming Architecture Engineer

Define the file tree under `src/shared/components/` (generic reusable) or `src/features/<feature>/components/` (feature-scoped). Folder and file names must scream the business intent.

**Standard structure:**
```
ComponentName/
├── index.ts                     # Barrel export
├── ComponentName.tsx            # Presentational view
├── ComponentName.types.ts       # Props interfaces, discriminated unions
├── ComponentName.stories.tsx    # CSF3 stories
├── hooks/
│   └── use<ComponentName>.ts    # Container logic — only if needed
└── partials/                    # Local-only atomic sub-components — only if needed
    └── <PartialName>.tsx
```

**Output:** Full target directory tree.

---

## Code Generation Standards

Generate files **in this order**: `types → partials → component → index → stories`

### TypeScript
- `strict: true` — no `any` anywhere
- Generic `<T extends object>` params where applicable
- Discriminated unions for loading/error/success state modeling
- Shared API types from `src/core/types/` — never co-located in component files
- Accept a `className?: string` prop on every component root — pass through as the last arg in `clsx()`

### Styling checklist (verify before submitting generated code)
- [ ] `import clsx from 'clsx'` present when any conditional class exists
- [ ] Static layout classes written as plain strings, not inside `clsx()`
- [ ] Variant / boolean classes go through `clsx()`
- [ ] `className` prop forwarded via `clsx(..., className)` — always last
- [ ] All brand colors / radii come from `theme.useToken()` in `style={{}}`
- [ ] Zero hardcoded hex values or px spacing in `style` props
- [ ] If `design` provided: Phase 0 classes are applied verbatim

### State isolation
- Container hook owns: React Query calls, router params, derived display logic
- View component receives typed props only — no direct query or router calls

### Accessibility
- `data-testid` on all interactive elements, key containers, and pagination areas

---

## Storybook (Mandatory)

Generate `ComponentName.stories.tsx` in CSF3 format alongside the component.

**Requirements:**
- Import from `@storybook/react-vite` — never `@storybook/react`
- Wrap all stories in brand `ConfigProvider` from `src/core/brand`
- Use `args` + `argTypes` at the meta level so controls work
- For generic components, create a concrete typed wrapper function
- Required stories: `Default`, `Loading`, `Empty`, `WithToolbar` (if toolbar prop exists), `WithPagination` (if pagination prop exists), plus at least one size/density variant per `size` prop value
- If `design` was provided, include a `MatchesDesign` story that reproduces the design-spec layout as closely as possible

**DO NOT** use Playwright MCP to validate Storybook stories. Confirm 0 terminal errors and that the story title registers in the sidebar.

---

## Output Format

```
### 🎨 Design Spec (Phase 0)
[only if design param was provided]
- Layout: ...
- Spacing: ...
- Typography: ...
- Color notes: ...

### 🏛️ [ComponentName] Architectural Diagnosis
- Selected Pattern(s): ...
- Justification: ...
- Styling plan:
  - Layer 1 (Tailwind): ...
  - Layer 2 (clsx variants): ...
  - Layer 3 (token.*): ...

### 📂 Target Directory Tree
[tree]

### 💻 Generated Code
[files in order: types → partials → component → index → stories]
```

After generating all files:
1. Run `npx tsc --noEmit` — confirm 0 errors
2. Confirm `import clsx from 'clsx'` is present wherever conditional classes are used
3. Report any design colors not found in `palette.ts`
