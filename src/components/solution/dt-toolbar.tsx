import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from '../ui/multi-select'
import { TagsInput } from '../ui/tags-input'
import { queryCustomersSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { setQueryCustomersParams } from '@/redux/slice/query-customers-table-slice'

const multiSelectItems = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'companyName',
    label: 'Company Name',
  },
  {
    key: 'contactName',
    label: 'Contact Name',
  },
  {
    key: 'contactTitle',
    label: 'Contact Title',
  },
  {
    key: 'address',
    label: 'Address',
  },
  {
    key: 'city',
    label: 'City',
  },
  {
    key: 'region',
    label: 'Region',
  },
  {
    key: 'postalCode',
    label: 'Postal Code',
  },
  {
    key: 'country',
    label: 'Country',
  },
  {
    key: 'phone',
    label: 'Phone',
  },
  {
    key: 'fax',
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

  function onSubmit(values: z.infer<typeof queryCustomersSchema>) {
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
    <Card className="@container">
      <CardContent>
        <Form {...form}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IDs</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value || []}
                      onValueChange={field.onChange}
                      placeholder="Customer IDs"
                    />
                  </FormControl>
                  <FormDescription>
                    Press <kbd>Enter</kbd> after each ID.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="countryStartsWith"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Starts With</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Country starts with (e.x Ger, Ita, ...)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Additional Filters
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="orderBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order By</FormLabel>
                    <FormControl>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value || []}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select columns" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {multiSelectItems.map((multiSelectItem) => (
                              <MultiSelectorItem
                                key={multiSelectItem.key}
                                value={multiSelectItem.key}
                              >
                                {multiSelectItem.label}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orderByDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order By Desc</FormLabel>
                    <FormControl>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value || []}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select columns" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {multiSelectItems.map((multiSelectItem) => (
                              <MultiSelectorItem
                                key={multiSelectItem.key}
                                value={multiSelectItem.key}
                              >
                                {multiSelectItem.label}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={form.handleSubmit(onSubmit)}>Query</Button>
      </CardFooter>
    </Card>
  )
}
