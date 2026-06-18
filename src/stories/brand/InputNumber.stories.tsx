import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputNumber, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof InputNumber> = {
  title: 'Brand/InputNumber',
  component: InputNumber,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { defaultValue: 10 },
}
export default meta
type Story = StoryObj<typeof InputNumber>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const WithFormatter: Story = {
  args: {
    defaultValue: 1000,
    formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
}
