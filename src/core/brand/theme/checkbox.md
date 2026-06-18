# Checkbox

Standard selection control. Always 24×24px regardless of state.

---

## Props

| Prop | Values | Default |
|---|---|---|
| `checked` | boolean | `true` |
| `indeterminate` | boolean | `false` |
| `disabled` | boolean | `false` |
| `hovering` | boolean | `false` |
| `label` | boolean | `true` |

---

## States

| State | Box background | Border | Mark |
|---|---|---|---|
| Unchecked | `ui/app-bg` #fafbfc | `ui/border` #e6e8ec, 1.5px | — |
| Unchecked + hover | SVG asset | — | Subtle hover ring |
| Checked | SVG asset | — | Checkmark baked into asset |
| Checked + disabled | SVG asset (muted) | — | Muted checkmark |
| Disabled | `ui/disabled-bg` #edeff2 | `ui/border` #e6e8ec, 1.5px | — |
| Indeterminate | `ui/app-bg` #fafbfc | `ui/border` #e6e8ec, 1.5px | 12×12px square, `ocean/6` #4e8dfa |

The checked and hover states render via SVG assets — the checkmark and ring effects are baked in, not composed from CSS. Use the SVG assets directly from the Figma export.

---

## Label

When `label=true`, a text label appears 8px to the right of the box.

| State | Color |
|---|---|
| Active | `text/primary-text` #1a1d21 |
| Disabled | `text/disabled-text` #a9b0bb |

Typography: Poppins Regular 14px (`body/2`), `whitespace-nowrap`.

---

## Notes

Box shape: `rounded-3` (3px radius). This is the only component in the system with a 3px radius — all others use 8px or full. Do not round to 4px or 8px.
