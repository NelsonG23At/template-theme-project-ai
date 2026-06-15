import { describe, it, expect, beforeEach } from 'vitest'
import { useSession } from '../index'

beforeEach(() => {
  useSession.setState({ activeRole: 'viewer' })
})

describe('can() — admin', () => {
  it('can do everything', () => {
    useSession.setState({ activeRole: 'admin' })
    const { can } = useSession.getState()
    expect(can('users:read')).toBe(true)
    expect(can('users:write')).toBe(true)
    expect(can('users:delete')).toBe(true)
    expect(can('roles:read')).toBe(true)
    expect(can('roles:assign')).toBe(true)
    expect(can('profile:read')).toBe(true)
    expect(can('profile:write')).toBe(true)
  })
})

describe('can() — editor', () => {
  it('can read/write users but not delete or assign roles', () => {
    useSession.setState({ activeRole: 'editor' })
    const { can } = useSession.getState()
    expect(can('users:read')).toBe(true)
    expect(can('users:write')).toBe(true)
    expect(can('users:delete')).toBe(false)
    expect(can('roles:assign')).toBe(false)
    expect(can('roles:read')).toBe(true)
    expect(can('profile:read')).toBe(true)
    expect(can('profile:write')).toBe(true)
  })
})

describe('can() — viewer', () => {
  it('can only read, not write', () => {
    useSession.setState({ activeRole: 'viewer' })
    const { can } = useSession.getState()
    expect(can('users:read')).toBe(true)
    expect(can('users:write')).toBe(false)
    expect(can('users:delete')).toBe(false)
    expect(can('roles:assign')).toBe(false)
    expect(can('roles:read')).toBe(true)
    expect(can('profile:read')).toBe(true)
    expect(can('profile:write')).toBe(false)
  })
})

describe('can() — guest', () => {
  it('can only read profiles', () => {
    useSession.setState({ activeRole: 'guest' })
    const { can } = useSession.getState()
    expect(can('users:read')).toBe(false)
    expect(can('users:write')).toBe(false)
    expect(can('users:delete')).toBe(false)
    expect(can('roles:read')).toBe(false)
    expect(can('roles:assign')).toBe(false)
    expect(can('profile:read')).toBe(true)
    expect(can('profile:write')).toBe(false)
  })
})
