import type { ApiUser, User } from '../types/user'
import { normalizeUser } from './normalizers'

const BASE = 'https://jsonplaceholder.typicode.com'

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json() as Promise<T>
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/users`)
  const raw = await parseJson<ApiUser[]>(res)
  return raw.map(normalizeUser)
}

export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`)
  const raw = await parseJson<ApiUser>(res)
  return normalizeUser(raw)
}

export async function updateUser(id: number, patch: Partial<ApiUser>): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  const raw = await parseJson<ApiUser>(res)
  return normalizeUser(raw)
}
