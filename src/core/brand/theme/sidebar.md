# Sidebar Menu

The primary navigation element. Appears on the left side of every screen and supports collapsed and expanded states.

---

## States

| State | Width |
|---|---|
| Collapsed | 80px |
| Expanded | 256px |

Two expanded variants exist — `Expanded/Referrals` and `Expanded/Portal` — which differ only in which nav items are active. Width is the same for both.

---

## Structure

The sidebar is divided into three zones stacked vertically: header, navigation, and footer.

**Header** shows the HOPE Medical logo and company name when expanded. When collapsed, only the MenuAvatar icon is visible.

**Navigation** is a vertical list of menu items. Each item contains a 24px icon, a label, and a chevron for items with submenus. In collapsed mode, only the icon is shown.

**Footer** contains the logged-in user's avatar, name, role badge, a logout button, and the hamburger toggle. In collapsed mode, only the avatar and hamburger remain visible.

---

## Nav items

Referrals, Patients, Scheduling, Case Management, Analytics Reports, Organization, Catalog Management, Settings.

---

## Menu item states

| State | Background | Left border | Text color |
|---|---|---|---|
| Default | transparent | none | `text/primary-text` |
| Active / selected | `ocean/1` | 2px solid `ocean/6` | `ocean/6` |

---

## Typography

| Element | Token | Details |
|---|---|---|
| Nav label | `sub2` | Poppins Medium 14px |
| Menu item | `body/2` | Poppins Regular 14px |
| Company subtitle | `label/uppercase` | Poppins Regular 10px, uppercase |

---

## Role badge (footer)

Displayed in the expanded footer next to the user's name.

- Background: `teal/glass` rgba(95,218,210,0.24)
- Text: `teal/10`
- Shape: pill / `rounded-full`

---

## Notes

Submenu items show a right-pointing chevron when collapsed and an up-pointing chevron when expanded and open. The sidebar toggle (hamburger) is always visible in the footer regardless of state.
