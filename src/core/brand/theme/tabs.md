# Tabs

Horizontal tab strip for switching between views within the same page context.

---

## Variants

Only the `Top` placement is documented. Centered, overflow, fill-height, and extra slot variants exist in Figma but are not covered here — document when needed.

---

## Structure

A horizontal row of tab items anchored to a bottom border line. Items are spaced `gap-32` apart. The active item has a 2px ink bar pinned to the bottom edge.

---

## Tab item states

| State | Font | Color |
|---|---|---|
| Active | Poppins Medium 14px (`sub2`) | `text/primary-text` #1a1d21 |
| Inactive | Poppins Regular 14px (`body/2`) | `text/primary-text` #1a1d21 |

Both states use the same text color. The active state is distinguished only by font weight and the ink bar below it.

---

## Ink bar

A 2px bottom border on the active tab item, rendered as an SVG asset. Color matches `ocean/6` #4e8dfa. The ink bar is absolutely positioned at `bottom: 0` within the tab item.

---

## Bottom border

A full-width SVG shadow asset spans the entire tab strip at `bottom: 0` of the wrapper. It creates the divider line separating the tab strip from the content below.

---

## Spacing

- Tab item vertical padding: `py-12`
- Gap between tab items: `gap-32`

---

## Notes

Do not use Roboto or `rgba(0,0,0,0.85)` for tab labels — this appears in legacy AntD variants in Figma and is not correct for this system. All tab text is Poppins with `text/primary-text`. The active item color is also `text/primary-text` — differentiation is weight-only, not color.
