import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spin, ConfigProvider, Space } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Spin> = {
  title: 'Brand/Spin',
  component: Spin,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Spin>

export const Default: Story = { args: { spinning: true } }
export const Sizes: Story = {
  render: () => (
    <Space size="large">
      <Spin size="small" />
      <Spin size="default" />
      <Spin size="large" />
    </Space>
  ),
}
export const WithContent: Story = {
  render: () => (
    <Spin description="Loading...">
      <div style={{ height: 120, border: '1px dashed #d9d9d9', borderRadius: 4 }} />
    </Spin>
  ),
}
