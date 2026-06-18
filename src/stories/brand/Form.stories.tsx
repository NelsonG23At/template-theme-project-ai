import type { Meta, StoryObj } from '@storybook/react-vite'
import { Form, Input, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Form> = {
  title: 'Brand/Form',
  component: Form,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6" style={{ maxWidth: 400 }}>
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  render: () => (
    <Form layout="vertical">
      <Form.Item label="Full Name" required>
        <Input placeholder="Jane Doe" />
      </Form.Item>
      <Form.Item label="Email" required>
        <Input placeholder="jane@acme.com" />
      </Form.Item>
      <Form.Item label="Bio">
        <Input.TextArea rows={3} placeholder="Tell us about yourself" />
      </Form.Item>
    </Form>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Form layout="horizontal" labelCol={{ span: 6 }}>
      <Form.Item label="Full Name" required>
        <Input placeholder="Jane Doe" />
      </Form.Item>
    </Form>
  ),
}
