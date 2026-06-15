export type PermissionKey =
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'roles:read'
  | 'roles:assign'
  | 'profile:read'
  | 'profile:write'

export interface Permission {
  key: PermissionKey
  label: string
  description: string
}

export const PERMISSIONS: Permission[] = [
  { key: 'users:read',    label: 'Read Users',    description: 'View the user list and table' },
  { key: 'users:write',   label: 'Write Users',   description: 'Edit user profiles' },
  { key: 'users:delete',  label: 'Delete Users',  description: 'Remove users from the system' },
  { key: 'roles:read',    label: 'Read Roles',    description: 'View role assignments' },
  { key: 'roles:assign',  label: 'Assign Roles',  description: 'Change a user\'s role' },
  { key: 'profile:read',  label: 'Read Profile',  description: 'View a user\'s profile detail' },
  { key: 'profile:write', label: 'Write Profile', description: 'Edit a user\'s own profile' },
]
