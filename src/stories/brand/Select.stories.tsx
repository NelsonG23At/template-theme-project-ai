import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const options = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

const meta: Meta<typeof Select> = {
  title: 'Brand/Select',
  component: Select,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6" style={{ width: 240 }}>
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { options, placeholder: 'Select a role', style: { width: '100%' } },
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Multiple: Story = { args: { mode: 'multiple', defaultValue: ['admin'] } }
