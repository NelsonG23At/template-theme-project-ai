---
name: figma-sync-theme
description: Synchronizes design tokens and component specifications exclusively from the local “theme/” folder to the project’s decoupled brand architecture. Use this when the user calls figma-sync-theme, process-theme-folder, or requests to update, analyze, or synchronize the app’s visual styles from the local “theme” directory in any language (for example, “process the theme folder,” “update the theme from the theme folder,” “synchronize the local theme folder”).
license: MIT
compatibility: Dedicated exclusively to parsing local theme/ workspace directories containing Markdown specification files (source of truth). Targets src/core/brand/ as the design token ecosystem.
metadata:
  author: atmosera
  version: "2.0"
---

Processes, parses, and distributes design tokens from the local `theme/` directory into the modular architecture under `src/core/brand/`.

**Core Rule:** The `theme/` folder is the absolute, non-negotiable Source of Truth for both global styles and component-specific tokens.

**Trigger examples:**
- `figma-sync-theme`
- “processes the theme folder to update styles”
- “updates the app’s tokens with the theme’s source of truth”
- “syncs the local theme folder”

---

## Phase 1 — Workspace Discovery & Pre-flight

### Step 1.1 — Folder Verification
Verify that the `theme/` directory exists at the project root.
- If missing → report `"Error: Canonical 'theme/' directory not found at project root."` and abort.

### Step 1.2 — File Scan
Read all files within `theme/` recursively:
```
theme/
├── base.md              → palette.ts
├── tokens.md            → tokens.ts
└── components/
    ├── button.md        → components/buttons.ts
    ├── card.md          → components/cards.ts
    ├── input.md         → components/inputs.ts
    ├── select.md        → components/selects.ts
    ├── table.md         → components/tables.ts
    ├── form.md          → components/forms.ts
    ├── typography.md    → components/typography.ts
    ├── tag.md           → components/tags.ts
    ├── alert.md         → components/alerts.ts
    ├── spin.md          → components/spins.ts
    ├── layout.md        → components/layouts.ts
    ├── pagination.md    → components/paginations.ts
    ├── radio.md         → components/radios.ts
    ├── checkbox.md      → components/checkboxes.ts
    ├── modal.md         → components/modals.ts
    ├── drawer.md        → components/drawers.ts
    ├── tabs.md          → components/tabs.ts
    ├── menu.md          → components/menus.ts
    ├── badge.md         → components/badges.ts
    ├── avatar.md        → components/avatars.ts
    ├── tooltip.md       → components/tooltips.ts
    ├── switch.md        → components/switches.ts
    ├── dropdown.md      → components/dropdowns.ts
    ├── date-picker.md   → components/date-pickers.ts
    ├── input-number.md  → components/input-numbers.ts
    └── descriptions.md  → components/descriptions.ts
```

For each file found, read its full content before proceeding to Phase 2.

---

## Phase 2 — Classification & Routing Architecture

Parse each Markdown file and route tokens into three isolated maps:

1. **Primitives → `palette.ts`**
   - Source: `theme/base.md`
   - Criteria: hex values (`#[0-9a-fA-F]{3,8}`), no semantic context
   - Table columns: `key | value`

2. **Semantic → `tokens.ts`**
   - Source: `theme/tokens.md`
   - Criteria: CSS variable names, Antd alias tokens, Tailwind color keys, non-color global tokens (borderRadius, fontFamily)
   - Table columns: `css-variable | palette-key | semantic role` OR `antd-token | palette-key | description` OR `tailwind-key | palette-key | description`

3. **Component Specs → `components/`**
   - Source: `theme/components/*.md`
   - Criteria: tokens grouped under `# Component: [Name]` heading
   - Color tokens table: `antd-token | palette-key | description` → resolved to `palette.[key]` in TS
   - Non-color tokens table: `token | value | description` → written as plain number or string in TS

**Markdown table parsing rules:**
1. Split each `|`-delimited row, trim whitespace per cell
2. Skip header rows (contain `antd-token`, `key`, `token`, `---`)
3. Column 0 = property name, column 1 = value/palette-key
4. Hex values (`#...`) → color, integers/floats → number, plain strings → string
5. Palette-key references (e.g. `primary600`) → resolve to `palette.[key]` in TypeScript

---

## Phase 3 — Write Architecture Files

All TypeScript files use strict types from Ant Design v5. Use `import type` for all type imports.

### 3a — `src/core/brand/palette.ts`

```typescript
export const palette = {
  // Primary
  primary50:  '#f5f3ff',
  primary600: '#2f74ed',
  // ... all scales
} as const

export type PaletteKey = keyof typeof palette
```

**Rules:** Only update keys present in `theme/base.md`. Preserve `as const` and `PaletteKey`. Never touch `roleAdmin/Editor/Viewer/Guest` unless in `base.md`.

### 3b — `src/core/brand/tokens.ts`

```typescript
import { palette } from './palette'

export const tokens = {
  '--color-primary': palette.primary600,
  // ... CSS variable map from theme/tokens.md CSS Variables table
} as const

export const tailwindThemeExtension = {
  colors: {
    primary: { DEFAULT: palette.primary600, /* ... */ },
    // ... from theme/tokens.md Tailwind Color Extensions table
  },
} as const

export const antdTokens = {
  colorPrimary:   palette.primary600,
  // ... from theme/tokens.md Antd Global Alias Tokens + Non-Color Tokens tables
}
```

### 3c — `src/core/brand/components/[name].ts`

One file per component. Type annotation: `OverrideToken['ComponentName']`.

```typescript
import type { OverrideToken } from 'antd/es/theme/interface'
import { palette } from '../palette'

export const [name]Tokens: OverrideToken['ComponentName'] = {
  // color tokens → palette.[key]
  // non-color tokens → plain number or string
}
```

**Full component → file mapping:**

| theme/components/ file | target TS file | export name | OverrideToken key |
|---|---|---|---|
| `button.md` | `buttons.ts` | `buttonTokens` | `Button` |
| `card.md` | `cards.ts` | `cardTokens` | `Card` |
| `input.md` | `inputs.ts` | `inputTokens` | `Input` |
| `select.md` | `selects.ts` | `selectTokens` | `Select` |
| `table.md` | `tables.ts` | `tableTokens` | `Table` |
| `form.md` | `forms.ts` | `formTokens` | `Form` |
| `typography.md` | `typography.ts` | `typographyTokens` | `Typography` |
| `tag.md` | `tags.ts` | `tagTokens` | `Tag` |
| `alert.md` | `alerts.ts` | `alertTokens` | `Alert` |
| `spin.md` | `spins.ts` | `spinTokens` | `Spin` |
| `layout.md` | `layouts.ts` | `layoutTokens` | `Layout` |
| `pagination.md` | `paginations.ts` | `paginationTokens` | `Pagination` |
| `radio.md` | `radio.md` | `radioTokens` | `Radio` |
| `checkbox.md` | `checkboxes.ts` | `checkboxTokens` | `Checkbox` |
| `modal.md` | `modals.ts` | `modalTokens` | `Modal` |
| `drawer.md` | `drawers.ts` | `drawerTokens` | `Drawer` |
| `tabs.md` | `tabs.ts` | `tabsTokens` | `Tabs` |
| `menu.md` | `menus.ts` | `menuTokens` | `Menu` |
| `badge.md` | `badges.ts` | `badgeTokens` | `Badge` |
| `avatar.md` | `avatars.ts` | `avatarTokens` | `Avatar` |
| `tooltip.md` | `tooltips.ts` | `tooltipTokens` | `Tooltip` |
| `switch.md` | `switches.ts` | `switchTokens` | `Switch` |
| `dropdown.md` | `dropdowns.ts` | `dropdownTokens` | `Dropdown` |
| `date-picker.md` | `date-pickers.ts` | `datePickerTokens` | `DatePicker` |
| `input-number.md` | `input-numbers.ts` | `inputNumberTokens` | `InputNumber` |
| `descriptions.md` | `descriptions.ts` | `descriptionsTokens` | `Descriptions` |

### 3d — `src/core/brand/components/index.ts` (barrel)

Re-export all component token objects from their respective files. One export per file. Update every time a component file is added or renamed.

### 3e — `src/core/brand/index.ts` (unified export)

```typescript
import type { ThemeConfig } from 'antd'
import { antdTokens } from './tokens'
import {
  buttonTokens, cardTokens, inputTokens, selectTokens, tableTokens,
  formTokens, typographyTokens, tagTokens, alertTokens, spinTokens,
  layoutTokens, paginationTokens, radioTokens, checkboxTokens,
  modalTokens, drawerTokens, tabsTokens, menuTokens, badgeTokens,
  avatarTokens, tooltipTokens, switchTokens, dropdownTokens,
  datePickerTokens, inputNumberTokens, descriptionsTokens,
} from './components'

export const brandTheme: ThemeConfig = {
  token: antdTokens,
  components: {
    Button: buttonTokens,
    Card: cardTokens,
    Input: inputTokens,
    Select: selectTokens,
    Table: tableTokens,
    Form: formTokens,
    Typography: typographyTokens,
    Tag: tagTokens,
    Alert: alertTokens,
    Spin: spinTokens,
    Layout: layoutTokens,
    Pagination: paginationTokens,
    Radio: radioTokens,
    Checkbox: checkboxTokens,
    Modal: modalTokens,
    Drawer: drawerTokens,
    Tabs: tabsTokens,
    Menu: menuTokens,
    Badge: badgeTokens,
    Avatar: avatarTokens,
    Tooltip: tooltipTokens,
    Switch: switchTokens,
    Dropdown: dropdownTokens,
    DatePicker: datePickerTokens,
    InputNumber: inputNumberTokens,
    Descriptions: descriptionsTokens,
  },
}

export default brandTheme

export { palette } from './palette'
export { tokens, tailwindThemeExtension, antdTokens } from './tokens'
```

**Rule:** Only include a component in `brandTheme.components` if its corresponding `theme/components/*.md` file exists. If a component file is missing from `theme/`, omit it from `components` silently.

---

## Phase 4 — Compilation & Integrity Checks

1. **TypeScript:** Run `npx tsc --noEmit`. On any error → roll back affected file, display the error, and report which token name was invalid.
2. **Lint:** Run `npm run lint` scoped to `src/core/brand/`. Pre-existing errors outside this folder are not blocking.
3. **Barrel sync check:** Confirm every `*.ts` file in `src/core/brand/components/` (except `index.ts`) has a corresponding export in `index.ts`.

---

## Output Format

```
### Local Theme Sync — Status
- Source Directory: `theme/`
- Parsed Files: [list]

### Architecture Distribution Summary
- `palette.ts`: N raw values mapped
- `tokens.ts`: N CSS vars, N Antd tokens, N Tailwind extensions updated
- `components/`: Overrides synchronized for: Button, Card, Input, ...

### Modification Matrix
| File | Token Property | Old Value | New Value | Status |
|---|---|---|---|---|

### Compilation & Code Validation
- TypeScript: 0 errors
- ESLint src/core/brand/: Passed
- Barrel sync: All exports accounted for
```
