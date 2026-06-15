export type RoleId = 'admin' | 'editor' | 'viewer' | 'guest'

export interface Role {
  id: RoleId
  label: string
  description: string
}

export const ROLES: Role[] = [
  { id: 'admin',  label: 'Admin',  description: 'Full access to all resources' },
  { id: 'editor', label: 'Editor', description: 'Can read and write users and profiles' },
  { id: 'viewer', label: 'Viewer', description: 'Read-only access' },
  { id: 'guest',  label: 'Guest',  description: 'Profile read access only' },
]
