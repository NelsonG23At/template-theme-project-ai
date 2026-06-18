import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, ConfigProvider, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Avatar> = {
  title: 'Brand/Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
  },
  args: {
    icon: <UserOutlined />,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=1526-16051&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
export const Small: Story = { args: { size: 'small' } }
export const Large: Story = { args: { size: 'large' } }
export const TextInitials: Story = { args: { icon: undefined, children: 'NG' } }
export const Sizes: Story = {
  render: () => (
    <Space>
      <Avatar size="small" icon={<UserOutlined />} />
      <Avatar size="default" icon={<UserOutlined />} />
      <Avatar size="large" icon={<UserOutlined />} />
    </Space>
  ),
}
