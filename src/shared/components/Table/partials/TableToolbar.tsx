import type { ReactNode } from 'react'
import { theme } from 'antd'

type TableToolbarProps = {
  children: ReactNode
}

export function TableToolbar({ children }: TableToolbarProps) {
  const { token } = theme.useToken()

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
      style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
      data-testid="table-toolbar"
    >
      {children}
    </div>
  )
}
