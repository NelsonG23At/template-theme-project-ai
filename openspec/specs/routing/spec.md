# Routing Spec

## Purpose

Defines the client-side routing architecture using React Router's data router API (`createBrowserRouter`), including route structure, permission-guarded loaders, lazy-loaded page modules, and typed route params.

## Requirements

### Requirement: Route tree uses createBrowserRouter
The system SHALL define the full route tree using `createBrowserRouter` in `src/router/index.tsx` and pass it to `<RouterProvider>` in `main.tsx`. Legacy `<BrowserRouter>` + `<Routes>` JSX SHALL NOT be used.

#### Scenario: App boots with RouterProvider
- **WHEN** `main.tsx` is rendered
- **THEN** `<RouterProvider router={router}>` SHALL be the outermost routing wrapper

### Requirement: Root path redirects to /users
The system SHALL redirect `/` to `/users` automatically.

#### Scenario: Root navigation
- **WHEN** the user navigates to `/`
- **THEN** the browser URL SHALL change to `/users` and the user list SHALL be displayed

### Requirement: Routes are permission-guarded via loaders
Protected routes SHALL use loader functions from `src/router/guards/requirePermission.ts` that read the session store `can()` gate and redirect to `/users` if unauthorized.

#### Scenario: Unauthorized edit route redirects
- **WHEN** the active role is `viewer` and the user navigates to `/users/:id/edit`
- **THEN** the loader SHALL redirect to `/users` before the page renders

### Requirement: Route modules are lazy-loaded
All page components SHALL be loaded via `lazy: () => import('./pages/...')` to keep the initial bundle small.

#### Scenario: Code splitting is active
- **WHEN** the production bundle is built
- **THEN** each page component SHALL be emitted as a separate chunk file

### Requirement: Route params are typed
Each route with params SHALL declare a `RouteParams` interface and use `useParams<RouteParams>()` for type-safe access.

#### Scenario: User ID param is typed
- **WHEN** `useParams<UserRouteParams>()` is called inside a user route component
- **THEN** `params.id` SHALL be typed as `string` with no TypeScript error
