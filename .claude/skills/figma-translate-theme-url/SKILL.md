---
name: figma-translate-theme-url
description: Syncs Ant Design component theme tokens (colors, border-radius, padding, spacing, elevation) directly from a live Figma file URL into src/core/brand/ — no local theme/ folder needed. Acts as a senior Antd + Figma translator that identifies each Figma component's closest Antd equivalent and maps only high-confidence properties. Use whenever the user pastes a Figma file/frame link and asks to sync, translate, update, or pull the theme/design tokens from it — for the whole file or for one named component (e.g. "sync the Button styles from this Figma link", "pull colors and spacing from <figma-url>", "translate this Figma file to antd tokens"). Always use this when the user pastes a Figma URL alongside a styling/theming/token request, even if they don't say "sync" explicitly.
---

# Figma → Ant Design Theme Translator

## Role and expertise

Act as a senior expert in Ant Design (antd) and in reading Figma files/specs. Your goal is to translate each Figma component into its closest antd equivalent, preserving: spacing, typography, colors (via tokens/theme), states (hover, disabled, error), and visual hierarchy.

## Core Rule

A **Figma URL is the only required input.** This skill never reads or writes the local `theme/` folder — that is `figma-sync-theme`'s job, and it is untouched by this skill. If the user asks for a theme sync without providing a Figma URL, ask for one. Do not fall back to `theme/`, and do not guess at a URL.

## Scope constraint

Only create or modify a component file if that component already exists as a layer/component/frame in the Figma file being referenced. Do not invent, scaffold, or add extra components, variants, or files that aren't present in the Figma source — even if they'd be a natural addition or a common pattern. If something seems missing or incomplete in Figma, flag it to the user instead of creating it.

This cuts both ways:
- A component already in `src/core/brand/components/` that does **not** appear in the given Figma source is left **completely untouched** — report it as `absent from Figma source`, don't even partially evaluate it.
- A component that **is** in the Figma source but has no `src/core/brand/components/<name>.ts` file yet is **not** scaffolded — flag it as `no brand file yet` with a pointer to `create-component-pattern` or to extending `figma-sync-theme`'s table manually.

## Process

1. Parse the URL (Phase 1) and determine scope: all recognized components, one named component, or a named subset (Phase 1).
2. Fetch from Figma via MCP (Phase 2).
3. For each candidate component, verify it's actually present in the fetched Figma source and that a brand file exists for it (Phase 3) — see Scope constraint above.
4. Identify the closest Antd equivalent using `references/antd-mapping.md` (Phase 3). If there's no exact equivalent, record a composition note instead of treating it as fully unrecognized — and never generate new component code for it.
5. Map properties only when high-confidence: exact node type+name match, and either a bound Figma Variable or an unambiguous structural property (Phase 4).
6. Validate every candidate token name against `references/antd-tokens.md` before writing (Phase 4).
7. Express everything through Antd's theming system — `ConfigProvider`/`OverrideToken` — never hardcoded styles. Write directly to `src/core/brand/palette.ts`, `tokens.ts`, and `components/*.ts` (Phase 5).
8. Run integrity checks (Phase 6).
9. Produce the fidelity report as the primary output (Phase 7) — explicitly flag, by name, anything Figma expresses that Antd's token system has no slot for, and anything skipped for being ambiguous.

---

## Phase 1 — Input, URL Parsing & Scope

### URL parsing

Accept both `https://www.figma.com/file/<key>/...` and `https://www.figma.com/design/<key>/...`. Extract:
- **File key**: the path segment immediately after `file/` or `design/`.
- **Node ID**: the `node-id` query parameter, if present (URL-decode `-` back to `:` per Figma's convention, e.g. `node-id=12-345` → node `12:345`). When present, scope the Figma MCP fetch to that node only instead of the whole file.

If the URL doesn't match either pattern, abort and tell the user it doesn't look like a Figma file/frame URL — don't attempt a fetch.

### Invocation forms (sync all / one / a subset)

Accept three forms, plus natural-language equivalents (this is an agent-invoked skill, not a literal CLI):
- `<figma-url>` — sync every component this skill recognizes in the file/frame.
- `<figma-url> --component <Name>` — sync just one (e.g. `--component Button`).
- `<figma-url> --components <Name1>,<Name2>,...` — sync an explicit named subset.

Before calling the Figma MCP, validate any named component(s) against the Component Table in `references/antd-mapping.md`. Reject an unrecognized name immediately with a clear error — never call the Figma MCP for a name that isn't in the table. When scoped to one or a few components, confine the entire fetch/mapping/write to those components only; don't fetch or evaluate the whole file unnecessarily.

---

## Phase 2 — Figma MCP Fetch

Call `mcp__figma__get_figma_data` with the parsed file key (and node-id, if scoped). Request:
- Color variables (and their resolved values, and whether a given fill/stroke is *bound* to one — this matters for Phase 4's confidence rule).
- For every component node found (or just the scoped one/subset): corner radius, padding (including auto-layout `paddingLeft/Right/Top/Bottom` and `itemSpacing`), effects (shadows, for elevation), and any hover/disabled/error variant nodes or variant properties (see `references/antd-mapping.md`'s state-variant section).

If the MCP call errors, times out, or returns no usable data (no variables, no component nodes), **abort without writing any file** and report the failure plainly — don't partially write based on an incomplete fetch.

---

## Phase 3 — Component Recognition (presence + identity)

For each component this run is considering (all recognized, or the named scope), resolve its status **before** attempting any property-level mapping:

1. **Absent from Figma source** — `src/core/brand/components/<name>.ts` already exists, but no node in the fetched data matches that component's exact name/type in `references/antd-mapping.md`. → Leave the file completely untouched. Report `absent from Figma source`. Do not evaluate it further.
2. **No brand file yet** — a fetched node matches a component in `references/antd-mapping.md`'s composition guidance or is clearly Antd-mappable, but no corresponding `components/<name>.ts` exists in this project. → Do not create one. Report `no brand file yet` with a suggestion (`create-component-pattern`, or extend `figma-sync-theme`'s table manually).
3. **No exact Antd equivalent** — the node doesn't match any of the 26 components, but resembles a known composition (see `references/antd-mapping.md`'s composition table). → Report `no exact Antd equivalent` with the composition note. Write nothing.
4. **Unrecognized node** — doesn't match any component and doesn't resemble a known composition either. → Report `unrecognized node`. Write nothing.
5. **Present and has a brand file** — proceed to Phase 4 for this component.

---

## Phase 4 — Property Mapping (high-confidence only)

For each component that reached this phase, read its actual rendered properties: fill/stroke color, `cornerRadius`, auto-layout padding/`itemSpacing`, and `effects`. Map a property to that component's `OverrideToken` slot **only** when:

- the node's type (`COMPONENT`/`COMPONENT_SET`) **and** name match `references/antd-mapping.md` exactly, **and**
- the source property is either **bound to a Figma Variable** (highest confidence — use the variable's resolved value) **or** is an **unambiguous structural property** of that exact node (its own `cornerRadius`, not a descendant's).

If either condition fails, **skip writing that specific property** and report it — never guess:

| Situation | Status |
|---|---|
| Token slot has no corresponding property on the node at all | `not found in Figma` |
| Property's source is ambiguous (multiple candidate fills, fuzzy name match, nested/inherited value) | `skipped: ambiguous` |
| Figma expresses something with no Antd token slot at all (gradient fill, custom easing curve) | `flagged: not replicable` |

**Hover/disabled/error states**: look for the variant patterns described in `references/antd-mapping.md` and map each to the matching Antd state token (e.g. `colorPrimaryHover`, `colorBgContainerDisabled`) under the same confidence rules as base properties. No variant present → `not found in Figma` for that specific state token.

**Candidate-token validation**: before writing anything, check the mapped key against `references/antd-tokens.md` — both that component's own table and the Global Tokens section. If the key isn't listed there for that component, do not write it; report the mismatch instead. This is what prevents writing a key that doesn't actually exist on that component's `OverrideToken`.

---

## Phase 5 — Direct Write to src/core/brand/*.ts

Write matched values directly:
- Color variables → `palette.ts` (and `tokens.ts`'s semantic/CSS-variable/Tailwind mappings, where the value corresponds to an existing semantic role).
- Per-component border-radius/padding/spacing/elevation/state tokens → the corresponding `components/<name>.ts`, using the same `OverrideToken` typing `figma-sync-theme` uses (`import type { OverrideToken } from 'antd/es/theme/interface'`).

No intermediate `theme/*.md` step — this is the direct path `CLAUDE.md` describes for the Figma MCP. If an earlier phase failed for a component, that component's file must not be partially written. A scoped run (`--component`/`--components`) must only touch the file(s) for the named component(s) — never any other.

---

## Phase 6 — Integrity Checks

Run, in order, after writing:
1. `npx tsc --noEmit` — on failure, roll back the affected file(s) and report which token name was invalid.
2. `npm run lint` scoped to `src/core/brand/`.
3. Barrel-export sync check — every `components/*.ts` file (except `index.ts`) has a corresponding export in `components/index.ts`.

---

## Phase 7 — Fidelity Report (primary output)

Always produce this report, even on a no-op run where the Figma source is already fully consistent with `src/core/brand/`. This is the answer to "how closely does the Figma design adhere to the component theme" — show it before the generic compilation/lint status, since adherence is the main thing being verified.

One row per component/token pair considered (not just the ones that changed):

| Component | Token | Figma Value | Written Value | Status |
|---|---|---|---|---|

Valid statuses: `matched`, `skipped: ambiguous`, `not found in Figma`, `unrecognized node`, `no exact Antd equivalent`, `flagged: not replicable`, `absent from Figma source`, `no brand file yet`.

## Output Format

```
### Figma Sync — Status
- Source: <figma-url> (file key: <key>, node-id: <node-id or "none">)
- Scope: all components | --component <Name> | --components <Name1>,<Name2>

### Fidelity Report
| Component | Token | Figma Value | Written Value | Status |
|---|---|---|---|---|
...

### Compilation & Code Validation
- TypeScript: 0 errors
- ESLint src/core/brand/: Passed
- Barrel sync: All exports accounted for
```

---

## Reference files

- `references/antd-mapping.md` — the 26-component Figma → Antd identification table, state-variant recognition patterns, and "no exact equivalent" composition guidance. Read before Phase 3.
- `references/antd-tokens.md` — every valid `OverrideToken` key per component, plus the Global Tokens valid on any component, generated from antd's own type declarations. Read before writing anything in Phase 4/5. Regenerate when `antd` is upgraded in `package.json`.
