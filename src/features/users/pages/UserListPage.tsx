import { Typography } from 'antd'
import { UserTable } from '../components/UserTable'

export function UserListPage() {
  return (
    <div className="p-6">
      <Typography.Title level={2}>Users</Typography.Title>
      <UserTable />
    </div>
  )
}
