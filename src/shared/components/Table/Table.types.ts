import type { TableColumnsType, TableProps as AntdTableProps } from 'antd'
import type { SorterResult } from 'antd/es/table/interface'
import type { Key, ReactNode } from 'react'

export type TableState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success' }

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
  state?: TableState
  toolbar?: ReactNode
  pagination?: TablePaginationConfig
  onRow?: AntdTableProps<T>['onRow']
  onSelectionChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void
  onSortChange?: (sorter: SorterResult<T> | SorterResult<T>[]) => void
  selectedRowKeys?: Key[]
  scroll?: AntdTableProps<T>['scroll']
  size?: AntdTableProps<T>['size']
  empty?: ReactNode
  className?: string
}
