# Hope Medical — Design System Reference

This is the developer reference for the Hope Medical platform UI. It documents components as they are built — tokens, structure, states, and behavior — so implementation stays consistent across the codebase without constant Figma inspection.

---

## How to use this

Start with `tokens.md`. It defines every color token, typography scale, spacing unit, border radius, and shadow used across the platform. Component docs reference these tokens by name — they don't repeat raw values. If you see `ocean/6` in a component doc, look it up in `tokens.md`.

Each component doc in `/components` covers:

- **Props** — what the component accepts and its defaults
- **Structure** — how it's built and laid out
- **States** — visual behavior per state with token references
- **Notes** — implementation details worth knowing

---

## Stack

| Concern | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Component library | Ant Design 6 |
| Styling | TailwindCSS 4 |
| State | Redux Toolkit + TanStack Query |
| Icons | Tabler Icons |
| Typeface | Poppins (primary), Roboto (avoid in new work) |

---

## Components

| File | Component | Status |
|---|---|---|
| `components/buttons.md` | Button | Documented |
| `components/sidebar.md` | Sidebar Menu | Documented |
| `components/status-card.md` | Status Card | Documented |
| `components/status-pills.md` | Status Pills | Documented |
| `components/header.md` | Header | Documented |
| `components/input.md` | Input | Documented |
| `components/searchbox.md` | Searchbox | Documented |
| `components/breadcrumbs.md` | Breadcrumbs | Documented |
| `components/checkbox.md` | Checkbox | Documented |
| `components/alerts.md` | Alert | Documented |
| `components/selection-item.md` | Selection Item | Documented |
| `components/pagination.md` | Pagination | Documented |
| `components/tabs.md` | Tabs | Documented |
| `components/dropdown.md` | Dropdown Menu | Documented |

---

## Token convention

Tokens are written in `category/name` format throughout all docs. When implementing, map these to your CSS variable names or Tailwind config entries. The raw values are always available in `tokens.md` as a fallback.

---

## What this is not

This is not a Storybook, not a generated file, and not a Figma export. It's a hand-verified reference built from direct Figma inspection — meaning it reflects what's actually in the design file, with corrections already applied where the Figma source had inconsistencies.
