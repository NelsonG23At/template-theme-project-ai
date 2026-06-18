# Hope Medical — Design Tokens

This is the source of truth for all design tokens used across the platform. Component docs reference these directly rather than repeating raw values.

---

## Typography

All text uses **Poppins** unless noted otherwise. Roboto appears only in legacy AntD-origin components and should not be used in new work.

| Token | Family | Weight | Size | Line Height | Tracking |
|---|---|---|---|---|---|
| `body/2` | Poppins | Regular 400 | 14px | 16.8px | 0.035px |
| `body/1` | Poppins | Regular 400 | 16px | 24px | 0.08px |
| `caption` | Poppins | Regular 400 | 12px | 14.4px | 0.06px |
| `sub2` | Poppins | Medium 500 | 14px | 16.8px | 0.014px |
| `label/uppercase` | Poppins | Regular 400 | 10px | — | uppercase |

`body/2` (14px Regular) is the default across nearly all UI text — inputs, menu items, pills, table rows, descriptions.

---

## Color Palette

### Text

| Token | Value | Usage |
|---|---|---|
| `text/primary-text` | #1a1d21 | Default body text, active states |
| `text/secondary-text` | #737a84 | Breadcrumb inactive, secondary labels |
| `text/muted` | #a9b0bb | Placeholders, hints |
| `text/disabled-text` | #a9b0bb | Disabled state text |
| `text/inverse` | #fafbfc | Text on dark/colored backgrounds |
| `text/divider` | #d0d3da | Separators, breadcrumb slashes |

### UI Surfaces

| Token | Value | Usage |
|---|---|---|
| `ui/app-bg` | #fafbfc | Default input/surface background |
| `ui/surface-bg` | #f7f8fa | Cards, elevated surfaces |
| `ui/border` | #e6e8ec | Default borders |
| `ui/disabled-bg` | #edeff2 | Disabled input/button backgrounds |
| `neutral/1` | #ffffff | Pure white |
| `neutral/2` | #f7f8fa | Subtle surface |
| `neutral/5` | #e6e8ec | Borders (AntD alias — same as `ui/border`) |
| `neutral/9` | #1a1d21 | Near-black (chip/tag backgrounds) |

### Brand — Ocean (Primary)

| Token | Value | Usage |
|---|---|---|
| `ocean/1` | — | Active nav item background |
| `ocean/6` | #4e8dfa | Primary action, focus border, active ink bar, selected nav text |
| `ocean/7` | #2f74ed | Selected chip/tag background |

### Status Colors

| Token | Value | Usage |
|---|---|---|
| `status/info/text` | #2b625e | Info alert/pill text |
| `status/error/text` | #5c2a2a | Error alert/pill text |
| `status/success/text` | #1c533c | Success alert/pill text |
| `status/warning/color` | #654f1f | Warning alert/pill text |
| `status/error/border` | #df9a9a | Error border (non-glass) |

### Semantic Color Scales

These map directly to the status system used in StatusCard and StatusPill.

| Status | Glass Background | Glass Stroke | Text Token |
|---|---|---|---|
| Received | rgba(250,251,252,0.32) | — | `text/primary-text` |
| Active | rgba(73,185,242,0.24) | — | `aqua/10` #0d3d5b |
| On Hold | rgba(208,211,218,0.24) | — | `text/primary-text` |
| Scheduled | rgba(60,199,154,0.24) | — | `clinic/10` #064836 |
| Unresponsive | rgba(204,94,94,0.24) | — | `error/10` #5c2a2a |
| Disregarded | rgba(255,122,85,0.24) | — | `peach/10` #5c1a0c |

### Glass System

Used across surfaces, alerts, dropdowns, headers, and search.

| Token | Value | Usage |
|---|---|---|
| `glass/surface-clear` | rgba(250,251,252,0.32) | Pagination items, icon buttons |
| `glass/surface-darker` | rgba(250,251,252,0.64) | Searchbox, dropdown containers |
| `glass/stroke` | rgba(255,255,255,0.3) | Universal glass border |
| `glass/info-bg` | rgba(95,218,210,0.24) | Info alert/surface |
| `glass/info-stroke` | rgba(154,232,227,0.3) | Info alert border |
| `glass/red-bg` | rgba(204,94,94,0.24) | Error alert/surface |
| `glass/red-stroke` | rgba(223,154,154,0.3) | Error alert border |
| `glass/yellow-bg` | rgba(230,190,102,0.24) | Warning alert/surface |
| `glass/yellow-stroke` | rgba(190,150,59,0.3) | Warning alert border |
| `glass/clinic-bg` | rgba(60,199,154,0.24) | Success alert/surface |

---

## Spacing

All spacing uses a 4px base unit. Most components use 8px, 12px, or 16px padding.

| Value | Common usage |
|---|---|
| 4px | Gap between tight elements (status card label stack) |
| 8px | Icon button padding, gap between nav items, pill gap |
| 12px | Input/dropdown item horizontal padding |
| 16px | Alert, header horizontal padding |
| 24px | Checkbox size, icon button size |
| 32px | Pagination item size |
| 36px | Alert description left indent (when icon present) |
| 48px | Header icon button size |

---

## Border Radius

| Value | Usage |
|---|---|
| 3px | Checkbox |
| 8px | Inputs, dropdowns, pagination items, alerts (Hope style) |
| 12px | Dropdown container |
| 24px | Status cards |
| 80px / full | Pills, selection items, sidebar user badge |

---

## Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow/card` | 0 2px 4px rgba(115,122,132,0.12) | Searchbox, header icon buttons |
| `shadow/dropdown` | 0 1px 4px rgba(0,0,0,0.12), 0 1px 8px #f7f8fa | Dropdown menu |
| `shadow/error` | 0 2px 4px rgba(204,94,94,0.24) | Error alert |
| `shadow/focus` | 0 0 0 2px rgba(78,141,250,0.2) | Input focused state (ocean/6 based) |

---

## Icons

All icons use **Tabler Icons** at 24px (standard) or 16px (compact/inline). Icons in header buttons use 24px. Suffix/prefix icons in inputs use 16px. Close icons use 14px.
