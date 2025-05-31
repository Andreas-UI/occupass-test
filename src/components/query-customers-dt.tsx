import type { QueryCustomersAPIProps } from '@/features/customers/api'
import { QueryCustomersQuery } from '@/features/customers/queries'
import { DataTableColumnHeader } from './dt-header'
import type { ColumnDef } from '@tanstack/react-table'
import type { Customer } from '@/features/dtos'
import { DataTable } from './dt'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function QueryCustomersDT({
  params,
  fields,
}: {
  params: QueryCustomersAPIProps
  fields: Array<string>
}) {
  const fullColumns: Array<ColumnDef<Customer>> = [
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

  const columns =
    fields.length > 0
      ? // @ts-ignore
        fullColumns.filter((col) => fields.includes(col.accessorKey))
      : fullColumns

  const { data, isLoading, isError, isSuccess } = QueryCustomersQuery(params)
  useEffect(() => {
    if (isLoading) {
      toast.info(`Loading data...`)
    }
    if (isSuccess) {
      toast.success(`Loaded data successfully`)
    }
    if (isError) {
      toast.error(`Error loading data}`)
    }
  }, [data, isLoading, isError])

  if (data)
    return (
      <div className="flex flex-col gap-2 mb-16">
        <div className="text-left">
          <h2 className="text-balance text-xl font-semibold">Query Results</h2>
        </div>
        <DataTable columns={columns} data={data.results} />
      </div>
    )
}
