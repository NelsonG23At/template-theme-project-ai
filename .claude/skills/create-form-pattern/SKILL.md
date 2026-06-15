---
name: create-form-pattern
description: Generate a form component with full RHF + Zod + Antd Controller bridge using the 3-agent orchestration pipeline. Use when the user calls create-form-pattern(...) or requests any component that owns form state — single forms, multi-section forms, or multi-step wizards.
license: MIT
compatibility: Requires Ant Design v5, React Hook Form, Zod, Tailwind CSS, React Query, Storybook.
metadata:
  author: atmosera
  version: "1.0"
---

Generate a production-ready form component through a structured 3-agent pipeline, with full React Hook Form + Zod + Ant Design integration.

**Trigger format:**
```
create-form-pattern(
  name="FormName",
  antd=["Component1", "Component2"],
  fields=[
    { name: "fieldName", type: "text|select|number|date|switch|textarea|password|radio", required?: true, options?: ["a", "b"] },
    { name: "nested.field", type: "text", required?: true }
  ],
  requirement="Natural language description"
)
```

**`fields` param rules:**
- `name`: dot-notation for nested fields (e.g., `"address.city"`)
- `type`: maps to the Antd input — `text`→AntdInput, `select`→AntdSelect, `number`→AntdInputNumber, `date`→AntdDatePicker, `switch`→AntdSwitch, `textarea`→AntdInput.TextArea, `password`→AntdInput.Password, `radio`→AntdRadio.Group
- `options`: required when `type="select"` or `type="radio"`
- `required`: drives Zod `.min(1)` / `.nonempty()` rules

For pure UI components without forms use `create-component-pattern`.

---

## Agent 1 — Design Pattern Strategist

Analyze the `requirement` and autonomously select the best pattern(s):

- **Container/Presenter** — mutation logic and React Query in container hook; form view stays pure
- **Nested / Child Steps** — multi-step wizard where each step is a standalone component sharing RHF `control` passed down from a parent orchestrator
- **Compound Components** — tab-grouped or accordion-grouped form sections sharing implicit form context via React Context

**Output:** "Architectural Diagnosis" — selected pattern(s) + justification tied to the specific requirement.

---

## Agent 2 — Ant Design & RHF Specialist

**Mandatory alias rule — no exceptions:**
```ts
import { Form as AntdForm, Input as AntdInput, Select as AntdSelect, Button as AntdButton } from 'antd'
```
Every Antd component must be prefixed `Antd[ComponentName]` throughout all generated code.

**RHF integration blueprint:**

1. `useForm<FormValues>({ resolver: zodResolver(schema), defaultValues })` lives in the custom hook, never in the view
2. Every field from the `fields` param is wrapped in `<Controller />`:
   ```tsx
   <Controller
     name="fieldName"
     control={control}
     render={({ field }) => <AntdInput {...field} data-testid="field-fieldName" />}
   />
   ```
3. `AntdForm.Item` is used **only** for layout, label, and error display:
   ```tsx
   <AntdForm.Item
     label="Field Label"
     validateStatus={errors.fieldName ? 'error' : ''}
     help={errors.fieldName?.message}
   >
     <Controller ... />
   </AntdForm.Item>
   ```
4. **NEVER** pass `form={form}` to `AntdForm` — Antd's own form state is never used

**Field-to-Controller mapping:**
| Field type | Controller render target |
|---|---|
| `text` / `password` | `<AntdInput {...field} />` / `<AntdInput.Password {...field} />` |
| `textarea` | `<AntdInput.TextArea {...field} />` |
| `number` | `<AntdInputNumber {...field} onChange={val => field.onChange(val)} />` |
| `select` | `<AntdSelect {...field} options={...} onChange={val => field.onChange(val)} />` |
| `date` | `<AntdDatePicker value={field.value ? dayjs(field.value) : null} onChange={d => field.onChange(d?.toISOString())} />` |
| `switch` | `<AntdSwitch checked={field.value as boolean} onChange={field.onChange} />` |
| `radio` | `<AntdRadio.Group {...field} options={...} />` |

**Mutation strategy:**
- `useMutation` with `onSuccess` cache invalidation lives in the hook
- `onSubmit` = `handleSubmit(values => mutation.mutate(values))` in the hook
- View receives `onSubmit`, `isSubmitting`, `errors`, `control` as props

**Output:** Alias mapping table + per-field Controller blueprint + mutation strategy.

---

## Agent 3 — Screaming Architecture Engineer

**Single-form structure:**
```
FormName/
├── index.ts
├── FormName.tsx                  # View — AntdForm.Item layout only
├── FormName.types.ts             # FormValues (z.infer), Props interface
├── FormName.stories.tsx          # CSF3 stories
├── schemas/
│   └── <formName>.schema.ts      # Zod schema — single source of truth
├── hooks/
│   └── use<FormName>.ts          # useForm, defaultValues, mutation, onSubmit
└── partials/
    └── <SectionName>Fields.tsx   # Only if multi-section
```

**Multi-step wizard structure:**
```
FormName/
├── index.ts
├── FormNameWizard.tsx            # Orchestrator — owns useForm, passes control down
├── FormNameWizard.types.ts       # Full FormValues, step enum, Props interfaces
├── FormNameWizard.stories.tsx
├── steps/
│   ├── Step1<Name>.tsx
│   ├── Step2<Name>.tsx
│   └── Step3<Name>.tsx
├── schemas/
│   └── <formName>.schema.ts
└── hooks/
    └── use<FormName>Wizard.ts    # Step navigation state + combined submit logic
```

**Output:** Full target directory tree.

---

## Code Generation Standards

Generate files **in this order**: `schema → types → hook → view → partials/steps → index → stories`

**TypeScript:**
- `FormValues` type derived exclusively from Zod: `type FormValues = z.infer<typeof schema>`
- No `any` anywhere — Zod is the single source of truth for all form types
- `strict: true`

**Styling:**
- Tailwind CSS for layout and spacing only
- `theme.useToken()` for semantic color, border, and radius values

**State isolation:**
- Hook owns: `useForm`, `useMutation`, `defaultValues`, `onSubmit`, `isPending`
- View receives as props: `control`, `errors`, `onSubmit`, `isSubmitting`, `isPending`
- View has zero direct calls to `useForm`, `useMutation`, or React Query

**Accessibility:**
- `data-testid` on every input (`field-<name>`), submit button (`btn-submit`), cancel button (`btn-cancel`)

---

## Storybook (Mandatory)

Generate `FormName.stories.tsx` in CSF3 format.

**Requirements:**
- Wrap all stories in brand `ConfigProvider` + `QueryClientProvider` with a fresh `QueryClient`
- Required stories: `Default` (empty/create), `Prefilled` (edit mode), `ValidationErrors`, `Submitting`, `Success`
- Mock `onSubmit` with `fn()` from `@storybook/test`

**DO NOT** use Playwright MCP to validate Storybook stories. Confirm 0 terminal errors and that the story title registers in the sidebar.

---

## Output Format

```
### 🏛️ [FormName] Architectural Diagnosis
- **Selected Pattern(s):** ...
- **Justification:** ...
- **Antd & RHF Strategy:** ...

### 📂 Target Directory Tree
[tree]

### 💻 Generated Code
[files in order: schema → types → hook → view → index → stories]
```

After generating all files, run `npx tsc --noEmit` and confirm 0 errors on the new files before reporting completion.
