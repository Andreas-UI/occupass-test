import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { DataTableColumnHeader } from './dt-header'
import { DataTable } from './dt'

import { Button } from './ui/button'
import type { Order, OrderDetail } from '@/features/dtos'
import type { ColumnDef } from '@tanstack/react-table'
import { GetOrdersQuery } from '@/features/orders/queries'
import {
  createOrderDetailsDialogData,
  toggleOrderDetailsDialog,
} from '@/redux/slice/order-details-dialog-slice'

function parseDate(rawDate?: string) {
  if (!rawDate) return rawDate

  const match = rawDate.match(/\/Date\((\d+)(?:-\d+)?\)\//)

  if (match) {
    const timestamp = parseInt(match[1], 10)
    const date = new Date(timestamp)
    return date.toLocaleDateString()
  }
}

export function CustomerOrders({ customerId }: { customerId: string }) {
  const dispatch = useDispatch()

  const { data } = GetOrdersQuery(customerId)

  useEffect(() => {
    if (data?.results) {
      dispatch(
        createOrderDetailsDialogData(
          data.results.reduce(
            (dict, { order, orderDetails }) => {
              dict[order.id] = orderDetails
              return dict
            },
            {} as Record<number, Array<OrderDetail>>,
          ),
        ),
      )
    }
  }, [data])

  /*
    Columns props and states.

    Append `enableSorting: false` or `enableColumnFilter: false`to the relevant 
    column definition to disable sorting, filtering, or both.
    {
      ...
      enableSorting: false,
      enableColumnFilter: false
      ...
    }
  */

  const columns: Array<ColumnDef<Order>> = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <Button
          variant="link"
          onClick={() => dispatch(toggleOrderDetailsDialog(row.original.id))} // Open Dialog
        >
          {row.original.id}
        </Button>
      ),
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

  return (
    <>
      <div className="text-left">
        <h2 className="text-balance text-3xl font-semibold">Customer Orders {data?.results && `: ${customerId}`}</h2>
        <p className="text-muted-foreground">
          Click a customer order ID to show order details.
        </p>
      </div>
      <DataTable
        columns={columns}
        data={data?.results?.map((result) => result.order) || []}
      />
    </>
  )
}
