## ADDED Requirements

### Requirement: Palette defines all raw color primitives
The system SHALL define all raw hex values and color scales exclusively in `src/core/brand/palette.ts`. No raw color literal SHALL appear outside this file.

#### Scenario: Palette is the only color source
- **WHEN** a developer searches the codebase for a hex color literal
- **THEN** the only matches SHALL be inside `src/core/brand/palette.ts`

### Requirement: Tokens map palette to semantic roles
The system SHALL export semantic token objects from `src/core/brand/tokens.ts` by importing from `palette.ts`. Tokens SHALL be mapped to CSS custom properties injected at `:root` and to a `tailwind.config.ts` `theme.extend` object.

#### Scenario: CSS variables are available globally
- **WHEN** any component uses a CSS variable (e.g., `var(--color-primary)`)
- **THEN** the value SHALL resolve to the palette primitive defined in `tokens.ts`

#### Scenario: Tailwind classes consume brand tokens
- **WHEN** a developer uses a Tailwind class referencing a brand token (e.g., `text-primary`)
- **THEN** the class SHALL resolve to the value declared in `tokens.ts`

### Requirement: Ant Design ConfigProvider receives unified theme
The system SHALL export a single `brandTheme` object from `src/core/brand/index.ts` that is passed to Ant Design's `<ConfigProvider theme={brandTheme}>` at the application root.

#### Scenario: Component overrides apply globally
- **WHEN** an Ant Design Button is rendered anywhere in the application
- **THEN** its colors SHALL match the brand palette without any inline style overrides

### Requirement: Brand swap requires only palette.ts change
The system SHALL be structured so that replacing `palette.ts` with a new brand's values causes the entire application (Tailwind + Ant Design) to reflect the new brand without any other file changes.

#### Scenario: Brand swap propagates automatically
- **WHEN** `palette.ts` color values are replaced
- **THEN** both Tailwind utility classes and Ant Design components SHALL reflect the new values after a dev server restart
