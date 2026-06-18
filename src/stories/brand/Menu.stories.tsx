import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu, ConfigProvider } from 'antd'
import type { MenuProps } from 'antd'
import { brandTheme } from '../../core/brand'

const items: MenuProps['items'] = [
  { key: 'home', label: 'Home' },
  { key: 'users', label: 'Users' },
  { key: 'settings', label: 'Settings', disabled: true },
  {
    key: 'group',
    label: 'More',
    children: [
      { key: 'a', label: 'Option A' },
      { key: 'b', label: 'Option B' },
    ],
  },
]

const meta: Meta<typeof Menu> = {
  title: 'Brand/Menu',
  component: Menu,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div style={{ maxWidth: 240 }}>
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { items, defaultSelectedKeys: ['home'], mode: 'inline' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=6246-40249&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {}
export const Horizontal: Story = { args: { mode: 'horizontal' } }
