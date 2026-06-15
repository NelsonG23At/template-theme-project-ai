import { redirect } from 'react-router'
import type { PermissionKey } from '../../core/types/permission'
import { useSession } from '../../core/session'

export function requirePermission(permission: PermissionKey, redirectTo = '/users') {
  return () => {
    const { can } = useSession.getState()
    if (!can(permission)) return redirect(redirectTo)
    return null
  }
}
