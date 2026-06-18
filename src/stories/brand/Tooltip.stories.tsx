import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, Button, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Tooltip> = {
  title: 'Brand/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { title: 'Tooltip text', open: true },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=7720-10226&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
}
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Tooltip title="Top" placement="top" open>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title="Right" placement="right" open>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom" open>
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
}
