import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Alert> = {
  title: 'Brand/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  argTypes: {
    type: { control: 'select', options: ['success', 'info', 'warning', 'error'] },
  },
  args: {
    title: 'This is an alert message',
    type: 'info',
    showIcon: true,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=755-20625&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {}
export const Success: Story = { args: { type: 'success', title: 'Operation completed successfully' } }
export const Warning: Story = { args: { type: 'warning', title: 'Please review before continuing' } }
export const ErrorState: Story = { args: { type: 'error', title: 'Something went wrong' } }
export const WithDescription: Story = {
  args: {
    type: 'info',
    title: 'Informational title',
    description: 'Additional descriptive text that explains the alert in more detail.',
  },
}
export const Closable: Story = { args: { closable: true } }
