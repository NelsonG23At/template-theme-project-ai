## ADDED Requirements

### Requirement: User list displays all users in a paginated table
The system SHALL fetch all users from `GET /users` via React Query and display them in an Ant Design `<Table>` with client-side pagination defaulting to 5 rows per page.

#### Scenario: Initial page load
- **WHEN** the user navigates to `/users`
- **THEN** the table SHALL display the first 5 users with columns: #, Name, Username, Email, Role, Status, Actions

#### Scenario: Page size change
- **WHEN** the user selects 10 from the page size dropdown
- **THEN** the table SHALL display up to 10 users per page

### Requirement: User list supports client-side search
The system SHALL filter the displayed rows by `name`, `email`, or `username` fields using a debounced (300ms) search input. Filtering SHALL be case-insensitive.

#### Scenario: Search matches name
- **WHEN** the user types "Leanne" in the search input
- **THEN** only users whose name, email, or username contains "leanne" (case-insensitive) SHALL be displayed

#### Scenario: No results
- **WHEN** the search term matches no users
- **THEN** the table SHALL display an empty state message

### Requirement: User list supports column sorting
The system SHALL allow toggling ascending/descending sort on the `name`, `email`, and `role` columns.

#### Scenario: Sort by name ascending
- **WHEN** the user clicks the Name column header once
- **THEN** rows SHALL be ordered alphabetically by name A→Z

#### Scenario: Sort by name descending
- **WHEN** the user clicks the Name column header a second time
- **THEN** rows SHALL be ordered alphabetically by name Z→A

### Requirement: Row actions are permission-gated
Each row SHALL display action buttons (View, Edit, Assign Role) rendered only when the active session role has the required permission.

#### Scenario: Viewer sees only View action
- **WHEN** the active role is `viewer`
- **THEN** only the View action SHALL be visible per row; Edit and Assign Role SHALL be hidden

#### Scenario: Admin sees all actions
- **WHEN** the active role is `admin`
- **THEN** View, Edit, and Assign Role actions SHALL all be visible per row
