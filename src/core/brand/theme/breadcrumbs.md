# Breadcrumbs

Inline navigation trail displayed in the page header. Communicates the current location within the platform hierarchy.

---

## Structure

A horizontal flex row of crumb items separated by a slash character. Supports 2 or 3 levels.

```
Parent  /  Child  /  Current Page
```

---

## Elements

**Separator:** the `/` character — Roboto Regular 14px, `text/divider` #d0d3da, `px-8` on each side.

**Inactive crumbs:** Poppins Regular 14px, `text/secondary-text` #737a84.

**Active (last) crumb:** Poppins Regular 14px, `text/primary-text` #1a1d21.

---

## Notes

The separator uses Roboto intentionally — it's a typographic character, not a label. All crumb labels use Poppins. The active crumb is always the last item in the chain and is never a link. Inactive crumbs are clickable navigation targets.
