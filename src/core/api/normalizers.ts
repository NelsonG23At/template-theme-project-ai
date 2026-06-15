import type { ApiUser, User } from '../types/user'
import type { RoleId } from '../types/role'

const ROLE_CYCLE: RoleId[] = ['admin', 'editor', 'viewer', 'guest']

export function normalizeUser(raw: ApiUser): User {
  return {
    ...raw,
    role: ROLE_CYCLE[raw.id % ROLE_CYCLE.length] as RoleId,
    isActive: raw.id % 3 !== 0,
  }
}
