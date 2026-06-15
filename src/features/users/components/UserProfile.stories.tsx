import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfigProvider } from 'antd'
import { MemoryRouter } from 'react-router'
import { brandTheme } from '../../../core/brand'
import { UserProfile } from './UserProfile'
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

const meta: Meta<typeof UserProfile> = {
  title: 'Features/Users/UserProfile',
  component: UserProfile,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ConfigProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof UserProfile>

export const AdminUser: Story = { args: { user: mockUser } }
export const ViewerUser: Story = { args: { user: { ...mockUser, role: 'viewer' } } }
export const GuestUser: Story = { args: { user: { ...mockUser, role: 'guest' } } }
