import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'
import { RoleBadge } from './RoleBadge'

const meta: Meta<typeof RoleBadge> = {
  title: 'Shared/RoleBadge',
  component: RoleBadge,
  decorators: [(Story) => <ConfigProvider theme={brandTheme}><Story /></ConfigProvider>],
  argTypes: {
    role: { control: 'select', options: ['admin', 'editor', 'viewer', 'guest'] },
  },
}
export default meta

type Story = StoryObj<typeof RoleBadge>

export const Admin: Story = { args: { role: 'admin' } }
export const Editor: Story = { args: { role: 'editor' } }
export const Viewer: Story = { args: { role: 'viewer' } }
export const Guest: Story = { args: { role: 'guest' } }
