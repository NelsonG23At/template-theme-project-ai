import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, ConfigProvider, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Input> = {
  title: 'Brand/Input',
  component: Input,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6" style={{ maxWidth: 320 }}>
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { placeholder: 'Enter text...' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=41-934&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const WithPrefix: Story = { args: { prefix: <UserOutlined /> } }
export const WithAddon: Story = {
  render: (args) => <Input {...args} addonBefore="https://" addonAfter=".com" />,
}
export const Search: Story = { render: () => <Input.Search placeholder="Search..." allowClear /> }
export const Disabled: Story = { args: { disabled: true } }
export const Sizes: Story = {
  render: () => (
    <Space orientation="vertical" style={{ width: '100%' }}>
      <Input size="small" placeholder="Small" />
      <Input size="middle" placeholder="Middle" />
      <Input size="large" placeholder="Large" />
    </Space>
  ),
}
