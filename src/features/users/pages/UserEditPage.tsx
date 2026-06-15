import { useParams, Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { Spin, Alert, Button, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { userKeys } from '../../../core/api/keys'
import { fetchUser } from '../../../core/api/users'
import { UserEditForm } from '../components/UserEditForm'
import type { UserRouteParams } from '../../../core/types/user'

export function UserEditPage() {
  const { id } = useParams<UserRouteParams>()
  const userId = Number(id)

  const { data: user, isLoading, isError } = useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
    enabled: !isNaN(userId),
  })

  if (isLoading) return <div className="p-6"><Spin size="large" /></div>
  if (isError || !user) return <div className="p-6"><Alert type="error" message="Failed to load user" /></div>

  return (
    <div className="p-6 space-y-4">
      <Link to={`/users/${user.id}`}>
        <Button icon={<ArrowLeftOutlined />}>Back to Profile</Button>
      </Link>
      <Typography.Title level={3}>Edit {user.name}</Typography.Title>
      <UserEditForm user={user} />
    </div>
  )
}
