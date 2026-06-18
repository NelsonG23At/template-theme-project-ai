# Pagination

Page navigation control for long lists. Supports a minimal mode and a full mode with total count and options.

---

## Props

| Prop | Values | Default |
|---|---|---|
| `state` | `normal` `disabled` | `normal` |
| `totalText` | boolean | `false` |
| `options` | boolean | `true` |

Only one size exists: `medium`.

---

## Layout

- Gap between items: 8px (without `totalText`), 16px (with `totalText`)
- All items: `rounded-8`, 32×32px

---

## Sub-components

**Prev / Next buttons**

| State | Background | Border |
|---|---|---|
| Normal | `glass/surface-clear` rgba(250,251,252,0.32) | `glass/stroke` rgba(255,255,255,0.3) |
| Disabled | `ui/disabled-bg` #edeff2 | none |

Padding: `p-8`. Icon: 16px chevron.

**Page item**

| State | Background | Border | Text |
|---|---|---|---|
| Default | `glass/surface-clear` | `glass/stroke` | `text/primary-text` #1a1d21 |
| Active | rgba(115,122,132,0.88) | `glass/stroke` | `text/inverse` #fafbfc |
| Disabled | `ui/disabled-bg` #edeff2 | none | `text/disabled-text` #a9b0bb |

Active page item: Poppins Medium 14px. All others: Poppins Regular 14px.

Note: the active page background is a neutral glass gray, not `ocean/6`. This is intentional per the current design — update Figma if brand color is preferred.

**Ellipsis**

32×32px, `•••` in Arial Regular 14px, `letter-spacing: 2px`, `text/disabled-text` color. Arial is intentional here for the ellipsis character rendering.

**Total text**

"Total N items" — Poppins Regular 14px, `text/primary-text`, `pr-8`.

---

## Options bar

Shown when `options=true` and `totalText=true`. Contains two controls side by side.

**Size changer:** pill-shaped selector with "10 / page" label and a chevron-down icon. Background: `neutral/1` #fafbfc, border: `neutral/5` #e6e8ec, padding: `px-12 py-4`, `rounded-8`.

**Quick jumper:** "Go to" label + a 50px input field. Input uses the same base styling as the Input component (`normal` state, `medium` size).
