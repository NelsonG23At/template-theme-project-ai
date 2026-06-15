import type { RoleId } from '../types/role'
import type { PermissionKey } from '../types/permission'

export const permissionMatrix: Record<RoleId, PermissionKey[]> = {
  admin: [
    'users:read',
    'users:write',
    'users:delete',
    'roles:read',
    'roles:assign',
    'profile:read',
    'profile:write',
  ],
  editor: [
    'users:read',
    'users:write',
    'roles:read',
    'profile:read',
    'profile:write',
  ],
  viewer: [
    'users:read',
    'roles:read',
    'profile:read',
  ],
  guest: [
    'profile:read',
  ],
}
