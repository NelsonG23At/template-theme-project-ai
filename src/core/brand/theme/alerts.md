# Alert

Contextual feedback messages. Appear inline in content areas to communicate status, errors, warnings, or information.

---

## Props

| Prop | Values | Default |
|---|---|---|
| `type` | `success` `info` `warning` `error` | `success` |
| `description` | boolean | `false` |
| `icon` | boolean | `false` |
| `closeBtn` | boolean | `false` |

---

## Token map

| Type | Surface | Border | Title text |
|---|---|---|---|
| `success` | `glass/clinic-bg` | `glass/stroke` | `status/success/text` |
| `info` | `glass/info-bg` | `glass/info-stroke` | `status/info/text` |
| `warning` | `glass/yellow-bg` | `glass/yellow-stroke` | `status/warning/color` |
| `error` | `glass/red-bg` | `glass/red-stroke` | `status/error/text` |

All token values resolve in `tokens.md` → Glass System. No shadows on any alert type.

Note: success uses the generic `glass/stroke` (white @ 30%) for its border — not a clinic-tinted stroke. This is intentional per the current Figma component.

---

## Layout

- Padding: `px-16 py-9`
- Border radius: `rounded-8`
- Width: 395px (fixed in component, fluid in practice)
- Gap between title row and description row: 10px

**Title row:** flex, `gap-10`, `items-center`. Left to right: icon (optional) → title text (flex-1) → close button (optional).

**Description row:** `pl-36` when icon is present (aligns text under the icon), no left offset when icon is absent.

---

## Typography

**Title:** `sub2` — Poppins Medium 14px, `tracking-[0.014px]`, semantic status color per token map above.

**Description:** `body/2` — Poppins Regular 14px, `tracking-[0.035px]`.

- Info description uses `status/info/text` (same as title)
- Error description uses `status/error/text` (same as title)
- Success and warning descriptions use `text/primary-text`

---

## Icon

16×16px SVG status icon, left-aligned in the title row. Color-matched to its type.

---

## Close button

16×16px SVG X icon, right-aligned in the title row. Only rendered when `closeBtn=true`.

---

## Notes

`rounded-8` applies to all alerts. Legacy AntD variants use `rounded-2` — do not use in new work.
