# User Profile Spec

## Purpose

Defines the user profile page (`/users/:id`) that displays all fields for a single user in a read-only card layout, shows the user's role and permission list, and renders permission-gated action buttons.

## Requirements

### Requirement: User profile displays all user fields
The system SHALL fetch a single user via `GET /users/:id` and display all `ApiUser` fields in a read-only profile card layout.

#### Scenario: Profile loads successfully
- **WHEN** the user navigates to `/users/:id`
- **THEN** the profile SHALL display name, username, email, phone, website, full address, and company fields

#### Scenario: Profile shows role and permissions
- **WHEN** the profile card is rendered
- **THEN** the user's current role SHALL be displayed as a `<RoleBadge>` and the full permission list for that role SHALL be listed below it

### Requirement: Profile action buttons respect permissions
The system SHALL render Edit and Assign Role action buttons on the profile page only when the active session role has the required permissions (`users:write` and `roles:assign` respectively).

#### Scenario: Editor sees Edit but not Assign Role
- **WHEN** the active role is `editor` and the profile page is rendered
- **THEN** the Edit button SHALL be visible and the Assign Role button SHALL be hidden

#### Scenario: Guest sees no action buttons
- **WHEN** the active role is `guest`
- **THEN** neither Edit nor Assign Role buttons SHALL be rendered
