import { CustomerOrders } from '@/components/customer-orders'
import { DataTableColumnHeader } from '@/components/dt-header'
import { MainHeader } from '@/components/main-header'
import { Button } from '@/components/ui/button'
import { QueryCustomersQuery } from '@/features/customers/queries'
import type { Customer } from '@/features/dtos'
import { setSidebarMenuActive } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { DataTable } from '@/components/solution/dt'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  setSidebarMenuActive('/')

  const queryCustomersTableState = useSelector(
    (state: RootState) => state.QueryCustomersTable,
  )

  const [useSelectedId, setSelectedId] = useState<string>('')

  const columns: Array<ColumnDef<Customer>> = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <Button variant="link" onClick={() => setSelectedId(row.original.id)}>
          {row.original.id}
        </Button>
      ),
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

  const { data, isLoading } = QueryCustomersQuery({
    ids: queryCustomersTableState.queryParams.ids,
    countryStartsWith: queryCustomersTableState.queryParams.countryStartsWith,
    orderBy: queryCustomersTableState.queryParams.orderBy,
    orderByDesc: queryCustomersTableState.queryParams.orderByDesc,
    include: ['total'],

    // pagination
    skip: queryCustomersTableState.queryParams.skip,
    take: queryCustomersTableState.queryParams.take,
  })

  return (
    <>
      <MainHeader text="My Solution" />
      <div className="@container flex flex-1 flex-col p-6 gap-6">
        <div className="text-left">
          <h2 className="text-balance text-3xl font-semibold">Customer List</h2>
          <p className="text-muted-foreground">
            Click a customer ID to show order.
          </p>
        </div>
        <DataTable columns={columns} data={data} isLoading={isLoading} />
        <CustomerOrders customerId={useSelectedId} />
      </div>
    </>
  )
}
