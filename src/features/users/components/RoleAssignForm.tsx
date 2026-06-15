import { Card, Radio, Space, Tag, Button, Typography } from 'antd'
import { useNavigate } from 'react-router'
import { ROLES } from '../../../core/types/role'
import { PERMISSIONS } from '../../../core/types/permission'
import { permissionMatrix } from '../../../core/permissions/matrix'
import { RoleBadge } from '../../../shared/components/RoleBadge'
import { useRoleAssign } from '../hooks/useRoleAssign'
import type { User } from '../../../core/types/user'
import type { RoleId } from '../../../core/types/role'

interface RoleAssignFormProps {
  user: User
}

export function RoleAssignForm({ user }: RoleAssignFormProps) {
  const navigate = useNavigate()
  const { selectedRole, setSelectedRole, diff, confirm, isPending } = useRoleAssign(user)

  const currentPermissions = permissionMatrix[user.role]

  return (
    <div className="space-y-4">
      <Card title={<>Assign Role — <RoleBadge role={user.role} /></>}>
        <Radio.Group
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as RoleId)}
          data-testid="role-radio-group"
        >
          <Space direction="vertical">
            {ROLES.map((r) => (
              <Radio key={r.id} value={r.id} data-testid={`role-option-${r.id}`}>
                <Space>
                  <RoleBadge role={r.id} />
                  <Typography.Text type="secondary">{r.description}</Typography.Text>
                </Space>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Card>

      <Card title="Permission Diff">
        {diff.gained.length === 0 && diff.lost.length === 0 ? (
          <Typography.Text type="secondary">No changes — same role selected.</Typography.Text>
        ) : (
          <div className="space-y-2">
            {PERMISSIONS.map((p) => {
              const wasActive = currentPermissions.includes(p.key)
              const isGained = diff.gained.includes(p.key)
              const isLost = diff.lost.includes(p.key)

              if (!wasActive && !isGained) return null

              return (
                <Tag
                  key={p.key}
                  color={isGained ? 'success' : isLost ? 'error' : 'default'}
                  data-testid={`diff-${p.key}`}
                >
                  {isGained && '+ '}
                  {isLost && '− '}
                  {p.label}
                </Tag>
              )
            })}
          </div>
        )}
      </Card>

      <Space>
        <Button
          type="primary"
          loading={isPending}
          disabled={selectedRole === user.role}
          onClick={confirm}
          data-testid="btn-confirm-role"
        >
          Confirm Role Change
        </Button>
        <Button onClick={() => void navigate(`/users/${user.id}`)} data-testid="btn-cancel-role">
          Cancel
        </Button>
      </Space>
    </div>
  )
}
