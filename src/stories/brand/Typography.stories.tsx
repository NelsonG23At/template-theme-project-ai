import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const { Title, Text, Paragraph, Link } = Typography

const meta: Meta<typeof Typography> = {
  title: 'Brand/Typography',
  component: Typography,
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
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=6575-2551&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Typography>

export const Headings: Story = {
  render: () => (
    <>
      <Title level={1}>Heading 1</Title>
      <Title level={2}>Heading 2</Title>
      <Title level={3}>Heading 3</Title>
      <Title level={4}>Heading 4</Title>
    </>
  ),
}
export const TextVariants: Story = {
  render: () => (
    <Paragraph>
      <Text>Default text</Text>
      <br />
      <Text strong>Strong text</Text>
      <br />
      <Text type="secondary">Secondary text</Text>
      <br />
      <Text type="success">Success text</Text>
      <br />
      <Text type="warning">Warning text</Text>
      <br />
      <Text type="danger">Danger text</Text>
      <br />
      <Link href="#">Link text</Link>
    </Paragraph>
  ),
}
