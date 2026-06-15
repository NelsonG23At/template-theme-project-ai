## Why

The application requires a fully functional User Management interface to demonstrate profile viewing, role-based access control, and CRUD operations against the JSONPlaceholder Users API. This is the foundational feature module of the application.

## What Changes

- Introduce a paginated, searchable, sortable user table at `/users`
- Introduce a user profile detail view at `/users/:id`
- Introduce a user edit form at `/users/:id/edit` with Zod validation
- Introduce a role assignment screen at `/users/:id/roles` with live permission diff preview
- Introduce a centralized brand theming system (palette → tokens → Ant Design ConfigProvider)
- Introduce a session store with mock active role and a `can(permission)` gate
- Introduce a permission matrix mapping four roles to seven permission keys
- Wire React Router `createBrowserRouter` with loader-based permission guards
- Wire React Query for all server state with typed query key factory
- Wire React Hook Form + Zod via `zodResolver` for all form state

## Capabilities

### New Capabilities

- `brand-theme`: Centralized palette, semantic tokens, and Ant Design ConfigProvider theme — palette.ts → tokens.ts → components/ → index.ts
- `user-list`: Paginated (client-side, pageSize 5/10), searchable, sortable table of all users with role badges and row actions
- `user-profile`: Read-only profile card showing all ApiUser fields, role badge, and permission list for the assigned role
- `user-edit`: Pre-populated React Hook Form for editing user fields with Zod validation and optimistic cache update
- `role-assignment`: Role selector with live permission diff (gained/lost) and optimistic cache update
- `permission-system`: Static role→permission matrix, `can()` gate, `<PermissionGate>` component, and session store for active role
- `routing`: Full `createBrowserRouter` route tree with loader guards, lazy-loaded route modules, and typed params

### Modified Capabilities

- `architecture-rules`: No requirement changes — implementation details only

## Impact

- **New dependencies**: `antd`, `tailwindcss`, `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`, `react-router`, `zustand` (session store)
- **New dev dependencies**: `@storybook/react-vite`, `vitest`, `@testing-library/react`, `@playwright/test`
- **Source root**: `src/` restructured from scaffold into `core/`, `features/users/`, `router/`, `shared/`
- **No external API changes**: JSONPlaceholder is read-only; all mutations are optimistic cache updates only
