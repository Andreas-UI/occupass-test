import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import {
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

import type { Customer } from '@/features/dtos'
import { MainHeader } from '@/components/main-header'
import { DataTableColumnHeader } from '@/components/dt-header'
import { GetAllCustomersQuery } from '@/features/customers/queries'
import { DataTable } from '@/components/dt'

export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})

/*
Please append `enableSorting: false` or `enableColumnFilter: false`to the relevant 
column definition to disable sorting, filtering, or both.
{
  ...
  enableSorting: false,
  enableColumnFilter: false
  ...
}
*/
const columns: Array<ColumnDef<Customer>> = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: 'companyName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => <div>{row.original.companyName}</div>,
  },
  {
    accessorKey: 'contactName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Name" />
    ),
    cell: ({ row }) => <div>{row.original.contactName}</div>,
  },
  {
    accessorKey: 'contactTitle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Title" />
    ),
    cell: ({ row }) => <div>{row.original.contactTitle}</div>,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <div>{row.original.address}</div>,
  },
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => <div>{row.original.city}</div>,
  },
  {
    accessorKey: 'region',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => <div>{row.original.region}</div>,
  },
  {
    accessorKey: 'postalCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Postal Code" />
    ),
    cell: ({ row }) => <div>{row.original.postalCode}</div>,
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => <div>{row.original.country}</div>,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div>{row.original.phone}</div>,
  },
  {
    accessorKey: 'fax',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fax" />
    ),
    cell: ({ row }) => <div>{row.original.fax}</div>,
  },
]

function RouteComponent() {
  const { data } = GetAllCustomersQuery()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable<Customer>({
    data: data?.results ?? [],
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
      <div className="@container flex flex-1">
        <DataTable table={table} />
      </div>
    </>
  )
}
