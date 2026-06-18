# Status Card & Status Pill

These two components share the same semantic token system and color logic — they're the same status scale rendered at different sizes and contexts. StatusCard is used in summary dashboards; StatusPill is used inline in tables and detail views.

---

## Shared token map

Both components use this exact mapping. Refer to it for both.

| Status | Background | Text |
|---|---|---|
| Received | rgba(250,251,252,0.32) | `text/primary-text` #1a1d21 |
| Active | rgba(73,185,242,0.24) — `aqua/glass` | `aqua/10` #0d3d5b |
| On Hold | rgba(208,211,218,0.24) — `gray/glass` | `text/primary-text` #1a1d21 |
| Scheduled | rgba(60,199,154,0.24) — `clinic/glass` | `clinic/10` #064836 |
| Unresponsive | rgba(204,94,94,0.24) — `red/glass` | `error/10` #5c2a2a |
| Disregarded | rgba(255,122,85,0.24) — `peach/glass` | `peach/10` #5c1a0c |

In code, implement this as a `STATUS_TOKENS` lookup object keyed by status string.

---

## Status Card

A compact summary widget displaying a count and a status label, used in dashboard headers.

**Structure:** count (large) stacked above label (small), centered vertically inside a card.

| Property | Value |
|---|---|
| Width | 260px |
| Border radius | `rounded-24` |
| Padding | `px-8 py-16` |
| Gap | 4px between count and label |
| Count font | Poppins Bold 48px |
| Label font | Poppins Regular 10px, uppercase |
| Shadow | `neutral/5` tinted, per status |

---

## Status Pill

An inline status indicator used in tables, cards, and list rows.

**Props:**

| Prop | Values | Default |
|---|---|---|
| `size` | `default` `sm` | `default` |

| Size | Padding | Radius | Width |
|---|---|---|---|
| `default` | `px-16 py-8` | `rounded-8` | 127px fixed |
| `sm` | `px-12 py-4` | `rounded-4` | auto |

**Typography:** Poppins Regular 12px, `letter-spacing: 0.06px`, subtle text shadow `0 1px 1px rgba(0,0,0,0.08)`.

---

## Notes

Both components use glass-style backgrounds without a defined border stroke — the background color alone provides the visual differentiation. Do not add borders unless a specific design decision calls for it.
