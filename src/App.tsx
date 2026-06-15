import { ConfigProvider, Layout, Select, Space, Typography } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { brandTheme } from './core/brand'
import { router } from './router'
import { useSession } from './core/session'
import { ROLES } from './core/types/role'
import type { RoleId } from './core/types/role'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
})

function AppHeader() {
  const { activeRole, setActiveRole } = useSession()

  return (
    <Layout.Header
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}
    >
      <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
        User Management
      </Typography.Title>
      <Space>
        <Typography.Text style={{ color: 'rgba(255,255,255,0.65)' }}>Role:</Typography.Text>
        <Select
          value={activeRole}
          onChange={(v) => setActiveRole(v as RoleId)}
          style={{ width: 130 }}
          data-testid="role-switcher"
          options={ROLES.map((r) => ({ value: r.id, label: r.label }))}
        />
      </Space>
    </Layout.Header>
  )
}

function App() {
  return (
    <ConfigProvider theme={brandTheme}>
      <QueryClientProvider client={queryClient}>
        <Layout style={{ minHeight: '100svh' }}>
          <AppHeader />
          <Layout.Content>
            <RouterProvider router={router} />
          </Layout.Content>
        </Layout>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
