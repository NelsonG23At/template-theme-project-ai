import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, ConfigProvider } from 'antd'
import type { TabsProps } from 'antd'
import { brandTheme } from '../../core/brand'

const items: TabsProps['items'] = [
  { key: '1', label: 'Profile', children: 'Profile content' },
  { key: '2', label: 'Security', children: 'Security content' },
  { key: '3', label: 'Notifications', children: 'Notifications content' },
]

const meta: Meta<typeof Tabs> = {
  title: 'Brand/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { items },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=147-5005&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {}
export const CardType: Story = { args: { type: 'card' } }
