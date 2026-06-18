import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Drawer, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Drawer> = {
  title: 'Brand/Drawer',
  component: Drawer,
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
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=1539-17725&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Drawer>

function DrawerDemo({ placement }: { placement?: 'left' | 'right' | 'top' | 'bottom' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer
        title="Drawer title"
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
        footer={<Button onClick={() => setOpen(false)}>Close</Button>}
      >
        Drawer content goes here.
      </Drawer>
    </>
  )
}

export const Default: Story = { render: () => <DrawerDemo /> }
export const LeftPlacement: Story = { render: () => <DrawerDemo placement="left" /> }
