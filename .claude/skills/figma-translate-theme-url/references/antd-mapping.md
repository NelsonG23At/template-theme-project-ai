# Figma → Antd Component Mapping

This is the identification reference for `figma-translate-theme-url`. Before mapping any property, identify which (if any) of these 26 components a fetched Figma node corresponds to. A match requires the Figma node's **type** (`COMPONENT` or `COMPONENT_SET`) **and** its **name** to match the Figma Component column exactly — no fuzzy matching. If a node doesn't match anything here, see "No exact equivalent" below before reporting it as `unrecognized node`.

This table also mirrors `figma-sync-theme`'s component → file → export-name → `OverrideToken` mapping, so both skills stay aligned on the same 26 components.

## Component Table

| Figma Component (exact name) | Brand file | Export | `OverrideToken` key | Primary properties to extract |
|---|---|---|---|---|
| `Button` | `components/buttons.ts` | `buttonTokens` | `Button` | fill (colorPrimary/defaultBg), cornerRadius (borderRadius), padding (paddingInline/paddingContentHorizontal), hover/active variants |
| `Card` | `components/cards.ts` | `cardTokens` | `Card` | fill (colorBgContainer), stroke (colorBorderSecondary), cornerRadius (borderRadius), padding (paddingLG/bodyPadding) |
| `Input` | `components/inputs.ts` | `inputTokens` | `Input` | stroke (hoverBorderColor/activeBorderColor), padding (paddingInline/paddingBlock), addon fill (addonBg) |
| `Select` | `components/selects.ts` | `selectTokens` | `Select` | option fill states (optionSelectedBg/optionActiveBg), stroke (hoverBorderColor/activeBorderColor), selector fill (selectorBg) |
| `Table` | `components/tables.ts` | `tableTokens` | `Table` | header fill (headerBg), row hover/selected fill, cell padding, header cornerRadius |
| `Form` | `components/forms.ts` | `formTokens` | `Form` | label color, required-mark color, item spacing (itemMarginBottom) |
| `Typography` | `components/typography.ts` | `typographyTokens` | `Typography` | heading margins (titleMarginTop/Bottom) |
| `Tag` | `components/tags.ts` | `tagTokens` | `Tag` | fill (defaultBg), text color (defaultColor) |
| `Alert` | `components/alerts.ts` | `alertTokens` | `Alert` | padding (defaultPadding/withDescriptionPadding), icon size |
| `Spin` | `components/spins.ts` | `spinTokens` | `Spin` | dot size variants, content height |
| `Layout` | `components/layouts.ts` | `layoutTokens` | `Layout` | header/sider/footer fill, header/trigger height |
| `Pagination` | `components/paginations.ts` | `paginationTokens` | `Pagination` | item fill/active fill, item size |
| `Radio` | `components/radios.ts` | `radioTokens` | `Radio` | dot/button fill states, radioSize, button padding |
| `Checkbox` | `components/checkboxes.ts` | `checkboxTokens` | `Checkbox` | *(no component-specific tokens — global tokens only)* |
| `Modal` | `components/modals.ts` | `modalTokens` | `Modal` | header/content/footer fill, title color/size |
| `Drawer` | `components/drawers.ts` | `drawerTokens` | `Drawer` | footer padding, z-index |
| `Tabs` | `components/tabs.ts` | `tabsTokens` | `Tabs` | ink bar color, card fill/height, title font size |
| `Menu` | `components/menus.ts` | `menuTokens` | `Menu` | item color states (hover/selected/disabled), item cornerRadius |
| `Badge` | `components/badges.ts` | `badgeTokens` | `Badge` | dot size, text font size, indicator height |
| `Avatar` | `components/avatars.ts` | `avatarTokens` | `Avatar` | container size variants, font size variants |
| `Tooltip` | `components/tooltips.ts` | `tooltipTokens` | `Tooltip` | max width, z-index |
| `Switch` | `components/switches.ts` | `switchTokens` | `Switch` | track height variants, handle size/fill |
| `Dropdown` | `components/dropdowns.ts` | `dropdownTokens` | `Dropdown` | z-index, padding block |
| `DatePicker` | `components/date-pickers.ts` | `datePickerTokens` | `DatePicker` | cell hover/range fill, stroke (hoverBorderColor/activeBorderColor) |
| `InputNumber` | `components/input-numbers.ts` | `inputNumberTokens` | `InputNumber` | handle fill states, stroke, padding |
| `Descriptions` | `components/descriptions.ts` | `descriptionsTokens` | `Descriptions` | label fill, label/content/title color, item padding |

## Recognizing hover / disabled / error state variants

Figma expresses component states one of two ways — check for both:

1. **Variant properties** on a `COMPONENT_SET` — e.g. a Button component set with a `State` variant property whose values include `Default`, `Hover`, `Disabled`. Read the specific variant's own properties (don't inherit from `Default`).
2. **Sibling/child frames by name** — e.g. a frame named `Button/Hover` or `Input/Error` next to the base `Button`/`Input` frame.

| State | Antd token pattern | Example (Button) |
|---|---|---|
| Hover | `*Hover` suffix on the relevant color token | `colorPrimaryHover` / `defaultHoverBg` |
| Active/Pressed | `*Active` suffix | `colorPrimaryActive` / `defaultActiveBg` |
| Disabled | `*Disabled` suffix, or the relevant `color*Disabled` global token | `colorBgContainerDisabled`, `colorTextDisabled` |
| Error | `colorError`-derived tokens (component-specific error props, e.g. Input's `errorActiveShadow`) | `errorActiveShadow` |

If a state variant isn't present in the Figma source for a recognized component, report that specific token as `not found in Figma` — do not infer a hover/active/disabled color by darkening or lightening the base color.

## No exact equivalent — composition guidance

When a fetched node doesn't match any row in the Component Table above, check whether it's a **plausible composition of two or more of these 26 components** before reporting it as fully `unrecognized node`. If it resembles a known composition pattern, report it as `no exact Antd equivalent` with the composition note — never generate code for it.

| Common Figma pattern | Composition note |
|---|---|
| "Stat Card" / "Metric Card" | Card + Typography (large number as a heading-level Text) |
| "Empty State" | Typography + Button, optionally wrapped in Card |
| "Page Header" | Typography (title) + Tag/Badge (status) + Button (actions) |
| "Toolbar" | Space-wrapped Input(.Search) + Button(s) — no dedicated token file, layout-only |
| "Stepper" / "Wizard Steps" | Not in the 26-component set — flag as genuinely unsupported, don't force a match |
| "Notification" / "Toast" | Not Alert — Alert is inline; flag as unsupported if it's clearly an overlay notification pattern |

If a node doesn't resemble any composition of the 26 components either, it is genuinely `unrecognized node` — list it as-is, don't force a guess.
