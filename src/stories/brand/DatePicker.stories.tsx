import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker, ConfigProvider, Space } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof DatePicker> = {
  title: 'Brand/DatePicker',
  component: DatePicker,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=5277-27583&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {}
export const WithRange: Story = {
  render: () => <DatePicker.RangePicker />,
}
export const Disabled: Story = { args: { disabled: true } }
export const Sizes: Story = {
  render: () => (
    <Space>
      <DatePicker size="small" />
      <DatePicker size="middle" />
      <DatePicker size="large" />
    </Space>
  ),
}
