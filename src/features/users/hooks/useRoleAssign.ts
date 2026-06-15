import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userKeys } from '../../../core/api/keys'
import { updateUser } from '../../../core/api/users'
import { permissionMatrix } from '../../../core/permissions/matrix'
import type { User } from '../../../core/types/user'
import type { RoleId } from '../../../core/types/role'
import type { PermissionKey } from '../../../core/types/permission'

interface PermissionDiff {
  gained: PermissionKey[]
  lost: PermissionKey[]
}

export function useRoleAssign(user: User) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [selectedRole, setSelectedRole] = useState<RoleId>(user.role)

  const diff: PermissionDiff = {
    gained: permissionMatrix[selectedRole].filter((p) => !permissionMatrix[user.role].includes(p)),
    lost: permissionMatrix[user.role].filter((p) => !permissionMatrix[selectedRole].includes(p)),
  }

  const mutation = useMutation({
    mutationFn: () => updateUser(user.id, {}),
    onSuccess: () => {
      const updated: User = { ...user, role: selectedRole }
      queryClient.setQueryData(userKeys.detail(user.id), updated)
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      void navigate(`/users/${user.id}`)
    },
  })

  return {
    selectedRole,
    setSelectedRole,
    diff,
    confirm: () => mutation.mutate(),
    isPending: mutation.isPending,
  }
}
