import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Space } from 'antd'
import { brandTheme } from '../../core/brand'

const meta: Meta<typeof Button> = {
  title: 'Brand/Button',
  component: Button,
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
    type: { control: 'select', options: ['primary', 'default', 'dashed', 'text', 'link'] },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'danger',
        'blue',
        'purple',
        'cyan',
        'green',
        'magenta',
        'pink',
        'red',
        'orange',
        'yellow',
        'volcano',
        'geekblue',
        'lime',
        'gold',
      ],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'dashed', 'solid', 'filled', 'text', 'link'],
    },
    shape: { control: 'select', options: ['default', 'circle', 'round', 'square'] },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    htmlType: { control: 'select', options: ['button', 'submit', 'reset'] },
    iconPlacement: { control: 'select', options: ['start', 'end'] },
    danger: { control: 'boolean' },
    ghost: { control: 'boolean' },
    block: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    href: { control: 'text' },
  },
  args: {
    children: 'Button',
    type: 'primary',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fQrQk9GnG9TsV9u95wvsxR/HOPE?node-id=36-3181&m=dev',
    },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}
export const Default: Story = { args: { type: 'default' } }
export const Dashed: Story = { args: { type: 'dashed' } }
export const TextButton: Story = { args: { type: 'text' } }
export const LinkButton: Story = { args: { type: 'link', href: 'https://ant.design' } }

export const Types: Story = {
  render: () => (
    <Space>
      <Button type="primary">Primary</Button>
      <Button type="default">Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link" href="https://ant.design">
        Link
      </Button>
    </Space>
  ),
}

export const Variants: Story = {
  render: () => (
    <Space>
      <Button variant="outlined">Outlined</Button>
      <Button variant="dashed">Dashed</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="filled">Filled</Button>
      <Button variant="text">Text</Button>
      <Button variant="link">Link</Button>
    </Space>
  ),
}

export const Colors: Story = {
  render: () => (
    <Space wrap>
      <Button color="default" variant="solid">Default</Button>
      <Button color="primary" variant="solid">Primary</Button>
      <Button color="danger" variant="solid">Danger</Button>
      <Button color="blue" variant="solid">Blue</Button>
      <Button color="purple" variant="solid">Purple</Button>
      <Button color="cyan" variant="solid">Cyan</Button>
      <Button color="green" variant="solid">Green</Button>
      <Button color="magenta" variant="solid">Magenta</Button>
      <Button color="pink" variant="solid">Pink</Button>
      <Button color="red" variant="solid">Red</Button>
      <Button color="orange" variant="solid">Orange</Button>
      <Button color="yellow" variant="solid">Yellow</Button>
      <Button color="volcano" variant="solid">Volcano</Button>
      <Button color="geekblue" variant="solid">Geekblue</Button>
      <Button color="lime" variant="solid">Lime</Button>
      <Button color="gold" variant="solid">Gold</Button>
    </Space>
  ),
}

export const Shapes: Story = {
  render: () => (
    <Space>
      <Button type="primary" shape="default">Default</Button>
      <Button type="primary" shape="round">Round</Button>
      <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      <Button type="primary" shape="square" icon={<SearchOutlined />} />
    </Space>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Space>
      <Button type="primary" size="small">Small</Button>
      <Button type="primary" size="middle">Middle</Button>
      <Button type="primary" size="large">Large</Button>
    </Space>
  ),
}

export const WithIcon: Story = {
  args: {
    type: "dashed"
  },

  render: () => (
    <Space>
      <Button type="primary" icon={<SearchOutlined />}>Search</Button>
      <Button type="primary" icon={<DownloadOutlined />} iconPlacement="end">
        Download
      </Button>
      <Button type="primary" icon={<SearchOutlined />} />
    </Space>
  )
}

export const Ghost: Story = {
  render: () => (
    <div className="bg-gray-800 p-4">
      <Space>
        <Button type="primary" ghost>Primary Ghost</Button>
        <Button type="default" ghost>Default Ghost</Button>
        <Button type="dashed" ghost>Dashed Ghost</Button>
      </Space>
    </div>
  ),
}

export const Danger: Story = {
  render: () => (
    <Space>
      <Button type="primary" danger>Primary Danger</Button>
      <Button type="default" danger>Default Danger</Button>
      <Button type="dashed" danger>Dashed Danger</Button>
      <Button type="text" danger>Text Danger</Button>
      <Button type="link" danger>Link Danger</Button>
    </Space>
  ),
}

export const Block: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Button type="primary" block>Block Button</Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Space>
      <Button type="primary" disabled>Primary</Button>
      <Button type="default" disabled>Default</Button>
      <Button type="dashed" disabled>Dashed</Button>
      <Button type="text" disabled>Text</Button>
      <Button type="link" disabled>Link</Button>
    </Space>
  ),
}

export const Loading: Story = {
  render: () => (
    <Space>
      <Button type="primary" loading>Loading</Button>
      <Button type="primary" loading icon={<SearchOutlined />}>
        With Icon
      </Button>
      <Button type="primary" shape="circle" loading />
    </Space>
  ),
}

export const HtmlTypes: Story = {
  render: () => (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{ display: 'flex', gap: 8 }}
    >
      <Button htmlType="submit" type="primary">Submit</Button>
      <Button htmlType="reset">Reset</Button>
      <Button htmlType="button">Button</Button>
    </form>
  ),
}

export const Playground: Story = {
  args: {
    type: 'primary',
    children: 'Configure me',
  },
}
