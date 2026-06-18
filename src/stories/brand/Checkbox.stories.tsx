import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Checkbox> = {
  title: 'Brand/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6">
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: { children: 'Checkbox label' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=1636-20063&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Group: Story = {
  render: () => (
    <Checkbox.Group
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Pear', value: 'pear' },
        { label: 'Orange', value: 'orange' },
      ]}
      defaultValue={['apple']}
    />
  ),
}
