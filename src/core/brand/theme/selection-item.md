# Selection Item

A pill-shaped chip used for filter and multi-select interactions.

---

## Props

| Prop | Values | Default |
|---|---|---|
| `selected` | `Default` `No` | `No` |
| `disabled` | boolean | `false` |
| `closeable` | boolean | `true` |

Only one size exists: `medium`.

---

## States

| State | Background | Border | Text |
|---|---|---|---|
| Unselected | `ui/surface-bg` #f7f8fa | `ui/border` #e6e8ec | `text/primary-text` #1a1d21 |
| Selected | `ocean/7` #2f74ed | none | `text/inverse` #fafbfc |
| Disabled | `ui/disabled-bg` #edeff2 | none | `text/disabled-text` #a9b0bb |
| Closeable | `neutral/9` #1a1d21 | none | `text/inverse` #fafbfc + X icon |

---

## Layout

- Shape: `rounded-full` (80px)
- Padding: `px-16 py-8`
- Gap between label and close icon: 8px
- Close icon: 16×16px SVG, shown only when `closeable=true` and `selected=No`

---

## Typography

Poppins Regular 14px (`body/2`), `whitespace-nowrap`, `tracking-[0.035px]`.

---

## Notes

The closeable state (near-black background) represents an active filter being cleared. It only appears in the unselected variant. Confirm with product whether closeable chips can also appear in selected state before implementing.
