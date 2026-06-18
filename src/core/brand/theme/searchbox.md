# Searchbox

A single-variant search input with a fixed search icon on the right.

---

## Structure

The searchbox is a fixed-width container split into two zones: a text area on the left (flex-1) and a search icon slot on the right (fixed).

| Property | Value |
|---|---|
| Width | 266px |
| Border radius | `rounded-8` |
| Background | `glass/surface-darker` rgba(250,251,252,0.64) |
| Border | `glass/stroke` rgba(255,255,255,0.3) |
| Shadow | `shadow/card` 0 2px 4px rgba(115,122,132,0.12) |

**Text area:** `p-12`, placeholder in `body/2` (Poppins Regular 14px), `text/muted` #a9b0bb.

**Icon slot:** `glass/surface-clear` rgba(250,251,252,0.32) + glass stroke border, `p-12`, full height, 16px search icon with subtle drop shadow.

---

## Notes

There is only one size and one state variant. Focused and active states are not defined in the component — handle focus at the wrapper level if needed.
