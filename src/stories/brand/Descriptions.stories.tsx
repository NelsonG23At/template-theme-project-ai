import type { Meta, StoryObj } from '@storybook/react-vite'
import { Descriptions, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const items = [
  { key: '1', label: 'Name', children: 'Alice Johnson' },
  { key: '2', label: 'Email', children: 'alice@acme.com' },
  { key: '3', label: 'Role', children: 'Admin' },
  { key: '4', label: 'Status', children: 'Active' },
]

const meta: Meta<typeof Descriptions> = {
  title: 'Brand/Descriptions',
  component: Descriptions,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: {
    title: 'User Info',
    items,
  },
}
export default meta
type Story = StoryObj<typeof Descriptions>

export const Default: Story = {}
export const Bordered: Story = { args: { bordered: true } }
export const Vertical: Story = { args: { bordered: true, layout: 'vertical' } }
export const Column2: Story = { args: { bordered: true, column: 2 } }
