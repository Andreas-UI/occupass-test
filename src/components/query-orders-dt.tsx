import { DataTableColumnHeader } from './dt-header'
import type { ColumnDef } from '@tanstack/react-table'
import type { Order } from '@/features/dtos'
import { DataTable } from './dt'
import { useEffect } from 'react'
import { toast } from 'sonner'
import type { QueryOrdersAPIProps } from '@/features/orders/api'
import { QueryOrdersQuery } from '@/features/orders/queries'
import { parseDate } from '@/lib/utils'

export function QueryOrdersDT({
  params,
  fields,
}: {
  params: QueryOrdersAPIProps
  fields: Array<string>
}) {
  const fullColumns: Array<ColumnDef<Order>> = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: 'customerId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer ID" />
      ),
      cell: ({ row }) => <div>{row.original.customerId}</div>,
    },
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee ID" />
      ),
      cell: ({ row }) => <div>{row.original.employeeId}</div>,
    },
    {
      accessorKey: 'orderDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Date" />
      ),
      cell: ({ row }) => <div>{parseDate(row.original.orderDate)}</div>,
    },
    {
      accessorKey: 'requiredDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Required Date" />
      ),
      cell: ({ row }) => <div>{parseDate(row.original.requiredDate)}</div>,
    },
    {
      accessorKey: 'shippedDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Shipped Date" />
      ),
      cell: ({ row }) => <div>{parseDate(row.original.shippedDate)}</div>,
    },
    {
      accessorKey: 'shipVia',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ship Via" />
      ),
      cell: ({ row }) => <div>{row.original.shipVia}</div>,
    },
    {
      accessorKey: 'freight',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Freight" />
      ),
      cell: ({ row }) => <div>{row.original.freight}</div>,
    },
    {
      accessorKey: 'shipName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ship Name" />
      ),
      cell: ({ row }) => <div>{row.original.shipName}</div>,
    },
    {
      accessorKey: 'shipAddress',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ship Address" />
      ),
      cell: ({ row }) => <div>{row.original.shipAddress}</div>,
    },
    {
      accessorKey: 'shipCity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ship City" />
      ),
      cell: ({ row }) => <div>{row.original.shipCity}</div>,
    },
    {
      accessorKey: 'shipRegion',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ship Region" />
      ),
      cell: ({ row }) => <div>{row.original.shipRegion}</div>,
    },
    {
      accessorKey: 'shipPostalCode',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ship Postal Code" />
      ),
      cell: ({ row }) => <div>{row.original.shipPostalCode}</div>,
    },
    {
      accessorKey: 'shipCountry',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ship Country" />
      ),
      cell: ({ row }) => <div>{row.original.shipCountry}</div>,
    },
  ]

  const columns =
    fields.length > 0
      ? // @ts-ignore
        fullColumns.filter((col) => fields.includes(col.accessorKey))
      : fullColumns

  const { data, isLoading, isError, isSuccess } = QueryOrdersQuery(params)
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
