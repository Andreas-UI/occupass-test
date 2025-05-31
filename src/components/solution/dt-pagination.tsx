import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import type { Table } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { setQueryCustomersParams } from '@/redux/slice/query-customers-table-slice'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const dispatch = useDispatch()
  const queryCustomersTableState = useSelector(
    (state: RootState) => state.QueryCustomersTable,
  )

  const RowsPerPage = () => (
    <div className="flex flex-row gap-2 items-center">
      <p>Rows per page:</p>
      <Select
        value={String(table.getState().pagination.pageSize)}
        onValueChange={(value) => {
          const pageSize = Number(value)
          table.setPageSize(pageSize)

          dispatch(
            setQueryCustomersParams({
              ...queryCustomersTableState.queryParams,

              // update pagination when page size change
              take: pageSize,
              skip: 0,
            }),
          )
        }}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={String(pageSize)}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  const PaginationButtons = () => (
    <div className="flex flex-row gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight />
      </Button>
    </div>
  )

  const PaginationText = () => (
    <div className="text-sm text-muted-foreground">
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </div>
  )

  const TotalRowsText = () => (
    <div className="text-sm text-muted-foreground">
      Showing {table.getRowModel().rows.length} of {table.getRowCount()} rows
    </div>
  )

  return (
    <div className="flex flex-row justify-between items-center">
      <TotalRowsText />
      <div className="flex flex-row gap-10 items-center justify-between">
        <RowsPerPage />
        <PaginationText />
        <PaginationButtons />
      </div>
    </div>
  )
}
