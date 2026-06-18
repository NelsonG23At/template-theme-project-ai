## Context

`figma-sync-theme` already defines a working classification pipeline: read markdown tables from `theme/`, sort values into primitives / semantic tokens / component overrides, write them to `src/core/brand/`, then run integrity checks. That pipeline assumes a human has already transcribed Figma's design data into `theme/*.md`.

`CLAUDE.md` describes a more direct path for the Figma MCP that this project has never implemented: "fetch design tokens, variables, and Auto Layout via `get_file`/`get_nodes`. Write extracted tokens directly to `src/core/brand/tokens.ts`... do not intermediate through a manual step." This change builds exactly that — a skill whose only input is a Figma URL, which fetches color variables plus each component's own border-radius, padding, spacing, and elevation, and writes them straight into `src/core/brand/`.

## Goals / Non-Goals

**Goals:**
- **Above all, maximize fidelity between the Figma source and the written component theme.** Every other goal below is in service of this one — a sync that writes fewer tokens but writes them exactly right is a success; a sync that writes more tokens with guessed mappings is not.
- Accept a single Figma file/frame URL as the only required input — no `theme/` folder involved.
- Extract the file key (and `node-id`, if the URL targets a specific frame) from the URL.
- Fetch via the Figma MCP: color variables, and per component — border-radius, padding, spacing/gap, and elevation (shadow/effect).
- Map each fetched value to the matching `OverrideToken` key for that component (e.g. a component's corner radius → `borderRadius`, its fill → `colorPrimary`/`colorBgContainer` depending on role, its effect → the component's shadow token, its auto-layout padding → `paddingContentHorizontal`/`paddingLG`/etc.) — but **only when the match is high-confidence** (see Decision 2).
- Write directly to `src/core/brand/palette.ts`, `tokens.ts`, and `components/*.ts` — the same target files `figma-sync-theme` writes, reached by a different, more direct path.
- Produce a per-component Figma-vs-theme fidelity report on every run, so adherence is verifiable rather than asserted.
- Run the same Phase 4 integrity checks (`tsc --noEmit`, scoped `eslint`, barrel-sync check) before reporting success.
- Check every property → token mapping against Antd's actual type definitions (not assumed from memory) to avoid writing a key that doesn't exist on that component's `OverrideToken`.
- Let a user re-sync a single component (or a small named subset) instead of always re-fetching and re-mapping the whole file — most real edits are "the designer tweaked the Button" not "the designer redid everything."
- Never touch, scaffold, or infer a component's file unless that exact component is actually present in the Figma source being synced — absence in Figma means absence of any write, full stop.

**Non-Goals:**
- Fetching raster assets/icons (`download_figma_images`) — out of scope.
- Writing or reading `theme/*.md` — this skill bypasses that intermediate entirely, per `CLAUDE.md`'s direct-write guidance.
- Changing the brand architecture itself (adding new files/keys to `palette.ts`/`tokens.ts`/`components/`) — this skill populates existing keys, it doesn't redesign the schema.
- Syncing multiple Figma files in one invocation.
- **Generating new component code.** When a Figma element has no exact Antd equivalent, the skill records a composition note (e.g. "compose from Card + Statistic") in the fidelity report — it does not scaffold new files. Building an actual composed component is `create-component-pattern`'s job, not this skill's.

## Decisions

**1. Write directly to `src/core/brand/*.ts` — no `theme/*.md` intermediate.**
This matches `CLAUDE.md`'s explicit instruction for the Figma MCP path. `figma-sync-theme` and this skill become two independent entry points into the same target files: one driven by a curated local folder, one driven by a live Figma URL. Neither reads from or writes to the other.
*Alternative considered*: route through `theme/*.md` first (to keep it as a single source of truth across both skills). Rejected per explicit `CLAUDE.md` guidance and because the user wants this to "just work" from a URL alone — the indirection adds a step without a clear need here.

**2. Map values by introspecting each component node's own style properties — but only write high-confidence matches; ambiguous ones are skipped and reported, never guessed.**
For each component Figma returns, read its actual rendered properties — fill/stroke color, `cornerRadius`, auto-layout `paddingLeft/Right/Top/Bottom` and `itemSpacing`, and `effects` (drop/inner shadows for elevation). A property is mapped to a component's `OverrideToken` slot only when:
  - the node's type **and** name match a known component exactly (per the skill's component reference table — e.g. a `COMPONENT`/`COMPONENT_SET` node literally named "Button"), **and**
  - the source property is either bound to a Figma Variable (highest confidence — the variable's resolved value is used) or is an unambiguous structural property of that exact node (e.g. its own `cornerRadius`, not a descendant's).
If either condition fails — fuzzy name match, ambiguous node nesting, multiple candidate values — the skill SHALL skip writing that property and list it in the fidelity report instead of guessing. This is the central trade-off of the skill: it would rather under-write than mis-write.
*Alternative considered*: require Figma variables/styles to be pre-named with exact Antd token names before mapping anything. Rejected as too rigid for "just point it at a URL." *Alternative considered*: best-effort mapping with a confidence label on every value, writing even low-confidence guesses. Rejected — once a wrong value is written, it silently becomes the new "current" state and nothing distinguishes it from a verified one; skipping is reversible (re-run later when the Figma file is cleaner), a wrong write is not.

**3. Support both Figma URL formats and optional frame scoping.**
Parse both `figma.com/file/<key>/...` and `figma.com/design/<key>/...`, and read the `node-id` query parameter when present so a user can scope a sync to one frame instead of the whole file.

**4. Reuse Phase 4 integrity checks verbatim.**
Same `tsc --noEmit`, scoped `eslint src/core/brand/`, and barrel-sync check as `figma-sync-theme`, run as the final step. No new validation invented.

**5. Always produce a per-component Figma-vs-theme fidelity report, independent of whether anything changed.**
Every run ends with a table: component → token → Figma value → written value → status (`matched` / `skipped: ambiguous` / `not found in Figma` / `unrecognized node` / `no exact Antd equivalent` / `flagged: not replicable` / `absent from Figma source` / `no brand file yet`). This is the mechanism that makes "how closely the Figma design adheres to the component theme" answerable at a glance instead of just asserted by the skill. It runs even on a no-op sync (nothing changed) so the user can confirm the theme is still faithful to the current Figma state.

**6. The skill operates as a senior Antd + Figma translator, not a literal property copier.**
For each Figma element, the process is: (a) identify it and find its closest Antd equivalent using `references/antd-mapping.md`; (b) if there's no exact equivalent, note how it *would* be composed from Antd primitives (e.g. a Figma "Stat Card" → Card + Statistic) rather than treating it as unrecognized — but do not generate new component code for this, only record the composition note in the fidelity report (see Non-Goals); (c) always express the mapped values through Antd's theming system (`ConfigProvider`/`OverrideToken`), never as hardcoded inline styles; (d) explicitly flag, by name, anything Figma expresses that Antd's token system has no slot for (e.g. a gradient fill, a custom easing curve) instead of silently dropping it.
This sits on top of Decision 2, not in tension with it: Decision 2 governs whether a *value* is confident enough to write; this decision governs how the skill *identifies* what a Figma node corresponds to in Antd's vocabulary before that confidence check even runs.

**7. Map Figma state variants (hover/disabled/error) to their corresponding Antd state tokens.**
When a component has separate Figma nodes/variants for hover, disabled, or error states (a common pattern: variant properties or sibling frames named e.g. "Button/Hover", "Input/Error"), the skill maps each to the matching Antd state token — `colorPrimaryHover`/`defaultHoverBg` for hover, the relevant `*Disabled` token for disabled, `colorError`-driven border/background for error — using the same high-confidence-only rule from Decision 2. A state with no corresponding Figma variant is reported as "not found in Figma" for that specific token, exactly like a missing base property.

**8. Support three invocation forms: all components, one named component, or a named subset.**
Accepted forms:
- `<figma-url>` — sync every component the skill recognizes in the file/frame.
- `<figma-url> --component <Name>` — sync just one (e.g. `--component Button`).
- `<figma-url> --components <Name1>,<Name2>,...` — sync an explicit named subset.
Natural-language equivalents are accepted too, since this is an agent-invoked skill, not a literal CLI (e.g. "sync only the Button styles from this Figma file: `<url>`"). A name that doesn't appear in `references/antd-mapping.md` is rejected up front with a clear error, before any Figma MCP call is made — never silently ignored.
*Why this matters*: most real-world edits are "the designer tweaked one component," not "redo the whole file." Letting a user target one component keeps re-syncs fast and keeps the fidelity report focused on what actually changed.

**9. Scope constraint: only touch a component's file if that exact component is present in the referenced Figma source — never scaffold, never assume.**
Before writing or even fully evaluating any `components/<name>.ts` file, the skill verifies that component actually exists as a layer/component/frame in the Figma file/frame being synced. Three distinct non-write outcomes follow from this, each reported under its own status (see Decision 5's updated status list):
  - **The component isn't in this Figma source at all** (e.g. syncing a file that only contains Button and Card — Modal is simply absent) → its file is left completely untouched, reported as `absent from Figma source`. This is different from `unrecognized node` (a Figma node *was* found but didn't match anything) and from `not found in Figma` (the component *was* found but one specific property wasn't).
  - **The component is in Figma but has no corresponding brand file yet** (e.g. Figma has a "Steps" component but `src/core/brand/components/steps.ts` doesn't exist) → the skill does **not** scaffold a new file. It flags this to the user as `no brand file yet` with the suggestion to use `create-component-pattern` or extend `figma-sync-theme`'s mapping table manually.
  - **The component is in Figma, has a brand file, and matches** → proceeds through the normal mapping/write path (Decisions 2, 6, 7).
This is a hard constraint, not a heuristic: the skill would rather leave ten components completely alone than touch one that isn't actually represented in the Figma source it was given.

**10. Bundle a generated Antd token reference instead of re-deriving types from `node_modules` at runtime.**
`references/antd-tokens.md` is generated once (and regenerated on an Antd version bump) from `node_modules/antd/es/theme/interface/alias.d.ts` (the global `AliasToken`, valid as an override on any component) and each component's own `<component>/style/token.d.ts` (`ComponentToken`). The skill checks every property → token mapping against this reference before writing, so it never writes a key that doesn't actually exist on that component's `OverrideToken` — this is what makes "checked against Antd's real types" a property of the skill rather than a hope.
*Alternative considered*: read `node_modules` directly on every run. Rejected — slower, couples the skill to exact `node_modules` paths that can change between Antd major versions, and re-parses the same types on every invocation for no benefit over a maintained reference file.

## Risks / Trade-offs

- **A component has no corresponding Figma property for some token (e.g. no shadow on a component that has a `*Shadow` token)** → Mitigation: leave that key untouched in the existing `.ts` file rather than writing a guessed/zero value; report it as "not found in Figma" in the fidelity report.
- **Figma MCP call fails, times out, or returns partial data** → Mitigation: abort before writing any file if the fetch is incomplete.
- **Large files with many components** → Mitigation: `node-id` scoping lets a user target just the relevant frame/component instead of the entire file.
- **A component's Figma node doesn't map cleanly to an Antd component name** (e.g. a frame literally named "Primary CTA" instead of "Button") → Mitigation: require an exact type+name match per Decision 2; skip and list as unrecognized rather than guessing from a fuzzy match.
- **Being this conservative means many components may sync nothing on a messy/unconventional Figma file** → Accepted trade-off given the stated priority: a smaller number of guaranteed-faithful writes beats a larger number of possibly-wrong ones. The fidelity report makes the gap visible so a human can clean up the Figma file or fix the component reference table, rather than the skill papering over it with a guess.
- **`references/antd-tokens.md` goes stale after an Antd version bump** (new tokens added, old ones deprecated/removed) → Mitigation: document the regeneration step as part of the project's Antd-upgrade checklist, not something the skill re-derives live.
- **A Figma element genuinely has no close Antd equivalent** (e.g. a bespoke data-viz widget) → Mitigation: per Decision 6, record it with a composition note in the fidelity report rather than forcing a bad match or silently skipping it with no explanation.

## Open Questions

- Should the skill support targeting one component at a time via `node-id` as the primary workflow, or always scan the whole file for every component it recognizes?
- How should ambiguous color roles be resolved (e.g. a Button fill that doesn't match any existing palette scale) — write a brand-new palette entry, or flag it for the user to name? (Leaning toward: flag for the user, consistent with the "skip rather than guess" principle.)
- Should `--component`/`--components` validate against `references/antd-mapping.md` only, or also accept the bare Figma node name if it differs from the Antd name (e.g. user says `--component "Primary CTA"` meaning Button)?
