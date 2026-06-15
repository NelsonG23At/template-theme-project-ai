## 1. Dependencies & Project Setup

- [x] 1.1 Install runtime dependencies: `antd`, `@ant-design/icons`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `react-hook-form`, `@hookform/resolvers`, `zod`, `react-router`, `zustand`
- [x] 1.2 Install dev dependencies: `@storybook/react-vite`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `@playwright/test`, `@types/react`
- [x] 1.3 Initialize Tailwind CSS config (`tailwind.config.ts`) and wire `@tailwindcss/vite` plugin in `vite.config.ts`
- [x] 1.4 Initialize Storybook with `npx storybook init`

## 2. Brand & Theme System

- [x] 2.1 Create `src/core/brand/palette.ts` with all raw color primitives
- [x] 2.2 Create `src/core/brand/tokens.ts` importing from palette; export CSS custom-property block and Tailwind `theme.extend` object
- [x] 2.3 Inject CSS variables at `:root` in `src/index.css` from tokens
- [x] 2.4 Wire `theme.extend` into `tailwind.config.ts`
- [x] 2.5 Create `src/core/brand/components/buttons.ts` with Ant Design Button token overrides
- [x] 2.6 Create `src/core/brand/components/cards.ts` with Ant Design Card token overrides
- [x] 2.7 Create `src/core/brand/components/index.ts` barrel export
- [x] 2.8 Create `src/core/brand/index.ts` combining tokens + component overrides into `brandTheme` object

## 3. Core Types & Permission System

- [x] 3.1 Create `src/core/types/user.ts` with `ApiUser`, `User`, `UserRouteParams`
- [x] 3.2 Create `src/core/types/role.ts` with `RoleId` and `Role`
- [x] 3.3 Create `src/core/types/permission.ts` with `PermissionKey` and `Permission`
- [x] 3.4 Create `src/core/permissions/matrix.ts` with the static `RoleId → PermissionKey[]` map
- [x] 3.5 Create `src/core/session/index.ts` Zustand store with `activeRole`, `setActiveRole`, and `can()`

## 4. API Layer

- [x] 4.1 Create `src/core/api/keys.ts` with typed `userKeys` query key factory
- [x] 4.2 Create `src/core/api/normalizers.ts` with `normalizeUser(raw: ApiUser): User`
- [x] 4.3 Create `src/core/api/users.ts` with `fetchUsers()`, `fetchUser(id)`, and `updateUser(id, patch)`

## 5. Routing

- [x] 5.1 Create `src/router/guards/requirePermission.ts` loader guard factory
- [x] 5.2 Create `src/router/index.tsx` with full `createBrowserRouter` route tree (/, /users, /users/:id, /users/:id/edit, /users/:id/roles, *)
- [x] 5.3 Wire lazy imports for all page components in the route tree

## 6. Shared Components

- [x] 6.1 Create `src/shared/components/RoleBadge.tsx` + `RoleBadge.stories.tsx`
- [x] 6.2 Create `src/shared/components/PermissionGate.tsx` + `PermissionGate.stories.tsx`

## 7. User List Feature

- [x] 7.1 Create `src/features/users/hooks/useUserList.ts` with filter, sort, and pagination state
- [x] 7.2 Create `src/features/users/components/UserTable.tsx` using Ant Design `<Table>`
- [x] 7.3 Create `src/features/users/components/UserTable.stories.tsx`
- [x] 7.4 Create `src/features/users/pages/UserListPage.tsx`

## 8. User Profile Feature

- [x] 8.1 Create `src/features/users/components/UserProfile.tsx`
- [x] 8.2 Create `src/features/users/components/UserProfile.stories.tsx`
- [x] 8.3 Create `src/features/users/pages/UserDetailPage.tsx`

## 9. User Edit Feature

- [x] 9.1 Create `src/features/users/schemas/userEdit.schema.ts` with Zod schema
- [x] 9.2 Create `src/features/users/components/UserEditForm.tsx` wired with React Hook Form + `zodResolver`
- [x] 9.3 Create `src/features/users/components/UserEditForm.stories.tsx`
- [x] 9.4 Create `src/features/users/pages/UserEditPage.tsx`

## 10. Role Assignment Feature

- [x] 10.1 Create `src/features/users/hooks/useRoleAssign.ts`
- [x] 10.2 Create `src/features/users/components/RoleAssignForm.tsx` with live permission diff
- [x] 10.3 Create `src/features/users/components/RoleAssignForm.stories.tsx`
- [x] 10.4 Create `src/features/users/pages/RoleAssignPage.tsx`

## 11. App Root Wiring

- [x] 11.1 Update `src/App.tsx` to wrap with `<ConfigProvider theme={brandTheme}>`, `<QueryClientProvider>`, and `<RouterProvider>`
- [x] 11.2 Add role-switcher dropdown to app header
- [x] 11.3 Create `src/features/users/pages/NotFoundPage.tsx` for `*` route

## 12. Tests

- [x] 12.1 Write Vitest unit tests for `can()` covering all role/permission combinations
- [x] 12.2 Write Vitest unit tests for `useUserList` filter, sort, and pagination logic
- [x] 12.3 Write React Testing Library integration test for `UserTable` (renders rows, search filters)
- [x] 12.4 Write Playwright E2E test for user list → profile → edit flow
- [x] 12.5 Write Playwright E2E test for role assignment with permission diff verification
