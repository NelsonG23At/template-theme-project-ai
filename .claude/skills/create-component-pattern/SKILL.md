---
name: create-component-pattern
description: Generate a reusable, purely presentational UI component using the 3-agent orchestration pipeline (no form state). Use when the user calls create-component-pattern(...) or requests a table, card, modal, layout, or any UI component without form state.
license: MIT
compatibility: Requires Ant Design v5, Tailwind CSS, React Query, Storybook.
metadata:
  author: atmosera
  version: "1.0"
---

Generate a production-ready presentational component through a structured 3-agent pipeline.

**Trigger format:**
```
create-component-pattern(
  name="ComponentName",
  antd=["Component1", "Component2"],
  requirement="Natural language description"
)
```

Use this skill for: tables, cards, modals, data displays, layouts, compound components, navigation — anything **without** form state. For form components use `create-form-pattern`.

---

## Agent 1 — Design Pattern Strategist

Analyze the `requirement` and autonomously select the best pattern(s):

- **Container/Presenter** — data fetching, React Query, or URL/router state separated from UI
- **Compound Components** — cohesive UI elements sharing implicit state via React Context
- **Composition / Slot Pattern** — presentational wrappers with `toolbar` (ReactNode) or `renderToolbar` (function) injection points
- **Render Props / Custom Hooks** — shared stateful behavior across multiple visual representations
- **Partial Components** — locally scoped atomic sub-components inside the feature folder

**Output:** "Architectural Diagnosis" — selected pattern(s) + justification tied to the specific requirement.

---

## Agent 2 — Ant Design Specialist (No RHF)

Map the `antd` array to aliased imports and plan token usage.

**Mandatory alias rule — no exceptions:**
```ts
import { Table as AntdTable, Select as AntdSelect, Button as AntdButton } from 'antd'
```
Every Antd component must be prefixed `Antd[ComponentName]` throughout all generated code.

**Token strategy:**
- Use `theme.useToken()` inside components for semantic tokens (`colorBgContainer`, `colorBorderSecondary`, `borderRadius`, etc.)
- Never hardcode hex values or spacing literals — always resolve from `token.*`
- Combine Tailwind utilities for structural layout/spacing with `token.*` for semantic color/radius

**Slot naming convention:**
- `toolbar` — for `ReactNode` injection points
- `renderToolbar` — for render function injection points
- Never use generic names like "slot" or "children-area"

**No RHF, no Zod, no form state of any kind.**

**Output:** Alias mapping table + `theme.useToken()` token plan + slot/composition strategy.

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

**TypeScript:**
- `strict: true` — no `any` anywhere
- Generic `<T extends object>` params where applicable
- Discriminated unions for loading/error/success state modeling
- Shared API types from `src/core/types/` — never co-located in component files

**Styling:**
- Tailwind CSS for layout and spacing (`flex`, `gap-*`, `px-*`, `py-*`, `overflow-*`)
- `theme.useToken()` for all color, border, and radius values
- Never fight Antd's internal token cascade — override at `ConfigProvider` level only

**State isolation:**
- Container hook owns: React Query calls, router params, derived display logic
- View component receives typed props only — no direct query or router calls

**Accessibility:**
- `data-testid` on all interactive elements, key containers, and pagination areas

---

## Storybook (Mandatory)

Generate `ComponentName.stories.tsx` in CSF3 format alongside the component.

**Requirements:**
- Wrap all stories in brand `ConfigProvider` from `src/core/brand`
- Use `args` + `argTypes` at the meta level so controls work
- For generic components, create a concrete typed wrapper function (e.g., `function UserTable(props: TableProps<User>) { return <Table<User> {...props} /> }`)
- Required stories: `Default`, `Loading`, `Empty`, `WithToolbar` (if toolbar prop exists), `WithPagination` (if pagination prop exists), plus at least one size/density variant

**DO NOT** use Playwright MCP to validate Storybook stories. Confirm 0 terminal errors and that the story title registers in the sidebar.

---

## Output Format

```
### 🏛️ [ComponentName] Architectural Diagnosis
- **Selected Pattern(s):** ...
- **Justification:** ...
- **Antd & State Strategy:** ...

### 📂 Target Directory Tree
[tree]

### 💻 Generated Code
[files in order: types → partials → component → index → stories]
```

After generating all files, run `npx tsc --noEmit` and confirm 0 errors on the new files before reporting completion.
