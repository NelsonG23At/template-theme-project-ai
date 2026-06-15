import { Tag } from 'antd'
import { palette } from '../../core/brand/palette'
import type { RoleId } from '../../core/types/role'

const ROLE_COLORS: Record<RoleId, string> = {
  admin:  palette.roleAdmin,
  editor: palette.roleEditor,
  viewer: palette.roleViewer,
  guest:  palette.roleGuest,
}

const ROLE_LABELS: Record<RoleId, string> = {
  admin:  'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
  guest:  'Guest',
}

interface RoleBadgeProps {
  role: RoleId
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Tag color={ROLE_COLORS[role]} data-testid="role-badge">
      {ROLE_LABELS[role]}
    </Tag>
  )
}
