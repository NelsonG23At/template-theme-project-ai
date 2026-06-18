## 1. Skill scaffold

- [x] 1.1 Create `.claude/skills/figma-translate-theme-url/SKILL.md` with frontmatter (`name`, `description`) following skill-creator conventions — make the description explicit about triggering on a Figma URL + sync/token request
- [x] 1.2 Write the skill's trigger examples and "Core Rule" framing: a Figma URL is the sole input, no `theme/` folder involved
- [x] 1.3 Document the behavior when no URL is given (ask, don't fall back to `theme/` or guess)
- [x] 1.4 Write the "Role and expertise" section: act as a senior Antd + Figma expert, translating each Figma element to its closest Antd equivalent while preserving spacing, typography, colors (via tokens), states, and visual hierarchy
- [x] 1.5 Write the "Process" section: identify element → verify it exists in the Figma source → find closest Antd equivalent (via `references/antd-mapping.md`) → compose from Antd primitives if no exact match (note only, no code generation) → express via `ConfigProvider`/tokens, never hardcoded styles → flag anything not 1:1 replicable, and flag (without creating) any Figma component with no brand file yet
- [x] 1.6 Write the "Scope constraint" section verbatim: never create/modify/scaffold a component file, variant, or token unless that exact component already exists as a layer/component/frame in the referenced Figma file — flag anything missing or incomplete instead of inventing it

## 2. URL parsing

- [x] 2.1 Define the regex/parsing rule for `figma.com/file/<key>/...` and `figma.com/design/<key>/...`
- [x] 2.2 Define how to extract the `node-id` query parameter when present
- [x] 2.3 Document the abort behavior for a malformed/non-Figma URL

## 3. Invocation scoping (sync all / one / a subset)

- [x] 3.1 Define the accepted invocation forms: `<figma-url>` (all), `<figma-url> --component <Name>` (one), `<figma-url> --components <Name1>,<Name2>` (subset), plus natural-language equivalents
- [x] 3.2 Validate any named component(s) against `references/antd-mapping.md` *before* calling the Figma MCP — reject unrecognized names immediately with a clear error
- [x] 3.3 When scoped to one/a few components, confine the Figma fetch, mapping, and write entirely to those components (don't fetch or evaluate the whole file unnecessarily)

## 4. Figma MCP fetch

- [x] 4.1 Document the `mcp__figma__get_figma_data` call shape (file key, optional node-id, optional component-name filter)
- [x] 4.2 Document what to request: color variables, and per component node — corner radius, padding, item spacing/gap, effects (shadows), and hover/disabled/error variant nodes if present
- [x] 4.3 Document the abort behavior when the MCP call fails, times out, or returns no usable data — no partial writes

## 5. Antd mapping reference (Figma → Antd translation)

- [x] 5.1 Create `references/antd-mapping.md`: Figma element name/type pattern → closest Antd component, reusing `figma-sync-theme`'s component → file → export-name → `OverrideToken` table as the base (Button, Card, Input, Select, Table, Modal, etc.)
- [x] 5.2 For elements with no exact Antd equivalent, document the closest composition from Antd primitives (e.g. "Stat Card" → Card + Statistic) as guidance text, not a code template
- [x] 5.3 Define the exact-match rule for recognizing a fetched node as a known component: node type (`COMPONENT`/`COMPONENT_SET`) AND name must match the table exactly — no fuzzy/partial matching
- [x] 5.4 Document how hover/disabled/error variants are recognized (Figma variant properties or sibling-node naming patterns) and which Antd state token each maps to

## 6. Antd token type reference

- [x] 6.1 Generate `references/antd-tokens.md` from `node_modules/antd/es/theme/interface/alias.d.ts` (global `AliasToken`) and each in-scope component's `<component>/style/token.d.ts` (`ComponentToken`) — one table per component listing valid override keys and their types
- [x] 6.2 Document the regeneration trigger: re-run this generation step whenever `antd` is upgraded in `package.json`
- [x] 6.3 Wire every property → token mapping decision (section 7) to check against this reference before writing

## 7. Mapping & matching rules

- [x] 7.1 Define the "not found in Figma" path: component was found, but a specific token slot has no corresponding property on the node → left untouched, reported
- [x] 7.2 Define the "unrecognized node" path: a Figma node was found, but its type/name doesn't match any entry in `references/antd-mapping.md` → skipped, listed
- [x] 7.3 Define the "no exact Antd equivalent" path: node resembles a composition of primitives but matches no single entry → composition note recorded, nothing written
- [x] 7.4 Define the "skipped: ambiguous" path: node matches a component but a specific property's source is unclear → that property skipped and listed, the component's unambiguous properties still proceed
- [x] 7.5 Define the "flagged: not replicable" path: a recognized Figma property (e.g. gradient fill, custom easing) has no Antd token slot at all → named explicitly in the report
- [x] 7.6 Define the "absent from Figma source" path: a component the brand architecture already has a file for simply doesn't appear anywhere in this Figma file/frame → its file is left completely untouched, not even evaluated for partial properties
- [x] 7.7 Define the "no brand file yet" path: a component is present and recognized in Figma but `src/core/brand/components/<name>.ts` doesn't exist → flagged to the user, no file is scaffolded
- [x] 7.8 Define the Variable-bound vs. structural-property precedence rule: a property bound to a Figma Variable is always preferred over reading the node's raw rendered value
- [x] 7.9 Define the candidate-token validation rule: a mapped key must appear in `references/antd-tokens.md` for that component, or it is not written (see section 6.3)
- [x] 7.10 Order the checks so presence-in-Figma (7.6/7.7) is resolved *before* any property-level mapping is attempted for that component

## 8. Direct write to src/core/brand/*.ts

- [x] 8.1 Write matched color variables into `palette.ts` (and `tokens.ts` semantic/CSS-variable/Tailwind mappings where applicable)
- [x] 8.2 Write matched per-component border-radius/padding/spacing/elevation/state tokens into the corresponding `components/<name>.ts` file, using the same `OverrideToken` typing `figma-sync-theme` uses
- [x] 8.3 Confirm no file is partially written if an earlier step (fetch, mapping) failed for that component
- [x] 8.4 Confirm a scoped run (single/subset component) only touches that component's file(s), never the others

## 9. Fidelity report

- [x] 9.1 Define the fidelity report's row shape: component → token → Figma value → written value → status (`matched` / `skipped: ambiguous` / `not found in Figma` / `unrecognized node` / `no exact Antd equivalent` / `flagged: not replicable` / `absent from Figma source` / `no brand file yet`)
- [x] 9.2 Ensure the report is generated for every component/token pair considered, not just the ones that changed
- [x] 9.3 Ensure the report still prints on a no-op run (Figma already consistent with the theme) — confirming adherence, not just silence
- [x] 9.4 Make the fidelity report the primary output of the skill — shown before/above the generic compilation status, since adherence is the main thing being verified

## 10. Integrity checks & reporting

- [x] 10.1 Run `npx tsc --noEmit`; on failure, roll back the affected file(s) and report the invalid token name
- [x] 10.2 Run `npm run lint` scoped to `src/core/brand/`
- [x] 10.3 Run the barrel-export sync check (every `components/*.ts` file has a corresponding export in `components/index.ts`)
- [x] 10.4 Combine the fidelity report (section 9) with parsed Figma source info (file key/node-id, scope: all/one/subset) and compilation/lint/barrel-sync status into the final output

## 11. Verification

- [x] 11.1 Dry-run the skill against a real Figma file URL with no scoping, confirm `src/core/brand/*.ts` updates correctly for at least one component (e.g. Button) and the fidelity report marks it `matched`
- [ ] 11.2 Dry-run with `--component Button`, confirm only Button's file is touched and the report is scoped to it
- [x] 11.3 Dry-run against a frame URL with `node-id` set, confirm the fetch scopes to just that node
- [x] 11.4 Confirm a component missing an expected property (e.g. no shadow) is reported as "not found in Figma" rather than zeroed out
- [ ] 11.5 Confirm a deliberately ambiguous case is skipped and reported as "skipped: ambiguous" rather than written
- [ ] 11.6 Confirm a Figma element with no exact Antd match (e.g. a custom widget) is reported as "no exact Antd equivalent" with a composition note, and nothing is written for it
- [x] 11.7 Confirm a hover/disabled/error variant present in Figma maps to the correct Antd state token, and an absent one reports "not found in Figma"
- [ ] 11.8 Confirm an unrecognized `--component` name is rejected before any Figma MCP call is made
- [x] 11.9 Confirm a component absent from the Figma source entirely is reported as "absent from Figma source" and its file is provably untouched (no diff)
- [ ] 11.10 Confirm a Figma component with no existing brand file is flagged as "no brand file yet" and no new file is created
- [x] 11.11 Confirm `tsc --noEmit` / `eslint` / barrel-sync all pass after a real sync run
