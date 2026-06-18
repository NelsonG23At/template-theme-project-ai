import { useParams, Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { Spin, Alert, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { userKeys } from '../../../core/api/keys'
import { fetchUser } from '../../../core/api/users'
import { UserProfile } from '../components/UserProfile'
import type { UserRouteParams } from '../../../core/types/user'

export function UserDetailPage() {
  const { id } = useParams<UserRouteParams>()
  const userId = Number(id)

  const { data: user, isLoading, isError } = useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUser(userId),
    enabled: !isNaN(userId),
  })

  if (isLoading) return <div className="p-6"><Spin size="large" /></div>
  if (isError || !user) return <div className="p-6"><Alert type="error" title="Failed to load user" /></div>

  return (
    <div className="p-6 space-y-4">
      <Link to="/users">
        <Button icon={<ArrowLeftOutlined />}>Back to Users</Button>
      </Link>
      <UserProfile user={user} />
    </div>
  )
}
