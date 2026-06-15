import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useUserList } from '../hooks/useUserList'
import type { User } from '../../../core/types/user'

vi.mock('../../../core/api/users', () => ({
  fetchUsers: vi.fn().mockResolvedValue([
    { id: 1, name: 'Alice Admin', username: 'alice', email: 'alice@test.com', role: 'admin', isActive: true, phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
    { id: 2, name: 'Bob Viewer', username: 'bob', email: 'bob@test.com', role: 'viewer', isActive: true, phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
    { id: 3, name: 'Charlie Editor', username: 'charlie', email: 'charlie@test.com', role: 'editor', isActive: false, phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', catchPhrase: '', bs: '' } },
  ] as User[]),
}))

function makeWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}

describe('useUserList', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('returns all users on initial load', async () => {
    const { result } = renderHook(() => useUserList(), { wrapper: makeWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.total).toBe(3)
  })

  it('filters by search term (case-insensitive)', async () => {
    const { result } = renderHook(() => useUserList(), { wrapper: makeWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    act(() => { result.current.setSearch('alice') })
    expect(result.current.total).toBe(1)
    expect(result.current.rows[0].name).toBe('Alice Admin')
  })

  it('returns empty when search matches nothing', async () => {
    const { result } = renderHook(() => useUserList(), { wrapper: makeWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    act(() => { result.current.setSearch('zzzznotfound') })
    expect(result.current.total).toBe(0)
  })

  it('paginates correctly', async () => {
    const { result } = renderHook(() => useUserList(), { wrapper: makeWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.rows.length).toBeLessThanOrEqual(result.current.state.pageSize)
  })

  it('sorts by name ascending', async () => {
    const { result } = renderHook(() => useUserList(), { wrapper: makeWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    act(() => { result.current.setSort('name', 'ascend') })
    const names = result.current.rows.map((u) => u.name)
    expect(names).toEqual([...names].sort())
  })

  it('sorts by name descending', async () => {
    const { result } = renderHook(() => useUserList(), { wrapper: makeWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    act(() => { result.current.setSort('name', 'descend') })
    const names = result.current.rows.map((u) => u.name)
    expect(names).toEqual([...names].sort().reverse())
  })
})
