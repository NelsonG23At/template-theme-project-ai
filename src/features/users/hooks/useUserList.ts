import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { userKeys } from '../../../core/api/keys'
import { fetchUsers } from '../../../core/api/users'
import type { User } from '../../../core/types/user'

type SortField = 'name' | 'email' | 'role'
type SortOrder = 'ascend' | 'descend' | null

interface UserListState {
  search: string
  sortField: SortField | null
  sortOrder: SortOrder
  page: number
  pageSize: number
}

export function useUserList() {
  const [state, setState] = useState<UserListState>({
    search: '',
    sortField: null,
    sortOrder: null,
    page: 1,
    pageSize: 5,
  })

  const query = useQuery({
    queryKey: userKeys.lists(),
    queryFn: fetchUsers,
  })

  const filtered = useMemo(() => {
    const users = query.data ?? []
    const term = state.search.toLowerCase()

    let result = term
      ? users.filter(
          (u) =>
            u.name.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term) ||
            u.username.toLowerCase().includes(term),
        )
      : users

    if (state.sortField && state.sortOrder) {
      const field = state.sortField
      const dir = state.sortOrder === 'ascend' ? 1 : -1
      result = [...result].sort((a, b) => {
        const av = a[field as keyof User] as string
        const bv = b[field as keyof User] as string
        return av.localeCompare(bv) * dir
      })
    }

    return result
  }, [query.data, state.search, state.sortField, state.sortOrder])

  const paginated = useMemo(
    () => filtered.slice((state.page - 1) * state.pageSize, state.page * state.pageSize),
    [filtered, state.page, state.pageSize],
  )

  function setSearch(search: string) {
    setState((s) => ({ ...s, search, page: 1 }))
  }

  function setSort(field: SortField | null, order: SortOrder) {
    setState((s) => ({ ...s, sortField: field, sortOrder: order }))
  }

  function setPage(page: number, pageSize?: number) {
    setState((s) => ({ ...s, page, pageSize: pageSize ?? s.pageSize }))
  }

  return {
    ...query,
    rows: paginated,
    total: filtered.length,
    state,
    setSearch,
    setSort,
    setPage,
  }
}
