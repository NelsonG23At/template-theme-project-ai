import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, ConfigProvider, Space } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Tag> = {
  title: 'Brand/Tag',
  component: Tag,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { children: 'Tag' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=232-35499&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {}
export const Colors: Story = {
  render: () => (
    <Space wrap>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
      <Tag color="processing">Processing</Tag>
      <Tag>Default</Tag>
    </Space>
  ),
}
export const Closable: Story = { args: { closable: true } }
