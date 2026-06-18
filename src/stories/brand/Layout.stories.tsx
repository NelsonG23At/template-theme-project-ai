import type { Meta, StoryObj } from '@storybook/react-vite'
import { Layout, ConfigProvider } from 'antd'
import { brandTheme } from '../../core/brand'

const { Header, Sider, Content, Footer } = Layout

const meta: Meta<typeof Layout> = {
  title: 'Brand/Layout',
  component: Layout,
  decorators: [
    (Story) => (
      <ConfigProvider theme={brandTheme}>
        <Story />
      </ConfigProvider>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Layout>

export const Default: Story = {
  render: () => (
    <Layout style={{ minHeight: 300 }}>
      <Header>Header</Header>
      <Layout>
        <Sider width={200}>Sider</Sider>
        <Content style={{ padding: 24 }}>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  ),
}
