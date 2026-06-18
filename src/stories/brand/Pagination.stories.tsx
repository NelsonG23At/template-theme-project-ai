import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Pagination> = {
  title: 'Brand/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { current: 2, total: 100 },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=123-8324&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {}
export const Small: Story = { args: { size: 'small' } }
export const WithSizeChanger: Story = { args: { showSizeChanger: true } }
