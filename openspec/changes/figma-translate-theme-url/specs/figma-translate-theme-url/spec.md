## ADDED Requirements

### Requirement: Skill accepts a Figma URL as the sole required input
The system SHALL trigger this skill when the user provides a Figma file or frame URL and requests a theme/design-token sync. The skill SHALL NOT require the local `theme/` folder to be present or pre-populated.

#### Scenario: User provides a Figma file URL
- **WHEN** the user gives a URL in the form `https://www.figma.com/file/<key>/...` or `https://www.figma.com/design/<key>/...`
- **THEN** the skill SHALL accept it as valid input and proceed to extraction

#### Scenario: User requests a sync without providing a URL
- **WHEN** the user asks to sync theme from Figma but no URL is present in the request or conversation
- **THEN** the skill SHALL ask the user for a Figma URL instead of guessing or falling back to the local `theme/` folder

### Requirement: Skill extracts file key and optional node-id from the URL
The system SHALL parse the Figma URL to obtain the file key, and the `node-id` query parameter when present, before calling the Figma MCP.

#### Scenario: URL targets an entire file
- **WHEN** the URL contains no `node-id` query parameter
- **THEN** the skill SHALL fetch data scoped to the whole file

#### Scenario: URL targets a specific frame or component
- **WHEN** the URL contains a `node-id` query parameter
- **THEN** the skill SHALL scope the Figma MCP fetch to that node only

### Requirement: Skill fetches color variables and per-component style properties via the Figma MCP
The system SHALL call the Figma MCP (`mcp__figma__get_figma_data`) using the extracted file key/node-id to retrieve color variables, and for every component node found: its border-radius, padding, spacing/gap, and elevation (shadow/effect) properties.

#### Scenario: MCP call returns data
- **WHEN** `get_figma_data` succeeds and returns at least one color variable or component node
- **THEN** the skill SHALL proceed to mapping

#### Scenario: MCP call fails or returns no usable data
- **WHEN** `get_figma_data` errors, times out, or returns an empty result
- **THEN** the skill SHALL abort without writing any file and SHALL report the failure to the user

### Requirement: Skill only writes high-confidence matches between a component's Figma properties and its OverrideToken slots
The system SHALL map a fetched property to a component's `OverrideToken` key only when (a) the node's type and name match a known component exactly, per the skill's component reference table, and (b) the property is either bound to a Figma Variable or is an unambiguous structural property of that exact node. The system SHALL NOT write a fuzzy, inferred, or best-guess mapping under any circumstances — fidelity to the Figma source takes priority over coverage.

#### Scenario: Component node maps to a known component with an exact match
- **WHEN** a fetched node's type and name exactly match a recognized component (e.g. a `COMPONENT` node named "Button") and its corner radius, padding, fill, and effects are unambiguous properties of that node
- **THEN** the skill SHALL map corner radius to `borderRadius`, padding to the component's padding token(s), fill to the component's color token(s), and effects to the component's shadow token(s) where applicable

#### Scenario: A token has no corresponding Figma property
- **WHEN** a component's `OverrideToken` slot has no matching property on the fetched node (e.g. no effect present for a shadow token)
- **THEN** the skill SHALL leave that key unchanged in the existing `.ts` file and report it as "not found in Figma"

#### Scenario: A component node doesn't match any recognized component
- **WHEN** a fetched node's type/name doesn't correspond to any known component in the project's component → token mapping table
- **THEN** the skill SHALL skip that node and list it as "unrecognized node" in the fidelity report, without writing anything for it

#### Scenario: A property match is ambiguous
- **WHEN** a node matches a known component by name but a property's source is ambiguous (e.g. multiple descendant fills could plausibly be the component's color token, or the name match is fuzzy rather than exact)
- **THEN** the skill SHALL skip writing that specific property and list it as "skipped: ambiguous" in the fidelity report, rather than guessing

### Requirement: Skill identifies each Figma element's closest Antd equivalent before mapping values
The system SHALL identify each fetched Figma component's closest Antd equivalent using `references/antd-mapping.md` before attempting any property mapping. When no exact equivalent exists, the system SHALL record how the element could be composed from Antd primitives as a note in the fidelity report rather than treating it identically to an unrecognized node, and SHALL NOT generate any new component file.

#### Scenario: Figma element maps to an existing Antd component
- **WHEN** a fetched node's name/type matches an entry in `references/antd-mapping.md` (e.g. "Button")
- **THEN** the skill SHALL proceed to property mapping for that component

#### Scenario: Figma element has no exact Antd equivalent
- **WHEN** a fetched node doesn't match any entry in `references/antd-mapping.md` but resembles a composition of known Antd primitives (e.g. a "Stat Card" resembling Card + Statistic)
- **THEN** the skill SHALL record a composition note in the fidelity report under status `no exact Antd equivalent` and SHALL NOT write any token values or generate new component code for it

### Requirement: Skill maps Figma state variants to the corresponding Antd state tokens
The system SHALL look for Figma variants/sibling nodes representing hover, disabled, and error states for each recognized component, and map each to the matching Antd state token (e.g. hover → `colorPrimaryHover`/`defaultHoverBg`, error → `colorError`-driven tokens), using the same high-confidence-only rule as base properties.

#### Scenario: A hover/disabled/error variant exists in Figma
- **WHEN** a recognized component has a Figma variant or sibling node clearly representing one of these states
- **THEN** the skill SHALL map that variant's relevant property to the corresponding Antd state token under the same confidence rules as the base state

#### Scenario: No state variant exists in Figma
- **WHEN** a recognized component has no hover/disabled/error variant in the fetched data
- **THEN** the skill SHALL leave the corresponding state token(s) unchanged and report them as "not found in Figma"

### Requirement: Skill flags Figma properties that cannot be replicated 1:1 in Antd's token system
The system SHALL explicitly name, in the fidelity report, any Figma property it recognizes but cannot express through an Antd token (e.g. a gradient fill, a custom timing/easing curve) rather than silently dropping it.

#### Scenario: A Figma property has no Antd token equivalent
- **WHEN** a recognized component has a style property that Antd's `OverrideToken` has no slot for
- **THEN** the skill SHALL list it in the fidelity report under status `flagged: not replicable`, naming the property and the component it belongs to

### Requirement: Skill validates every property → token mapping against Antd's real type definitions
The system SHALL check each candidate token name against `references/antd-tokens.md` (generated from Antd's own `AliasToken` and per-component `ComponentToken` type declarations) before writing it, and SHALL NOT write a key that doesn't exist on that component's `OverrideToken`.

#### Scenario: Candidate token exists on the component's OverrideToken
- **WHEN** a mapped property's target key (e.g. `paddingContentHorizontal` for Button) appears in `references/antd-tokens.md` for that component
- **THEN** the skill SHALL proceed to write it

#### Scenario: Candidate token does not exist for that component
- **WHEN** a mapped property's target key does not appear in `references/antd-tokens.md` for that component
- **THEN** the skill SHALL NOT write it, and SHALL report the mismatch rather than writing an invalid key

### Requirement: Skill supports syncing all components, one named component, or a named subset
The system SHALL accept three invocation forms: a bare Figma URL (sync all recognized components), a URL with one named component, or a URL with an explicit named subset. A component name not found in `references/antd-mapping.md` SHALL be rejected before any Figma MCP call is made.

#### Scenario: No component specified
- **WHEN** the user provides only a Figma URL
- **THEN** the skill SHALL attempt to sync every component it recognizes in the fetched file/frame

#### Scenario: One component specified
- **WHEN** the user specifies a single component name (e.g. `--component Button` or the natural-language equivalent)
- **THEN** the skill SHALL scope the entire sync — fetch, mapping, and write — to that component only

#### Scenario: A subset of components specified
- **WHEN** the user specifies multiple component names
- **THEN** the skill SHALL scope the sync to exactly that set

#### Scenario: An unrecognized component name is specified
- **WHEN** the user specifies a component name that doesn't appear in `references/antd-mapping.md`
- **THEN** the skill SHALL reject the request and report the invalid name before calling the Figma MCP

### Requirement: Skill only touches a component's file if that component is present in the referenced Figma source
The system SHALL verify a component actually exists as a layer/component/frame in the Figma file/frame being synced before writing, scaffolding, or otherwise modifying its corresponding `components/<name>.ts` file. The system SHALL NOT invent, scaffold, or infer a component, variant, or file that is not present in the Figma source, even if it would be a natural or common addition.

#### Scenario: A known component is absent from the Figma source
- **WHEN** a component the project already has a brand file for (e.g. Modal) does not appear anywhere in the fetched Figma file/frame
- **THEN** the skill SHALL leave that component's file completely untouched and report it as `absent from Figma source`

#### Scenario: A Figma component has no corresponding brand file yet
- **WHEN** a recognized Antd-mappable component exists in the Figma source but `src/core/brand/components/<name>.ts` does not yet exist
- **THEN** the skill SHALL NOT create that file, and SHALL flag it to the user as `no brand file yet` with a suggestion to create one via `create-component-pattern` or by extending `figma-sync-theme`'s mapping table

#### Scenario: A component is present and has a brand file
- **WHEN** a component exists both in the Figma source and as a `components/<name>.ts` file
- **THEN** the skill SHALL proceed with the normal mapping and write process for that component only

### Requirement: Skill produces a per-component Figma-vs-theme fidelity report on every run
The system SHALL output a fidelity report — one row per component/token pair — showing the Figma-sourced value, the value now written in `src/core/brand/`, and a status of `matched`, `skipped: ambiguous`, `not found in Figma`, `unrecognized node`, `no exact Antd equivalent`, `flagged: not replicable`, `absent from Figma source`, or `no brand file yet`. This report SHALL be produced even when the run makes no changes, so adherence between the Figma source and the component theme is always verifiable.

#### Scenario: Report reflects a successful sync
- **WHEN** a sync run completes successfully with some properties written and some skipped
- **THEN** the fidelity report SHALL list every component/token pair considered, with its status, and the report SHALL be shown to the user regardless of whether the run is otherwise summarized as a success

#### Scenario: Report reflects a no-op sync
- **WHEN** a sync run finds the Figma source already fully consistent with `src/core/brand/`
- **THEN** the skill SHALL still produce the fidelity report, marking every checked component/token pair as `matched`, confirming adherence rather than just asserting "no changes needed"

### Requirement: Skill writes directly to src/core/brand/*.ts
The system SHALL write classified values directly into `src/core/brand/palette.ts`, `tokens.ts`, and `components/*.ts`, without an intermediate `theme/*.md` write step.

#### Scenario: Successful sync updates brand files directly
- **WHEN** the skill completes a successful Figma fetch and mapping
- **THEN** `src/core/brand/palette.ts`, `tokens.ts`, and the relevant `components/*.ts` files SHALL reflect the new values in the same run, with no corresponding write to `theme/*.md`

### Requirement: Skill runs the same integrity checks as figma-sync-theme before reporting success
The system SHALL run `tsc --noEmit`, `eslint` scoped to `src/core/brand/`, and the barrel-export sync check after writing files, before reporting success to the user.

#### Scenario: All checks pass
- **WHEN** TypeScript compiles, lint passes, and every component file is exported from the barrel
- **THEN** the skill SHALL report success with a modification summary, including any "not found in Figma" or "unrecognized node" entries

#### Scenario: A check fails
- **WHEN** TypeScript or lint reports an error after the write
- **THEN** the skill SHALL roll back the affected file(s) and report which token or file caused the failure
