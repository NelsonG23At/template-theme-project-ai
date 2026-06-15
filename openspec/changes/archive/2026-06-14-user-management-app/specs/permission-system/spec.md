## ADDED Requirements

### Requirement: Permission matrix is a static typed constant
The system SHALL define the authoritative mapping of `RoleId` to `PermissionKey[]` as a typed constant in `src/core/permissions/matrix.ts`. The matrix SHALL NOT be derived at runtime.

#### Scenario: Matrix is importable and type-safe
- **WHEN** a developer imports the matrix
- **THEN** TypeScript SHALL enforce that all `RoleId` keys and `PermissionKey` values are valid

### Requirement: Session store exposes a can() gate
The system SHALL expose a `can(permission: PermissionKey): boolean` function from the Zustand session store that reads the active role and consults the matrix.

#### Scenario: Admin can assign roles
- **WHEN** the active role is `admin` and `can('roles:assign')` is called
- **THEN** it SHALL return `true`

#### Scenario: Viewer cannot write users
- **WHEN** the active role is `viewer` and `can('users:write')` is called
- **THEN** it SHALL return `false`

### Requirement: PermissionGate renders children conditionally
The system SHALL provide a `<PermissionGate permission={PermissionKey}>` component that renders its children only when `can(permission)` returns true, and renders `fallback` (default: null) otherwise.

#### Scenario: Authorized content renders
- **WHEN** `<PermissionGate permission="users:write">` is rendered with active role `editor`
- **THEN** the children SHALL be rendered

#### Scenario: Unauthorized content is hidden
- **WHEN** `<PermissionGate permission="users:delete">` is rendered with active role `viewer`
- **THEN** the children SHALL NOT be rendered and the fallback SHALL be shown

### Requirement: Role switcher allows changing active role
The system SHALL provide a role-switcher dropdown in the application header that calls `setActiveRole()` on the session store, immediately updating all permission checks in the UI.

#### Scenario: Role switch updates gated UI
- **WHEN** the active role is switched from `viewer` to `admin`
- **THEN** previously hidden Edit and Assign Role buttons SHALL become visible without a page reload
