import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'
import { PermissionGate } from './PermissionGate'

const meta: Meta<typeof PermissionGate> = {
  title: 'Shared/PermissionGate',
  component: PermissionGate,
  decorators: [(Story) => <ConfigProvider theme={brandTheme}><Story /></ConfigProvider>],
}
export default meta

type Story = StoryObj<typeof PermissionGate>

export const Authorized: Story = {
  args: {
    permission: 'users:read',
    children: <span>Visible content</span>,
    fallback: <span>Hidden</span>,
  },
}

export const Unauthorized: Story = {
  args: {
    permission: 'users:delete',
    children: <span>Should be hidden</span>,
    fallback: <span>No permission</span>,
  },
}
