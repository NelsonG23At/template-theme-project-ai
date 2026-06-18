import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, ConfigProvider, Space } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Badge> = {
  title: 'Brand/Badge',
  component: Badge,
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
    count: 5,
  },
  render: (args) => (
    <Space size="large">
      <Badge {...args}>
        <div style={{ width: 40, height: 40, background: '#f0f0f0', borderRadius: 4 }} />
      </Badge>
    </Space>
  ),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=3640-33054&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}
export const Dot: Story = { args: { count: 0, dot: true } }
export const OverflowCount: Story = { args: { count: 120, overflowCount: 99 } }
export const Status: Story = {
  render: () => (
    <Space orientation="vertical">
      <Badge status="success" text="Success" />
      <Badge status="processing" text="Processing" />
      <Badge status="default" text="Default" />
      <Badge status="error" text="Error" />
      <Badge status="warning" text="Warning" />
    </Space>
  ),
}
