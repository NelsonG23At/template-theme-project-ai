# Header

The top bar of each screen. Contains breadcrumb navigation on the left and action icon buttons on the right.

---

## Variants

| Variant | Width | Notes |
|---|---|---|
| Desktop | Full width (1446px) | Breadcrumb + Messages + Notifications |
| Mobile V2 | 361px | Hamburger + Notifications only |

---

## Desktop

The desktop header is a full-width flex row with `justify-between`. No background — it sits directly on the page surface.

**Left:** Breadcrumb (see `breadcrumbs.md`)

**Right:** Two icon buttons — Messages and Notifications — each 48px circle with glass styling.

Icon button style:
- Background: `glass/surface-clear` rgba(250,251,252,0.32)
- Border: `glass/stroke` rgba(255,255,255,0.3)
- Shadow: `shadow/card` 0 2px 4px rgba(115,122,132,0.12)
- Shape: `rounded-full`
- Icon: 24px Tabler icon

---

## Mobile V2

A contained bar with its own surface and border.

- Background: `ui/surface-bg` #f7f8fa
- Border: glass stroke
- Shadow: drop shadow
- Shape: `rounded-24`
- Padding: `px-20 py-16`

**Left:** Hamburger button — 48px, `rounded-8`

**Right:** Notifications icon button — 48px circle (same glass style as desktop)

---

## Notes

The desktop header has no page title or heading. Navigation context is communicated entirely through the breadcrumb. Do not add a page title element unless the design explicitly calls for it.
