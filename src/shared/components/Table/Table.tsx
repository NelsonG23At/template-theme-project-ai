import { Table as AntdTable, Pagination as AntdPagination, theme } from 'antd'
import type { TableProps } from './Table.types'
import { TableToolbar } from './partials/TableToolbar'

export function Table<T extends object>({
  dataSource,
  columns,
  rowKey,
  loading = false,
  toolbar,
  pagination,
  onRow,
  scroll = { x: 'max-content' },
  size = 'middle',
  empty,
  className = '',
}: TableProps<T>) {
  const { token } = theme.useToken()

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
        dataSource={dataSource}
        columns={columns}
        rowKey={rowKey}
        loading={loading}
        pagination={false}
        onRow={onRow}
        scroll={scroll}
        size={size}
        locale={empty !== undefined ? { emptyText: empty } : undefined}
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
