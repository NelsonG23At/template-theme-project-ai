import { Table as AntdTable, Pagination as AntdPagination, theme } from 'antd'
import type { TablePaginationConfig as AntdPaginationConfig } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import type { Key } from 'react'
import type { TableProps } from './Table.types'
import { TableToolbar } from './partials/TableToolbar'

export function Table<T extends object>({
  dataSource,
  columns,
  rowKey,
  state = { status: 'success' },
  toolbar,
  pagination,
  onRow,
  onSelectionChange,
  onSortChange,
  selectedRowKeys,
  scroll = { x: 'max-content' },
  size = 'middle',
  empty,
  className = '',
}: TableProps<T>) {
  const { token } = theme.useToken()

  const rowSelection = onSelectionChange
    ? {
        selectedRowKeys,
        onChange: (keys: Key[], rows: T[]) => { onSelectionChange(keys, rows) },
      }
    : undefined

  const handleChange = (
    _pagination: AntdPaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => {
    onSortChange?.(sorter)
  }

  const emptyText = state.status === 'error'
    ? state.message
    : empty

  return (
    <div
      className={`flex flex-col overflow-hidden ${className}`}
      style={{
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
      }}
      data-testid="table-container"
    >
      {toolbar !== undefined && <TableToolbar>{toolbar}</TableToolbar>}

      <AntdTable<T>
        dataSource={state.status !== 'loading' ? dataSource : []}
        columns={columns}
        rowKey={rowKey}
        loading={state.status === 'loading'}
        pagination={false}
        onRow={onRow}
        onChange={handleChange}
        rowSelection={rowSelection}
        scroll={scroll}
        size={size}
        locale={emptyText !== undefined ? { emptyText } : undefined}
        className="w-full"
      />

      {pagination !== undefined && (
        <div
          className="flex items-center justify-end px-4 py-3"
          style={{ borderTop: `1px solid ${token.colorBorderSecondary}` }}
          data-testid="table-pagination"
        >
          <AntdPagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={pagination.onChange}
            showSizeChanger={pagination.showSizeChanger ?? true}
            showQuickJumper={pagination.showQuickJumper}
            showTotal={pagination.showTotal}
            responsive
          />
        </div>
      )}
    </div>
  )
}
