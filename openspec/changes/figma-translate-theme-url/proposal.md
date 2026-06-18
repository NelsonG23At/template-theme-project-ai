## Why

Today, getting design tokens into the brand architecture requires someone to manually transcribe Figma values into the local `theme/` markdown folder before `figma-sync-theme` can run. That hand-transcription step is slow, error-prone, and falls out of date the moment a designer tweaks a value in Figma. The Figma MCP server is already connected to this project (per `CLAUDE.md`, which says to write extracted tokens "directly to `tokens.ts`" — "do not intermediate through a manual step") but nothing yet uses it this way. A skill that takes just a Figma URL and pulls color variables, spacing, elevation, border-radius, and padding straight from every component removes the manual step entirely.

## What Changes

- Add a new skill, `figma-translate-theme-url`, that accepts a single Figma file/frame URL as its only required input.
- The skill extracts the file key (and node-id, if a frame is targeted) from the URL, then calls the Figma MCP (`get_figma_data`) to fetch: color variables, and — for every component found — its border-radius, padding, spacing/gap, and elevation (shadow/effect) values.
- It classifies fetched data into the same three buckets `figma-sync-theme` already targets — primitives, semantic tokens, component overrides — and writes **directly** to `src/core/brand/palette.ts`, `tokens.ts`, and `components/*.ts`. No intermediate `theme/*.md` step.
- It bundles a reference of Antd's actual `ComponentToken`/`AliasToken` definitions (sourced from `antd`'s own type declarations) for every component in scope, so property → token mapping is checked against real Antd types instead of being inferred from memory.
- It operates with an explicit Antd + Figma translation process: identify each Figma element's closest Antd equivalent (via a bundled `references/antd-mapping.md`), compose from Antd primitives when there's no exact match rather than inventing a new component, prefer Antd's theming system (`ConfigProvider`/tokens) over hardcoded styles, map Figma state variants (hover/disabled/error) to the corresponding Antd state tokens, and explicitly flag anything that can't be replicated 1:1 instead of silently dropping it.
- It supports three invocation forms: sync **all** recognized components from a URL, sync **one named component**, or sync an explicit **subset** of named components — so a user can re-sync just "Button" after a small Figma tweak instead of re-running the whole file every time.
- It runs the same Phase 4 integrity checks already used by `figma-sync-theme` (`tsc --noEmit`, scoped `eslint`, barrel-export sync check) before reporting success.
- `figma-sync-theme` is unchanged and remains the local `theme/` folder sync path; the two skills are independent entry points into the same target architecture.

## Capabilities

### New Capabilities
- `figma-translate-theme-url`: Given only a Figma URL, fetch color variables and per-component border-radius/padding/spacing/elevation via the Figma MCP and write them directly into the `src/core/brand/` architecture.

### Modified Capabilities
(none — `brand-theme`'s requirements on the target architecture are unchanged; this change only adds a new way to populate it)

## Impact

- **New file**: `.claude/skills/figma-translate-theme-url/SKILL.md`, plus bundled `references/`:
  - a component reference table mapping component name → relevant `OverrideToken` keys, e.g. Button → `borderRadius`/`paddingContentHorizontal`/`colorPrimary`
  - an Antd token reference, generated from `node_modules/antd/es/theme/interface/alias.d.ts` (global `AliasToken`) and each component's `<component>/style/token.d.ts` (`ComponentToken`), listing every valid override key per component with its type
- **New invocation syntax** for the skill: `<figma-url>` (all components), `<figma-url> --component <Name>`, `<figma-url> --components <Name1>,<Name2>` (subset) — see design.md for the exact grammar.
- **Touched at runtime**: `src/core/brand/palette.ts`, `tokens.ts`, `components/*.ts`, `components/index.ts`, `index.ts` — the same files `figma-sync-theme` writes, only invoked through a different trigger and without the `theme/*.md` intermediate.
- **Dependency**: requires the Figma MCP server (`mcp__figma__get_figma_data`) to be connected and authenticated; the skill should fail clearly if it isn't.
- **No breaking changes**: `figma-sync-theme` and the local `theme/` folder workflow are untouched.
