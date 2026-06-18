import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Switch> = {
  title: 'Brand/Switch',
  component: Switch,
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
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=123-5948&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = { args: { defaultChecked: true } }
export const Unchecked: Story = {}
export const Small: Story = { args: { size: 'small', defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } }
export const WithLabels: Story = {
  render: () => <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />,
}
