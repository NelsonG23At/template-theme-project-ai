import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Radio> = {
  title: 'Brand/Radio',
  component: Radio,
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
type Story = StoryObj<typeof Radio>

export const Default: Story = { args: { children: 'Radio option' } }
export const Group: Story = {
  render: () => (
    <Radio.Group
      defaultValue="b"
      options={[
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
        { label: 'Option C', value: 'c' },
      ]}
    />
  ),
}
export const ButtonStyle: Story = {
  render: () => (
    <Radio.Group defaultValue="b" optionType="button">
      <Radio.Button value="a">Option A</Radio.Button>
      <Radio.Button value="b">Option B</Radio.Button>
      <Radio.Button value="c">Option C</Radio.Button>
    </Radio.Group>
  ),
}
