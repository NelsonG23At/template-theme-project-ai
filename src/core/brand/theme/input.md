# Input

Single-line text field. Built on AntD's Input, styled to the Hope token system.

---

## Props

| Prop | Values | Default |
|---|---|---|
| `size` | `small` `medium` `large` | `medium` |
| `state` | `normal` `focused` `disabled` | `normal` |
| `filled` | boolean | `true` |
| `prefix` | boolean | `false` |
| `suffix` | boolean | `true` |
| `addonBefore` | boolean | `false` |
| `addonAfter` | boolean | `false` |

---

## Sizes

| Size | Font size | Line height | Addon height |
|---|---|---|---|
| `small` | 12px | 14.4px | 24px |
| `medium` | 14px | 16.8px | 32px |
| `large` | 16px | 24px | 40px |

Padding is `p-12` across all sizes. Font size and addon height are the only values that change per size.

---

## States

| State | Border | Background | Text |
|---|---|---|---|
| `normal` | `ui/border` #e6e8ec | `ui/app-bg` #fafbfc | `primary-text` #1a1d21 (filled) / `muted` #a9b0bb (empty) |
| `focused` | `ocean/6` #4e8dfa | `ui/app-bg` #fafbfc | `primary-text` #1a1d21 |
| `disabled` | `ui/border` #e6e8ec | `disabled-bg` #edeff2 | `disabled-text` #a9b0bb |

**Focus ring:** `box-shadow: 0 0 0 2px rgba(78,141,250,0.2)` — ocean/6 based.

**Cursor indicator:** 1px wide, 18px tall element shown in the focused state only, before the placeholder text.

---

## Typography

- Font: Poppins Regular
- Placeholder: `text/muted` #a9b0bb
- Value: `text/primary-text` #1a1d21
- Tracking: 0.035px (medium/large), 0.06px (small)

---

## Addons

Addon slots (before/after) use legacy AntD values: `bg #fafafa`, `border #d9d9d9`. These are not Hope semantic tokens. Avoid using addons in new screens where possible; if needed, align these values with `ui/app-bg` and `ui/border` at the implementation level.

---

## Notes

Border radius is `rounded-8` on the main input field. Addon wrappers use `rounded-2` (AntD default) and do not fully match the Hope radius scale — another reason to avoid addons unless required.
