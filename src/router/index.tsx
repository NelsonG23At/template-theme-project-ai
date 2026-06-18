import { createBrowserRouter, Navigate } from 'react-router'
import { RootLayout } from '../layouts/RootLayout'
import { requirePermission } from './guards/requirePermission'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" replace />,
      },
      {
        path: '/users',
        lazy: () => import('../features/users/pages/UserListPage').then(m => ({ Component: m.UserListPage })),
      },
      {
        path: '/users/:id',
        lazy: () => import('../features/users/pages/UserDetailPage').then(m => ({ Component: m.UserDetailPage })),
      },
      {
        path: '/users/:id/edit',
        loader: requirePermission('users:write'),
        lazy: () => import('../features/users/pages/UserEditPage').then(m => ({ Component: m.UserEditPage })),
      },
      {
        path: '/users/:id/roles',
        loader: requirePermission('roles:assign'),
        lazy: () => import('../features/users/pages/RoleAssignPage').then(m => ({ Component: m.RoleAssignPage })),
      },
      {
        path: '/components',
        lazy: () => import('../pages/ComponentsPage').then(m => ({ Component: m.ComponentsPage })),
      },
      {
        path: '*',
        lazy: () => import('../features/users/pages/NotFoundPage').then(m => ({ Component: m.NotFoundPage })),
      },
    ],
  },
])

export { router }
