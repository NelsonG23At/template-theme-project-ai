# Role Assignment Spec

## Purpose

Defines the role assignment page (`/users/:id/roles`) where authorized users can change another user's role, see a live permission diff, and confirm the change with an optimistic cache update.

## Requirements

### Requirement: Role assignment displays current role and all options
The system SHALL display the user's current role and a radio group with all four `RoleId` options (`admin`, `editor`, `viewer`, `guest`).

#### Scenario: Current role is pre-selected
- **WHEN** the user navigates to `/users/:id/roles`
- **THEN** the radio group SHALL have the user's current role pre-selected

### Requirement: Role assignment shows live permission diff
The system SHALL display a live preview of permissions gained (highlighted green) and permissions lost (highlighted red) as the user selects a new role, compared to the user's current role.

#### Scenario: Selecting a less privileged role shows losses
- **WHEN** a user with role `admin` and the `editor` radio is selected
- **THEN** permissions held by `admin` but not `editor` SHALL appear as lost (red)

#### Scenario: Selecting a more privileged role shows gains
- **WHEN** a user with role `viewer` and the `admin` radio is selected
- **THEN** permissions held by `admin` but not `viewer` SHALL appear as gained (green)

#### Scenario: Selecting the same role shows no diff
- **WHEN** the currently assigned role radio is selected
- **THEN** no gained or lost permissions SHALL be shown

### Requirement: Confirming role assignment updates cache
The system SHALL apply the new role via an optimistic React Query cache update on the `User` entity and redirect to `/users/:id`.

#### Scenario: Role change is reflected immediately
- **WHEN** the user confirms a role change
- **THEN** the profile page SHALL show the new `<RoleBadge>` and updated permission list without a network re-fetch
