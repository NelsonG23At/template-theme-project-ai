# Dropdown Menu

A floating menu that appears on trigger interaction. Used for contextual actions and navigation options.

---

## Props

| Prop | Values | Default |
|---|---|---|
| `arrow` | `no arrow` `top left` `top center` `top right` `bottom left` `bottom center` `bottom right` | `no arrow` |
| `items` | `2` – `12` | `2` |

---

## Container

| Property | Value |
|---|---|
| Width | 200px |
| Border radius | `rounded-12` |
| Background | `glass/surface-darker` rgba(250,251,252,0.64) |
| Border | `glass/stroke` rgba(255,255,255,0.3), 3px bottom |
| Padding | `px-8 pt-8 pb-11` |
| Gap between items | 4px |
| Shadow | 0 1px 4px rgba(0,0,0,0.12), 0 1px 8px `ui/surface-bg` #f7f8fa |

---

## Menu item

**Default state**

- No background
- Padding: `px-12 py-8`
- Border radius: `rounded-8`
- Text: Poppins Regular 14px (`body/2`), `text/primary-text` #1a1d21

**Hovered / active state**

- Background: `ui/surface-bg` #f7f8fa
- Shape changes to `rounded-full` (pill) on hover
- Same text color and size

---

## Arrow variants

The arrow is a positional pointer that indicates where the dropdown is anchored relative to its trigger. It does not change the container structure — only adds a directional indicator at the specified edge and alignment.

---

## Notes

The pill shape on hover (`rounded-full`) is an intentional interaction behavior — the item transitions from `rounded-8` at rest to `rounded-full` on hover. Implement this as a CSS transition if motion is desired, or as a direct state swap.
