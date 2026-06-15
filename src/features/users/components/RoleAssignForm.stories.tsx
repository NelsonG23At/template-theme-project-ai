import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import { brandTheme } from '../../../core/brand'
import { RoleAssignForm } from './RoleAssignForm'
import type { User } from '../../../core/types/user'

const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031',
  website: 'hildegard.org',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: { lat: '-37.3159', lng: '81.1496' },
  },
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
  role: 'admin',
  isActive: true,
}

const makeClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } })

const meta: Meta<typeof RoleAssignForm> = {
  title: 'Features/Users/RoleAssignForm',
  component: RoleAssignForm,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <QueryClientProvider client={makeClient()}>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </QueryClientProvider>
      </ConfigProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof RoleAssignForm>

export const AdminUser: Story = { args: { user: mockUser } }
export const ViewerUser: Story = { args: { user: { ...mockUser, role: 'viewer' } } }
