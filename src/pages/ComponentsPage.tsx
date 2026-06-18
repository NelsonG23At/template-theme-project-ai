import { useState } from 'react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Modal,
  Pagination,
  Radio,
  Select,
  Spin,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  Space,
  Row,
  Col,
} from 'antd'
import {
  UserOutlined,
  BellOutlined,
  DownOutlined,
  SearchOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import type { MenuProps } from 'antd'

const { Title, Text, Paragraph } = Typography

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card
      title={<Text strong className="text-[15px]">{title}</Text>}
      classNames={{ body: 'p-5' }}
    >
      {children}
    </Card>
  )
}

type DemoRow = { key: string; name: string; role: string; status: string }

const tableData: DemoRow[] = [
  { key: '1', name: 'Alice Martin', role: 'Admin',  status: 'Active'   },
  { key: '2', name: 'Bob Chen',     role: 'Editor', status: 'Active'   },
  { key: '3', name: 'Carol White',  role: 'Viewer', status: 'Inactive' },
]

const tableColumns: TableColumnsType<DemoRow> = [
  { title: 'Name',   dataIndex: 'name',   sorter: true },
  { title: 'Role',   dataIndex: 'role'                },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (v: string) => (
      <Tag color={v === 'Active' ? 'success' : 'default'}>{v}</Tag>
    ),
  },
]

const dropdownItems: MenuProps['items'] = [
  { key: '1', label: 'Edit'   },
  { key: '2', label: 'Clone'  },
  { type: 'divider' },
  { key: '3', label: 'Delete', danger: true },
]

const menuItems: MenuProps['items'] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'users',     label: 'Users'     },
  {
    key: 'settings',
    label: 'Settings',
    children: [
      { key: 'profile', label: 'Profile' },
      { key: 'billing', label: 'Billing' },
    ],
  },
]

export function ComponentsPage() {
  const [modalOpen, setModalOpen]   = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [switchOn, setSwitchOn]     = useState(true)
  const [page, setPage]             = useState(1)

  return (
    <div className="min-h-screen p-6 bg-neutral-50" data-testid="components-page">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <Title level={2} className="!mb-1">Component Showcase</Title>
          <Text type="secondary">All Ant Design components themed with the brand token system.</Text>
        </div>

        <div className="flex flex-col gap-6">

          {/* ── Buttons ── */}
          <Section title="Buttons">
            <Space wrap>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="text">Text</Button>
              <Button type="link">Link</Button>
              <Button type="primary" danger>Danger</Button>
              <Button type="primary" disabled>Disabled</Button>
              <Button type="primary" loading>Loading</Button>
              <Button type="primary" size="large">Large</Button>
              <Button type="primary" size="small">Small</Button>
              <Button type="primary" icon={<SearchOutlined />}>With Icon</Button>
            </Space>
          </Section>

          {/* ── Typography ── */}
          <Section title="Typography">
            <Title level={1}>Heading 1</Title>
            <Title level={2}>Heading 2</Title>
            <Title level={3}>Heading 3</Title>
            <Title level={4}>Heading 4</Title>
            <Divider />
            <Paragraph>
              Regular paragraph text. The quick brown fox jumps over the lazy dog.
            </Paragraph>
            <Space wrap>
              <Text strong>Bold</Text>
              <Text italic>Italic</Text>
              <Text type="secondary">Secondary</Text>
              <Text type="success">Success</Text>
              <Text type="warning">Warning</Text>
              <Text type="danger">Danger</Text>
              <Text disabled>Disabled</Text>
              <Text code>code block</Text>
              <Text mark>Marked</Text>
              <Text underline>Underline</Text>
              <Text delete>Delete</Text>
            </Space>
          </Section>

          {/* ── Data Input ── */}
          <Section title="Data Input">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Space orientation="vertical" className="w-full">
                  <Text type="secondary">Input</Text>
                  <Input placeholder="Enter text…" prefix={<SearchOutlined />} />
                  <Input.Password placeholder="Password" />
                  <Input.TextArea placeholder="Multiline…" rows={3} />
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space orientation="vertical" className="w-full">
                  <Text type="secondary">InputNumber</Text>
                  <InputNumber placeholder="0" min={0} max={100} className="w-full" />
                  <Text type="secondary">DatePicker</Text>
                  <DatePicker className="w-full" />
                  <DatePicker.RangePicker className="w-full" />
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Space orientation="vertical" className="w-full">
                  <Text type="secondary">Select</Text>
                  <Select
                    placeholder="Choose…"
                    className="w-full"
                    options={[
                      { value: 'admin',  label: 'Admin'  },
                      { value: 'editor', label: 'Editor' },
                      { value: 'viewer', label: 'Viewer' },
                    ]}
                  />
                  <Select
                    mode="multiple"
                    placeholder="Multi-select…"
                    className="w-full"
                    defaultValue={['admin']}
                    options={[
                      { value: 'admin',  label: 'Admin'  },
                      { value: 'editor', label: 'Editor' },
                      { value: 'viewer', label: 'Viewer' },
                    ]}
                  />
                </Space>
              </Col>
            </Row>
          </Section>

          {/* ── Selection Controls ── */}
          <Section title="Selection Controls">
            <Row gutter={[32, 16]}>
              <Col xs={24} sm={8}>
                <Space orientation="vertical">
                  <Text type="secondary">Checkbox</Text>
                  <Checkbox defaultChecked>Checked</Checkbox>
                  <Checkbox>Unchecked</Checkbox>
                  <Checkbox disabled>Disabled</Checkbox>
                  <Checkbox.Group
                    options={['Alpha', 'Beta', 'Gamma']}
                    defaultValue={['Alpha']}
                  />
                </Space>
              </Col>
              <Col xs={24} sm={8}>
                <Space orientation="vertical">
                  <Text type="secondary">Radio</Text>
                  <Radio.Group defaultValue="a">
                    <Space orientation="vertical">
                      <Radio value="a">Option A</Radio>
                      <Radio value="b">Option B</Radio>
                      <Radio value="c" disabled>Disabled</Radio>
                    </Space>
                  </Radio.Group>
                  <Radio.Group defaultValue="x" buttonStyle="solid">
                    <Radio.Button value="x">X</Radio.Button>
                    <Radio.Button value="y">Y</Radio.Button>
                    <Radio.Button value="z">Z</Radio.Button>
                  </Radio.Group>
                </Space>
              </Col>
              <Col xs={24} sm={8}>
                <Space orientation="vertical">
                  <Text type="secondary">Switch</Text>
                  <Switch checked={switchOn} onChange={setSwitchOn} />
                  <Switch
                    checked={switchOn}
                    onChange={setSwitchOn}
                    checkedChildren="On"
                    unCheckedChildren="Off"
                  />
                  <Switch size="small" defaultChecked />
                  <Switch disabled defaultChecked />
                </Space>
              </Col>
            </Row>
          </Section>

          {/* ── Tags · Badges · Avatars ── */}
          <Section title="Tags · Badges · Avatars">
            <Space orientation="vertical" size="large" className="w-full">
              <Space wrap>
                <Text type="secondary">Tags:</Text>
                <Tag>Default</Tag>
                <Tag color="processing">Processing</Tag>
                <Tag color="success" icon={<CheckCircleOutlined />}>Success</Tag>
                <Tag color="warning">Warning</Tag>
                <Tag color="error">Error</Tag>
                <Tag color="purple">Purple</Tag>
                <Tag closable>Closable</Tag>
              </Space>
              <Space wrap>
                <Text type="secondary">Badges:</Text>
                <Badge count={5}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
                <Badge count={99} overflowCount={50}>
                  <Avatar shape="square" icon={<BellOutlined />} />
                </Badge>
                <Badge dot>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
                <Badge status="success"    text="Success"    />
                <Badge status="error"      text="Error"      />
                <Badge status="warning"    text="Warning"    />
                <Badge status="processing" text="Processing" />
              </Space>
              <Space wrap>
                <Text type="secondary">Avatars:</Text>
                <Avatar.Group>
                  <Avatar className="!bg-primary-600">A</Avatar>
                  <Avatar icon={<UserOutlined />} />
                  <Tooltip title="More users">
                    <Avatar>+3</Avatar>
                  </Tooltip>
                </Avatar.Group>
                <Avatar size="large"   icon={<UserOutlined />} />
                <Avatar size="default" icon={<UserOutlined />} />
                <Avatar size="small"   icon={<UserOutlined />} />
              </Space>
            </Space>
          </Section>

          {/* ── Feedback ── */}
          <Section title="Feedback · Alerts · Spin">
            <Space orientation="vertical" className="w-full" size="middle">
              <Alert title="Info alert"    type="info"    showIcon />
              <Alert title="Success alert" type="success" showIcon />
              <Alert title="Warning alert" type="warning" showIcon />
              <Alert
                title="Error alert"
                description="Something went wrong. Please try again."
                type="error"
                showIcon
              />
              <Divider />
              <Space>
                <Spin />
                <Spin size="small" />
                <Spin size="large" />
                <Spin description="Loading…">
                  <div className="w-48 h-16 rounded bg-neutral-100" />
                </Spin>
              </Space>
            </Space>
          </Section>

          {/* ── Descriptions ── */}
          <Section title="Descriptions">
            <Descriptions
              title="User Profile"
              bordered
              column={{ xs: 1, sm: 2, md: 3 }}
            >
              <Descriptions.Item label="Name">Alice Martin</Descriptions.Item>
              <Descriptions.Item label="Role">Admin</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color="success">Active</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Email">alice@example.com</Descriptions.Item>
              <Descriptions.Item label="Joined">Jan 15, 2024</Descriptions.Item>
              <Descriptions.Item label="Last login">Today</Descriptions.Item>
            </Descriptions>
          </Section>

          {/* ── Table ── */}
          <Section title="Table">
            <Table<DemoRow>
              dataSource={tableData}
              columns={tableColumns}
              rowKey="key"
              size="middle"
              pagination={false}
            />
          </Section>

          {/* ── Navigation ── */}
          <Section title="Navigation · Tabs · Menu · Pagination">
            <Space orientation="vertical" className="w-full" size="large">
              <Tabs
                defaultActiveKey="1"
                items={[
                  { key: '1', label: 'Overview', children: <Text type="secondary">Overview content</Text> },
                  { key: '2', label: 'Activity',  children: <Text type="secondary">Activity content</Text>  },
                  { key: '3', label: 'Settings',  children: <Text type="secondary">Settings content</Text>  },
                  { key: '4', label: 'Disabled',  disabled: true, children: null },
                ]}
              />
              <Divider />
              <Menu
                mode="horizontal"
                defaultSelectedKeys={['dashboard']}
                items={menuItems}
                className="!border-b-0"
              />
              <Divider />
              <Pagination
                current={page}
                total={120}
                pageSize={10}
                onChange={setPage}
                showSizeChanger
                showTotal={(total) => `${total} items`}
              />
            </Space>
          </Section>

          {/* ── Overlays ── */}
          <Section title="Overlays · Modal · Drawer · Dropdown · Tooltip">
            <Space wrap>
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
              <Tooltip title="This is a tooltip">
                <Button>Hover for tooltip</Button>
              </Tooltip>
              <Dropdown menu={{ items: dropdownItems }}>
                <Button>
                  Actions <DownOutlined />
                </Button>
              </Dropdown>
            </Space>

            <Modal
              title="Example Modal"
              open={modalOpen}
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
            >
              <Paragraph>
                This modal uses brand token overrides for header, content, and footer backgrounds.
              </Paragraph>
              <Alert title="Tokens applied via ConfigProvider." type="info" showIcon />
            </Modal>

            <Drawer
              title="Example Drawer"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              footer={
                <Space>
                  <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
                  <Button type="primary" onClick={() => setDrawerOpen(false)}>Save</Button>
                </Space>
              }
            >
              <Paragraph>Drawer content goes here.</Paragraph>
              <Input placeholder="Some input inside a drawer" />
            </Drawer>
          </Section>

        </div>
      </div>
    </div>
  )
}
