import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import { brandTheme } from '../../../core/brand'
import { UserTable } from './UserTable'

const makeClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } })

const meta: Meta<typeof UserTable> = {
  title: 'Features/Users/UserTable',
  component: UserTable,
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

type Story = StoryObj<typeof UserTable>

export const Default: Story = {}
