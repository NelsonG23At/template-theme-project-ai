import { Layout, Select, Space, Typography } from 'antd'
import { Outlet, Link, useLocation } from 'react-router'
import { useSession } from '../core/session'
import { ROLES } from '../core/types/role'
import type { RoleId } from '../core/types/role'

const NAV_LINKS = [
  { to: '/users',      label: 'Users'      },
  { to: '/components', label: 'Components' },
] as const

function NavLink({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation()
  const active = pathname.startsWith(to)
  return (
    <Link
      to={to}
      className={[
        'no-underline text-sm transition-colors',
        active ? 'text-white font-semibold' : 'text-white/65 font-normal hover:text-white',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

function AppHeader() {
  const { activeRole, setActiveRole } = useSession()

  return (
    <Layout.Header className="flex items-center justify-between px-6">
      <Space size="large">
        <Typography.Title level={4}>
          User Management
        </Typography.Title>
        <Space size="middle">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} label={link.label} />
          ))}
        </Space>
      </Space>
      <Space>
        <Typography.Text className="!text-white/65">Role:</Typography.Text>
        <Select
          value={activeRole}
          onChange={(v) => setActiveRole(v as RoleId)}
          className="w-[130px]"
          data-testid="role-switcher"
          options={ROLES.map((r) => ({ value: r.id, label: r.label }))}
        />
      </Space>
    </Layout.Header>
  )
}

export function RootLayout() {
  return (
    <Layout className="min-h-screen">
      <AppHeader />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
