import { Card, Descriptions, Typography, Space, Button, Tag } from 'antd'
import { Link } from 'react-router'
import { RoleBadge } from '../../../shared/components/RoleBadge'
import { PermissionGate } from '../../../shared/components/PermissionGate'
import { PERMISSIONS } from '../../../core/types/permission'
import { permissionMatrix } from '../../../core/permissions/matrix'
import type { User } from '../../../core/types/user'

interface UserProfileProps {
  user: User
}

export function UserProfile({ user }: UserProfileProps) {
  const userPermissions = permissionMatrix[user.role]

  return (
    <div className="space-y-4">
      <Card
        title={
          <Space>
            <Typography.Title level={4} style={{ margin: 0 }}>{user.name}</Typography.Title>
            <RoleBadge role={user.role} />
          </Space>
        }
        extra={
          <Space>
            <PermissionGate permission="users:write">
              <Link to={`/users/${user.id}/edit`}>
                <Button type="primary" data-testid="btn-edit">Edit</Button>
              </Link>
            </PermissionGate>
            <PermissionGate permission="roles:assign">
              <Link to={`/users/${user.id}/roles`}>
                <Button data-testid="btn-assign-role">Assign Role</Button>
              </Link>
            </PermissionGate>
          </Space>
        }
      >
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
          <Descriptions.Item label="Street">{user.address.street}, {user.address.suite}</Descriptions.Item>
          <Descriptions.Item label="City">{user.address.city}, {user.address.zipcode}</Descriptions.Item>
          <Descriptions.Item label="Company">{user.company.name}</Descriptions.Item>
          <Descriptions.Item label="Catch phrase">{user.company.catchPhrase}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Permissions">
        <Space wrap>
          {PERMISSIONS.map((p) => (
            <Tag
              key={p.key}
              color={userPermissions.includes(p.key) ? 'success' : 'default'}
              data-testid={`permission-${p.key}`}
            >
              {p.label}
            </Tag>
          ))}
        </Space>
      </Card>
    </div>
  )
}
