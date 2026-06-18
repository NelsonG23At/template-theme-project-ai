import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, ConfigProvider, Button } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Card> = {
  title: 'Brand/Card',
  component: Card,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <div className="p-6" style={{ maxWidth: 400 }}>
          <Story />
        </div>
      </ConfigProvider>
    ),
  ],
  args: {
    title: 'Card title',
    children: 'Card content goes here.',
  },
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}
export const WithExtra: Story = { args: { extra: <a href="#">More</a> } }
export const Outlined: Story = { args: { variant: 'outlined' } }
export const Borderless: Story = { args: { variant: 'borderless' } }
export const Actions: Story = {
  args: {
    actions: [
      <Button key="edit" type="link">Edit</Button>,
      <Button key="delete" type="link" danger>Delete</Button>,
    ],
  },
}
