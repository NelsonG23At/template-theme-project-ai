import { create } from 'zustand'
import type { RoleId } from '../types/role'
import type { PermissionKey } from '../types/permission'
import { permissionMatrix } from '../permissions/matrix'

interface SessionState {
  activeRole: RoleId
  setActiveRole: (role: RoleId) => void
  can: (permission: PermissionKey) => boolean
}

export const useSession = create<SessionState>((set, get) => ({
  activeRole: 'viewer',
  setActiveRole: (role) => set({ activeRole: role }),
  can: (permission) => permissionMatrix[get().activeRole].includes(permission),
}))
