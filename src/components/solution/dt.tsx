import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { DataTablePagination } from '../solution/dt-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import {
  setQueryCustomersPagination,
  setQueryCustomersParams,
} from '@/redux/slice/query-customers-table-slice'
import { DataTableToolbar } from './dt-toolbar'

interface DataTableProps<T> {
  data: any
  isLoading: boolean
  columns: Array<ColumnDef<T>>
}

export function DataTable<T>({ data, isLoading, columns }: DataTableProps<T>) {
  const dispatch = useDispatch()
  const queryCustomersTableState = useSelector(
    (state: RootState) => state.QueryCustomersTable,
  )
  const pagination = queryCustomersTableState.pagination

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),

    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      const newPagination =
        updater instanceof Function ? updater(pagination) : updater

      // update pagination both local and query state.
      dispatch(setQueryCustomersPagination(newPagination))

      dispatch(
        setQueryCustomersParams({
          ...queryCustomersTableState.queryParams,
          skip: newPagination.pageIndex * newPagination.pageSize,
          take: newPagination.pageSize,
        }),
      )
    },
    rowCount: data?.total,
    manualPagination: true,
    pageCount: Math.ceil((data?.total || 0) / pagination.pageSize),

    // table state
    state: {
      pagination,
    },
  })

  return (
    <div className="overflow-auto flex flex-col gap-2">
      <DataTableToolbar />
      <div className="overflow-hidden border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pagination.pageSize }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {table.getAllLeafColumns().map((column) => (
                    <TableCell key={`skeleton-cell-${column.id}-${index}`}>
                      <div className="h-9 w-full animate-pulse rounded bg-gray-200" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
