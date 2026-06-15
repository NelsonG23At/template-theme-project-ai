import type { TableColumnsType, TableProps as AntdTableProps } from 'antd'
import type { ReactNode } from 'react'

export type TablePaginationConfig = {
  current: number
  pageSize: number
  total: number
  onChange: (page: number, pageSize: number) => void
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => ReactNode
}

export type TableProps<T extends object> = {
  dataSource: T[]
  columns: TableColumnsType<T>
  rowKey: string | ((record: T) => string)
  loading?: boolean
  toolbar?: ReactNode
  pagination?: TablePaginationConfig
  onRow?: AntdTableProps<T>['onRow']
  scroll?: AntdTableProps<T>['scroll']
  size?: AntdTableProps<T>['size']
  empty?: ReactNode
  className?: string
}
