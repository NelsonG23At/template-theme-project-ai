import { createBrowserRouter, redirect, Navigate } from 'react-router'
import { requirePermission } from './guards/requirePermission'

const router = createBrowserRouter([
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
    path: '*',
    lazy: () => import('../features/users/pages/NotFoundPage').then(m => ({ Component: m.NotFoundPage })),
  },
])

export { router }
