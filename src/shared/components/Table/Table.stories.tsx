import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, Button, Space, Input, ConfigProvider } from 'antd'
import type { TableColumnsType } from 'antd'
import { brandTheme } from '../../../core/brand'
import { Table } from './Table'
import type { TableProps } from './Table.types'

// ─── Sample domain type ────────────────────────────────────────────────────────

type SampleUser = {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Inactive'
}

const mockUsers: SampleUser[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@acme.com', role: 'Admin',  status: 'Active'   },
  { id: 2, name: 'Bob Smith',     email: 'bob@acme.com',   role: 'Editor', status: 'Active'   },
  { id: 3, name: 'Carol White',   email: 'carol@acme.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Dave Brown',    email: 'dave@acme.com',  role: 'Editor', status: 'Active'   },
  { id: 5, name: 'Eve Martinez',  email: 'eve@acme.com',   role: 'Viewer', status: 'Active'   },
]

const roleColorMap: Record<SampleUser['role'], string> = {
  Admin:  'red',
  Editor: 'blue',
  Viewer: 'default',
}

const columns: TableColumnsType<SampleUser> = [
  { title: 'ID',   dataIndex: 'id',   key: 'id',   width: 64 },
  { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: SampleUser['role']) => (
      <Tag color={roleColorMap[role]}>{role}</Tag>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: SampleUser['status']) => (
      <Tag color={status === 'Active' ? 'success' : 'error'}>{status}</Tag>
    ),
  },
]

// ─── Concrete typed wrapper (resolves generic for Storybook) ──────────────────

function UserTable(props: TableProps<SampleUser>) {
  return <Table<SampleUser> {...props} />
}

// ─── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof UserTable> = {
  title: 'Shared/Table',
  component: UserTable,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="min-h-screen bg-gray-50 p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  tags: ['autodocs'],
  args: {
    dataSource: mockUsers,
    columns,
    rowKey: 'id',
    state: { status: 'success' },
  },
}

export default meta
type Story = StoryObj<typeof UserTable>

// ─── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {}

export const Loading: Story = {
  args: {
    state: { status: 'loading' },
    dataSource: [],
  },
}

export const Empty: Story = {
  args: {
    state: { status: 'empty' },
    dataSource: [],
  },
}

export const CustomEmpty: Story = {
  args: {
    state: { status: 'empty' },
    dataSource: [],
    empty: (
      <Space orientation="vertical" className="py-8">
        <span style={{ fontSize: 32 }}>🔍</span>
        <span>No users match your filters.</span>
        <Button size="small">Clear filters</Button>
      </Space>
    ),
  },
}

export const WithError: Story = {
  args: {
    state: { status: 'error', message: 'Failed to load users. Please try again.' },
    dataSource: [],
  },
}

export const WithToolbar: Story = {
  args: {
    toolbar: (
      <Space wrap>
        <Input.Search
          placeholder="Search by name..."
          style={{ width: 240 }}
          data-testid="toolbar-search"
          allowClear
        />
        <Button type="primary" data-testid="toolbar-add">
          Add User
        </Button>
      </Space>
    ),
  },
}

export const WithPagination: Story = {
  args: {
    pagination: {
      current: 1,
      pageSize: 3,
      total: 5,
      onChange: (page, pageSize) => { console.log('page:', page, 'pageSize:', pageSize) },
      showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} users`,
    },
  },
}

export const WithToolbarAndPagination: Story = {
  args: {
    toolbar: (
      <Space wrap>
        <Input.Search placeholder="Search..." style={{ width: 240 }} allowClear />
        <Button type="primary">Add User</Button>
      </Space>
    ),
    pagination: {
      current: 1,
      pageSize: 3,
      total: 5,
      onChange: (page, pageSize) => { console.log('page:', page, 'pageSize:', pageSize) },
      showTotal: (total) => `Total ${total} users`,
      showSizeChanger: true,
    },
  },
}

export const WithSelection: Story = {
  args: {
    selectedRowKeys: [1, 3],
    onSelectionChange: (keys) => { console.log('Selected:', keys) },
  },
}

export const WithSortCallback: Story = {
  args: {
    onSortChange: (sorter) => { console.log('Sort changed:', sorter) },
  },
}

export const Compact: Story = {
  args: {
    size: 'small',
    toolbar: (
      <Space>
        <Input.Search placeholder="Search..." style={{ width: 200 }} allowClear />
      </Space>
    ),
    pagination: {
      current: 1,
      pageSize: 5,
      total: 5,
      onChange: (page, pageSize) => { console.log('page:', page, 'pageSize:', pageSize) },
    },
  },
}
