# Button

Buttons are the primary action trigger across the platform. They come in multiple types, shapes, and sizes — all sharing the same token base.

---

## Props

| Prop | Values | Default |
|---|---|---|
| `type` | `primary` `secondary` `destructive` `link` `text` `ghost` | `primary` |
| `shape` | `standard` `circle` `square` | `standard` |
| `size` | `small` `medium` `large` | `medium` |
| `state` | `normal` `hover` `active` `animating` `disabled` | `normal` |
| `danger` | boolean | `false` |
| `ghost` | boolean | `false` |

`ghost` is only available on `primary`, `secondary`, `link`, and `text` types, and only at `medium` and `large` sizes.

`danger` is available on `secondary`, `destructive`, `link`, and `text`.

---

## Sizes

| Size | Height | Font |
|---|---|---|
| `small` | 28px | `caption` — Poppins Regular 12px |
| `medium` | 36px | `body/2` — Poppins Regular 14px |
| `large` | 48px | `body/1` — Poppins Regular 16px |

---

## Types

**Primary** — filled, `ocean/6` background. The default call-to-action.

**Secondary** — outlined, `ocean/6` border and text on transparent background.

**Destructive** — red-toned, used for irreversible actions.

**Link** — no background or border, text styled as a link.

**Text** — no background or border, plain text weight.

**Ghost** — inverted for use on dark/colored backgrounds.

---

## States

| State | Visual |
|---|---|
| `normal` | Base style per type |
| `hover` / `press` | Lightened or darkened per type |
| `active` | Pressed visual feedback |
| `animating` | Loading indicator |
| `disabled` | `disabled-bg` background, `disabled-text` color, no interaction |

---

## Shapes

`standard` is the default rectangular form with `rounded-8`. `circle` and `square` are icon-only variants — no label, equal width and height.
