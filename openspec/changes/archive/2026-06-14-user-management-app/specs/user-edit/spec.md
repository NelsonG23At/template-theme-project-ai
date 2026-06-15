## ADDED Requirements

### Requirement: Edit form is pre-populated from cache
The system SHALL pre-populate the edit form with the current user's data from the React Query cache using `defaultValues`.

#### Scenario: Form loads with existing data
- **WHEN** the user navigates to `/users/:id/edit`
- **THEN** all editable fields SHALL be pre-filled with the user's current values

### Requirement: Edit form validates with Zod schema
The system SHALL validate form input against the Zod schema defined in `src/features/users/schemas/userEdit.schema.ts` via `zodResolver` before allowing submission.

#### Scenario: Invalid email blocked
- **WHEN** the user clears the email field and submits
- **THEN** a validation error message SHALL appear on the email field and the form SHALL NOT submit

#### Scenario: Valid form submits
- **WHEN** all fields pass Zod validation and the user submits
- **THEN** `useMutation` SHALL call `PUT /users/:id` and optimistically update the React Query cache

### Requirement: Read-only fields are non-editable
The fields `id`, `username`, and `address.geo` SHALL be displayed as read-only and excluded from the form submission payload.

#### Scenario: Username field is disabled
- **WHEN** the edit form is rendered
- **THEN** the username input SHALL be visually disabled and not focusable

### Requirement: Successful submission redirects to profile
After a successful mutation, the system SHALL redirect to `/users/:id`.

#### Scenario: Post-submit redirect
- **WHEN** the form is submitted successfully
- **THEN** the user SHALL be navigated to the profile page for the edited user
