import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { MemoryRouter } from 'react-router'
import { brandTheme } from '../../../core/brand'
import { UserTable } from '../components/UserTable'
import type { User } from '../../../core/types/user'

vi.mock('../../../core/api/users', () => ({
  fetchUsers: vi.fn().mockResolvedValue([
    { id: 1, name: 'Alice Admin', username: 'alice', email: 'alice@example.com', role: 'admin', isActive: true, phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
    { id: 2, name: 'Bob Viewer', username: 'bob', email: 'bob@example.com', role: 'viewer', isActive: true, phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
  ] as User[]),
}))

function renderTable() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <ConfigProvider theme={brandTheme}>
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <UserTable />
        </MemoryRouter>
      </QueryClientProvider>
    </ConfigProvider>,
  )
}

describe('UserTable', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('renders user rows after loading', async () => {
    renderTable()
    await waitFor(() => expect(screen.getByText('Alice Admin')).toBeInTheDocument())
    expect(screen.getByText('Bob Viewer')).toBeInTheDocument()
  })

  it('filters rows when search input changes', async () => {
    renderTable()
    await waitFor(() => expect(screen.getByText('Alice Admin')).toBeInTheDocument())

    const search = screen.getByTestId('user-search')
    await userEvent.type(search, 'alice')

    await waitFor(() => expect(screen.queryByText('Bob Viewer')).not.toBeInTheDocument())
    expect(screen.getByText('Alice Admin')).toBeInTheDocument()
  })
})
