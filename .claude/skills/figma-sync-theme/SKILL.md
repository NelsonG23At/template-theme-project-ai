---
name: figma-sync-theme
description: Sync design tokens from a Figma file into the project's brand palette. Use when the user calls figma-sync-theme or sync-figma-tokens, or asks to sync/update colors or palettes from Figma in any language (e.g., "sincroniza los colores desde figma", "actualiza la paleta desde figma").
license: MIT
compatibility: Requires Figma MCP server (get_file / get_nodes). Targets src/core/brand/palette.ts as the single source of raw color values.
metadata:
  author: atmosera
  version: "1.0"
---

Sync design tokens from Figma into `src/core/brand/palette.ts` via a 3-agent pipeline.

**Trigger examples:**
- `figma-sync-theme`
- `figma-sync-theme(file_id="abc123")`
- `sync-figma-tokens` (legacy alias)
- "sincroniza los colores desde figma"
- "actualiza la paleta con los tokens de figma"

---

## Pre-flight: Figma MCP Check

Before running the pipeline, verify the Figma MCP server is active. If `get_file` is not available:
1. Check `.claude/settings.json` — `"figma"` must be in `enabledMcpjsonServers`
2. If missing, add it and inform the user to restart Claude Code so the MCP server connects
3. Do NOT proceed with the pipeline until `get_file` is callable

---

## Agent 1 — Design System Inspector

**Task:** Locate the Figma File ID and fetch color variables via the Figma MCP.

**Step 1 — Resolve the File ID:**
- If the user passed `file_id="..."` in the trigger, use that directly
- Otherwise scan in order:
  1. `.env` or `.env.local` for `FIGMA_FILE_ID`
  2. `package.json` for a `figma` config key
  3. Ask the user: "Please provide the Figma File ID (found in the URL: figma.com/file/**<FILE_ID>**/...)"

**Step 2 — Fetch the Figma file:**
```
get_file(file_id: "<resolved_file_id>")
```

**Step 3 — Extract color variables:**
From the API response, locate:
- Local variables grouped by collection (e.g., `Brand`, `Neutral`, `Semantic`)
- Published styles if variables are not present (`FILL` type styles only)
- Extract all color values as HEX or RGBA, converting RGBA to HEX where needed

**RGBA → HEX conversion formula:**
```
r = Math.round(r * 255).toString(16).padStart(2, '0')
g = Math.round(g * 255).toString(16).padStart(2, '0')
b = Math.round(b * 255).toString(16).padStart(2, '0')
hex = `#${r}${g}${b}`
```

**Output:** Clean JSON list of raw tokens found:
```json
{
  "Brand/Primary-50":  "#f5f3ff",
  "Brand/Primary-500": "#8b5cf6",
  "Neutral/0":         "#ffffff",
  "Semantic/Success":  "#22c55e"
}
```

---

## Agent 2 — Ant Design Token Mapper

**Task:** Map Figma variable names to the project's `palette.ts` keys and Antd v5 semantic tokens.

**Palette key mapping convention:**
| Figma Variable Pattern | `palette.ts` Key | Antd v5 Token (via `tokens.ts`) |
|---|---|---|
| `Brand/Primary-50` | `primary50` | — |
| `Brand/Primary-500` | `primary500` | — |
| `Brand/Primary-600` | `primary600` | `colorPrimary` |
| `Brand/Primary-700` | `primary700` | `colorPrimaryHover` |
| `Neutral/0` | `neutral0` | `colorBgContainer` |
| `Neutral/50` | `neutral50` | `colorBgLayout` |
| `Neutral/900` | `neutral900` | `colorText` |
| `Neutral/500` | `neutral500` | `colorTextSecondary` |
| `Neutral/200` | `neutral200` | `colorBorder` |
| `Semantic/Success` | `success` | `colorSuccess` |
| `Semantic/Warning` | `warning` | `colorWarning` |
| `Semantic/Error` | `error` | `colorError` |
| `Semantic/Info` | `info` | `colorInfo` |

**Diff output — compare old `palette.ts` values against Figma values:**
| `palette.ts` Key | Antd v5 Token | Old Value | New Value (Figma) | Changed? |
|---|---|---|---|---|
| `primary600` | `colorPrimary` | `#7c3aed` | `#6366f1` | ✅ |
| `neutral900` | `colorText` | `#111827` | `#111827` | — |

Only show rows where a value was found in Figma. Skip palette keys with no Figma counterpart.

---

## Agent 3 — Code Injection Engineer

**Task:** Write the new values into `src/core/brand/palette.ts` — the single source of all raw color values.

**Target file:** `src/core/brand/palette.ts`

**Rules:**
1. **Only update keys that have a new Figma value** — never touch keys with no Figma counterpart (e.g., `roleAdmin`, `roleEditor`, `roleViewer`, `roleGuest` unless Figma explicitly defines them)
2. **Preserve the existing structure** — same key names, same grouping comments, same `as const` and `PaletteKey` export
3. **Hex values only** — convert any RGBA from Figma to hex before writing
4. **No other files touched** — `tokens.ts`, `index.ts`, `tailwind.config.ts` all derive from `palette.ts` automatically; do not edit them

**After writing `palette.ts`:**
1. Run `npx tsc --noEmit` — confirm 0 TypeScript errors
2. Report any palette keys that Figma did not cover (so the user knows what remained unchanged)

---

## Output Format

```
### 🎨 Figma Connection Status
- **File Analyzed:** [Figma File Name / ID]
- **Tokens Found:** [N variables extracted across X collections]

### 🗺️ Antd v5 Token Mapping Table
| palette.ts Key | Antd v5 Token | Old Value | New Value (Figma) | Changed? |
|---|---|---|---|---|
| `primary600` | `colorPrimary` | `#7c3aed` | `#6366f1` | ✅ |

### 💻 Updated palette.ts
[Full updated file content or unified diff]

### ✅ Validation
- TypeScript: 0 errors
- Keys not covered by Figma: [list]
```
