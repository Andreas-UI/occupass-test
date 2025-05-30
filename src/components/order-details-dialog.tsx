import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { DataTableColumnHeader } from './dt-header'
import { DataTable } from './dt'
import type { RootState } from '@/redux/store'
import type { ColumnDef } from '@tanstack/react-table'
import type { OrderDetail } from '@/features/dtos'
import { toggleOrderDetailsDialog } from '@/redux/slice/order-details-dialog-slice'

export function OrderDetailsDialog() {
  const dispatch = useDispatch()
  const orderDetailsDialogState = useSelector(
    (state: RootState) => state.OrderDetailsDialog,
  )

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

  const columns: Array<ColumnDef<OrderDetail>> = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div>{row.original.orderId}</div>,
    },
    {
      accessorKey: 'productId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product ID" />
      ),
      cell: ({ row }) => <div>{row.original.productId}</div>,
    },
    {
      accessorKey: 'unitPrice',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Unit Price" />
      ),
      cell: ({ row }) => <div>{row.original.unitPrice}</div>,
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
      cell: ({ row }) => <div>{row.original.quantity}</div>,
    },
    {
      accessorKey: 'discount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Discount" />
      ),
      cell: ({ row }) => <div>{row.original.discount}</div>,
    },
  ]

  return (
    <Dialog
      open={orderDetailsDialogState.open}
      onOpenChange={() => dispatch(toggleOrderDetailsDialog())} // Potentially Close
    >
      <DialogContent className="min-w-4xl">
        {orderDetailsDialogState.current ? (
          <>
            <DialogHeader>
              <DialogTitle>
                Order Details : {orderDetailsDialogState.current[0].orderId}
              </DialogTitle>
              <DialogDescription>
                Below is a list of products and quantities associated with this
                order.
              </DialogDescription>
            </DialogHeader>
            <DataTable
              columns={columns}
              data={orderDetailsDialogState.current}
            />
          </>
        ) : (
          <DialogHeader>
            <DialogTitle>No Order Data</DialogTitle>
            <DialogDescription>
              Please select other orders to view its details.
            </DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  )
}
