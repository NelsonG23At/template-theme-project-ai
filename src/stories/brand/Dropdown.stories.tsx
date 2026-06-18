import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Dropdown, ConfigProvider, Space } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { brandTheme } from '../../core/brand'

const items: MenuProps['items'] = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Duplicate' },
  { type: 'divider' },
  { key: '3', label: 'Delete', danger: true },
]

const meta: Meta<typeof Dropdown> = {
  title: 'Brand/Dropdown',
  component: Dropdown,
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
    menu: { items },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=1687-25532&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <Button>
        <Space>
          Actions
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  ),
}
