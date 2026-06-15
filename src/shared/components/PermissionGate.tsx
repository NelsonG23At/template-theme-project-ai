import type { ReactNode } from 'react'
import type { PermissionKey } from '../../core/types/permission'
import { useSession } from '../../core/session'

interface PermissionGateProps {
  permission: PermissionKey
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
  const canAccess = useSession((s) => s.can(permission))
  return canAccess ? <>{children}</> : <>{fallback}</>
}
