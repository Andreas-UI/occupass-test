import { useState } from 'react'
import { z } from 'zod'

import { createFileRoute } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table'

import { MainHeader } from '@/components/main-header'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTableColumnHeader } from '@/components/dt-header'
import { DataTablePagination } from '@/components/dt-pagination'

export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})

const schema = z.object({
  id: z.string(),
  name: z.string(),
  balance: z.number(),
})

const data = [
  {
    id: '1',
    name: 'Andrew',
    balance: 100,
  },
  {
    id: '2',
    name: 'Bill',
    balance: 103,
  },
  {
    id: '3',
    name: 'Cindy',
    balance: 70,
  },
  {
    id: '4',
    name: 'Daniel',
    balance: 21,
  },
  {
    id: '5',
    name: 'Daniel',
    balance: 111,
  },
  {
    id: '6',
    name: 'Daniel',
    balance: 0,
  },
  {
    id: '7',
    name: 'Daniel',
    balance: 42,
  },
  {
    id: '8',
    name: 'Daniel',
    balance: 82,
  },
  {
    id: '9',
    name: 'Daniel',
    balance: 91,
  },
  {
    id: '10',
    name: 'Daniel',
    balance: 166,
  },
  {
    id: '11',
    name: 'Daniel',
    balance: 248,
  },
  {
    id: '12',
    name: 'Daniel',
    balance: 83,
  },
]

const columns: Array<ColumnDef<z.infer<typeof schema>>> = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.original.id}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    filterFn: (row, columnId, filterValue) => {
      const val = row.getValue<number>(columnId)
      if (!filterValue) return true
      return String(val).includes(String(filterValue))
    },
  },
]

function RouteComponent() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <>
      <MainHeader text="Customers" />
      <div className="flex flex-col p-4 gap-2">
        <div className="border rounded-lg">
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
              {table.getRowModel().rows.length ? (
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
                    colSpan={columns.length}
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
    </>
  )
}
