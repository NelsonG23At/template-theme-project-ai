import { Table, Button, Space, Input } from 'antd'
import type { TableProps } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router'
import { RoleBadge } from '../../../shared/components/RoleBadge'
import { PermissionGate } from '../../../shared/components/PermissionGate'
import type { User } from '../../../core/types/user'
import { useUserList } from '../hooks/useUserList'

export function UserTable() {
  const { rows, total, state, isLoading, setSearch, setSort, setPage } = useUserList()

  const columns: TableProps<User>['columns'] = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: state.sortField === 'name' ? state.sortOrder ?? undefined : undefined,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortOrder: state.sortField === 'email' ? state.sortOrder ?? undefined : undefined,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: true,
      sortOrder: state.sortField === 'role' ? state.sortOrder ?? undefined : undefined,
      render: (role: User['role']) => <RoleBadge role={role} />,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (active: boolean) => (
        <span className={active ? 'text-success' : 'text-neutral-400'}>
          {active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: User) => (
        <Space>
          <Link to={`/users/${record.id}`}>
            <Button size="small" data-testid="action-view">View</Button>
          </Link>
          <PermissionGate permission="users:write">
            <Link to={`/users/${record.id}/edit`}>
              <Button size="small" type="primary" data-testid="action-edit">Edit</Button>
            </Link>
          </PermissionGate>
          <PermissionGate permission="roles:assign">
            <Link to={`/users/${record.id}/roles`}>
              <Button size="small" data-testid="action-assign-role">Assign Role</Button>
            </Link>
          </PermissionGate>
        </Space>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name, email, or username…"
        prefix={<SearchOutlined />}
        allowClear
        onChange={(e) => setSearch(e.target.value)}
        data-testid="user-search"
        className="max-w-sm"
      />
      <Table<User>
        rowKey="id"
        columns={columns}
        dataSource={rows}
        loading={isLoading}
        data-testid="user-table"
        onChange={(_pagination, _filters, sorter) => {
          if (Array.isArray(sorter)) return
          setSort(
            (sorter.field as 'name' | 'email' | 'role') ?? null,
            sorter.order ?? null,
          )
        }}
        pagination={{
          current: state.page,
          pageSize: state.pageSize,
          total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10'],
          onChange: setPage,
        }}
      />
    </div>
  )
}
