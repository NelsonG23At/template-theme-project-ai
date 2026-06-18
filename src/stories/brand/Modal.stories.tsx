import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Modal, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Modal> = {
  title: 'Brand/Modal',
  component: Modal,
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
type Story = StoryObj<typeof Modal>

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal title="Modal title" open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
        Modal content goes here.
      </Modal>
    </>
  )
}

export const Default: Story = { render: () => <ModalDemo /> }
