import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { FormField, FormItem, FormControl, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import { queryCustomersSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { setQueryCustomersParams } from '@/redux/slice/query-customers-table-slice'
import { DTMultiSelect } from './dt-multiselect'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useEffect, useState } from 'react'

const multiSelectItems = [
  {
    value: 'id',
    label: 'ID',
  },
  {
    value: 'companyName',
    label: 'Company Name',
  },
  {
    value: 'contactName',
    label: 'Contact Name',
  },
  {
    value: 'contactTitle',
    label: 'Contact Title',
  },
  {
    value: 'address',
    label: 'Address',
  },
  {
    value: 'city',
    label: 'City',
  },
  {
    value: 'region',
    label: 'Region',
  },
  {
    value: 'postalCode',
    label: 'Postal Code',
  },
  {
    value: 'country',
    label: 'Country',
  },
  {
    value: 'phone',
    label: 'Phone',
  },
  {
    value: 'fax',
    label: 'Fax',
  },
]

export function DataTableToolbar() {
  const dispatch = useDispatch()
  const queryCustomersTableState = useSelector(
    (state: RootState) => state.QueryCustomersTable,
  )
  const pagination = queryCustomersTableState.pagination

  const form = useForm<z.infer<typeof queryCustomersSchema>>({
    resolver: zodResolver(queryCustomersSchema),
  })

  useEffect(() => {
    form.register('orderBy')
    form.register('orderByDesc')
  }, [form])

  const [sortState, setSortState] = useState<{
    type: 'asc' | 'desc'
    columns: string[]
  }>({
    type: 'asc',
    columns: [],
  })

  function onSubmit(values: z.infer<typeof queryCustomersSchema>) {
    console.log(values)
    dispatch(
      setQueryCustomersParams({
        ...queryCustomersTableState.queryParams,
        ...values,

        // Reset pagination when query changes
        skip: 0,
        take: pagination.pageSize,
      }),
    )
  }

  return (
    <div className="@container flex items-center justify-between">
      <Form {...form}>
        <div className="flex flex-1 items-center gap-2">
          <FormField
            control={form.control}
            name="countryStartsWith"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search by country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <div className="flex flex-row">
              <Select
                defaultValue={sortState.type}
                onValueChange={(value: 'asc' | 'desc') => {
                  setSortState((prev) => ({
                    ...prev,
                    type: value,
                  }))
                }}
              >
                <SelectTrigger className="rounded-e-none">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">ASC</SelectItem>
                  <SelectItem value="desc">DESC</SelectItem>
                </SelectContent>
              </Select>
              <FormControl>
                <DTMultiSelect
                  items={multiSelectItems}
                  title="Columns"
                  onChange={(selected) => {
                    setSortState((prev) => ({
                      ...prev,
                      columns: selected,
                    }))
                  }}
                  className="rounded-s-none"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        </div>
      </Form>
      <Button
        onClick={() => {
          form.setValue(
            'orderBy',
            sortState.type === 'asc' ? sortState.columns : [],
          )
          form.setValue(
            'orderByDesc',
            sortState.type === 'desc' ? sortState.columns : [],
          )
          form.handleSubmit(onSubmit)()
        }}
      >
        Search
      </Button>
    </div>
  )
}
